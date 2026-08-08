export const electrical_engineering = {
  "ohms-law": {
    "intuition": "Ohm's Law is the absolute foundation of electricity. Voltage (V) is the 'water pressure' pushing through a pipe. Current (I) is the actual flow of water. Resistance (R) is a rock stuck in the pipe choking the flow.",
    "variableBreakdown": [
      { "id": "V", "siUnit": "V", "altUnits": "", "description": "Voltage", "commonTraps": "Electrical pressure." },
      { "id": "I", "siUnit": "A", "altUnits": "", "description": "Current", "commonTraps": "Electrical flow (Amps)." },
      { "id": "R", "siUnit": "Ω", "altUnits": "", "description": "Resistance", "commonTraps": "The choke point." }
    ],
    "solvingLogic": [ "1. Multiply Current (I) by Resistance (R) to get Voltage (V)." ],
    "edgeCases": [ { "title": "Short Circuit", "description": "If you connect a wire directly to both ends of a battery with no lightbulb (R = 0), the math says Current (I) will equal V / 0 (Infinity!). The battery dumps infinite power instantly, melting the wire." } ],
    "walkthroughExample": {
      "problem": "A 9V battery is connected to a 3Ω resistor. Find the current.",
      "solution": [ "V = I × R", "9 = I × 3", "I = 9 / 3 = 3." ],
      "answer": "I = 3 Amps"
    }
  },

  "kirchhoff-current": {
    "intuition": "Kirchhoff's Current Law (KCL) is just common sense: whatever water flows into a plumbing junction MUST flow back out. Electrons cannot mysteriously vanish into thin air, and they cannot be created out of nothing.",
    "variableBreakdown": [
      { "id": "I1", "siUnit": "A", "altUnits": "", "description": "Current 1", "commonTraps": "Entering the node." },
      { "id": "I2", "siUnit": "A", "altUnits": "", "description": "Current 2", "commonTraps": "Entering the node." },
      { "id": "I3", "siUnit": "A", "altUnits": "", "description": "Current 3", "commonTraps": "Leaving the node." }
    ],
    "solvingLogic": [ "1. Sum of currents IN = Sum of currents OUT." ],
    "edgeCases": [ { "title": "Negative Current", "description": "If you guess the math wrong and your answer comes out as -5 Amps, it just means you drew the arrow pointing the wrong way on your paper. The math perfectly corrects your mistake." } ],
    "walkthroughExample": {
      "problem": "2 Amps and 3 Amps flow INTO a junction. Only one wire flows out. What is its current?",
      "solution": [ "In = Out", "2 + 3 = Out", "Out = 5." ],
      "answer": "5 Amps"
    }
  },

  "power-ac": {
    "intuition": "In AC power (the wall outlet in your house), the voltage and current are constantly wiggling back and forth like waves. Sometimes the waves get 'out of sync'. If they are perfectly out of sync, power sloshes back and forth in the wire but does absolutely zero real work to spin your blender.",
    "variableBreakdown": [
      { "id": "P", "siUnit": "W", "altUnits": "", "description": "Real Power", "commonTraps": "The actual work done by the blender." },
      { "id": "V", "siUnit": "V", "altUnits": "", "description": "RMS Voltage", "commonTraps": "" },
      { "id": "I", "siUnit": "A", "altUnits": "", "description": "RMS Current", "commonTraps": "" },
      { "id": "cosphi", "siUnit": "", "altUnits": "", "description": "Power Factor (cos φ)", "commonTraps": "A percentage from 0 to 1 measuring how 'in-sync' the waves are." }
    ],
    "solvingLogic": [ "1. Multiply V × I × Power Factor." ],
    "edgeCases": [ { "title": "The Power Company Penalty", "description": "If a factory runs giant motors, their Power Factor drops to 0.7 (bad sync). The power company still has to push 100% of the current through the grid (heating up wires), but the factory's meter only registers 70% real power. Power companies will fine factories millions of dollars if they don't fix their Power Factor." } ],
    "walkthroughExample": {
      "problem": "A motor draws 10A at 120V, but the Power Factor is 0.8. Find the real power.",
      "solution": [ "P = 120 × 10 × 0.8", "P = 1200 × 0.8 = 960." ],
      "answer": "P = 960 Watts"
    }
  },

  "resonance-rlc": {
    "intuition": "If you put an Inductor (a coil) and a Capacitor (two metal plates) together, they bounce energy back and forth like a pendulum. The 'Resonant Frequency' is the exact pitch where this pendulum swings effortlessly. This is precisely how you tune a radio to pick up 98.7 FM out of thin air.",
    "variableBreakdown": [
      { "id": "f", "siUnit": "Hz", "altUnits": "", "description": "Resonant Frequency", "commonTraps": "" },
      { "id": "L", "siUnit": "H", "altUnits": "", "description": "Inductance", "commonTraps": "Must be in Henrys (not milliHenrys)." },
      { "id": "C", "siUnit": "F", "altUnits": "", "description": "Capacitance", "commonTraps": "Must be in Farads (not microFarads)." }
    ],
    "solvingLogic": [ "1. Multiply L × C.", "2. Take the square root.", "3. Multiply by 2π.", "4. Do 1 divided by the result." ],
    "edgeCases": [ { "title": "Infinite Impedance", "description": "At this perfect frequency, a Parallel RLC circuit acts like an impenetrable brick wall. It blocks exactly that frequency from passing through, allowing you to perfectly filter out static noise from an audio signal." } ],
    "walkthroughExample": {
      "problem": "L = 0.1 H, C = 0.001 F. Find the resonant frequency. (Use π = 3.14)",
      "solution": [ "L×C = 0.0001.", "√0.0001 = 0.01.", "2π × 0.01 = 0.0628.", "1 / 0.0628 ≈ 15.9." ],
      "answer": "f ≈ 15.9 Hz"
    }
  },

  "ohms_law_power": {
    "intuition": "A shortcut formula. If you know how hard electricity is pushing (Voltage) and how fast it is flowing (Current), you can instantly calculate exactly how much heat a wire is going to generate (Power).",
    "variableBreakdown": [
      { "id": "P", "siUnit": "W", "altUnits": "", "description": "Power (P)" },
      { "id": "V", "siUnit": "V", "altUnits": "", "description": "Voltage" },
      { "id": "I", "siUnit": "A", "altUnits": "", "description": "Current" },
      { "id": "R", "siUnit": "Ω", "altUnits": "", "description": "Resistance" }
    ],
    "solvingLogic": [ "1. Multiply Voltage by Current (P = VI).", "2. Alternatively, P = I²R or P = V²/R." ],
    "edgeCases": [ { "title": "High Voltage Power Lines", "description": "Because P = I²R, if you transmit electricity across a country using high Current (I), the power lost to heat squares exponentially and the wires melt. This is why power lines run at insanely high Voltages (500,000V) so the Current (I) can be tiny, completely eliminating the heat loss." } ],
    "walkthroughExample": {
      "problem": "A 120V outlet supplies 10A to a heater. What is the power?",
      "solution": [ "P = 120 × 10 = 1200." ],
      "answer": "1200 Watts (1.2 kW)"
    }
  },
  "kvl": {
    "intuition": "Kirchhoff's Voltage Law. What goes up must come down. If a 9V battery pushes you up 9 steps, by the time you walk through the circuit and get back to the battery, you must have dropped exactly 9 steps across the resistors.",
    "variableBreakdown": [
      { "id": "Vs", "siUnit": "V", "altUnits": "", "description": "Source Voltage" },
      { "id": "Vd", "siUnit": "V", "altUnits": "", "description": "Voltage Drop" }
    ],
    "solvingLogic": [ "1. Add up all the voltage drops around the loop. They must perfectly equal the battery voltage." ],
    "edgeCases": [],
    "walkthroughExample": { "problem": "A 12V battery powers two resistors. The first drops 5V. What does the second drop?", "solution": ["12 = 5 + V2", "V2 = 12 - 5"], "answer": "7V" }
  },
  "kcl": {
    "intuition": "Duplicate of the current law.",
    "variableBreakdown": [ { "id": "Iin", "siUnit": "A" }, { "id": "Iout", "siUnit": "A" } ],
    "solvingLogic": ["Sum of In = Sum of Out"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "5A in, 2A out wire 1. Wire 2?", "solution": ["5 - 2 = 3"], "answer": "3A" }
  },
  "rc_time_constant": {
    "intuition": "How long it takes a capacitor to fill up like a bucket.",
    "variableBreakdown": [
      { "id": "tau", "siUnit": "s", "description": "Time Constant" },
      { "id": "R", "siUnit": "Ω", "description": "Resistance" },
      { "id": "C", "siUnit": "F", "description": "Capacitance" }
    ],
    "solvingLogic": ["Multiply R times C."],
    "edgeCases": [],
    "walkthroughExample": { "problem": "R=100, C=0.01. Find tau.", "solution": ["100 * 0.01"], "answer": "1 sec" }
  },
  "rl_time_constant": {
    "intuition": "How long it takes an inductor to resist a change in flow.",
    "variableBreakdown": [
      { "id": "tau", "siUnit": "s" },
      { "id": "L", "siUnit": "H" },
      { "id": "R", "siUnit": "Ω" }
    ],
    "solvingLogic": ["Divide L by R."],
    "edgeCases": [],
    "walkthroughExample": { "problem": "L=10, R=5", "solution": ["10 / 5"], "answer": "2 sec" }
  },
  "impedance_series_rcl": {
    "intuition": "Total resistance for AC circuits.",
    "variableBreakdown": [
      { "id": "Z", "siUnit": "Ω" },
      { "id": "R", "siUnit": "Ω" },
      { "id": "XL", "siUnit": "Ω" },
      { "id": "XC", "siUnit": "Ω" }
    ],
    "solvingLogic": ["Z = sqrt(R^2 + (XL - XC)^2)"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "R=3, XL=4, XC=0", "solution": ["sqrt(9 + 16) = sqrt(25)"], "answer": "5 Ω" }
  },
  "transformer_ratio": {
    "intuition": "Transformers change voltage based on wire loops.",
    "variableBreakdown": [
      { "id": "Vp", "siUnit": "V" },
      { "id": "Vs", "siUnit": "V" },
      { "id": "Np", "siUnit": "" },
      { "id": "Ns", "siUnit": "" }
    ],
    "solvingLogic": ["Vp/Vs = Np/Ns"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "Vp=100, Np=10, Ns=20", "solution": ["100/Vs = 10/20", "Vs = 200"], "answer": "200V" }
  },
  "three_phase_power": {
    "intuition": "Industrial power calculation.",
    "variableBreakdown": [
      { "id": "P", "siUnit": "W" },
      { "id": "VL", "siUnit": "V" },
      { "id": "IL", "siUnit": "A" },
      { "id": "pf", "siUnit": "" }
    ],
    "solvingLogic": ["P = sqrt(3) * VL * IL * pf"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "VL=400, IL=10, pf=1", "solution": ["1.732 * 400 * 10"], "answer": "6928 W" }
  },
  "motor_slip": {
    "intuition": "Motors never spin quite as fast as the magnetic field.",
    "variableBreakdown": [
      { "id": "s", "siUnit": "%" },
      { "id": "Ns", "siUnit": "RPM" },
      { "id": "Nr", "siUnit": "RPM" }
    ],
    "solvingLogic": ["s = (Ns - Nr)/Ns"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "Ns=1000, Nr=900", "solution": ["100/1000 = 0.1"], "answer": "10%" }
  },
  "wheatstone_bridge": {
    "intuition": "Used to find unknown resistance perfectly.",
    "variableBreakdown": [
      { "id": "R1", "siUnit": "Ω" },
      { "id": "R2", "siUnit": "Ω" },
      { "id": "R3", "siUnit": "Ω" },
      { "id": "R4", "siUnit": "Ω" }
    ],
    "solvingLogic": ["R1/R2 = R3/R4"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "R1=10, R2=20, R3=30. Find R4.", "solution": ["10/20 = 30/R4", "R4 = 60"], "answer": "60 Ω" }
  }
};
