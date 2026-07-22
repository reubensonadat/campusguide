export const biochemistry_molecular_biology = {
  "michaelis-menten": {
  "intuition": "Michaelis-Menten Kinetics calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "µM/min",
      "altUnits": "",
      "description": "Reaction Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "Vmax",
      "siUnit": "µM/min",
      "altUnits": "",
      "description": "Max Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "S",
      "siUnit": "µM",
      "altUnits": "",
      "description": "Substrate Concentration",
      "commonTraps": "Entropy (J/K) vs Svedberg unit vs slope � context dependent."
    },
    {
      "id": "Km",
      "siUnit": "µM",
      "altUnits": "",
      "description": "Michaelis Constant",
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
    "problem": "Find the unknown v using Michaelis-Menten Kinetics with: v = 10, Vmax = 10, S = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 10, Vmax = 10, S = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "dna-gc-content": {
  "intuition": "DNA GC Content calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "GC",
      "siUnit": "%",
      "altUnits": "",
      "description": "GC Content",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A",
      "siUnit": "",
      "altUnits": "",
      "description": "Adenine Count",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "T",
      "siUnit": "",
      "altUnits": "",
      "description": "Thymine Count",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "G",
      "siUnit": "",
      "altUnits": "",
      "description": "Guanine Count",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "C",
      "siUnit": "",
      "altUnits": "",
      "description": "Cytosine Count",
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
    "problem": "Find the unknown GC using DNA GC Content with: GC = 5, A = 10, T = 10.",
    "solution": [
      "Identify known quantities and the target (GC).",
      "Write the formula and solve for GC.",
      "Substitute the values: GC = 5, A = 10, T = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "GC = computed result (run Solve mode to see the exact value)"
  }
},

  "charged-aa": {
  "intuition": "Protein Net Charge (Henderson-Hasselbalch) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "pH",
      "siUnit": "",
      "altUnits": "",
      "description": "Solution pH",
      "commonTraps": "pOH + pH = 14 at 25�C. This changes with temperature."
    },
    {
      "id": "pKa",
      "siUnit": "",
      "altUnits": "",
      "description": "pKa of ionizable group",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "z",
      "siUnit": "",
      "altUnits": "",
      "description": "Charge of group when protonated",
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
    "problem": "Find the unknown pH using Protein Net Charge (Henderson-Hasselbalch) with: pH = 10, pKa = 10, z = 10.",
    "solution": [
      "Identify known quantities and the target (pH).",
      "Write the formula and solve for pH.",
      "Substitute the values: pH = 10, pKa = 10, z = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "pH = computed result (run Solve mode to see the exact value)"
  }
},

  "cell-potential": {
  "intuition": "Membrane Potential (Nernst) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "mV",
      "altUnits": "",
      "description": "Equilibrium Potential",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "z",
      "siUnit": "",
      "altUnits": "",
      "description": "Ion Valence",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "ratio",
      "siUnit": "",
      "altUnits": "",
      "description": "[out]/[in] Ratio",
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
    "problem": "Find the unknown E using Membrane Potential (Nernst) with: E = 10, z = 10, ratio = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 10, z = 10, ratio = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

};
