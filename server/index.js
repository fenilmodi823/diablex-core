const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Import http
require('dotenv').config();

const { initSocket } = require('./lib/socket');
const { db } = require('./lib/db'); // Ensure DB init triggers

const app = express();
const server = http.createServer(app); // Create HTTP server

const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Socket.io
initSocket(server);

// Routes
const patientsRouter = require('./routes/patients');
const readingsRouter = require('./routes/readings');
const reportsRouter = require('./routes/reports');
const followupsRouter = require('./routes/followups');

app.use('/api/patients', patientsRouter);
app.use('/api/readings', readingsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/followups', followupsRouter);

app.get('/', (req, res) => {
  res.send('Diablex API is running (SQLite Mode)');
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
