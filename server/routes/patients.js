const express = require('express');
const router = express.Router();
const { run, query } = require('../lib/db');

// GET all patients
router.get('/', async (req, res) => {
  try {
    const patients = await query('SELECT * FROM patients');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new patient
router.post('/', async (req, res) => {
  const { id, name, age, type, status, deviceId, risk } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await run(
      `INSERT INTO patients (id, name, age, type, status, device_id, risk_level) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, age || null, type || 'T1D', status || 'Active', deviceId || null, risk || 'Low']
    );
    res.status(201).json({ id, name, age, type, status, deviceId, risk });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE patient
router.delete('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;

    // Delete associated readings first (optional if CASCADE is set, but SQLite default off)
    await run(`DELETE FROM readings WHERE patient_id = ?`, [patientId]);

    // Delete patient
    const result = await run(`DELETE FROM patients WHERE id = ?`, [patientId]);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single patient
router.get('/:id', async (req, res) => {
  try {
    const patients = await query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    if (patients.length === 0) return res.status(404).json({ message: 'Patient not found' });
    res.json(patients[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
