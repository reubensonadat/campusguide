export const chemistry = {
  "ph-calc": {
  "intuition": "pH / pOH Calculator calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "pH",
      "siUnit": "",
      "altUnits": "",
      "description": "pH",
      "commonTraps": "pOH + pH = 14 at 25�C. This changes with temperature."
    },
    {
      "id": "pOH",
      "siUnit": "",
      "altUnits": "",
      "description": "pOH",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "H",
      "siUnit": "M",
      "altUnits": "",
      "description": "",
      "commonTraps": "Enthalpy (J) vs magnetic field (A/m) vs height (m)."
    },
    {
      "id": "OH",
      "siUnit": "M",
      "altUnits": "",
      "description": "",
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
    "problem": "Find the unknown pH using pH / pOH Calculator with: pH = 10, pOH = 10, H = 10.",
    "solution": [
      "Identify known quantities and the target (pH).",
      "Write the formula and solve for pH.",
      "Substitute the values: pH = 10, pOH = 10, H = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "pH = computed result (run Solve mode to see the exact value)"
  }
},

  "dilution": {
  "intuition": "Dilution Equation (M₁V₁=M₂V₂) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M1",
      "siUnit": "M",
      "altUnits": "",
      "description": "Initial Conc",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V1",
      "siUnit": "L",
      "altUnits": "",
      "description": "Initial Vol",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M2",
      "siUnit": "M",
      "altUnits": "",
      "description": "Final Conc",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "V2",
      "siUnit": "L",
      "altUnits": "",
      "description": "Final Vol",
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
    "problem": "Find the unknown M1 using Dilution Equation (M₁V₁=M₂V₂) with: M1 = 10, V1 = 10, M2 = 10.",
    "solution": [
      "Identify known quantities and the target (M1).",
      "Write the formula and solve for M1.",
      "Substitute the values: M1 = 10, V1 = 10, M2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M1 = computed result (run Solve mode to see the exact value)"
  }
},

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

  "ideal-gas-molar": {
  "intuition": "Molar Mass from Gas Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M",
      "siUnit": "g/mol",
      "altUnits": "",
      "description": "Molar Mass",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "m",
      "siUnit": "g",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "P",
      "siUnit": "atm",
      "altUnits": "",
      "description": "Pressure",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "V",
      "siUnit": "L",
      "altUnits": "",
      "description": "Volume",
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
    "problem": "Find the unknown M using Molar Mass from Gas Law with: M = 10, m = 10, P = 10.",
    "solution": [
      "Identify known quantities and the target (M).",
      "Write the formula and solve for M.",
      "Substitute the values: M = 10, m = 10, P = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M = computed result (run Solve mode to see the exact value)"
  }
},

};
