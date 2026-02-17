---
description: Run the Full Diablex Stack (Backend + Bridge + Mobile)
---

This workflow starts the entire system. You will need **3 separate terminals**.

### 1. Start the Backend (Brain)
- Open Terminal 1
- `cd server`
- `npm start`
- *Expected Output*: `Server running on port 5050`

### 2. Start the Virtual Sensor Bridge (Data Source)
- Open Terminal 2
- `cd server`
- `node services/bridge.js`
- *Expected Output*: `[BRIDGE] Running in VIRTUAL SIMULATION mode...` (or connected to COM port)

### 3. Start the Patient App (Interface)
- Open Terminal 3
- `cd apps/mobile`
- `npx expo start --web -c`
- *Action*: Press `w` to open in browser if it doesn't open automatically.
- *Expected Output*: Browser opens `http://localhost:8081` showing the dashboard.
