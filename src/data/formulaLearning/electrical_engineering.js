export const electrical_engineering = {
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

  "kirchhoff-current": {
  "intuition": "Kirchhoff's Current Law (KCL) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "I1",
      "siUnit": "A",
      "altUnits": "",
      "description": "Current I₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I2",
      "siUnit": "A",
      "altUnits": "",
      "description": "Current I₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I3",
      "siUnit": "A",
      "altUnits": "",
      "description": "Current I₃",
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
    "problem": "Find the unknown I1 using Kirchhoff's Current Law (KCL) with: I1 = 2, I2 = 2, I3 = 2.",
    "solution": [
      "Identify known quantities and the target (I1).",
      "Write the formula and solve for I1.",
      "Substitute the values: I1 = 2, I2 = 2, I3 = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "I1 = computed result (run Solve mode to see the exact value)"
  }
},

  "power-ac": {
  "intuition": "AC Power (Single Phase) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "W",
      "altUnits": "",
      "description": "Real Power",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "V",
      "siUnit": "V",
      "altUnits": "",
      "description": "RMS Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I",
      "siUnit": "A",
      "altUnits": "",
      "description": "RMS Current",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "cosphi",
      "siUnit": "",
      "altUnits": "",
      "description": "Power Factor",
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
    "problem": "Find the unknown P using AC Power (Single Phase) with: P = 100, V = 12, I = 2.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 100, V = 12, I = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "resonance-rlc": {
  "intuition": "RLC Resonance Frequency calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "f",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Resonance Frequency",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
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
    "problem": "Find the unknown f using RLC Resonance Frequency with: f = 50, L = 10, C = 0.001.",
    "solution": [
      "Identify known quantities and the target (f).",
      "Write the formula and solve for f.",
      "Substitute the values: f = 50, L = 10, C = 0.001.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "f = computed result (run Solve mode to see the exact value)"
  }
},

};
