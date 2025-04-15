const express = require('express');
const app = express();
const db = require('./db');
const clientsRouter = require('./routes/clients');
const path = require('path');

app.use(express.json());
app.use('/api/clients', clientsRouter);

// Serve static files from public folder
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
