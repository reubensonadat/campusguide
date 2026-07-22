export const advanced_finance_economics = {
  "pv-annuity": {
  "intuition": "Present Value of Annuity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "PV",
      "siUnit": "$",
      "altUnits": "",
      "description": "Present Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P",
      "siUnit": "$",
      "altUnits": "",
      "description": "Payment per Period",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "r",
      "siUnit": "%",
      "altUnits": "",
      "description": "Rate per Period",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of Periods",
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
    "problem": "Find the unknown PV using Present Value of Annuity with: PV = 10, P = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (PV).",
      "Write the formula and solve for PV.",
      "Substitute the values: PV = 10, P = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "PV = computed result (run Solve mode to see the exact value)"
  }
},

  "fv-annuity": {
  "intuition": "Future Value of Annuity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "FV",
      "siUnit": "$",
      "altUnits": "",
      "description": "Future Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P",
      "siUnit": "$",
      "altUnits": "",
      "description": "Payment per Period",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "r",
      "siUnit": "%",
      "altUnits": "",
      "description": "Rate per Period",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of Periods",
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
    "problem": "Find the unknown FV using Future Value of Annuity with: FV = 10, P = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (FV).",
      "Write the formula and solve for FV.",
      "Substitute the values: FV = 10, P = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "FV = computed result (run Solve mode to see the exact value)"
  }
},

  "mortgage-amort": {
  "intuition": "Mortgage Amortization calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M",
      "siUnit": "$",
      "altUnits": "",
      "description": "Monthly Payment",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
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
      "siUnit": "%",
      "altUnits": "",
      "description": "Annual Rate",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Total Months",
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
    "problem": "Find the unknown M using Mortgage Amortization with: M = 10, P = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (M).",
      "Write the formula and solve for M.",
      "Substitute the values: M = 10, P = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M = computed result (run Solve mode to see the exact value)"
  }
},

  "capm": {
  "intuition": "Capital Asset Pricing Model calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ER",
      "siUnit": "%",
      "altUnits": "",
      "description": "Expected Return",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Rf",
      "siUnit": "%",
      "altUnits": "",
      "description": "Risk-Free Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Beta",
      "siUnit": "",
      "altUnits": "",
      "description": "Beta",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "ERm",
      "siUnit": "%",
      "altUnits": "",
      "description": "Market Return",
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
    "problem": "Find the unknown ER using Capital Asset Pricing Model with: ER = 5, Rf = 5, Beta = 10.",
    "solution": [
      "Identify known quantities and the target (ER).",
      "Write the formula and solve for ER.",
      "Substitute the values: ER = 5, Rf = 5, Beta = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ER = computed result (run Solve mode to see the exact value)"
  }
},

  "elasticity": {
  "intuition": "Price Elasticity of Demand calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "",
      "altUnits": "",
      "description": "Elasticity",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "Q1",
      "siUnit": "",
      "altUnits": "",
      "description": "Old Quantity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Q2",
      "siUnit": "",
      "altUnits": "",
      "description": "New Quantity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P1",
      "siUnit": "$",
      "altUnits": "",
      "description": "Old Price",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P2",
      "siUnit": "$",
      "altUnits": "",
      "description": "New Price",
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
    "problem": "Find the unknown E using Price Elasticity of Demand with: E = 10, Q1 = 10, Q2 = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 10, Q1 = 10, Q2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "roi": {
  "intuition": "Return on Investment (ROI) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ROI",
      "siUnit": "%",
      "altUnits": "",
      "description": "ROI",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "G",
      "siUnit": "$",
      "altUnits": "",
      "description": "Gain/Return",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "C",
      "siUnit": "$",
      "altUnits": "",
      "description": "Cost",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
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
    "problem": "Find the unknown ROI using Return on Investment (ROI) with: ROI = 5, G = 10, C = 10.",
    "solution": [
      "Identify known quantities and the target (ROI).",
      "Write the formula and solve for ROI.",
      "Substitute the values: ROI = 5, G = 10, C = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ROI = computed result (run Solve mode to see the exact value)"
  }
},

  "wacc": {
  "intuition": "Weighted Average Cost of Capital calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "WACC",
      "siUnit": "%",
      "altUnits": "",
      "description": "WACC",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "E",
      "siUnit": "$",
      "altUnits": "",
      "description": "Market Value Equity",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "D",
      "siUnit": "$",
      "altUnits": "",
      "description": "Market Value Debt",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Re",
      "siUnit": "%",
      "altUnits": "",
      "description": "Cost of Equity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Rd",
      "siUnit": "%",
      "altUnits": "",
      "description": "Cost of Debt",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Tc",
      "siUnit": "%",
      "altUnits": "",
      "description": "Corp Tax Rate",
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
    "problem": "Find the unknown WACC using Weighted Average Cost of Capital with: WACC = 5, E = 10, D = 10.",
    "solution": [
      "Identify known quantities and the target (WACC).",
      "Write the formula and solve for WACC.",
      "Substitute the values: WACC = 5, E = 10, D = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "WACC = computed result (run Solve mode to see the exact value)"
  }
},

  "bep": {
  "intuition": "Break-Even Point (Units) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Q",
      "siUnit": "",
      "altUnits": "",
      "description": "Units to Break Even",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    },
    {
      "id": "FC",
      "siUnit": "$",
      "altUnits": "",
      "description": "Fixed Costs",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P",
      "siUnit": "$",
      "altUnits": "",
      "description": "Price per Unit",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "VC",
      "siUnit": "$",
      "altUnits": "",
      "description": "Variable Cost per Unit",
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
    "problem": "Find the unknown Q using Break-Even Point (Units) with: Q = 10, FC = 10, P = 10.",
    "solution": [
      "Identify known quantities and the target (Q).",
      "Write the formula and solve for Q.",
      "Substitute the values: Q = 10, FC = 10, P = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Q = computed result (run Solve mode to see the exact value)"
  }
},

};
