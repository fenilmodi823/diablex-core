const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../diablex.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initSchema();
  }
});

function initSchema() {
  db.serialize(() => {
    // Patients Table
    db.run(`CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      name TEXT,
      age INTEGER,
      type TEXT,
      status TEXT,
      device_id TEXT,
      risk_level TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Devices Table
    db.run(`CREATE TABLE IF NOT EXISTS devices (
      serial_no TEXT PRIMARY KEY,
      user_id TEXT,
      fw_version TEXT,
      last_sync DATETIME,
      FOREIGN KEY(user_id) REFERENCES patients(id)
    )`);

    // Readings Table (Time-Series)
    db.run(`CREATE TABLE IF NOT EXISTS readings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id TEXT,
      timestamp INTEGER,
      value REAL,
      type TEXT,
      device_id TEXT,
      seq INTEGER,
      battery REAL,
      mode TEXT,
      status TEXT,
      fw TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(patient_id) REFERENCES patients(id)
    )`);

    // Create index for faster time-range queries
    db.run(`CREATE INDEX IF NOT EXISTS idx_readings_patient_time ON readings(patient_id, timestamp)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_readings_device_time ON readings(device_id, timestamp)`);

    // Migrations: Add columns if they don't exist
    const migrationSql = [
      "ALTER TABLE readings ADD COLUMN seq INTEGER",
      "ALTER TABLE readings ADD COLUMN battery REAL",
      "ALTER TABLE readings ADD COLUMN mode TEXT",
      "ALTER TABLE readings ADD COLUMN status TEXT",
      "ALTER TABLE readings ADD COLUMN fw TEXT",
      // Patients Table Migrations
      "ALTER TABLE patients ADD COLUMN age INTEGER",
      "ALTER TABLE patients ADD COLUMN type TEXT",
      "ALTER TABLE patients ADD COLUMN status TEXT",
      "ALTER TABLE patients ADD COLUMN device_id TEXT"
    ];

    migrationSql.forEach(sql => {
      db.run(sql, (err) => {
        // Ignore "duplicate column name" error which happens if column exists
      });
    });
  });
}

// Wrapper for async/await support
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

module.exports = { db, query, run };
