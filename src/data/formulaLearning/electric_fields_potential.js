export const electric_fields_potential = {
  "electric-field": {
  "intuition": "Electric Field (Point Charge) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "N/C",
      "altUnits": "",
      "description": "Electric Field",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "Q",
      "siUnit": "C",
      "altUnits": "",
      "description": "Charge",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Distance",
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
    "problem": "Find the unknown E using Electric Field (Point Charge) with: E = 10, Q = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 10, Q = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "electric-potential": {
  "intuition": "Electric Potential calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "V",
      "siUnit": "V",
      "altUnits": "",
      "description": "Electric Potential",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Q",
      "siUnit": "C",
      "altUnits": "",
      "description": "Charge",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Distance",
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
    "problem": "Find the unknown V using Electric Potential with: V = 12, Q = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (V).",
      "Write the formula and solve for V.",
      "Substitute the values: V = 12, Q = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "V = computed result (run Solve mode to see the exact value)"
  }
},

  "parallel-plate-cap": {
  "intuition": "Parallel Plate Capacitor calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "C",
      "siUnit": "F",
      "altUnits": "",
      "description": "Capacitance",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Plate Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "d",
      "siUnit": "m",
      "altUnits": "",
      "description": "Plate Separation",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
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
    "problem": "Find the unknown C using Parallel Plate Capacitor with: C = 0.001, A = 10, d = 5.",
    "solution": [
      "Identify known quantities and the target (C).",
      "Write the formula and solve for C.",
      "Substitute the values: C = 0.001, A = 10, d = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "C = computed result (run Solve mode to see the exact value)"
  }
},

  "resistivity": {
  "intuition": "Resistance from Resistivity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "rho",
      "siUnit": "Ω·m",
      "altUnits": "",
      "description": "Resistivity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Length",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Cross-section Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
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
    "problem": "Find the unknown R using Resistance from Resistivity with: R = 10, rho = 10, L = 5.",
    "solution": [
      "Identify known quantities and the target (R).",
      "Write the formula and solve for R.",
      "Substitute the values: R = 10, rho = 10, L = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "R = computed result (run Solve mode to see the exact value)"
  }
},

  "series-parallel-cap": {
  "intuition": "Series/Parallel Capacitance calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "type",
      "siUnit": "",
      "altUnits": "",
      "description": "0=Series, 1=Parallel",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c1",
      "siUnit": "F",
      "altUnits": "",
      "description": "C₁",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c2",
      "siUnit": "F",
      "altUnits": "",
      "description": "C₂",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c3",
      "siUnit": "F",
      "altUnits": "",
      "description": "C₃",
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
    "problem": "Find the unknown type using Series/Parallel Capacitance with: type = 10, c1 = 0.001, c2 = 0.001.",
    "solution": [
      "Identify known quantities and the target (type).",
      "Write the formula and solve for type.",
      "Substitute the values: type = 10, c1 = 0.001, c2 = 0.001.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "type = computed result (run Solve mode to see the exact value)"
  }
},

  "motional-emf": {
  "intuition": "Motional EMF calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "emf",
      "siUnit": "V",
      "altUnits": "",
      "description": "Induced EMF",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "B",
      "siUnit": "T",
      "altUnits": "",
      "description": "Magnetic Field",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Conductor Length",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
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
    "problem": "Find the unknown emf using Motional EMF with: emf = 12, B = 10, L = 5.",
    "solution": [
      "Identify known quantities and the target (emf).",
      "Write the formula and solve for emf.",
      "Substitute the values: emf = 12, B = 10, L = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "emf = computed result (run Solve mode to see the exact value)"
  }
},

};
