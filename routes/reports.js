const express = require('express');
const router = express.Router();

// Dummy report content
router.get('/', (req, res) => {
  res.render('reports', { report: "Financial report summary will appear here." });
});

module.exports = router;
