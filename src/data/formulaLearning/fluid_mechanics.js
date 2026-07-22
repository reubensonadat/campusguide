export const fluid_mechanics = {
  "bernoulli": {
  "intuition": "Bernoulli's Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P1",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Pressure 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v1",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "h1",
      "siUnit": "m",
      "altUnits": "",
      "description": "Height 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P2",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Pressure 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v2",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "h2",
      "siUnit": "m",
      "altUnits": "",
      "description": "Height 2",
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
    "problem": "Find the unknown P1 using Bernoulli's Equation with: P1 = 101325, v1 = 9.8, h1 = 5.",
    "solution": [
      "Identify known quantities and the target (P1).",
      "Write the formula and solve for P1.",
      "Substitute the values: P1 = 101325, v1 = 9.8, h1 = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P1 = computed result (run Solve mode to see the exact value)"
  }
},

  "archimedes": {
  "intuition": "Buoyancy (Archimedes) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Fb",
      "siUnit": "N",
      "altUnits": "",
      "description": "Buoyant Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "rho",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Fluid Density",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume Displaced",
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
    "problem": "Find the unknown Fb using Buoyancy (Archimedes) with: Fb = 50, rho = 10, V = 10.",
    "solution": [
      "Identify known quantities and the target (Fb).",
      "Write the formula and solve for Fb.",
      "Substitute the values: Fb = 50, rho = 10, V = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Fb = computed result (run Solve mode to see the exact value)"
  }
},

  "continuity": {
  "intuition": "Continuity Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A1",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v1",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A2",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v2",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity 2",
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
    "problem": "Find the unknown A1 using Continuity Equation with: A1 = 10, v1 = 9.8, A2 = 10.",
    "solution": [
      "Identify known quantities and the target (A1).",
      "Write the formula and solve for A1.",
      "Substitute the values: A1 = 10, v1 = 9.8, A2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A1 = computed result (run Solve mode to see the exact value)"
  }
},

  "poiseuille": {
  "intuition": "Poiseuille's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Q",
      "siUnit": "m³/s",
      "altUnits": "",
      "description": "Flow Rate",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Radius",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "dP",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Pressure Diff",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "eta",
      "siUnit": "Pa·s",
      "altUnits": "",
      "description": "Viscosity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Length",
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
    "problem": "Find the unknown Q using Poiseuille's Law with: Q = 10, r = 5, dP = 101325.",
    "solution": [
      "Identify known quantities and the target (Q).",
      "Write the formula and solve for Q.",
      "Substitute the values: Q = 10, r = 5, dP = 101325.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Q = computed result (run Solve mode to see the exact value)"
  }
},

};
