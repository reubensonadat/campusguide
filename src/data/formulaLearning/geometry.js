export const geometry = {
  "circle": {
  "intuition": "Circle Area & Circumference calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "C",
      "siUnit": "m",
      "altUnits": "",
      "description": "Circumference",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
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
    "problem": "Find the unknown A using Circle Area & Circumference with: A = 10, C = 5, r = 5.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, C = 5, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "sphere": {
  "intuition": "Sphere Volume & Surface calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "V",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SA",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Surface Area",
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
    "problem": "Find the unknown V using Sphere Volume & Surface with: V = 10, SA = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (V).",
      "Write the formula and solve for V.",
      "Substitute the values: V = 10, SA = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "V = computed result (run Solve mode to see the exact value)"
  }
},

  "cylinder": {
  "intuition": "Cylinder Volume & Surface calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "V",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Radius",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "h",
      "siUnit": "m",
      "altUnits": "",
      "description": "Height",
      "commonTraps": "Height (m) vs Planck's constant (6.626�10?�4 J�s) � order-of-magnitude check."
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
    "problem": "Find the unknown V using Cylinder Volume & Surface with: V = 10, r = 5, h = 5.",
    "solution": [
      "Identify known quantities and the target (V).",
      "Write the formula and solve for V.",
      "Substitute the values: V = 10, r = 5, h = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "V = computed result (run Solve mode to see the exact value)"
  }
},

  "triangle-area": {
  "intuition": "Triangle Area (Heron's) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "Side a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "",
      "altUnits": "",
      "description": "Side b",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c",
      "siUnit": "",
      "altUnits": "",
      "description": "Side c",
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
    "problem": "Find the unknown a using Triangle Area (Heron's) with: a = 10, b = 10, c = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, b = 10, c = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

  "trig-ratios": {
  "intuition": "Trigonometric Ratios calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
    },
    {
      "id": "opp",
      "siUnit": "",
      "altUnits": "",
      "description": "Opposite",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "adj",
      "siUnit": "",
      "altUnits": "",
      "description": "Adjacent",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "hyp",
      "siUnit": "",
      "altUnits": "",
      "description": "Hypotenuse",
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
    "problem": "Find the unknown theta using Trigonometric Ratios with: theta = 10, opp = 10, adj = 10.",
    "solution": [
      "Identify known quantities and the target (theta).",
      "Write the formula and solve for theta.",
      "Substitute the values: theta = 10, opp = 10, adj = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "theta = computed result (run Solve mode to see the exact value)"
  }
},

};
