export const analytical_chemistry = {
  "beer-lambert": {
  "intuition": "Beer-Lambert Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "",
      "altUnits": "",
      "description": "Absorbance",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "eps",
      "siUnit": "L·mol⁻¹·cm⁻¹",
      "altUnits": "",
      "description": "Molar Absorptivity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c",
      "siUnit": "mol/L",
      "altUnits": "",
      "description": "Concentration",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "l",
      "siUnit": "cm",
      "altUnits": "",
      "description": "Path Length",
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
    "problem": "Find the unknown A using Beer-Lambert Law with: A = 10, eps = 10, c = 10.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 10, eps = 10, c = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "henderson-hasselbalch": {
  "intuition": "Henderson-Hasselbalch Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "pH",
      "siUnit": "",
      "altUnits": "",
      "description": "pH",
      "commonTraps": "pOH + pH = 14 at 25�C. This changes with temperature."
    },
    {
      "id": "pKa",
      "siUnit": "",
      "altUnits": "",
      "description": "pKa",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "ratio",
      "siUnit": "",
      "altUnits": "",
      "description": "[A⁻]/[HA] Ratio",
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
    "problem": "Find the unknown pH using Henderson-Hasselbalch Equation with: pH = 10, pKa = 10, ratio = 10.",
    "solution": [
      "Identify known quantities and the target (pH).",
      "Write the formula and solve for pH.",
      "Substitute the values: pH = 10, pKa = 10, ratio = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "pH = computed result (run Solve mode to see the exact value)"
  }
},

  "titration-equivalence": {
  "intuition": "Titration Equivalence Point calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "C1",
      "siUnit": "mol/L",
      "altUnits": "",
      "description": "Concentration of Analyte",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V1",
      "siUnit": "mL",
      "altUnits": "",
      "description": "Volume of Analyte",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "C2",
      "siUnit": "mol/L",
      "altUnits": "",
      "description": "Concentration of Titrant",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V2",
      "siUnit": "mL",
      "altUnits": "",
      "description": "Volume of Titrant",
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
    "problem": "Find the unknown C1 using Titration Equivalence Point with: C1 = 10, V1 = 10, C2 = 10.",
    "solution": [
      "Identify known quantities and the target (C1).",
      "Write the formula and solve for C1.",
      "Substitute the values: C1 = 10, V1 = 10, C2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "C1 = computed result (run Solve mode to see the exact value)"
  }
},

  "delta-g": {
  "intuition": "Gibbs Free Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dG",
      "siUnit": "kJ/mol",
      "altUnits": "",
      "description": "Gibbs Free Energy",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dH",
      "siUnit": "kJ/mol",
      "altUnits": "",
      "description": "Enthalpy Change",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "dS",
      "siUnit": "kJ/(mol·K)",
      "altUnits": "",
      "description": "Entropy Change",
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
    "problem": "Find the unknown dG using Gibbs Free Energy with: dG = 10, dH = 10, T = 300.",
    "solution": [
      "Identify known quantities and the target (dG).",
      "Write the formula and solve for dG.",
      "Substitute the values: dG = 10, dH = 10, T = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dG = computed result (run Solve mode to see the exact value)"
  }
},

};
