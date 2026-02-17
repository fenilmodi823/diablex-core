# Wokwi Simulation Guide

This guide explains how to run the Diablex "Virtual Sensor" using the Wokwi online simulator.

## 1. Setup Wokwi
1. Go to [https://wokwi.com/](https://wokwi.com/).
2. Click **"New Project"** and select **"ESP32"**.
3. You will see two files: `sketch.ino` and `diagram.json`.

## 2. Install Firmware
1. Open the file `firmware/diablex_sensor/diablex_sensor.ino` from this repo.
2. Copy the **entire content**.
3. Paste it into the `sketch.ino` tab in Wokwi, replacing the default code.

## 3. Run Simulation
1. Click the green **Play** button.
2. The simulation will start.
3. Open the **Serial Monitor** (at the bottom/right).
4. You should see output like:
   ```
   DEVICE_INIT: OK
   DEVICE_ID: DX-SIM-001
   ID=DX-SIM-001|TS=1767225600|SEQ=0|GL=110.0|BAT=98.5|MODE=FASTING|ST=OK
   ```

## 4. Test Interactions
Type commands into the Serial Input box to trigger biological events:
- `MEAL` -> Simulates eating a snack (Glucose will rise).
- `MEAL 50` -> Simulates a large meal (Big spike).
- `INSULIN` -> Simulates taking insulin (Glucose drops).

## 5. Integrating with Bridge
To send this data to your local backend:
1. **Option A: Wokwi Gateway** (If you have Wokwi Premium).
2. **Option B: Manual Testing**:
   - Run the bridge in Mock Mode: `node server/services/bridge.js` (It will generate similar data).
3. **Option C: Hardware**:
   - Flash this code to a real ESP32.
   - Connect via USB.
   - Run `node server/services/bridge.js` (It will auto-detect the serial port).
