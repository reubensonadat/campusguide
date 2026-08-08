export const electronics = {
  "voltage-divider": {
    "intuition": "A Voltage Divider is how a volume knob works on a stereo. If you string two resistors in a row, the 9V battery's voltage drops twice across them. By tapping a wire directly between the two resistors, you can effortlessly steal a perfect, smaller chunk of that voltage (like exactly 3.3V to run a microchip).",
    "variableBreakdown": [
      {
        "id": "Vin",
        "siUnit": "V",
        "altUnits": "",
        "description": "Input Voltage (Vin)",
        "commonTraps": "The total voltage coming from the battery."
      },
      {
        "id": "R1",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Top Resistor (R1)",
        "commonTraps": ""
      },
      {
        "id": "R2",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Bottom Resistor (R2)",
        "commonTraps": "The resistor you are measuring across."
      },
      {
        "id": "Vout",
        "siUnit": "V",
        "altUnits": "",
        "description": "Output Voltage (Vout)",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Add R1 and R2 together.",
      "2. Divide R2 by the total (R2 / (R1+R2)).",
      "3. Multiply that fraction by the input voltage (Vin)."
    ],
    "edgeCases": [
      {
        "title": "Loading Effect",
        "description": "This beautiful, simple math completely falls apart if you plug a heavy motor into the 'Vout' wire. The motor acts like a 3rd resistor in parallel, destroying the perfect ratio and dropping the voltage drastically."
      }
    ],
    "walkthroughExample": {
      "problem": "Vin is 10V. R1 is 40Ω. R2 is 60Ω. Find Vout.",
      "solution": [
        "Total R = 40 + 60 = 100.",
        "Ratio = 60 / 100 = 0.6.",
        "Vout = 10 × 0.6 = 6."
      ],
      "answer": "Vout = 6V"
    }
  },

  "parallel-resistance": {
    "intuition": "If you open 3 lanes at a toll booth instead of 1, traffic flows faster, even if the new lanes are slow. In electronics, adding MORE resistors in parallel actually DECREASES the total resistance, because you are giving the electrons extra physical paths to flow down.",
    "variableBreakdown": [
      {
        "id": "Rt",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Total Resistance (Rt)",
        "commonTraps": "Will ALWAYS be strictly smaller than the smallest single resistor."
      },
      {
        "id": "R1",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistor 1",
        "commonTraps": ""
      },
      {
        "id": "R2",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistor 2",
        "commonTraps": ""
      },
      {
        "id": "R3",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistor 3 (Optional)",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. For exactly two resistors, use the shortcut: (R1 × R2) / (R1 + R2).",
      "2. For three or more, take the inverse of each (1/R1 + 1/R2 + 1/R3).",
      "3. Take the inverse (1/X) of that grand total."
    ],
    "edgeCases": [
      {
        "title": "Identical Resistors",
        "description": "If you put five 100Ω resistors in parallel, you don't even need the formula. You just take the value (100) and divide by the number of resistors (5). The total resistance is instantly 20Ω."
      }
    ],
    "walkthroughExample": {
      "problem": "A 60Ω and a 40Ω resistor are in parallel. Find total resistance.",
      "solution": [
        "Multiply: 60 × 40 = 2400.",
        "Add: 60 + 40 = 100.",
        "Divide: 2400 / 100 = 24."
      ],
      "answer": "Rt = 24Ω (Smaller than both 60 and 40!)"
    }
  },

  "rl-discharge": {
    "intuition": "Inductors (coils of wire) hate change. If you suddenly pull the plug on a massive electric motor, the inductor will literally fight back, violently dumping its stored magnetic energy back into the wires to keep the current flowing. This formula models that slow decay.",
    "variableBreakdown": [
      {
        "id": "It",
        "siUnit": "A",
        "altUnits": "",
        "description": "Current at time t",
        "commonTraps": ""
      },
      {
        "id": "I0",
        "siUnit": "A",
        "altUnits": "",
        "description": "Initial Current",
        "commonTraps": "The current right before you pulled the plug."
      },
      {
        "id": "R",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistance",
        "commonTraps": ""
      },
      {
        "id": "L",
        "siUnit": "H",
        "altUnits": "",
        "description": "Inductance",
        "commonTraps": ""
      },
      {
        "id": "t",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time Elapsed",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Calculate the Time Constant: τ = L/R.",
      "2. The current decays exponentially: It = I₀ * e^(-t / τ)."
    ],
    "edgeCases": [
      {
        "title": "Inductive Spike (Flyback)",
        "description": "If you pull a plug, Resistance (R) approaches infinity (because air doesn't conduct). The math V = L(di/dt) says the voltage will spike to 10,000 Volts instantly to force the current to keep flowing. This literally rips electrons through the air, creating a massive blue spark at the wall outlet."
      }
    ],
    "walkthroughExample": {
      "problem": "Initial current is 10A. L is 2H. R is 1Ω. Find current after 2 seconds.",
      "solution": [
        "Time Constant (L/R) = 2/1 = 2s.",
        "Time / τ = 2 / 2 = 1.",
        "e^(-1) ≈ 0.368.",
        "10 × 0.368 = 3.68."
      ],
      "answer": "It = 3.68 Amps"
    }
  },

  "transformer": {
    "intuition": "Transformers let us shift electricity like gears on a bicycle. If you wrap 100 loops of wire around a magnetic iron ring on the left, and 1000 loops on the right, you magically multiply the voltage by 10x! The phone charger block in your wall uses this exact math to step 120V down to a safe 5V.",
    "variableBreakdown": [
      {
        "id": "Vs",
        "siUnit": "V",
        "altUnits": "",
        "description": "Secondary Voltage (Vs)",
        "commonTraps": "The voltage coming OUT of the transformer."
      },
      {
        "id": "Vp",
        "siUnit": "V",
        "altUnits": "",
        "description": "Primary Voltage (Vp)",
        "commonTraps": "The voltage going IN."
      },
      {
        "id": "Ns",
        "siUnit": "",
        "altUnits": "",
        "description": "Secondary Turns",
        "commonTraps": "Number of loops on the exit side."
      },
      {
        "id": "Np",
        "siUnit": "",
        "altUnits": "",
        "description": "Primary Turns",
        "commonTraps": "Number of loops on the entrance side."
      }
    ],
    "solvingLogic": [
      "1. Divide Secondary turns by Primary turns to find the 'Turns Ratio' (Ns / Np).",
      "2. Multiply the Input Voltage (Vp) by the turns ratio to get the Output Voltage (Vs)."
    ],
    "edgeCases": [
      {
        "title": "Conservation of Energy",
        "description": "If you step the Voltage up by 10x, you don't get free energy! The universe perfectly balances the books by slashing the Current (Amps) by exactly 10x. Power (V × I) remains perfectly constant."
      }
    ],
    "walkthroughExample": {
      "problem": "A transformer takes in 120V on a 100-loop primary coil. The secondary coil has 50 loops. Find Output Voltage.",
      "solution": [
        "Ratio = 50 / 100 = 0.5.",
        "Vs = 120 × 0.5 = 60."
      ],
      "answer": "Vs = 60V (A Step-Down Transformer)"
    }
  }
};
