const express = require('express');
const router = express.Router();

// GET reports (Mock for prototype)
router.get('/:patientId', async (req, res) => {
  try {
    // TODO: Implement Reports table if needed.
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
