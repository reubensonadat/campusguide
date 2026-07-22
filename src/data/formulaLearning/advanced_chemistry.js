export const advanced_chemistry = {
  "molality": {
  "intuition": "Molality calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "m",
      "siUnit": "mol/kg",
      "altUnits": "",
      "description": "Molality",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "n",
      "siUnit": "mol",
      "altUnits": "",
      "description": "Moles of Solute",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "kg",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Solvent Mass",
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
    "problem": "Find the unknown m using Molality with: m = 10, n = 1, kg = 10.",
    "solution": [
      "Identify known quantities and the target (m).",
      "Write the formula and solve for m.",
      "Substitute the values: m = 10, n = 1, kg = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "m = computed result (run Solve mode to see the exact value)"
  }
},

  "dalton-law": {
  "intuition": "Dalton's Law of Partial Pressures calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Pt",
      "siUnit": "atm",
      "altUnits": "",
      "description": "Total Pressure",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P1",
      "siUnit": "atm",
      "altUnits": "",
      "description": "Partial Pressure P₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P2",
      "siUnit": "atm",
      "altUnits": "",
      "description": "Partial Pressure P₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P3",
      "siUnit": "atm",
      "altUnits": "",
      "description": "Partial Pressure P₃",
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
    "problem": "Find the unknown Pt using Dalton's Law of Partial Pressures with: Pt = 10, P1 = 10, P2 = 10.",
    "solution": [
      "Identify known quantities and the target (Pt).",
      "Write the formula and solve for Pt.",
      "Substitute the values: Pt = 10, P1 = 10, P2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Pt = computed result (run Solve mode to see the exact value)"
  }
},

  "rms-speed": {
  "intuition": "RMS Speed of Gas Molecules calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "RMS Speed",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "T",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "M",
      "siUnit": "kg/mol",
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
    "problem": "Find the unknown v using RMS Speed of Gas Molecules with: v = 9.8, T = 300, M = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, T = 300, M = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "van-der-waals": {
  "intuition": "Van der Waals Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
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
      "id": "n",
      "siUnit": "mol",
      "altUnits": "",
      "description": "Moles",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "T",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temperature",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "a",
      "siUnit": "L²·atm/mol²",
      "altUnits": "",
      "description": "Van der Waals a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "L/mol",
      "altUnits": "",
      "description": "Van der Waals b",
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
    "problem": "Find the unknown P using Van der Waals Equation with: P = 10, V = 10, n = 1.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 10, V = 10, n = 1.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "mass-percent": {
  "intuition": "Mass Percent & PPM calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ms",
      "siUnit": "g",
      "altUnits": "",
      "description": "Mass of Solute",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "mt",
      "siUnit": "g",
      "altUnits": "",
      "description": "Mass of Solution",
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
    "problem": "Find the unknown ms using Mass Percent & PPM with: ms = 10, mt = 10.",
    "solution": [
      "Identify known quantities and the target (ms).",
      "Write the formula and solve for ms.",
      "Substitute the values: ms = 10, mt = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ms = computed result (run Solve mode to see the exact value)"
  }
},

};
