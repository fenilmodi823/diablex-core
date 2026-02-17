const API = "http://localhost:5050";
const DEVICE_ID = "DX-SIM-001";

export async function fetchReadings(limit = 120) {
  const url = `${API}/api/readings?deviceId=${DEVICE_ID}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return data.rows || [];
}
