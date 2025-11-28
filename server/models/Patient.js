const JsonDB = require('../lib/db');

// Create a "Patient" model backed by the 'patients' collection in db.json
const Patient = JsonDB.createModel('patients');

module.exports = Patient;
