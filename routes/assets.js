const express = require('express');
const router = express.Router();

// Dummy fixed assets data
router.get('/', (req, res) => {
  const assets = [
    { name: "Generator", category: "Equipment", serial_no: "GEN123", location: "Warehouse", condition: "Good" },
    { name: "Laptop", category: "IT", serial_no: "LAP456", location: "Office", condition: "Fair" }
  ];
  res.render('assets', { assets });
});

module.exports = router;
