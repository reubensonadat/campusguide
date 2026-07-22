export const economics_finance = {
  "price-elasticity": {
  "intuition": "Price Elasticity of Demand calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Ed",
      "siUnit": "",
      "altUnits": "",
      "description": "Elasticity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "pctQ",
      "siUnit": "",
      "altUnits": "",
      "description": "% Change in Quantity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "pctP",
      "siUnit": "",
      "altUnits": "",
      "description": "% Change in Price",
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
    "problem": "Find the unknown Ed using Price Elasticity of Demand with: Ed = 10, pctQ = 10, pctP = 10.",
    "solution": [
      "Identify known quantities and the target (Ed).",
      "Write the formula and solve for Ed.",
      "Substitute the values: Ed = 10, pctQ = 10, pctP = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Ed = computed result (run Solve mode to see the exact value)"
  }
},

  "compound-growth": {
  "intuition": "Compound Annual Growth Rate (CAGR) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "CAGR",
      "siUnit": "",
      "altUnits": "",
      "description": "CAGR",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "FV",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Future Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "PV",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Present Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "t",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of Years",
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
    "problem": "Find the unknown CAGR using Compound Annual Growth Rate (CAGR) with: CAGR = 10, FV = 10, PV = 10.",
    "solution": [
      "Identify known quantities and the target (CAGR).",
      "Write the formula and solve for CAGR.",
      "Substitute the values: CAGR = 10, FV = 10, PV = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "CAGR = computed result (run Solve mode to see the exact value)"
  }
},

  "gini-coeff": {
  "intuition": "Gini Coefficient calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "G",
      "siUnit": "",
      "altUnits": "",
      "description": "Gini Coefficient",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "popShare",
      "siUnit": "",
      "altUnits": "",
      "description": "Population share",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "incShare",
      "siUnit": "",
      "altUnits": "",
      "description": "Income share",
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
    "problem": "Find the unknown G using Gini Coefficient with: G = 10, popShare = 10, incShare = 10.",
    "solution": [
      "Identify known quantities and the target (G).",
      "Write the formula and solve for G.",
      "Substitute the values: G = 10, popShare = 10, incShare = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "G = computed result (run Solve mode to see the exact value)"
  }
},

};
