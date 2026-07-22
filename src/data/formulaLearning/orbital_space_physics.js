export const orbital_space_physics = {
  "escape-velocity": {
  "intuition": "Escape Velocity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ve",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Escape Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Planet Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Radius",
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
    "problem": "Find the unknown ve using Escape Velocity with: ve = 9.8, M = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (ve).",
      "Write the formula and solve for ve.",
      "Substitute the values: ve = 9.8, M = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ve = computed result (run Solve mode to see the exact value)"
  }
},

  "orbital-period": {
  "intuition": "Orbital Period calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Orbital Period",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Orbital Radius",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Central Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
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
    "problem": "Find the unknown T using Orbital Period with: T = 2, r = 5, M = 10.",
    "solution": [
      "Identify known quantities and the target (T).",
      "Write the formula and solve for T.",
      "Substitute the values: T = 2, r = 5, M = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "T = computed result (run Solve mode to see the exact value)"
  }
},

  "schwarzschild-radius": {
  "intuition": "Schwarzschild Radius calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "rs",
      "siUnit": "m",
      "altUnits": "",
      "description": "Schwarzschild Radius",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Black Hole Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
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
    "problem": "Find the unknown rs using Schwarzschild Radius with: rs = 5, M = 10.",
    "solution": [
      "Identify known quantities and the target (rs).",
      "Write the formula and solve for rs.",
      "Substitute the values: rs = 5, M = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "rs = computed result (run Solve mode to see the exact value)"
  }
},

  "hubble-law": {
  "intuition": "Hubble's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "km/s",
      "altUnits": "",
      "description": "Recession Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "H0",
      "siUnit": "km/(s·Mpc)",
      "altUnits": "",
      "description": "Hubble Constant",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "d",
      "siUnit": "Mpc",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
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
    "problem": "Find the unknown v using Hubble's Law with: v = 10, H0 = 10, d = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 10, H0 = 10, d = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "kepler-third": {
  "intuition": "Kepler's Third Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Period",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "a",
      "siUnit": "m",
      "altUnits": "",
      "description": "Semi-major Axis",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Central Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
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
    "problem": "Find the unknown T using Kepler's Third Law with: T = 2, a = 5, M = 10.",
    "solution": [
      "Identify known quantities and the target (T).",
      "Write the formula and solve for T.",
      "Substitute the values: T = 2, a = 5, M = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "T = computed result (run Solve mode to see the exact value)"
  }
},

  "orbital-velocity": {
  "intuition": "Orbital Velocity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Orbital Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Central Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Orbital Radius",
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
    "problem": "Find the unknown v using Orbital Velocity with: v = 9.8, M = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, M = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "gravitational-pe": {
  "intuition": "Gravitational Potential Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "U",
      "siUnit": "J",
      "altUnits": "",
      "description": "Gravitational PE",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass 1",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass 2",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Distance between centers",
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
    "problem": "Find the unknown U using Gravitational Potential Energy with: U = 100, M = 10, m = 10.",
    "solution": [
      "Identify known quantities and the target (U).",
      "Write the formula and solve for U.",
      "Substitute the values: U = 100, M = 10, m = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "U = computed result (run Solve mode to see the exact value)"
  }
},

  "vis-viva": {
  "intuition": "Vis-Viva Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity at distance r",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Central Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Current Distance",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "a",
      "siUnit": "m",
      "altUnits": "",
      "description": "Semi-major Axis",
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
    "problem": "Find the unknown v using Vis-Viva Equation with: v = 9.8, M = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, M = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "roche-limit": {
  "intuition": "Roche Limit calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "d",
      "siUnit": "m",
      "altUnits": "",
      "description": "Roche Limit",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
    },
    {
      "id": "R",
      "siUnit": "m",
      "altUnits": "",
      "description": "Primary Body Radius",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "rhoM",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Primary Density",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "rhom",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Satellite Density",
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
    "problem": "Find the unknown d using Roche Limit with: d = 5, R = 5, rhoM = 10.",
    "solution": [
      "Identify known quantities and the target (d).",
      "Write the formula and solve for d.",
      "Substitute the values: d = 5, R = 5, rhoM = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "d = computed result (run Solve mode to see the exact value)"
  }
},

  "tidal-force": {
  "intuition": "Tidal Force calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dF",
      "siUnit": "N",
      "altUnits": "",
      "description": "Tidal Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Primary Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Satellite Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "R",
      "siUnit": "m",
      "altUnits": "",
      "description": "Satellite Radius",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
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
    "problem": "Find the unknown dF using Tidal Force with: dF = 50, M = 10, m = 10.",
    "solution": [
      "Identify known quantities and the target (dF).",
      "Write the formula and solve for dF.",
      "Substitute the values: dF = 50, M = 10, m = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dF = computed result (run Solve mode to see the exact value)"
  }
},

};
