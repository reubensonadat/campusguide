export const physical_chemistry = {
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

  "vanthoff": {
  "intuition": "Van't Hoff Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "K1",
      "siUnit": "",
      "altUnits": "",
      "description": "K at T₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "K2",
      "siUnit": "",
      "altUnits": "",
      "description": "K at T₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T1",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature T₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T2",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature T₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dH",
      "siUnit": "kJ/mol",
      "altUnits": "",
      "description": "Enthalpy Change",
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
    "problem": "Find the unknown K1 using Van't Hoff Equation with: K1 = 10, K2 = 10, T1 = 300.",
    "solution": [
      "Identify known quantities and the target (K1).",
      "Write the formula and solve for K1.",
      "Substitute the values: K1 = 10, K2 = 10, T1 = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "K1 = computed result (run Solve mode to see the exact value)"
  }
},

  "clausius-clapeyron": {
  "intuition": "Clausius-Clapeyron Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P1",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Pressure P₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P2",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Pressure P₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T1",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature T₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T2",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature T₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dHvap",
      "siUnit": "kJ/mol",
      "altUnits": "",
      "description": "ΔH_vap",
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
    "problem": "Find the unknown P1 using Clausius-Clapeyron Equation with: P1 = 101325, P2 = 101325, T1 = 300.",
    "solution": [
      "Identify known quantities and the target (P1).",
      "Write the formula and solve for P1.",
      "Substitute the values: P1 = 101325, P2 = 101325, T1 = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P1 = computed result (run Solve mode to see the exact value)"
  }
},

  "nernst": {
  "intuition": "Nernst Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "V",
      "altUnits": "",
      "description": "Cell Potential",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "E0",
      "siUnit": "V",
      "altUnits": "",
      "description": "Standard Potential",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Electrons Transferred",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "Q",
      "siUnit": "",
      "altUnits": "",
      "description": "Reaction Quotient",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
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
    "problem": "Find the unknown E using Nernst Equation with: E = 12, E0 = 12, n = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 12, E0 = 12, n = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

};
