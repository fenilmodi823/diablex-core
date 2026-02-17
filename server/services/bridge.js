// Diablex Bridge Service (Mock Mode)
// PowerShell run:
//   $env:MOCK_MODE="1"; node server\services\bridge.js
// Optional:
//   $env:API_URL="http://localhost:5050"; $env:MOCK_MODE="1"; node server\services\bridge.js

const API_URL = process.env.API_URL || 'http://localhost:5050/api';
const MOCK_MODE = (process.env.MOCK_MODE || "0") === "1";

const deviceId = process.env.DEVICE_ID || "DX-SIM-001";
const fw = process.env.FW || "0.2.0";

let seq = 0;
let glucose = 100.0;
let battery = 99.5;
let mode = "FASTING";

let mealE = 0;
let insulinE = 0;
let exerciseE = 0;

function isoUtc() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function status() {
  return battery < 5 ? "LOW_BAT" : "OK";
}

function simulateStep() {
  mealE *= 0.90;
  insulinE *= 0.88;
  exerciseE *= 0.92;

  const baseline = (100 - glucose) * 0.002;
  const mealPush = mealE * 0.02;
  const insulinPull = insulinE * 0.03;
  const exercisePull = exerciseE * 0.01;
  const noise = (Math.random() * 3.6) - 1.8;

  glucose = glucose + mealPush - insulinPull - exercisePull + baseline + noise;
  glucose = clamp(glucose, 50, 300);

  battery = clamp(battery - 0.01, 0, 100);

  if (mealE < 1 && insulinE < 1 && exerciseE < 1 && mode !== "MANUAL") {
    mode = "FASTING";
  }
}

function makeProtocolLine() {
  seq += 1;
  const ts = isoUtc();
  return `ID=${deviceId}|TS=${ts}|SEQ=${seq}|GL=${glucose.toFixed(1)}|BAT=${battery.toFixed(
    1
  )}|MODE=${mode}|ST=${status()}|FW=${fw}`;
}

function parseProtocolLine(line) {
  const parts = line.trim().split("|");
  const obj = {};
  for (const p of parts) {
    const [k, ...rest] = p.split("=");
    obj[k] = rest.join("=");
  }
  return {
    deviceId: obj.ID,
    ts: obj.TS,
    seq: Number(obj.SEQ),
    glucose: Number(obj.GL),
    battery: obj.BAT !== undefined ? Number(obj.BAT) : null,
    mode: obj.MODE || null,
    status: obj.ST || null,
    fw: obj.FW || null,
  };
}

async function postReading(payload) {
  const base = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const url = base.endsWith("/api") ? `${base}/readings` : `${base}/api/readings`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST failed ${res.status}: ${text}`);
  }
  return res.json();
}

// Allow interactive commands typed into the bridge terminal
function handleCommand(cmdLine) {
  const parts = cmdLine.trim().split(/\s+/);
  const cmd = (parts[0] || "").toUpperCase();
  const arg = parts[1] ? Number(parts[1]) : undefined;

  if (cmd === "MEAL") {
    const grams = Number.isFinite(arg) ? arg : 30;
    mealE += grams;
    mode = "POSTMEAL";
    console.log(`ACK: MEAL ${grams}g`);
  } else if (cmd === "INSULIN") {
    const units = Number.isFinite(arg) ? arg : 1;
    insulinE += units * 40;
    mode = "INSULIN";
    console.log(`ACK: INSULIN ${units}u`);
  } else if (cmd === "EXERCISE") {
    const mins = Number.isFinite(arg) ? arg : 15;
    exerciseE += mins * 3;
    mode = "EXERCISE";
    console.log(`ACK: EXERCISE ${mins}min`);
  } else if (cmd === "SET") {
    if (Number.isFinite(arg)) {
      glucose = clamp(arg, 50, 300);
      mode = "MANUAL";
      console.log(`ACK: SET GL ${glucose.toFixed(1)}`);
    }
  } else if (cmd === "HELP") {
    console.log("CMDS: MEAL [grams], INSULIN [units], EXERCISE [mins], SET [gl], HELP");
  }
}

// Read terminal input for commands (PowerShell)
if (process.stdin.isTTY) {
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (d) => handleCommand(d));
}

async function run() {
  console.log("BRIDGE_START", { API_URL, MOCK_MODE, deviceId });

  if (!MOCK_MODE) {
    console.log("Set MOCK_MODE=1 for now (serial COM mode later).");
    process.exit(1);
  }

  setInterval(async () => {
    try {
      simulateStep();
      const line = makeProtocolLine();
      const json = parseProtocolLine(line);

      console.log("RAW:", line);

      const r = await postReading(json);
      console.log("POST_OK:", r.insertedId);
    } catch (err) {
      console.error("POST_ERR:", err.message);
    }
  }, 3000);
}

run();
