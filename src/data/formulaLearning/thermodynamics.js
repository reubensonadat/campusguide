export const thermodynamics = {
  "ideal-gas": {
  "intuition": "Ideal Gas Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Pressure",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "V",
      "siUnit": "m³",
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
    },
    {
      "title": "Non-Ideal Behavior",
      "description": "Real gases deviate at high pressure (>10 atm) and low temperature (near condensation point). Use van der Waals equation for accuracy."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown P using Ideal Gas Law with: P = 101325, V = 10, n = 1.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 101325, V = 10, n = 1.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "heat-transfer": {
  "intuition": "Heat Transfer (Specific Heat) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Q",
      "siUnit": "J",
      "altUnits": "",
      "description": "Heat",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "c",
      "siUnit": "J/(kg·K)",
      "altUnits": "",
      "description": "Specific Heat",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dT",
      "siUnit": "K",
      "altUnits": "",
      "description": "Temp Change",
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
    "problem": "Find the unknown Q using Heat Transfer (Specific Heat) with: Q = 100, m = 10, c = 10.",
    "solution": [
      "Identify known quantities and the target (Q).",
      "Write the formula and solve for Q.",
      "Substitute the values: Q = 100, m = 10, c = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Q = computed result (run Solve mode to see the exact value)"
  }
},

  "carnot": {
  "intuition": "Carnot Efficiency calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "eta",
      "siUnit": "",
      "altUnits": "",
      "description": "Efficiency",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Tc",
      "siUnit": "K",
      "altUnits": "",
      "description": "Cold Temp",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Th",
      "siUnit": "K",
      "altUnits": "",
      "description": "Hot Temp",
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
    "problem": "Find the unknown eta using Carnot Efficiency with: eta = 10, Tc = 300, Th = 300.",
    "solution": [
      "Identify known quantities and the target (eta).",
      "Write the formula and solve for eta.",
      "Substitute the values: eta = 10, Tc = 300, Th = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "eta = computed result (run Solve mode to see the exact value)"
  }
},

  "stefan-boltzmann": {
  "intuition": "Stefan-Boltzmann Radiation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "W",
      "altUnits": "",
      "description": "Power",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "e",
      "siUnit": "",
      "altUnits": "",
      "description": "Emissivity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
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
    "problem": "Find the unknown P using Stefan-Boltzmann Radiation with: P = 100, e = 10, A = 10.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 100, e = 10, A = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

};
