export const probability_statistics = {
  "z-score": {
  "intuition": "Z-Score calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "z",
      "siUnit": "",
      "altUnits": "",
      "description": "Z-Score",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x",
      "siUnit": "",
      "altUnits": "",
      "description": "Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "mu",
      "siUnit": "",
      "altUnits": "",
      "description": "Mean",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "sigma",
      "siUnit": "",
      "altUnits": "",
      "description": "Std Dev",
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
    "problem": "Find the unknown z using Z-Score with: z = 10, x = 10, mu = 10.",
    "solution": [
      "Identify known quantities and the target (z).",
      "Write the formula and solve for z.",
      "Substitute the values: z = 10, x = 10, mu = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "z = computed result (run Solve mode to see the exact value)"
  }
},

  "binomial-prob": {
  "intuition": "Binomial Probability calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Trials",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "k",
      "siUnit": "",
      "altUnits": "",
      "description": "Successes",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "p",
      "siUnit": "",
      "altUnits": "",
      "description": "Probability of success",
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
    "problem": "Find the unknown n using Binomial Probability with: n = 10, k = 10, p = 10.",
    "solution": [
      "Identify known quantities and the target (n).",
      "Write the formula and solve for n.",
      "Substitute the values: n = 10, k = 10, p = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "n = computed result (run Solve mode to see the exact value)"
  }
},

  "bayes-theorem": {
  "intuition": "Bayes' Theorem calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "PAgB",
      "siUnit": "",
      "altUnits": "",
      "description": "P",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "PBgA",
      "siUnit": "",
      "altUnits": "",
      "description": "P",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "PA",
      "siUnit": "",
      "altUnits": "",
      "description": "P",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "PB",
      "siUnit": "",
      "altUnits": "",
      "description": "P",
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
    "problem": "Find the unknown PAgB using Bayes' Theorem with: PAgB = 10, PBgA = 10, PA = 10.",
    "solution": [
      "Identify known quantities and the target (PAgB).",
      "Write the formula and solve for PAgB.",
      "Substitute the values: PAgB = 10, PBgA = 10, PA = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "PAgB = computed result (run Solve mode to see the exact value)"
  }
},

  "confidence-interval": {
  "intuition": "Confidence Interval (Z) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "xbar",
      "siUnit": "",
      "altUnits": "",
      "description": "Sample Mean",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "sigma",
      "siUnit": "",
      "altUnits": "",
      "description": "Population Std Dev",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Sample Size",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "z",
      "siUnit": "",
      "altUnits": "",
      "description": "Z critical value",
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
    "problem": "Find the unknown xbar using Confidence Interval (Z) with: xbar = 10, sigma = 10, n = 10.",
    "solution": [
      "Identify known quantities and the target (xbar).",
      "Write the formula and solve for xbar.",
      "Substitute the values: xbar = 10, sigma = 10, n = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "xbar = computed result (run Solve mode to see the exact value)"
  }
},

  "poisson": {
  "intuition": "Poisson Distribution calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "lambda",
      "siUnit": "",
      "altUnits": "",
      "description": "Expected rate",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
    },
    {
      "id": "k",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of events",
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
    "problem": "Find the unknown lambda using Poisson Distribution with: lambda = 10, k = 10.",
    "solution": [
      "Identify known quantities and the target (lambda).",
      "Write the formula and solve for lambda.",
      "Substitute the values: lambda = 10, k = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "lambda = computed result (run Solve mode to see the exact value)"
  }
},

};
