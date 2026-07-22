export const electricity_magnetism = {
  "rc-circuit": {
    "variableBreakdown": [
      { "name": "R", "description": "Resistance in ohms (\u03a9)", "unit": "\u03a9", "context": "Resistance of resistor in RC circuit" },
      { "name": "C", "description": "Capacitance in farads (F)", "unit": "F", "context": "Capacitance of capacitor in RC circuit" }
    ],
    "solvingLogic": [
      "Use time constant \\(\\tau = RC\\) to determine charging/discharging behavior",
      "For charging: \\(V(t) = V_0(1 - e^{-t/\\tau})\\)",
      "For discharging: \\(V(t) = V_0 e^{-t/\\tau}\\)"
    ],
    "edgeCases": [
      "At t=0, capacitor acts as short circuit",
      "As t=\\infty, capacitor acts as open circuit"
    ],
    "walkthroughExample": {
      "problem": "An RC circuit has R=2\\Omega and C=5\\muF. Calculate voltage across capacitor after 1ms when connected to 12V battery.",
      "solution": [
        "Calculate time constant: \\(\\tau = 2\\Omega \\times 5\\times10^{-6}F = 10^{-3}s\\)",
        "Voltage: \\(V(0.001s) = 12V(1 - e^{-1}) = 12V(1 - 0.368) = 7.58V\\)"
      ]
    },
    "commonTraps": [
      "Confusing time constant formula direction",
      "Misapplying exponential decay vs growth"
    ]
  },
  "rlc-impedance": {
    "variableBreakdown": [
      { "name": "R", "description": "Resistance in ohms (\u03a9)", "unit": "\u03a9", "context": "Resistance in RLC series circuit" },
      { "name": "L", "description": "Inductance in henrys (H)", "unit": "H", "context": "Inductance in RLC circuit" },
      { "name": "C", "description": "Capacitance in farads (F)", "unit": "F", "context": "Capacitance in RLC circuit" }
    ],
    "solvingLogic": [
      "Calculate impedance: \\(Z = \\sqrt{R^2 + (X_L - X_C)^2}\\)",
      "Reactance formulas: \\(X_L = 2\\pi fL\\), \\(X_C = \\frac{1}{2\\pi fC}\\)"
    ],
    "edgeCases": [
      "At resonance: \\(X_L = X_C\\)",
      "DC case: \\(X_C = 0\\)"
    ],
    "walkthroughExample": {
      "problem": "Calculate impedance of RLC circuit with R=10\\Omega, L=0.1H, C=100\\muF at 60Hz.",
      "solution": [
        "Calculate reactances: \\(X_L = 2\\pi(60)(0.1) = 37.7\\Omega\\), \\(X_C = \\frac{1}{2\\pi(60)(100\\times10^{-6})} = 26.5\\Omega\\)",
        "Impedance: \\(Z = \\sqrt{10^2 + (37.7 - 26.5)^2} = 19.4\\Omega\\)"
      ]
    },
    "commonTraps": [
      "Mixing up series vs parallel impedance formulas",
      "Forgetting to square terms in impedance calculation"
    ]
  },
  "ohms-law": {
    "variableBreakdown": [
      { "name": "V", "description": "Voltage in volts (V)", "unit": "V", "context": "Potential difference across resistor" },
      { "name": "I", "description": "Current in amperes (A)", "unit": "A", "context": "Current through resistor" },
      { "name": "R", "description": "Resistance in ohms (\u03a9)", "unit": "\u03a9", "context": "Resistance value" }
    ],
    "solvingLogic": [
      "Use \\(V = IR\\) to solve for unknown variable",
      "Power calculation: \\(P = VI = I^2R\\)"
    ],
    "edgeCases": [
      "Zero resistance: Short circuit",
      "Infinite resistance: Open circuit"
    ],
    "walkthroughExample": {
      "problem": "A 12V battery is connected to a 4\\Omega resistor. Calculate current and power dissipation.",
      "solution": [
        "Current: \\(I = \\frac{12V}{4\\Omega} = 3A\\)",
        "Power: \\(P = 12V \\times 3A = 36W\\)"
      ]
    },
    "commonTraps": [
      "Confusing voltage drop with source voltage",
      "Using wrong units for resistance"
    ]
  },
  "coulombs-law": {
    "variableBreakdown": [
      { "name": "q_1", "description": "Charge 1 in coulombs (C)", "unit": "C", "context": "Point charge 1" },
      { "name": "q_2", "description": "Charge 2 in coulombs (C)", "unit": "C", "context": "Point charge 2" },
      { "name": "r", "description": "Distance between charges in meters (m)", "unit": "m", "context": "Separation distance" }
    ],
    "solvingLogic": [
      "Use \\(F = k\\frac{|q_1 q_2|}{r^2}\\)",
      "Direction determined by charge signs"
    ],
    "edgeCases": [
      "Infinite distance: Force approaches zero",
      "Zero charge: No force"
    ],
    "walkthroughExample": {
      "problem": "Calculate force between 2\\muC and 5\\muC charges 0.3m apart.",
      "solution": [
        "\\(F = (8.99\\times10^9)\\frac{(2\\times10^{-6})(5\\times10^{-6})}{(0.3)^2} = 0.999N\\)"
      ]
    },
    "commonTraps": [
      "Forgetting to square distance",
      "Mixing up charge signs in force direction"
    ]
  },
  "capacitor-energy": {
    "variableBreakdown": [
      { "name": "C", "description": "Capacitance in farads (F)", "unit": "F", "context": "Capacitor value" },
      { "name": "V", "description": "Voltage across capacitor in volts (V)", "unit": "V", "context": "Potential difference" }
    ],
    "solvingLogic": [
      "Energy stored: \\(U = \\frac{1}{2}CV^2\\)",
      "Charge relation: \\(Q = CV\\)"
    ],
    "edgeCases": [
      "Zero voltage: No energy stored",
      "Infinite capacitance: Energy approaches infinity"
    ],
    "walkthroughExample": {
      "problem": "Calculate energy stored in 10\\muF capacitor charged to 100V.",
      "solution": [
        "\\(U = \\frac{1}{2}(10\\times10^{-6})(100)^2 = 0.05J\\)"
      ]
    },
    "commonTraps": [
      "Using \\(CV\\) instead of \\(\\frac{1}{2}CV^2\\)",
      "Confusing energy with charge"
    ]
  },
  "biot-savart": {
    "variableBreakdown": [
      { "name": "I", "description": "Current in amperes (A)", "unit": "A", "context": "Current in wire" },
      { "name": "dL", "description": "Differential length element in meters (m)", "unit": "m", "context": "Wire segment length" },
      { "name": "r", "description": "Distance from wire to point in meters (m)", "unit": "m", "context": "Radial distance" }
    ],
    "solvingLogic": [
      "Integrate \\(d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{L} \\times \\hat{r}}{r^2}\\)",
      "Direction via right-hand rule"
    ],
    "edgeCases": [
      "Infinite straight wire: Field \\(B = \\frac{\\mu_0 I}{2\\pi r}\\)",
      "Circular loop: Field at center \\(B = \\frac{\\mu_0 I}{2R}\\)"
    ],
    "walkthroughExample": {
      "problem": "Calculate magnetic field at center of circular loop with I=2A, R=0.5m.",
      "solution": [
        "\\(B = \\frac{(4\\pi\\times10^{-7})(2)}{2(0.5)} = 2.51\\times10^{-6}T\\)"
      ]
    },
    "commonTraps": [
      "Incorrect cross product direction",
      "Misapplying Biot-Savart for non-infinite wires"
    ]
  }
};
