const express = require('express');
const router = express.Router();

// Dummy expenses data
router.get('/', (req, res) => {
  const expenses = [
    { date: "2025-04-10", category: "Materials", amount: 3000, notes: "For Project Alpha" },
    { date: "2025-04-11", category: "Labor", amount: 1500, notes: "Site work" }
  ];
  res.render('expenses', { expenses });
});

module.exports = router;
