export const general_chemistry = {
  "density": {
  "intuition": "Density / Mass / Volume calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "rho",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Density",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "V",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume",
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
    "problem": "Find the unknown rho using Density / Mass / Volume with: rho = 10, m = 10, V = 10.",
    "solution": [
      "Identify known quantities and the target (rho).",
      "Write the formula and solve for rho.",
      "Substitute the values: rho = 10, m = 10, V = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "rho = computed result (run Solve mode to see the exact value)"
  }
},

  "moles-calc": {
  "intuition": "Moles & Molar Mass calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "n",
      "siUnit": "mol",
      "altUnits": "",
      "description": "Moles",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "m",
      "siUnit": "g",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "M",
      "siUnit": "g/mol",
      "altUnits": "",
      "description": "Molar Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
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
    "problem": "Find the unknown n using Moles & Molar Mass with: n = 1, m = 10, M = 10.",
    "solution": [
      "Identify known quantities and the target (n).",
      "Write the formula and solve for n.",
      "Substitute the values: n = 1, m = 10, M = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "n = computed result (run Solve mode to see the exact value)"
  }
},

  "molarity": {
  "intuition": "Molarity (M) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M",
      "siUnit": "mol/L",
      "altUnits": "",
      "description": "Molarity",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "n",
      "siUnit": "mol",
      "altUnits": "",
      "description": "Moles of Solute",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "V",
      "siUnit": "L",
      "altUnits": "",
      "description": "Volume of Solution",
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
    "problem": "Find the unknown M using Molarity (M) with: M = 10, n = 1, V = 10.",
    "solution": [
      "Identify known quantities and the target (M).",
      "Write the formula and solve for M.",
      "Substitute the values: M = 10, n = 1, V = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M = computed result (run Solve mode to see the exact value)"
  }
},

  "percent-yield": {
  "intuition": "Percent Yield & Error calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "actual",
      "siUnit": "",
      "altUnits": "",
      "description": "Actual/Experimental Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "theoretical",
      "siUnit": "",
      "altUnits": "",
      "description": "Theoretical/Accepted Value",
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
    "problem": "Find the unknown actual using Percent Yield & Error with: actual = 10, theoretical = 10.",
    "solution": [
      "Identify known quantities and the target (actual).",
      "Write the formula and solve for actual.",
      "Substitute the values: actual = 10, theoretical = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "actual = computed result (run Solve mode to see the exact value)"
  }
},

  "boyle-law": {
  "intuition": "Boyle's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P1",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Initial Pressure",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V1",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Initial Volume",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P2",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Final Pressure",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V2",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Final Volume",
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
    "problem": "Find the unknown P1 using Boyle's Law with: P1 = 101325, V1 = 10, P2 = 101325.",
    "solution": [
      "Identify known quantities and the target (P1).",
      "Write the formula and solve for P1.",
      "Substitute the values: P1 = 101325, V1 = 10, P2 = 101325.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P1 = computed result (run Solve mode to see the exact value)"
  }
},

  "charles-law": {
  "intuition": "Charles's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "V1",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Initial Volume",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T1",
      "siUnit": "K",
      "altUnits": "",
      "description": "Initial Temp",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V2",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Final Volume",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T2",
      "siUnit": "K",
      "altUnits": "",
      "description": "Final Temp",
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
    "problem": "Find the unknown V1 using Charles's Law with: V1 = 10, T1 = 300, V2 = 10.",
    "solution": [
      "Identify known quantities and the target (V1).",
      "Write the formula and solve for V1.",
      "Substitute the values: V1 = 10, T1 = 300, V2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "V1 = computed result (run Solve mode to see the exact value)"
  }
},

  "combined-gas": {
  "intuition": "Combined Gas Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P1",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "P₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V1",
      "siUnit": "m³",
      "altUnits": "",
      "description": "V₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T1",
      "siUnit": "K",
      "altUnits": "",
      "description": "T₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P2",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "P₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V2",
      "siUnit": "m³",
      "altUnits": "",
      "description": "V₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T2",
      "siUnit": "K",
      "altUnits": "",
      "description": "T₂",
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
    "problem": "Find the unknown P1 using Combined Gas Law with: P1 = 101325, V1 = 10, T1 = 300.",
    "solution": [
      "Identify known quantities and the target (P1).",
      "Write the formula and solve for P1.",
      "Substitute the values: P1 = 101325, V1 = 10, T1 = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P1 = computed result (run Solve mode to see the exact value)"
  }
},

  "gibbs-free": {
  "intuition": "Gibbs Free Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dG",
      "siUnit": "kJ",
      "altUnits": "",
      "description": "Gibbs Free Energy",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dH",
      "siUnit": "kJ",
      "altUnits": "",
      "description": "Enthalpy",
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
      "siUnit": "kJ/K",
      "altUnits": "",
      "description": "Entropy",
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

  "arrhenius": {
  "intuition": "Arrhenius Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "k",
      "siUnit": "s⁻¹",
      "altUnits": "",
      "description": "Rate Constant",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A",
      "siUnit": "s⁻¹",
      "altUnits": "",
      "description": "Pre-exponential Factor",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "Ea",
      "siUnit": "kJ/mol",
      "altUnits": "",
      "description": "Activation Energy",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
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
    "problem": "Find the unknown k using Arrhenius Equation with: k = 10, A = 10, Ea = 10.",
    "solution": [
      "Identify known quantities and the target (k).",
      "Write the formula and solve for k.",
      "Substitute the values: k = 10, A = 10, Ea = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "k = computed result (run Solve mode to see the exact value)"
  }
},

  "half-life-first": {
  "intuition": "Half-Life (First Order) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "thalf",
      "siUnit": "s",
      "altUnits": "",
      "description": "Half-life",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "k",
      "siUnit": "1/s",
      "altUnits": "",
      "description": "Rate Constant",
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
    "problem": "Find the unknown thalf using Half-Life (First Order) with: thalf = 2, k = 10.",
    "solution": [
      "Identify known quantities and the target (thalf).",
      "Write the formula and solve for thalf.",
      "Substitute the values: thalf = 2, k = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "thalf = computed result (run Solve mode to see the exact value)"
  }
},

  "equilibrium-kc": {
  "intuition": "Equilibrium Constant (Kc) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Kc",
      "siUnit": "",
      "altUnits": "",
      "description": "Equilibrium Constant",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "products",
      "siUnit": "",
      "altUnits": "",
      "description": "[Products]^coeffs",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "reactants",
      "siUnit": "",
      "altUnits": "",
      "description": "[Reactants]^coeffs",
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
    "problem": "Find the unknown Kc using Equilibrium Constant (Kc) with: Kc = 10, products = 10, reactants = 10.",
    "solution": [
      "Identify known quantities and the target (Kc).",
      "Write the formula and solve for Kc.",
      "Substitute the values: Kc = 10, products = 10, reactants = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Kc = computed result (run Solve mode to see the exact value)"
  }
},

  "graham-law": {
  "intuition": "Graham's Law of Effusion calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "rate1",
      "siUnit": "",
      "altUnits": "",
      "description": "Rate of Gas 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "rate2",
      "siUnit": "",
      "altUnits": "",
      "description": "Rate of Gas 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M1",
      "siUnit": "g/mol",
      "altUnits": "",
      "description": "Molar Mass Gas 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M2",
      "siUnit": "g/mol",
      "altUnits": "",
      "description": "Molar Mass Gas 2",
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
    "problem": "Find the unknown rate1 using Graham's Law of Effusion with: rate1 = 10, rate2 = 10, M1 = 10.",
    "solution": [
      "Identify known quantities and the target (rate1).",
      "Write the formula and solve for rate1.",
      "Substitute the values: rate1 = 10, rate2 = 10, M1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "rate1 = computed result (run Solve mode to see the exact value)"
  }
},

};
