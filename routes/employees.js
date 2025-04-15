const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) return res.send("Database error");
    res.render('employees', { employees: rows });
  });
});

router.get('/new', (req, res) => {
  res.render('new_employee');
});

router.post('/new', (req, res) => {
  const { name, role, balance, status } = req.body;
  db.run("INSERT INTO employees (name, role, balance, status) VALUES (?, ?, ?, ?)",
    [name, role, balance, status],
    function(err) {
      if (err) return res.send("Error inserting employee: " + err.message);
      res.redirect('/employees');
    }
  );
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM employees WHERE id = ?", [id], (err, row) => {
    if (err) return res.send("Error fetching employee: " + err.message);
    if (!row) return res.send("Employee not found");
    res.render('edit_employee', { employee: row });
  });
});

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { name, role, balance, status } = req.body;
  db.run("UPDATE employees SET name = ?, role = ?, balance = ?, status = ? WHERE id = ?",
    [name, role, balance, status, id],
    function(err) {
      if (err) return res.send("Error updating employee: " + err.message);
      res.redirect('/employees');
    }
  );
});

module.exports = router;
