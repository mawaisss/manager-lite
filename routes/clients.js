const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.send("Database error");
    res.render('clients', { clients: rows });
  });
});

router.get('/new', (req, res) => {
  res.render('new_client');
});

router.post('/new', (req, res) => {
  const { name, company_no, email, phone, mobile, trn, address } = req.body;
  db.run("INSERT INTO clients (name, company_no, email, phone, mobile, trn, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, company_no, email, phone, mobile, trn, address],
    function(err) {
      if (err) return res.send("Error inserting client: " + err.message);
      res.redirect('/clients');
    }
  );
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM clients WHERE id = ?", [id], (err, row) => {
    if (err) return res.send("Error fetching client: " + err.message);
    if (!row) return res.send("Client not found");
    res.render('edit_client', { client: row });
  });
});

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { name, company_no, email, phone, mobile, trn, address } = req.body;
  db.run("UPDATE clients SET name = ?, company_no = ?, email = ?, phone = ?, mobile = ?, trn = ?, address = ? WHERE id = ?",
    [name, company_no, email, phone, mobile, trn, address, id],
    function(err) {
      if (err) return res.send("Error updating client: " + err.message);
      res.redirect('/clients');
    }
  );
});

module.exports = router;
