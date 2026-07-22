export const astronomy_cosmology = {
  "redshift": {
  "intuition": "Redshift (Cosmological) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "z",
      "siUnit": "",
      "altUnits": "",
      "description": "Redshift",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "lObs",
      "siUnit": "nm",
      "altUnits": "",
      "description": "Observed Wavelength",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "lRest",
      "siUnit": "nm",
      "altUnits": "",
      "description": "Rest Wavelength",
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
    "problem": "Find the unknown z using Redshift (Cosmological) with: z = 10, lObs = 500, lRest = 500.",
    "solution": [
      "Identify known quantities and the target (z).",
      "Write the formula and solve for z.",
      "Substitute the values: z = 10, lObs = 500, lRest = 500.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "z = computed result (run Solve mode to see the exact value)"
  }
},

  "hubbles-law": {
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
      "id": "d",
      "siUnit": "Mpc",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
    },
    {
      "id": "H0",
      "siUnit": "km/s/Mpc",
      "altUnits": "",
      "description": "Hubble Constant",
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
    "problem": "Find the unknown v using Hubble's Law with: v = 10, d = 10, H0 = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 10, d = 10, H0 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "luminosity-distance": {
  "intuition": "Luminosity Distance calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "d",
      "siUnit": "pc",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
    },
    {
      "id": "m",
      "siUnit": "",
      "altUnits": "",
      "description": "Apparent Magnitude",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "M",
      "siUnit": "",
      "altUnits": "",
      "description": "Absolute Magnitude",
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
    "problem": "Find the unknown d using Luminosity Distance with: d = 10, m = 10, M = 10.",
    "solution": [
      "Identify known quantities and the target (d).",
      "Write the formula and solve for d.",
      "Substitute the values: d = 10, m = 10, M = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "d = computed result (run Solve mode to see the exact value)"
  }
},

};
