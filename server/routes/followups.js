const express = require('express');
const router = express.Router();
const FollowUp = require('../models/FollowUp');

// GET all follow-ups
router.get('/', async (req, res) => {
  try {
    const followups = await FollowUp.find();
    res.json(followups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new follow-up
router.post('/', async (req, res) => {
  try {
    const followup = new FollowUp({
      patient: req.body.patient,
      date: req.body.date,
      time: req.body.time,
      type: req.body.type,
      status: 'Scheduled'
    });
    const newFollowUp = await followup.save();
    res.status(201).json(newFollowUp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
