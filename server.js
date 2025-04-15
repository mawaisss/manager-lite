const express = require('express');
const app = express();
const db = require('./db');
const clientsRouter = require('./routes/clients');

app.use(express.json());
app.use('/api/clients', clientsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
