const API_URL = 'http://localhost:5000/api';

export const api = {
  // Patients
  getPatients: async () => {
    const res = await fetch(`${API_URL}/patients`);
    if (!res.ok) throw new Error('Failed to fetch patients');
    return res.json();
  },
  addPatient: async (patient) => {
    const res = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    });
    if (!res.ok) throw new Error('Failed to add patient');
    return res.json();
  },
  updatePlan: async (id, plan) => {
    const res = await fetch(`${API_URL}/patients/${id}/plan`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan),
    });
    if (!res.ok) throw new Error('Failed to update plan');
    return res.json();
  },

  // Readings
  sendReading: async (reading) => {
    const res = await fetch(`${API_URL}/readings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reading),
    });
    if (!res.ok) throw new Error('Failed to send reading');
    return res.json();
  },
  getReadings: async (patientId) => {
    const res = await fetch(`${API_URL}/readings/${patientId}`);
    if (!res.ok) throw new Error('Failed to fetch readings');
    return res.json();
  },

  // Reports
  getReports: async (patientId) => {
    const res = await fetch(`${API_URL}/reports/${patientId}`);
    if (!res.ok) throw new Error('Failed to fetch reports');
    return res.json();
  },
  addReport: async (report) => {
    const res = await fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    });
    if (!res.ok) throw new Error('Failed to add report');
    return res.json();
  },
};
