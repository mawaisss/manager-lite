const express = require('express');
const router = express.Router();

// Dummy meeting notes data
router.get('/', (req, res) => {
  const meetings = [
    { date: "2025-04-15", subject: "Project Kickoff", notes: "All teams to join." },
    { date: "2025-04-20", subject: "Budget Review", notes: "Discuss expenses." }
  ];
  res.render('meetings', { meetings });
});

module.exports = router;
