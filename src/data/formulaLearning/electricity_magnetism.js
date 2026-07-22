export const electricity_magnetism = {
  "rc-circuit": {
  "intuition": "RC Circuit (Charging) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Vt",
      "siUnit": "V",
      "altUnits": "",
      "description": "Voltage at t",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V0",
      "siUnit": "V",
      "altUnits": "",
      "description": "Source Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "C",
      "siUnit": "F",
      "altUnits": "",
      "description": "Capacitance",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "t",
      "siUnit": "s",
      "altUnits": "",
      "description": "Time",
      "commonTraps": "Use consistent time units throughout � convert minutes/hours to seconds."
    }
  ],
  "solvingLogic": [
    "Identify the known variables and the target unknown in the equation.",
    "Write down the formula and algebraically isolate the desired variable.",
    "Convert all inputs to consistent SI units before substituting.",
    "Substitute the known numerical values into the rearranged formula.",
    "Compute the result, check magnitude, and verify units are correct."
  ],
  "edgeCases": [
    {
      "title": "Division by Zero",
      "description": "If a denominator variable equals zero, the formula becomes undefined. Check that no divisor is zero before calculating."
    },
    {
      "title": "Unit Consistency",
      "description": "Mixing different unit systems (e.g., cm with m, or Celsius with Kelvin) produces incorrect results by orders of magnitude."
    },
    {
      "title": "Sign Convention Errors",
      "description": "Directional quantities require consistent sign selection. What is positive for one coordinate may be negative for another."
    },
    {
      "title": "Extreme Values",
      "description": "Very large or tiny inputs can cause floating-point overflow or underflow. Use scientific notation or scale conversions."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown Vt using RC Circuit (Charging) with: Vt = 12, V0 = 12, R = 10.",
    "solution": [
      "Identify known quantities and the target (Vt).",
      "Write the formula and solve for Vt.",
      "Substitute the values: Vt = 12, V0 = 12, R = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Vt = computed result (run Solve mode to see the exact value)"
  }
},

  "rlc-impedance": {
  "intuition": "RLC Series Impedance calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "L",
      "siUnit": "H",
      "altUnits": "",
      "description": "Inductance",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "C",
      "siUnit": "F",
      "altUnits": "",
      "description": "Capacitance",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "f",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Frequency",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "Z",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Impedance",
      "commonTraps": "Verify units and sign conventions before calculating."
    }
  ],
  "solvingLogic": [
    "Identify the known variables and the target unknown in the equation.",
    "Write down the formula and algebraically isolate the desired variable.",
    "Convert all inputs to consistent SI units before substituting.",
    "Substitute the known numerical values into the rearranged formula.",
    "Compute the result, check magnitude, and verify units are correct."
  ],
  "edgeCases": [
    {
      "title": "Division by Zero",
      "description": "If a denominator variable equals zero, the formula becomes undefined. Check that no divisor is zero before calculating."
    },
    {
      "title": "Unit Consistency",
      "description": "Mixing different unit systems (e.g., cm with m, or Celsius with Kelvin) produces incorrect results by orders of magnitude."
    },
    {
      "title": "Sign Convention Errors",
      "description": "Directional quantities require consistent sign selection. What is positive for one coordinate may be negative for another."
    },
    {
      "title": "Extreme Values",
      "description": "Very large or tiny inputs can cause floating-point overflow or underflow. Use scientific notation or scale conversions."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown R using RLC Series Impedance with: R = 10, L = 10, C = 0.001.",
    "solution": [
      "Identify known quantities and the target (R).",
      "Write the formula and solve for R.",
      "Substitute the values: R = 10, L = 10, C = 0.001.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "R = computed result (run Solve mode to see the exact value)"
  }
},

  "ohms-law": {
  "intuition": "Ohm's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "V",
      "siUnit": "V",
      "altUnits": "",
      "description": "Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I",
      "siUnit": "A",
      "altUnits": "",
      "description": "Current",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    }
  ],
  "solvingLogic": [
    "Identify the known variables and the target unknown in the equation.",
    "Write down the formula and algebraically isolate the desired variable.",
    "Convert all inputs to consistent SI units before substituting.",
    "Substitute the known numerical values into the rearranged formula.",
    "Compute the result, check magnitude, and verify units are correct."
  ],
  "edgeCases": [
    {
      "title": "Division by Zero",
      "description": "If a denominator variable equals zero, the formula becomes undefined. Check that no divisor is zero before calculating."
    },
    {
      "title": "Unit Consistency",
      "description": "Mixing different unit systems (e.g., cm with m, or Celsius with Kelvin) produces incorrect results by orders of magnitude."
    },
    {
      "title": "Sign Convention Errors",
      "description": "Directional quantities require consistent sign selection. What is positive for one coordinate may be negative for another."
    },
    {
      "title": "Extreme Values",
      "description": "Very large or tiny inputs can cause floating-point overflow or underflow. Use scientific notation or scale conversions."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown V using Ohm's Law with: V = 12, I = 2, R = 10.",
    "solution": [
      "Identify known quantities and the target (V).",
      "Write the formula and solve for V.",
      "Substitute the values: V = 12, I = 2, R = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "V = computed result (run Solve mode to see the exact value)"
  }
},

  "coulombs-law": {
  "intuition": "Coulomb's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "q1",
      "siUnit": "C",
      "altUnits": "",
      "description": "Charge 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "q2",
      "siUnit": "C",
      "altUnits": "",
      "description": "Charge 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    }
  ],
  "solvingLogic": [
    "Identify the known variables and the target unknown in the equation.",
    "Write down the formula and algebraically isolate the desired variable.",
    "Convert all inputs to consistent SI units before substituting.",
    "Substitute the known numerical values into the rearranged formula.",
    "Compute the result, check magnitude, and verify units are correct."
  ],
  "edgeCases": [
    {
      "title": "Division by Zero",
      "description": "If a denominator variable equals zero, the formula becomes undefined. Check that no divisor is zero before calculating."
    },
    {
      "title": "Unit Consistency",
      "description": "Mixing different unit systems (e.g., cm with m, or Celsius with Kelvin) produces incorrect results by orders of magnitude."
    },
    {
      "title": "Sign Convention Errors",
      "description": "Directional quantities require consistent sign selection. What is positive for one coordinate may be negative for another."
    },
    {
      "title": "Extreme Values",
      "description": "Very large or tiny inputs can cause floating-point overflow or underflow. Use scientific notation or scale conversions."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown F using Coulomb's Law with: F = 50, q1 = 10, q2 = 10.",
    "solution": [
      "Identify known quantities and the target (F).",
      "Write the formula and solve for F.",
      "Substitute the values: F = 50, q1 = 10, q2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "F = computed result (run Solve mode to see the exact value)"
  }
},

  "capacitor-energy": {
  "intuition": "Capacitor Energy & Storage calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "J",
      "altUnits": "",
      "description": "Energy",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "C",
      "siUnit": "F",
      "altUnits": "",
      "description": "Capacitance",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "V",
      "siUnit": "V",
      "altUnits": "",
      "description": "Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Q",
      "siUnit": "C",
      "altUnits": "",
      "description": "Charge",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    }
  ],
  "solvingLogic": [
    "Identify the known variables and the target unknown in the equation.",
    "Write down the formula and algebraically isolate the desired variable.",
    "Convert all inputs to consistent SI units before substituting.",
    "Substitute the known numerical values into the rearranged formula.",
    "Compute the result, check magnitude, and verify units are correct."
  ],
  "edgeCases": [
    {
      "title": "Division by Zero",
      "description": "If a denominator variable equals zero, the formula becomes undefined. Check that no divisor is zero before calculating."
    },
    {
      "title": "Unit Consistency",
      "description": "Mixing different unit systems (e.g., cm with m, or Celsius with Kelvin) produces incorrect results by orders of magnitude."
    },
    {
      "title": "Sign Convention Errors",
      "description": "Directional quantities require consistent sign selection. What is positive for one coordinate may be negative for another."
    },
    {
      "title": "Extreme Values",
      "description": "Very large or tiny inputs can cause floating-point overflow or underflow. Use scientific notation or scale conversions."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown E using Capacitor Energy & Storage with: E = 100, C = 0.001, V = 12.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 100, C = 0.001, V = 12.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "biot-savart": {
  "intuition": "Magnetic Field (Long Wire) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "B",
      "siUnit": "T",
      "altUnits": "",
      "description": "Magnetic Field",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I",
      "siUnit": "A",
      "altUnits": "",
      "description": "Current",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    }
  ],
  "solvingLogic": [
    "Identify the known variables and the target unknown in the equation.",
    "Write down the formula and algebraically isolate the desired variable.",
    "Convert all inputs to consistent SI units before substituting.",
    "Substitute the known numerical values into the rearranged formula.",
    "Compute the result, check magnitude, and verify units are correct."
  ],
  "edgeCases": [
    {
      "title": "Division by Zero",
      "description": "If a denominator variable equals zero, the formula becomes undefined. Check that no divisor is zero before calculating."
    },
    {
      "title": "Unit Consistency",
      "description": "Mixing different unit systems (e.g., cm with m, or Celsius with Kelvin) produces incorrect results by orders of magnitude."
    },
    {
      "title": "Sign Convention Errors",
      "description": "Directional quantities require consistent sign selection. What is positive for one coordinate may be negative for another."
    },
    {
      "title": "Extreme Values",
      "description": "Very large or tiny inputs can cause floating-point overflow or underflow. Use scientific notation or scale conversions."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown B using Magnetic Field (Long Wire) with: B = 10, I = 2, r = 5.",
    "solution": [
      "Identify known quantities and the target (B).",
      "Write the formula and solve for B.",
      "Substitute the values: B = 10, I = 2, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "B = computed result (run Solve mode to see the exact value)"
  }
},

};
