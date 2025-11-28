const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET reports for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.params.patientId }).sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new report
router.post('/', async (req, res) => {
  const report = new Report({
    patientId: req.body.patientId,
    title: req.body.title,
    type: req.body.type,
    url: req.body.url, // Mock URL for now
  });

  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
