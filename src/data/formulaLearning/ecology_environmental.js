export const ecology_environmental = {
  "chi-square": {
  "intuition": "Chi-Square Test calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "observed",
      "siUnit": "",
      "altUnits": "",
      "description": "Observed",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "expected",
      "siUnit": "",
      "altUnits": "",
      "description": "Expected",
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
    "problem": "Find the unknown observed using Chi-Square Test with: observed = 10, expected = 10.",
    "solution": [
      "Identify known quantities and the target (observed).",
      "Write the formula and solve for observed.",
      "Substitute the values: observed = 10, expected = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "observed = computed result (run Solve mode to see the exact value)"
  }
},

  "shannon-index": {
  "intuition": "Shannon-Wiener Diversity Index calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
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
    "problem": "Find the unknown data using Shannon-Wiener Diversity Index with: data = 10.",
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

  "rule-of-70": {
  "intuition": "Rule of 70 (Doubling Time) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "td",
      "siUnit": "years",
      "altUnits": "",
      "description": "Doubling Time",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "r",
      "siUnit": "%",
      "altUnits": "",
      "description": "Growth Rate",
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
    "problem": "Find the unknown td using Rule of 70 (Doubling Time) with: td = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (td).",
      "Write the formula and solve for td.",
      "Substitute the values: td = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "td = computed result (run Solve mode to see the exact value)"
  }
},

  "npp": {
  "intuition": "Net Primary Productivity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "NPP",
      "siUnit": "g/m²/yr",
      "altUnits": "",
      "description": "Net Primary Productivity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "GPP",
      "siUnit": "g/m²/yr",
      "altUnits": "",
      "description": "Gross Primary Productivity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R",
      "siUnit": "g/m²/yr",
      "altUnits": "",
      "description": "Respiration",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
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
    "problem": "Find the unknown NPP using Net Primary Productivity with: NPP = 10, GPP = 10, R = 10.",
    "solution": [
      "Identify known quantities and the target (NPP).",
      "Write the formula and solve for NPP.",
      "Substitute the values: NPP = 10, GPP = 10, R = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "NPP = computed result (run Solve mode to see the exact value)"
  }
},

  "cell-sa-vol": {
  "intuition": "Cell SA:Volume Ratio calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "r",
      "siUnit": "µm",
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
    "problem": "Find the unknown r using Cell SA:Volume Ratio with: r = 10.",
    "solution": [
      "Identify known quantities and the target (r).",
      "Write the formula and solve for r.",
      "Substitute the values: r = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "r = computed result (run Solve mode to see the exact value)"
  }
},

  "q10": {
  "intuition": "Q10 Temperature Coefficient calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Q10",
      "siUnit": "",
      "altUnits": "",
      "description": "Q10",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R1",
      "siUnit": "",
      "altUnits": "",
      "description": "Rate at T₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R2",
      "siUnit": "",
      "altUnits": "",
      "description": "Rate at T₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T1",
      "siUnit": "°C",
      "altUnits": "",
      "description": "Temperature 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T2",
      "siUnit": "°C",
      "altUnits": "",
      "description": "Temperature 2",
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
    "problem": "Find the unknown Q10 using Q10 Temperature Coefficient with: Q10 = 10, R1 = 10, R2 = 10.",
    "solution": [
      "Identify known quantities and the target (Q10).",
      "Write the formula and solve for Q10.",
      "Substitute the values: Q10 = 10, R1 = 10, R2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Q10 = computed result (run Solve mode to see the exact value)"
  }
},

};
