const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all clients
router.get('/', (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add client
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  db.run(
    "INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, email, phone });
    }
  );
});

module.exports = router;
