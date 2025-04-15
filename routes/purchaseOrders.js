const express = require('express');
const router = express.Router();

// Dummy purchase orders data
router.get('/', (req, res) => {
  const pos = [
    { number: "PO001", supplier: "Supplier X", date: "2025-04-12", total: 5000 },
    { number: "PO002", supplier: "Supplier Y", date: "2025-04-16", total: 7500 }
  ];
  res.render('purchase-orders', { pos });
});

module.exports = router;
