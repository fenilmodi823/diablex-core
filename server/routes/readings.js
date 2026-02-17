const express = require('express');
const router = express.Router();
const { run, query } = require('../lib/db');
const { emitAlert } = require('../lib/socket');

// GET all readings (Device Simulation / History)
router.get('/', async (req, res) => {
  const deviceId = req.query.deviceId || "DX-SIM-001";
  const limit = Math.min(Number(req.query.limit || 200), 2000);

  try {
    const rows = await query(`
      SELECT 
        device_id as deviceId, 
        timestamp as ts, 
        seq, 
        value as glucose, 
        battery, 
        mode, 
        status, 
        fw
      FROM readings
      WHERE device_id = ?
      ORDER BY timestamp DESC
      LIMIT ?
    `, [String(deviceId), limit]);

    res.json({ ok: true, deviceId, rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST single reading (Device Simulation)
router.post('/', async (req, res) => {
  const { deviceId, ts, seq, glucose, battery, mode, status, fw } = req.body || {};

  if (!deviceId || !ts || seq === undefined || glucose === undefined) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields: deviceId, ts, seq, glucose",
    });
  }

  // Map fields
  const timestamp = Number(ts) || Date.parse(ts) || Date.now();
  const value = Number(glucose);
  const type = "glucose";

  // Try to find patient associated with device
  // In a real app we'd look this up. For now we just insert.
  // We can try to lookup patient_id from patients table where device_id matches
  let patientId = "UNKNOWN";

  try {
    const patients = await query('SELECT id FROM patients WHERE device_id = ?', [deviceId]);
    if (patients.length > 0) patientId = patients[0].id;

    const result = await run(`
      INSERT INTO readings (device_id, timestamp, seq, value, battery, mode, status, fw, type, patient_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      String(deviceId),
      timestamp,
      Number(seq),
      value,
      battery === undefined ? null : Number(battery),
      mode || null,
      status || null,
      fw || null,
      type,
      patientId
    ]);

    // Check alerts
    if (value < 70) emitAlert({ type: 'HYPO', patientId, value, msg: 'Hypoglycemia detected' });
    if (value > 180) emitAlert({ type: 'HYPER', patientId, value, msg: 'Hyperglycemia detected' });

    res.json({ ok: true, insertedId: result.lastID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST batch of readings (High throughput)
router.post('/batch', async (req, res) => {
  const readings = req.body; // Expects array: [{ patientId, value, type, ts }, ...]

  if (!Array.isArray(readings) || readings.length === 0) {
    return res.status(400).json({ message: 'Invalid payload: Expected array of readings' });
  }

  try {
    let insertedCount = 0;

    // Process readings
    for (const r of readings) {
      if (!r.patientId || !r.value) continue;

      // 1. Insert into DB
      await run(
        `INSERT INTO readings (patient_id, value, type, timestamp, device_id) VALUES (?, ?, ?, ?, ?)`,
        [r.patientId, r.value, r.type || 'random', r.ts || Date.now(), 'PROTOTYPE_DEV']
      );
      insertedCount++;

      // 2. Check for Critical Events (Real-time Logic)
      if (r.value < 70) {
        emitAlert({
          type: 'HYPO',
          patientId: r.patientId,
          value: r.value,
          msg: `CRITICAL: Hypoglycemia detected for ${r.patientId}`
        });
      } else if (r.value > 250) {
        emitAlert({
          type: 'HYPER',
          patientId: r.patientId,
          value: r.value,
          msg: `WARNING: Hyperglycemia detected for ${r.patientId}`
        });
      }
    }

    res.status(201).json({ message: 'Batch processed', count: insertedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET readings for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const readings = await query(
      `SELECT * FROM readings WHERE patient_id = ? ORDER BY timestamp DESC LIMIT 100`,
      [req.params.patientId]
    );
    res.json(readings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
