const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const types = ['Type 1', 'Type 2', 'Gestational', 'Prediabetes'];
const risks = ['Low', 'Moderate', 'High'];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePatients(count) {
  const patients = [];
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const age = Math.floor(Math.random() * (80 - 18) + 18);
    const type = getRandomElement(types);
    
    // Correlate risk with type slightly
    let risk = getRandomElement(risks);
    if (type === 'Type 2' && age > 50) risk = Math.random() > 0.5 ? 'High' : 'Moderate';
    
    const gi = (Math.random() * (10 - 5) + 5).toFixed(1);
    
    // Generate a random last reading
    const lastValue = Math.floor(Math.random() * (300 - 70) + 70);
    const lastTag = lastValue > 180 ? 'High' : lastValue < 70 ? 'Low' : 'Normal';

    patients.push({
      _id: (i + 1).toString(),
      name: `${firstName} ${lastName}`,
      age,
      type,
      gi: Number(gi),
      risk,
      last: {
        value: lastValue,
        ts: Date.now() - Math.floor(Math.random() * 3600000), // within last hour
        tag: lastTag
      },
      plan: {
        diet: 'Standard diabetic diet',
        meds: 'Metformin 500mg'
      }
    });
  }
  return patients;
}

const patients = generatePatients(50);
const db = {
  patients,
  readings: [],
  reports: [],
  followups: []
};

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
console.log('Generated 50 patients and reset DB.');
