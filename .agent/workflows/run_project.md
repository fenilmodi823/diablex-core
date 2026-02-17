---
description: Run the Diablex Backend and Simulation Bridge
---

1. Start the Backend Server
   - Open a terminal
   - Navigate to `server`
   - Run `npm start`
   - The server will listen on port 5000

2. Start the Sensor Bridge (Mock Mode)
   - Open a **new** terminal
   - Navigate to `server`
   - Run `node services/bridge.js`
   - You should see "[BRIDGE] Running in VIRTUAL SIMULATION mode"
   - Data will start streaming to the backend

3. Verification
   - The Bridge terminal will log "Synced 1 readings..."
   - The Server terminal may log alerts if glucose is high/low.
