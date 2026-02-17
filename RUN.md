# Diablex Project – Run Guide (Local)

This guide shows how to run the full Diablex system locally and view the live glucose graph.

## Prerequisites

- **Node.js** installed (v18+ recommended)
- **PowerShell** (Windows)
- Project folder: `diablex-core`

## Project Components

- **Backend API** → stores readings (SQLite)
- **Bridge (Mock Mode)** → simulates device data
- **Web App** → shows live glucose graph

## 1️⃣ Open Project Root

Open PowerShell and go to the project root:

```powershell
cd "C:\VS Code\diablex-core"
```

## 2️⃣ Install Dependencies (One-time)

Run this once if not already done:

```powershell
npm install
```

```powershell
npm install
```

## 3️⃣ Start Backend API

Open **Terminal 1** and run:

```powershell
npm run server
```

**Expected output:**
> Diablex API running on <http://localhost:5050>

### Test in browser

[http://localhost:5050/api/health](http://localhost:5050/api/health)

## 4️⃣ Start Bridge (Mock Device)

Open **Terminal 2** (keep backend running).

Run:

```powershell
$env:MOCK_MODE="1"
node server\services\bridge.js
```

### Expected repeating output
>
> RAW: ID=DX-SIM-001|TS=...|SEQ=...|GL=...
> POST_OK:

**Bridge Commands** (type in this terminal):

- `MEAL 60`
- `INSULIN 2`
- `EXERCISE 20`
- `SET 180`
- `HELP`

## 5️⃣ Start Web App (Live Graph)

Open **Terminal 3**.

Run:

```powershell
npm run dev
```

### Expected output
>
> Local: <http://localhost:5173/>

Open the URL in browser.

## 6️⃣ View Live Glucose Graph

In the browser:

- You will see a live glucose line graph
- Data updates every ~3 seconds
- Latest reading shown below the chart

### To test behavior

In the Bridge terminal, type:

```bash
MEAL 60
```

Wait 10–20 seconds → **graph rises**

Then type:

```bash
INSULIN 2
```

Graph **starts falling**

## 7️⃣ Correct Run Order (IMPORTANT)

Always run in this order:

1. **Backend**

   ```powershell
   npm run server
   ```

2. **Bridge**

   ```powershell
   $env:MOCK_MODE="1"
   node server\services\bridge.js
   ```

3. **Web App**

   ```powershell
   npm run dev
   ```

## 8️⃣ Stop the Project

To stop everything:

- Press `Ctrl + C` in each terminal

## 9️⃣ Common Fixes

### Graph not updating?

- Check bridge terminal shows `POST_OK`
- Open: `http://localhost:5050/api/readings?deviceId=DX-SIM-001&limit=10`

### Browser shows "Failed to fetch"?

- Backend not running
- Wrong API port

## ✅ Result

You now have:

- Simulated medical device
- Live backend ingestion
- Real-time glucose visualization
- Interactive control (MEAL / INSULIN)
