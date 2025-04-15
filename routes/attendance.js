const express = require('express');
const router = express.Router();

// Dummy attendance data
router.get('/', (req, res) => {
  const attendance = [
    { date: "2025-04-10", employee: "Afzal Bajwa", status: "Present" },
    { date: "2025-04-10", employee: "Ahmed Kamel", status: "Absent" }
  ];
  res.render('attendance', { attendance });
});

module.exports = router;
