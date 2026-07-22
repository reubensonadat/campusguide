export const aerospace_advanced_fluid_dynamics = {
  "mach": {
  "intuition": "Mach Number calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M",
      "siUnit": "",
      "altUnits": "",
      "description": "Mach Number",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "c",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Speed of Sound",
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
    "problem": "Find the unknown M using Mach Number with: M = 10, v = 9.8, c = 9.8.",
    "solution": [
      "Identify known quantities and the target (M).",
      "Write the formula and solve for M.",
      "Substitute the values: M = 10, v = 9.8, c = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M = computed result (run Solve mode to see the exact value)"
  }
},

  "dyn-pressure": {
  "intuition": "Dynamic Pressure calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "q",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Dynamic Pressure",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "rho",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Density",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
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
    "problem": "Find the unknown q using Dynamic Pressure with: q = 101325, rho = 10, v = 9.8.",
    "solution": [
      "Identify known quantities and the target (q).",
      "Write the formula and solve for q.",
      "Substitute the values: q = 101325, rho = 10, v = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "q = computed result (run Solve mode to see the exact value)"
  }
},

  "lift-eq": {
  "intuition": "Lift Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "L",
      "siUnit": "N",
      "altUnits": "",
      "description": "Lift Force",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "rho",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Density",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "S",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Wing Area",
      "commonTraps": "Entropy (J/K) vs Svedberg unit vs slope � context dependent."
    },
    {
      "id": "CL",
      "siUnit": "",
      "altUnits": "",
      "description": "Lift Coefficient",
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
    "problem": "Find the unknown L using Lift Equation with: L = 50, rho = 10, v = 9.8.",
    "solution": [
      "Identify known quantities and the target (L).",
      "Write the formula and solve for L.",
      "Substitute the values: L = 50, rho = 10, v = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "L = computed result (run Solve mode to see the exact value)"
  }
},

  "froude": {
  "intuition": "Froude Number calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Fr",
      "siUnit": "",
      "altUnits": "",
      "description": "Froude Number",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "g",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Gravity",
      "commonTraps": "g = 9.81 m/s� is an average. Use local g for high-precision work."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Characteristic Length",
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
    "problem": "Find the unknown Fr using Froude Number with: Fr = 10, v = 9.8, g = 10.",
    "solution": [
      "Identify known quantities and the target (Fr).",
      "Write the formula and solve for Fr.",
      "Substitute the values: Fr = 10, v = 9.8, g = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Fr = computed result (run Solve mode to see the exact value)"
  }
},

  "capillary-rise": {
  "intuition": "Capillary Rise calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "h",
      "siUnit": "m",
      "altUnits": "",
      "description": "Height",
      "commonTraps": "Height (m) vs Planck's constant (6.626�10?�4 J�s) � order-of-magnitude check."
    },
    {
      "id": "gamma",
      "siUnit": "N/m",
      "altUnits": "",
      "description": "Surface Tension",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Contact Angle",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
    },
    {
      "id": "rho",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Density",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown h using Capillary Rise with: h = 5, gamma = 10, theta = 10.",
    "solution": [
      "Identify known quantities and the target (h).",
      "Write the formula and solve for h.",
      "Substitute the values: h = 5, gamma = 10, theta = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "h = computed result (run Solve mode to see the exact value)"
  }
},

  "specific-impulse": {
  "intuition": "Specific Impulse calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Isp",
      "siUnit": "s",
      "altUnits": "",
      "description": "Specific Impulse",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "ve",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Exhaust Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "g",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Gravity",
      "commonTraps": "g = 9.81 m/s� is an average. Use local g for high-precision work."
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
    "problem": "Find the unknown Isp using Specific Impulse with: Isp = 2, ve = 9.8, g = 10.",
    "solution": [
      "Identify known quantities and the target (Isp).",
      "Write the formula and solve for Isp.",
      "Substitute the values: Isp = 2, ve = 9.8, g = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Isp = computed result (run Solve mode to see the exact value)"
  }
},

};
