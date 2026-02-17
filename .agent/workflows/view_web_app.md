---
description: Run the Patient App in Web Browser
---

1. Ensure Prerequisites
   - Backend should be running on port 5050 (`npm start` in `server/`)
   - Bridge should be running (`node services/bridge.js` in `server/`)

2. Start the Expo Web App
   - Open a terminal
   - Navigate to `apps\mobile`
   - Run the command:
     ```powershell
     npx expo start --web -c
     ```
     (The `-c` flag clears the cache to ensure recent fixes are applied)

3. View in Browser
   - The command should automatically open your default browser.
   - If not, check the terminal output for the URL (usually `http://localhost:8081`).
   - You should see the "Patient Dashboard" with the glucose graph.

4. Troubleshooting
   - If you see a blank screen, ensure you ran with `-c`.
   - If the graph is empty, ensure the Bridge service is running.
