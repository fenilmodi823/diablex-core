import time
import random
import sys

DEVICE_ID = "DX-SIM-001"
SEQ = 0

# internal state
glucose = 100.0       # mg/dL
battery = 99.5        # %
mode = "FASTING"      # FASTING / POSTMEAL / INSULIN / EXERCISE

# simple digestion model variables
meal_effect = 0.0     # current spike “energy”
insulin_effect = 0.0  # current drop “energy”

def iso_ts():
    # UTC timestamp
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

def clamp(v, lo, hi):
    return max(lo, min(hi, v))

def emit_line():
    global SEQ, battery
    SEQ += 1
    battery = clamp(battery - 0.01, 0.0, 100.0)

    print(
        "ID={}|TS={}|SEQ={}|GL={:.1f}|BAT={:.1f}|MODE={}|ST=OK".format(
            DEVICE_ID, iso_ts(), SEQ, glucose, battery, mode
        )
    )

def update_physiology():
    global glucose, meal_effect, insulin_effect, mode

    # decay effects over time (simple but believable)
    meal_effect *= 0.90
    insulin_effect *= 0.88

    # baseline drift + effects
    noise = random.uniform(-1.5, 1.5)
    glucose += (meal_effect * 0.05) - (insulin_effect * 0.06) + noise

    # auto-mode settle
    if meal_effect < 1 and insulin_effect < 1:
        mode = "FASTING"

    glucose = clamp(glucose, 50.0, 300.0)

def handle_cmd(line):
    global meal_effect, insulin_effect, mode, glucose

    line = line.strip()
    if not line:
        return

    parts = line.split()
    cmd = parts[0].upper()

    if cmd == "MEAL":
        grams = float(parts[1]) if len(parts) > 1 else 30.0
        meal_effect += grams
        mode = "POSTMEAL"
        print("ACK: MEAL {}g".format(grams))

    elif cmd == "INSULIN":
        units = float(parts[1]) if len(parts) > 1 else 1.0
        insulin_effect += units * 40.0
        mode = "INSULIN"
        print("ACK: INSULIN {}u".format(units))

    elif cmd == "EXERCISE":
        mins = float(parts[1]) if len(parts) > 1 else 15.0
        insulin_effect += mins * 1.5
        mode = "EXERCISE"
        print("ACK: EXERCISE {}min".format(mins))

    elif cmd == "SET":
        # SET 120  (force glucose for demo)
        if len(parts) > 1:
            glucose = clamp(float(parts[1]), 50.0, 300.0)
            print("ACK: SET GL {:.1f}".format(glucose))

    elif cmd == "HELP":
        print("CMDS: MEAL [grams], INSULIN [units], EXERCISE [mins], SET [gl], HELP")

    else:
        print("ERR: Unknown command. Type HELP")

print("DEVICE_INIT: OK")
print("DEVICE_ID:", DEVICE_ID)
print("Type HELP for commands.")

last_emit = time.time()

while True:
    # periodic update + emission
    if time.time() - last_emit >= 3:
        update_physiology()
        emit_line()
        last_emit = time.time()

    # read serial input (Wokwi sends lines here)
    try:
        if sys.stdin.poll(0):
            cmdline = sys.stdin.readline()
            if cmdline:
                handle_cmd(cmdline)
    except:
        pass

    time.sleep(0.1)
