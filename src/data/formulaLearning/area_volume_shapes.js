export const area_volume_shapes = {
  "triangle-bh": {
  "intuition": "Triangle Area (Base × Height) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "b",
      "siUnit": "m",
      "altUnits": "",
      "description": "Base",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown A using Triangle Area (Base × Height) with: A = 10, b = 5, h = 5.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, b = 5, h = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "trapezoid": {
  "intuition": "Trapezoid Area calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "a",
      "siUnit": "m",
      "altUnits": "",
      "description": "Base a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "m",
      "altUnits": "",
      "description": "Base b",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown A using Trapezoid Area with: A = 10, a = 5, b = 5.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, a = 5, b = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "rect-prism": {
  "intuition": "Rectangular Prism (Box) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "l",
      "siUnit": "m",
      "altUnits": "",
      "description": "Length",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "w",
      "siUnit": "m",
      "altUnits": "",
      "description": "Width",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown l using Rectangular Prism (Box) with: l = 5, w = 5, h = 5.",
    "solution": [
      "Identify known quantities and the target (l).",
      "Write the formula and solve for l.",
      "Substitute the values: l = 5, w = 5, h = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "l = computed result (run Solve mode to see the exact value)"
  }
},

  "pyramid": {
  "intuition": "Pyramid Volume calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "V",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "B",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Base Area",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown V using Pyramid Volume with: V = 10, B = 10, h = 5.",
    "solution": [
      "Identify known quantities and the target (V).",
      "Write the formula and solve for V.",
      "Substitute the values: V = 10, B = 10, h = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "V = computed result (run Solve mode to see the exact value)"
  }
},

  "hemisphere": {
  "intuition": "Hemisphere Volume & Surface calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
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
    "problem": "Find the unknown r using Hemisphere Volume & Surface with: r = 5.",
    "solution": [
      "Identify known quantities and the target (r).",
      "Write the formula and solve for r.",
      "Substitute the values: r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "r = computed result (run Solve mode to see the exact value)"
  }
},

  "ellipse": {
  "intuition": "Ellipse Area calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "a",
      "siUnit": "m",
      "altUnits": "",
      "description": "Semi-major",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "m",
      "altUnits": "",
      "description": "Semi-minor",
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
    "problem": "Find the unknown A using Ellipse Area with: A = 10, a = 5, b = 5.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, a = 5, b = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "parallelogram": {
  "intuition": "Parallelogram Area calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "b",
      "siUnit": "m",
      "altUnits": "",
      "description": "Base",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown A using Parallelogram Area with: A = 10, b = 5, h = 5.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, b = 5, h = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

};
