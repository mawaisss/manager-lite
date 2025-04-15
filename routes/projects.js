const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) return res.send("Database error");
    // Format project number in the view (e.g., "P-0001") using the project id
    res.render('projects', { projects: rows });
  });
});

// Updated: Fetch clients from the DB to populate the drop-down in the new project form
router.get('/new', (req, res) => {
  db.all("SELECT id, name FROM clients", [], (err, clients) => {
    if (err) return res.send("Error retrieving clients");
    res.render('new_project', { clients });
  });
});

router.post('/new', (req, res) => {
  const { name, client_id, status, location } = req.body;
  // Lookup client name by client_id
  db.get("SELECT name FROM clients WHERE id = ?", [client_id], (err, row) => {
    if (err) return res.send("Error retrieving client");
    if (!row) return res.send("Client not found");
    const client = row.name;
    db.run("INSERT INTO projects (name, client, status, location) VALUES (?, ?, ?, ?)",
      [name, client, status, location],
      function(err) {
        if (err) return res.send("Error inserting project: " + err.message);
        res.redirect('/projects');
      }
    );
  });
});

// For editing: also fetch clients for drop-down menu
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM projects WHERE id = ?", [id], (err, project) => {
    if (err) return res.send("Error fetching project: " + err.message);
    if (!project) return res.send("Project not found");
    db.all("SELECT id, name FROM clients", [], (err, clients) => {
      if (err) return res.send("Error retrieving clients: " + err.message);
      res.render('edit_project', { project, clients });
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { name, client_id, status, location } = req.body;
  db.get("SELECT name FROM clients WHERE id = ?", [client_id], (err, row) => {
    if (err) return res.send("Error retrieving client");
    if (!row) return res.send("Client not found");
    const client = row.name;
    db.run("UPDATE projects SET name = ?, client = ?, status = ?, location = ? WHERE id = ?",
      [name, client, status, location, id],
      function(err) {
        if (err) return res.send("Error updating project: " + err.message);
        res.redirect('/projects');
      }
    );
  });
});

module.exports = router;
