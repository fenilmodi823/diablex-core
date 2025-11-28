const express = require('express');
const router = express.Router();
const Reading = require('../models/Reading');
const Patient = require('../models/Patient');

// POST new reading (Ingest)
router.post('/', async (req, res) => {
  const { patientId, value, tag, ts } = req.body;

  try {
    // Verify patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const reading = new Reading({
      patientId,
      value,
      tag,
      ts: ts || Date.now(),
    });

    const newReading = await reading.save();

    // Update patient risk if reading is high (Simple logic)
    if (value > 200 && patient.risk !== 'High') {
      patient.risk = 'High';
      await patient.save();
    }

    res.status(201).json(newReading);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET readings for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const readings = await Reading.find({ patientId: req.params.patientId })
      .sort({ ts: -1 })
      .limit(100); // Limit to last 100 readings
    res.json(readings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
