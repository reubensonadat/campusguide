export const linear_algebra = {
  "matrix-multiply": {
  "intuition": "2×2 Matrix Multiplication calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a11",
      "siUnit": "",
      "altUnits": "",
      "description": "A₁₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "a21",
      "siUnit": "",
      "altUnits": "",
      "description": "A₂₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b11",
      "siUnit": "",
      "altUnits": "",
      "description": "B₁₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b21",
      "siUnit": "",
      "altUnits": "",
      "description": "B₂₁",
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
    "problem": "Find the unknown a11 using 2×2 Matrix Multiplication with: a11 = 10, a21 = 10, b11 = 10.",
    "solution": [
      "Identify known quantities and the target (a11).",
      "Write the formula and solve for a11.",
      "Substitute the values: a11 = 10, a21 = 10, b11 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a11 = computed result (run Solve mode to see the exact value)"
  }
},

  "det-2x2": {
  "intuition": "Determinant of 2×2 Matrix calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c",
      "siUnit": "",
      "altUnits": "",
      "description": "c",
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
    "problem": "Find the unknown a using Determinant of 2×2 Matrix with: a = 10, c = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, c = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

  "inv-2x2": {
  "intuition": "Inverse of 2×2 Matrix calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c",
      "siUnit": "",
      "altUnits": "",
      "description": "c",
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
    "problem": "Find the unknown a using Inverse of 2×2 Matrix with: a = 10, c = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, c = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

  "eigenvalues-2x2": {
  "intuition": "Eigenvalues of 2×2 Matrix calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c",
      "siUnit": "",
      "altUnits": "",
      "description": "c",
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
    "problem": "Find the unknown a using Eigenvalues of 2×2 Matrix with: a = 10, c = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, c = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

  "dot-product": {
  "intuition": "Dot Product (3D) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a1",
      "siUnit": "",
      "altUnits": "",
      "description": "a₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b1",
      "siUnit": "",
      "altUnits": "",
      "description": "b₁",
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
    "problem": "Find the unknown a1 using Dot Product (3D) with: a1 = 10, b1 = 10.",
    "solution": [
      "Identify known quantities and the target (a1).",
      "Write the formula and solve for a1.",
      "Substitute the values: a1 = 10, b1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a1 = computed result (run Solve mode to see the exact value)"
  }
},

  "cross-product": {
  "intuition": "Cross Product (3D) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a1",
      "siUnit": "",
      "altUnits": "",
      "description": "a₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b1",
      "siUnit": "",
      "altUnits": "",
      "description": "b₁",
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
    "problem": "Find the unknown a1 using Cross Product (3D) with: a1 = 10, b1 = 10.",
    "solution": [
      "Identify known quantities and the target (a1).",
      "Write the formula and solve for a1.",
      "Substitute the values: a1 = 10, b1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a1 = computed result (run Solve mode to see the exact value)"
  }
},

};
