export const civil_structural_engineering = {
  "stress": {
  "intuition": "Stress (Normal) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "sigma",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Stress",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
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
    "problem": "Find the unknown sigma using Stress (Normal) with: sigma = 101325, F = 50, A = 10.",
    "solution": [
      "Identify known quantities and the target (sigma).",
      "Write the formula and solve for sigma.",
      "Substitute the values: sigma = 101325, F = 50, A = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "sigma = computed result (run Solve mode to see the exact value)"
  }
},

  "strain": {
  "intuition": "Strain calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "epsilon",
      "siUnit": "",
      "altUnits": "",
      "description": "Strain",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dL",
      "siUnit": "m",
      "altUnits": "",
      "description": "Change in Length",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L0",
      "siUnit": "m",
      "altUnits": "",
      "description": "Original Length",
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
    "problem": "Find the unknown epsilon using Strain with: epsilon = 10, dL = 5, L0 = 5.",
    "solution": [
      "Identify known quantities and the target (epsilon).",
      "Write the formula and solve for epsilon.",
      "Substitute the values: epsilon = 10, dL = 5, L0 = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "epsilon = computed result (run Solve mode to see the exact value)"
  }
},

  "euler-buckling": {
  "intuition": "Euler's Buckling Load calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Pcr",
      "siUnit": "N",
      "altUnits": "",
      "description": "Critical Load",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "E",
      "siUnit": "Pa",
      "altUnits": "",
      "description": "Young's Modulus",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "I",
      "siUnit": "m⁴",
      "altUnits": "",
      "description": "Area Moment",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "K",
      "siUnit": "",
      "altUnits": "",
      "description": "Column Eff Length Factor",
      "commonTraps": "Equilibrium constant (dimensionless) vs thermal conductivity (W/(m�K))."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Column Length",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
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
    "problem": "Find the unknown Pcr using Euler's Buckling Load with: Pcr = 50, E = 101325, I = 10.",
    "solution": [
      "Identify known quantities and the target (Pcr).",
      "Write the formula and solve for Pcr.",
      "Substitute the values: Pcr = 50, E = 101325, I = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Pcr = computed result (run Solve mode to see the exact value)"
  }
},

  "soil-porosity": {
  "intuition": "Soil Porosity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Porosity",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "Vv",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume of Voids",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vt",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Total Volume",
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
    "problem": "Find the unknown n using Soil Porosity with: n = 10, Vv = 10, Vt = 10.",
    "solution": [
      "Identify known quantities and the target (n).",
      "Write the formula and solve for n.",
      "Substitute the values: n = 10, Vv = 10, Vt = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "n = computed result (run Solve mode to see the exact value)"
  }
},

  "soil-void-ratio": {
  "intuition": "Soil Void Ratio calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "e",
      "siUnit": "",
      "altUnits": "",
      "description": "Void Ratio",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vv",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume of Voids",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vs",
      "siUnit": "m³",
      "altUnits": "",
      "description": "Volume of Solids",
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
    "problem": "Find the unknown e using Soil Void Ratio with: e = 10, Vv = 10, Vs = 10.",
    "solution": [
      "Identify known quantities and the target (e).",
      "Write the formula and solve for e.",
      "Substitute the values: e = 10, Vv = 10, Vs = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "e = computed result (run Solve mode to see the exact value)"
  }
},

  "bending-stress": {
  "intuition": "Bending Stress (Beams) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "sigma",
      "siUnit": "MPa",
      "altUnits": "",
      "description": "Bending Stress",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "M",
      "siUnit": "kN·m",
      "altUnits": "",
      "description": "Bending Moment",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "y",
      "siUnit": "mm",
      "altUnits": "",
      "description": "Distance from Neutral Axis",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I",
      "siUnit": "mm⁴",
      "altUnits": "",
      "description": "Moment of Inertia",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
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
    "problem": "Find the unknown sigma using Bending Stress (Beams) with: sigma = 10, M = 10, y = 10.",
    "solution": [
      "Identify known quantities and the target (sigma).",
      "Write the formula and solve for sigma.",
      "Substitute the values: sigma = 10, M = 10, y = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "sigma = computed result (run Solve mode to see the exact value)"
  }
},

  "deflection-beam": {
  "intuition": "Beam Deflection (Simply Supported, Point Load) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "delta",
      "siUnit": "mm",
      "altUnits": "",
      "description": "Max Deflection",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P",
      "siUnit": "kN",
      "altUnits": "",
      "description": "Point Load",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Span Length",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "E",
      "siUnit": "GPa",
      "altUnits": "",
      "description": "Young's Modulus",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "I",
      "siUnit": "mm⁴",
      "altUnits": "",
      "description": "Moment of Inertia",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
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
    "problem": "Find the unknown delta using Beam Deflection (Simply Supported, Point Load) with: delta = 10, P = 10, L = 5.",
    "solution": [
      "Identify known quantities and the target (delta).",
      "Write the formula and solve for delta.",
      "Substitute the values: delta = 10, P = 10, L = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "delta = computed result (run Solve mode to see the exact value)"
  }
},

  "young-modulus": {
  "intuition": "Young's Modulus (Stress-Strain) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "GPa",
      "altUnits": "",
      "description": "Young's Modulus",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "sigma",
      "siUnit": "MPa",
      "altUnits": "",
      "description": "Stress",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "eps",
      "siUnit": "",
      "altUnits": "",
      "description": "Strain",
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
    "problem": "Find the unknown E using Young's Modulus (Stress-Strain) with: E = 10, sigma = 10, eps = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 10, sigma = 10, eps = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "safety-factor": {
  "intuition": "Factor of Safety calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "FoS",
      "siUnit": "",
      "altUnits": "",
      "description": "Factor of Safety",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "sU",
      "siUnit": "MPa",
      "altUnits": "",
      "description": "Ultimate Strength",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "sA",
      "siUnit": "MPa",
      "altUnits": "",
      "description": "Allowable Stress",
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
    "problem": "Find the unknown FoS using Factor of Safety with: FoS = 10, sU = 10, sA = 10.",
    "solution": [
      "Identify known quantities and the target (FoS).",
      "Write the formula and solve for FoS.",
      "Substitute the values: FoS = 10, sU = 10, sA = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "FoS = computed result (run Solve mode to see the exact value)"
  }
},

};
