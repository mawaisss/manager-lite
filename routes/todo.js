const express = require('express');
const router = express.Router();

// Dummy to-do data
router.get('/', (req, res) => {
  const todos = [
    { task: "Follow up with client", due_date: "2025-04-20", status: "Pending" },
    { task: "Approve invoice", due_date: "2025-04-22", status: "Completed" }
  ];
  res.render('todo', { todos });
});

module.exports = router;
