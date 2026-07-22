export const calculus_tools = {
  "derivative-rules": {
  "intuition": "Derivative Evaluator (Power Rule) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "Coefficient",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Power",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "x",
      "siUnit": "",
      "altUnits": "",
      "description": "Evaluate at x",
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
    "problem": "Find the unknown a using Derivative Evaluator (Power Rule) with: a = 10, n = 10, x = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, n = 10, x = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

  "riemann-sum": {
  "intuition": "Riemann Sum Estimator calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "Lower bound",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "",
      "altUnits": "",
      "description": "Upper bound",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of rectangles",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
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
    "problem": "Find the unknown a using Riemann Sum Estimator with: a = 10, b = 10, n = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, b = 10, n = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

  "taylor-series": {
  "intuition": "Taylor Series Approximation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "func",
      "siUnit": "",
      "altUnits": "",
      "description": "Function",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x",
      "siUnit": "",
      "altUnits": "",
      "description": "Evaluate at x",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of terms",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
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
    "problem": "Find the unknown func using Taylor Series Approximation with: func = 10, x = 10, N = 10.",
    "solution": [
      "Identify known quantities and the target (func).",
      "Write the formula and solve for func.",
      "Substitute the values: func = 10, x = 10, N = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "func = computed result (run Solve mode to see the exact value)"
  }
},

  "newton-method": {
  "intuition": "Newton-Raphson Method calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "c",
      "siUnit": "",
      "altUnits": "",
      "description": "Find √c",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x0",
      "siUnit": "",
      "altUnits": "",
      "description": "Initial guess",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "iters",
      "siUnit": "",
      "altUnits": "",
      "description": "Iterations",
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
    "problem": "Find the unknown c using Newton-Raphson Method with: c = 10, x0 = 10, iters = 10.",
    "solution": [
      "Identify known quantities and the target (c).",
      "Write the formula and solve for c.",
      "Substitute the values: c = 10, x0 = 10, iters = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "c = computed result (run Solve mode to see the exact value)"
  }
},

};
