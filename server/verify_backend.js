const io = require("socket.io-client");
const axios = require("axios");

const API_URL = "http://localhost:5050/api";
const SOCKET_URL = "http://localhost:5050";

async function runTests() {
    console.log("🔵 Starting Backend Verification...");

    // 1. Connect to WebSocket
    console.log("   Connecting to WebSocket...");
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
        console.log("   ✅ WebSocket Connected!");
        socket.emit("join_dashboard");
    });

    socket.on("ALERT", (data) => {
        console.log("   🚨 ALERT RECEIVED:", data);
        if (data.type === 'HYPO' && data.value === 55) {
            console.log("   ✅ HYPO Alert Verified!");
            process.exit(0);
        }
    });

    // 2. Wait a bit for socket connection
    await new Promise(r => setTimeout(r, 1000));

    // 2.5 Create Dummy Patient
    console.log("   Creating Dummy Patient...");
    try {
        await axios.post(`${API_URL}/patients`, {
            id: "PATIENT_001",
            name: "John Doe",
            risk: "Medium"
        });
        console.log("   ✅ Patient Created/Verified");
    } catch (err) {
        console.log("   ℹ️ Patient Creation: " + err.message);
    }

    // 3. Post Batch Readings
    console.log("   POSTing Batch Readings...");
    const payload = [
        { patientId: "PATIENT_001", value: 110, type: "fasting", ts: Date.now() - 5000 },
        { patientId: "PATIENT_001", value: 120, type: "random", ts: Date.now() - 4000 },
        { patientId: "PATIENT_001", value: 55, type: "random", ts: Date.now() } // This should trigger HYPO alert
    ];

    try {
        const res = await axios.post(`${API_URL}/readings/batch`, payload);
        console.log("   ✅ Batch API Success:", res.data);
    } catch (err) {
        console.error("   ❌ Batch API Failed:", err.message);
        process.exit(1);
    }

    // 4. Verify Persistence
    console.log("   Verifying DB Persistence...");
    try {
        const res = await axios.get(`${API_URL}/readings/PATIENT_001`);
        if (res.data.length >= 3) {
            console.log(`   ✅ Persistence Verified: Found ${res.data.length} readings.`);
        } else {
            console.error("   ❌ Persistence Fail: Readings not found.");
        }
    } catch (err) {
        console.error("   ❌ GET API Failed:", err.message);
    }

    // Wait for Alert to arrive before exiting
    setTimeout(() => {
        console.log("   ⚠️ Timeout waiting for Alert.");
        process.exit(1);
    }, 5000);
}

runTests();
