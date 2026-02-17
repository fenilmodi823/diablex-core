const express = require('express');
const router = express.Router();

// GET all follow-ups (Mock for prototype)
router.get('/', async (req, res) => {
  try {
    // TODO: Implement FollowUps table if needed. Returning empty for now.
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
