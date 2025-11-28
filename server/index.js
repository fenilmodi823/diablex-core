const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
  res.send('Diablex API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
