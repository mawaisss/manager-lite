const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all("SELECT * FROM quotations", [], (err, rows) => {
    if (err) return res.send("Database error");
    res.render('quotations', { quotations: rows });
  });
});

// Updated: Fetch clients and projects for dropdowns
router.get('/new', (req, res) => {
  db.all("SELECT name FROM clients", [], (err, clients) => {
    if (err) return res.send("Error retrieving clients");
    db.all("SELECT name FROM projects", [], (err, projects) => {
      if (err) return res.send("Error retrieving projects");
      res.render('new_quotation', { clients, projects });
    });
  });
});

router.post('/new', (req, res) => {
  const { number, client, project, date, total } = req.body;
  db.run("INSERT INTO quotations (number, client, project, date, total) VALUES (?, ?, ?, ?, ?)",
    [number, client, project, date, total],
    function(err) {
      if (err) return res.send("Error inserting quotation: " + err.message);
      res.redirect('/quotations');
    }
  );
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM quotations WHERE id = ?", [id], (err, row) => {
    if (err) return res.send("Error fetching quotation: " + err.message);
    if (!row) return res.send("Quotation not found");
    res.render('edit_quotation', { quotation: row });
  });
});

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { number, client, project, date, total } = req.body;
  db.run("UPDATE quotations SET number = ?, client = ?, project = ?, date = ?, total = ? WHERE id = ?",
    [number, client, project, date, total, id],
    function(err) {
      if (err) return res.send("Error updating quotation: " + err.message);
      res.redirect('/quotations');
    }
  );
});

module.exports = router;
