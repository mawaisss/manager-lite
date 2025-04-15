const express = require('express');
const router = express.Router();

// Dummy settings data
router.get('/', (req, res) => {
  res.render('settings', { settings: "Company info and user management settings go here." });
});

module.exports = router;
