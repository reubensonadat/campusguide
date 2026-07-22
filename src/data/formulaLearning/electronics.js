export const electronics = {
  "voltage-divider": {
  "intuition": "Voltage Divider calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Vin",
      "siUnit": "V",
      "altUnits": "",
      "description": "Input Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R1",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistor R₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R2",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistor R₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vout",
      "siUnit": "V",
      "altUnits": "",
      "description": "Output Voltage",
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
    "problem": "Find the unknown Vin using Voltage Divider with: Vin = 12, R1 = 10, R2 = 10.",
    "solution": [
      "Identify known quantities and the target (Vin).",
      "Write the formula and solve for Vin.",
      "Substitute the values: Vin = 12, R1 = 10, R2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Vin = computed result (run Solve mode to see the exact value)"
  }
},

  "parallel-resistance": {
  "intuition": "Parallel Resistance calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Rt",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Total Resistance",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R1",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistor 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R2",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistor 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R3",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistor 3",
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
    "problem": "Find the unknown Rt using Parallel Resistance with: Rt = 10, R1 = 10, R2 = 10.",
    "solution": [
      "Identify known quantities and the target (Rt).",
      "Write the formula and solve for Rt.",
      "Substitute the values: Rt = 10, R1 = 10, R2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Rt = computed result (run Solve mode to see the exact value)"
  }
},

  "rl-discharge": {
  "intuition": "RL Circuit (Inductor) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "It",
      "siUnit": "A",
      "altUnits": "",
      "description": "Current at t",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I0",
      "siUnit": "A",
      "altUnits": "",
      "description": "Initial Current",
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
      "id": "L",
      "siUnit": "H",
      "altUnits": "",
      "description": "Inductance",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
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
    "problem": "Find the unknown It using RL Circuit (Inductor) with: It = 2, I0 = 2, R = 10.",
    "solution": [
      "Identify known quantities and the target (It).",
      "Write the formula and solve for It.",
      "Substitute the values: It = 2, I0 = 2, R = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "It = computed result (run Solve mode to see the exact value)"
  }
},

  "transformer": {
  "intuition": "Transformer Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Vs",
      "siUnit": "V",
      "altUnits": "",
      "description": "Secondary Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vp",
      "siUnit": "V",
      "altUnits": "",
      "description": "Primary Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Ns",
      "siUnit": "",
      "altUnits": "",
      "description": "Secondary Turns",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Np",
      "siUnit": "",
      "altUnits": "",
      "description": "Primary Turns",
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
    "problem": "Find the unknown Vs using Transformer Equation with: Vs = 12, Vp = 12, Ns = 10.",
    "solution": [
      "Identify known quantities and the target (Vs).",
      "Write the formula and solve for Vs.",
      "Substitute the values: Vs = 12, Vp = 12, Ns = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Vs = computed result (run Solve mode to see the exact value)"
  }
},

};
