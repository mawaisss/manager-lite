const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard', { 
    user: req.session.user || { username: "Guest", role: "" },
    stats: {
      attendance: "95%",
      pendingInvoices: 5,
      monthlyIncome: "AED 150,000",
      monthlyExpense: "AED 80,000"
    }
  });
});

module.exports = router;
