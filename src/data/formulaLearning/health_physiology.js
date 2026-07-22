export const health_physiology = {
  "bmr": {
  "intuition": "Basal Metabolic Rate (BMR) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "gender",
      "siUnit": "",
      "altUnits": "",
      "description": "0=Male, 1=Female",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "weight",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Weight",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "height",
      "siUnit": "cm",
      "altUnits": "",
      "description": "Height",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "age",
      "siUnit": "years",
      "altUnits": "",
      "description": "Age",
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
    "problem": "Find the unknown gender using Basal Metabolic Rate (BMR) with: gender = 10, weight = 10, height = 10.",
    "solution": [
      "Identify known quantities and the target (gender).",
      "Write the formula and solve for gender.",
      "Substitute the values: gender = 10, weight = 10, height = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "gender = computed result (run Solve mode to see the exact value)"
  }
},

  "renal-clearance": {
  "intuition": "Renal Clearance Rate calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "C",
      "siUnit": "mL/min",
      "altUnits": "",
      "description": "Clearance Rate",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "U",
      "siUnit": "mg/mL",
      "altUnits": "",
      "description": "Urine Concentration",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V",
      "siUnit": "mL/min",
      "altUnits": "",
      "description": "Urine Flow Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P",
      "siUnit": "mg/mL",
      "altUnits": "",
      "description": "Plasma Concentration",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
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
    "problem": "Find the unknown C using Renal Clearance Rate with: C = 10, U = 10, V = 10.",
    "solution": [
      "Identify known quantities and the target (C).",
      "Write the formula and solve for C.",
      "Substitute the values: C = 10, U = 10, V = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "C = computed result (run Solve mode to see the exact value)"
  }
},

  "alveolar-gas": {
  "intuition": "Alveolar Gas Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "PAO2",
      "siUnit": "mmHg",
      "altUnits": "",
      "description": "PAO₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "FiO2",
      "siUnit": "",
      "altUnits": "",
      "description": "FiO₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "PaCO2",
      "siUnit": "mmHg",
      "altUnits": "",
      "description": "PaCO₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "RQ",
      "siUnit": "",
      "altUnits": "",
      "description": "Respiratory Quotient",
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
    "problem": "Find the unknown PAO2 using Alveolar Gas Equation with: PAO2 = 10, FiO2 = 10, PaCO2 = 10.",
    "solution": [
      "Identify known quantities and the target (PAO2).",
      "Write the formula and solve for PAO2.",
      "Substitute the values: PAO2 = 10, FiO2 = 10, PaCO2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "PAO2 = computed result (run Solve mode to see the exact value)"
  }
},

  "simpson-diversity": {
  "intuition": "Simpson's Diversity Index calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "data",
      "siUnit": "",
      "altUnits": "",
      "description": "Species counts",
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
    "problem": "Find the unknown data using Simpson's Diversity Index with: data = 10.",
    "solution": [
      "Identify known quantities and the target (data).",
      "Write the formula and solve for data.",
      "Substitute the values: data = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "data = computed result (run Solve mode to see the exact value)"
  }
},

  "vector-cross": {
  "intuition": "Vector Cross Product (3D) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ax",
      "siUnit": "",
      "altUnits": "",
      "description": "A x",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "bx",
      "siUnit": "",
      "altUnits": "",
      "description": "B x",
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
    "problem": "Find the unknown ax using Vector Cross Product (3D) with: ax = 10, bx = 10.",
    "solution": [
      "Identify known quantities and the target (ax).",
      "Write the formula and solve for ax.",
      "Substitute the values: ax = 10, bx = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ax = computed result (run Solve mode to see the exact value)"
  }
},

  "half-angle": {
  "intuition": "Half Angle Formulas calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle θ",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
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
    "problem": "Find the unknown theta using Half Angle Formulas with: theta = 10.",
    "solution": [
      "Identify known quantities and the target (theta).",
      "Write the formula and solve for theta.",
      "Substitute the values: theta = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "theta = computed result (run Solve mode to see the exact value)"
  }
},

  "angle-between-vectors": {
  "intuition": "Angle Between Two Vectors calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ax",
      "siUnit": "",
      "altUnits": "",
      "description": "A x",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "bx",
      "siUnit": "",
      "altUnits": "",
      "description": "B x",
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
    "problem": "Find the unknown ax using Angle Between Two Vectors with: ax = 10, bx = 10.",
    "solution": [
      "Identify known quantities and the target (ax).",
      "Write the formula and solve for ax.",
      "Substitute the values: ax = 10, bx = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ax = computed result (run Solve mode to see the exact value)"
  }
},

};
