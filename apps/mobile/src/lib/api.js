const API = "http://localhost:5050";
const DEVICE_ID = "DX-SIM-001";

export async function fetchReadings(limit = 120) {
    const url = `${API}/api/readings/${DEVICE_ID}?limit=${limit}`; // fixed endpoint to match backend get route
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    // Backend returns array directly based on routes/readings.js
    return Array.isArray(data) ? data : data.rows || [];
}
