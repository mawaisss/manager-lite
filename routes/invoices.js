const express = require('express');
const router = express.Router();

// Dummy invoice data for demonstration
router.get('/', (req, res) => {
  const invoices = [
    { number: "INV001", client: "Client A", date: "2025-04-10", total: 15000 },
    { number: "INV002", client: "Client B", date: "2025-04-15", total: 20000 }
  ];
  res.render('invoices', { invoices });
});

module.exports = router;
