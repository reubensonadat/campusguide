export const algebra_pre_calculus = {
  "midpoint": {
  "intuition": "Midpoint Formula (2D) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "mx",
      "siUnit": "",
      "altUnits": "",
      "description": "Midpoint X",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "my",
      "siUnit": "",
      "altUnits": "",
      "description": "Midpoint Y",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x1",
      "siUnit": "",
      "altUnits": "",
      "description": "Point 1 X",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "y1",
      "siUnit": "",
      "altUnits": "",
      "description": "Point 1 Y",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x2",
      "siUnit": "",
      "altUnits": "",
      "description": "Point 2 X",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "y2",
      "siUnit": "",
      "altUnits": "",
      "description": "Point 2 Y",
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
    "problem": "Find the unknown mx using Midpoint Formula (2D) with: mx = 10, my = 10, x1 = 10.",
    "solution": [
      "Identify known quantities and the target (mx).",
      "Write the formula and solve for mx.",
      "Substitute the values: mx = 10, my = 10, x1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "mx = computed result (run Solve mode to see the exact value)"
  }
},

  "slope-line": {
  "intuition": "Slope of a Line calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "m",
      "siUnit": "",
      "altUnits": "",
      "description": "Slope",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "x1",
      "siUnit": "",
      "altUnits": "",
      "description": "x₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "y1",
      "siUnit": "",
      "altUnits": "",
      "description": "y₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x2",
      "siUnit": "",
      "altUnits": "",
      "description": "x₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "y2",
      "siUnit": "",
      "altUnits": "",
      "description": "y₂",
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
    "problem": "Find the unknown m using Slope of a Line with: m = 10, x1 = 10, y1 = 10.",
    "solution": [
      "Identify known quantities and the target (m).",
      "Write the formula and solve for m.",
      "Substitute the values: m = 10, x1 = 10, y1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "m = computed result (run Solve mode to see the exact value)"
  }
},

  "arithmetic-sequence": {
  "intuition": "Arithmetic Sequence & Series calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a1",
      "siUnit": "",
      "altUnits": "",
      "description": "First Term",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "d",
      "siUnit": "",
      "altUnits": "",
      "description": "Common Difference",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Term Number",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "an",
      "siUnit": "",
      "altUnits": "",
      "description": "nth Term",
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
    "problem": "Find the unknown a1 using Arithmetic Sequence & Series with: a1 = 10, d = 10, n = 10.",
    "solution": [
      "Identify known quantities and the target (a1).",
      "Write the formula and solve for a1.",
      "Substitute the values: a1 = 10, d = 10, n = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a1 = computed result (run Solve mode to see the exact value)"
  }
},

  "geometric-sequence": {
  "intuition": "Geometric Sequence & Series calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a1",
      "siUnit": "",
      "altUnits": "",
      "description": "First Term",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "r",
      "siUnit": "",
      "altUnits": "",
      "description": "Common Ratio",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Term Number",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "an",
      "siUnit": "",
      "altUnits": "",
      "description": "nth Term",
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
    "problem": "Find the unknown a1 using Geometric Sequence & Series with: a1 = 10, r = 10, n = 10.",
    "solution": [
      "Identify known quantities and the target (a1).",
      "Write the formula and solve for a1.",
      "Substitute the values: a1 = 10, r = 10, n = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a1 = computed result (run Solve mode to see the exact value)"
  }
},

  "simple-interest": {
  "intuition": "Simple Interest calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "$",
      "altUnits": "",
      "description": "Final Amount",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "P",
      "siUnit": "$",
      "altUnits": "",
      "description": "Principal",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "r",
      "siUnit": "",
      "altUnits": "",
      "description": "Annual Rate",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "t",
      "siUnit": "years",
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
    "problem": "Find the unknown A using Simple Interest with: A = 10, P = 10, r = 10.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, P = 10, r = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "continuous-compound": {
  "intuition": "Continuously Compounded Interest calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "$",
      "altUnits": "",
      "description": "Final Amount",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "P",
      "siUnit": "$",
      "altUnits": "",
      "description": "Principal",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "r",
      "siUnit": "",
      "altUnits": "",
      "description": "Annual Rate",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "t",
      "siUnit": "years",
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
    "problem": "Find the unknown A using Continuously Compounded Interest with: A = 10, P = 10, r = 10.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, P = 10, r = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "matrix-2x2": {
  "intuition": "Matrix 2×2 (Det & Inverse) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "Element a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "",
      "altUnits": "",
      "description": "Element b",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c",
      "siUnit": "",
      "altUnits": "",
      "description": "Element c",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "d",
      "siUnit": "",
      "altUnits": "",
      "description": "Element d",
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
    "problem": "Find the unknown a using Matrix 2×2 (Det & Inverse) with: a = 10, b = 10, c = 10.",
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

  "vector-ops": {
  "intuition": "Vector Operations (2D/3D) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ax",
      "siUnit": "",
      "altUnits": "",
      "description": "Vector A x",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "ay",
      "siUnit": "",
      "altUnits": "",
      "description": "Vector A y",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "bx",
      "siUnit": "",
      "altUnits": "",
      "description": "Vector B x",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "by",
      "siUnit": "",
      "altUnits": "",
      "description": "Vector B y",
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
    "problem": "Find the unknown ax using Vector Operations (2D/3D) with: ax = 10, ay = 10, bx = 10.",
    "solution": [
      "Identify known quantities and the target (ax).",
      "Write the formula and solve for ax.",
      "Substitute the values: ax = 10, ay = 10, bx = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ax = computed result (run Solve mode to see the exact value)"
  }
},

  "exponential-growth": {
  "intuition": "Exponential Growth/Decay calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Final Amount",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
    },
    {
      "id": "N0",
      "siUnit": "",
      "altUnits": "",
      "description": "Initial Amount",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "k",
      "siUnit": "",
      "altUnits": "",
      "description": "Growth Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "t",
      "siUnit": "",
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
    "problem": "Find the unknown N using Exponential Growth/Decay with: N = 10, N0 = 10, k = 10.",
    "solution": [
      "Identify known quantities and the target (N).",
      "Write the formula and solve for N.",
      "Substitute the values: N = 10, N0 = 10, k = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "N = computed result (run Solve mode to see the exact value)"
  }
},

  "complex-numbers": {
  "intuition": "Complex Number Operations calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "Real part",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "",
      "altUnits": "",
      "description": "Imaginary part",
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
    "problem": "Find the unknown a using Complex Number Operations with: a = 10, b = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, b = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

};
