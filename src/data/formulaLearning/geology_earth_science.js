export const geology_earth_science = {
  "richter-scale": {
  "intuition": "Richter Scale (Earthquake Magnitude) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M",
      "siUnit": "",
      "altUnits": "",
      "description": "Magnitude",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "A",
      "siUnit": "mm",
      "altUnits": "",
      "description": "Amplitude",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "A0",
      "siUnit": "mm",
      "altUnits": "",
      "description": "Reference Amplitude",
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
    "problem": "Find the unknown M using Richter Scale (Earthquake Magnitude) with: M = 10, A = 10, A0 = 10.",
    "solution": [
      "Identify known quantities and the target (M).",
      "Write the formula and solve for M.",
      "Substitute the values: M = 10, A = 10, A0 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M = computed result (run Solve mode to see the exact value)"
  }
},

  "darcys-law": {
  "intuition": "Darcy's Law (Groundwater Flow) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Q",
      "siUnit": "m³/s",
      "altUnits": "",
      "description": "Flow Rate",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    },
    {
      "id": "K",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Hydraulic Conductivity",
      "commonTraps": "Equilibrium constant (dimensionless) vs thermal conductivity (W/(m�K))."
    },
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Cross-Sectional Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "dh",
      "siUnit": "m",
      "altUnits": "",
      "description": "Head Difference",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Flow Path Length",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
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
    "problem": "Find the unknown Q using Darcy's Law (Groundwater Flow) with: Q = 10, K = 9.8, A = 10.",
    "solution": [
      "Identify known quantities and the target (Q).",
      "Write the formula and solve for Q.",
      "Substitute the values: Q = 10, K = 9.8, A = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Q = computed result (run Solve mode to see the exact value)"
  }
},

};
