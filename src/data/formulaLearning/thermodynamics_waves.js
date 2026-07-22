export const thermodynamics_waves = {
  "thermal-expansion": {
  "intuition": "Thermal Linear Expansion calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dL",
      "siUnit": "m",
      "altUnits": "",
      "description": "Length Change",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "alpha",
      "siUnit": "1/°C",
      "altUnits": "",
      "description": "Expansion Coeff",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L0",
      "siUnit": "m",
      "altUnits": "",
      "description": "Original Length",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dT",
      "siUnit": "°C",
      "altUnits": "",
      "description": "Temperature Change",
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
    "problem": "Find the unknown dL using Thermal Linear Expansion with: dL = 5, alpha = 10, L0 = 5.",
    "solution": [
      "Identify known quantities and the target (dL).",
      "Write the formula and solve for dL.",
      "Substitute the values: dL = 5, alpha = 10, L0 = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dL = computed result (run Solve mode to see the exact value)"
  }
},

  "latent-heat": {
  "intuition": "Latent Heat (Phase Change) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Q",
      "siUnit": "J",
      "altUnits": "",
      "description": "Heat Energy",
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
      "id": "L",
      "siUnit": "J/kg",
      "altUnits": "",
      "description": "Latent Heat",
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
    "problem": "Find the unknown Q using Latent Heat (Phase Change) with: Q = 100, m = 10, L = 10.",
    "solution": [
      "Identify known quantities and the target (Q).",
      "Write the formula and solve for Q.",
      "Substitute the values: Q = 100, m = 10, L = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Q = computed result (run Solve mode to see the exact value)"
  }
},

  "first-law-thermo": {
  "intuition": "First Law of Thermodynamics calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dU",
      "siUnit": "J",
      "altUnits": "",
      "description": "Internal Energy Change",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Q",
      "siUnit": "J",
      "altUnits": "",
      "description": "Heat Added",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
    },
    {
      "id": "W",
      "siUnit": "J",
      "altUnits": "",
      "description": "Work Done by System",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
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
    "problem": "Find the unknown dU using First Law of Thermodynamics with: dU = 100, Q = 100, W = 100.",
    "solution": [
      "Identify known quantities and the target (dU).",
      "Write the formula and solve for dU.",
      "Substitute the values: dU = 100, Q = 100, W = 100.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dU = computed result (run Solve mode to see the exact value)"
  }
},

  "entropy": {
  "intuition": "Entropy Change calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dS",
      "siUnit": "J/K",
      "altUnits": "",
      "description": "Entropy Change",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Q",
      "siUnit": "J",
      "altUnits": "",
      "description": "Heat Transfer",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
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
    "problem": "Find the unknown dS using Entropy Change with: dS = 10, Q = 100, T = 300.",
    "solution": [
      "Identify known quantities and the target (dS).",
      "Write the formula and solve for dS.",
      "Substitute the values: dS = 10, Q = 100, T = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dS = computed result (run Solve mode to see the exact value)"
  }
},

  "sound-level": {
  "intuition": "Sound Intensity Level (dB) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "beta",
      "siUnit": "dB",
      "altUnits": "",
      "description": "Sound Level",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I",
      "siUnit": "W/m²",
      "altUnits": "",
      "description": "Sound Intensity",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "I0",
      "siUnit": "W/m²",
      "altUnits": "",
      "description": "Reference Intensity",
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
    "problem": "Find the unknown beta using Sound Intensity Level (dB) with: beta = 10, I = 10, I0 = 10.",
    "solution": [
      "Identify known quantities and the target (beta).",
      "Write the formula and solve for beta.",
      "Substitute the values: beta = 10, I = 10, I0 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "beta = computed result (run Solve mode to see the exact value)"
  }
},

  "beat-frequency": {
  "intuition": "Beat Frequency calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "fb",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Beat Frequency",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "f1",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Frequency 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "f2",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Frequency 2",
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
    "problem": "Find the unknown fb using Beat Frequency with: fb = 50, f1 = 50, f2 = 50.",
    "solution": [
      "Identify known quantities and the target (fb).",
      "Write the formula and solve for fb.",
      "Substitute the values: fb = 50, f1 = 50, f2 = 50.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "fb = computed result (run Solve mode to see the exact value)"
  }
},

  "critical-angle": {
  "intuition": "Critical Angle (TIR) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "n1",
      "siUnit": "",
      "altUnits": "",
      "description": "Denser Medium",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "n2",
      "siUnit": "",
      "altUnits": "",
      "description": "Less Dense Medium",
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
    "problem": "Find the unknown n1 using Critical Angle (TIR) with: n1 = 10, n2 = 10.",
    "solution": [
      "Identify known quantities and the target (n1).",
      "Write the formula and solve for n1.",
      "Substitute the values: n1 = 10, n2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "n1 = computed result (run Solve mode to see the exact value)"
  }
},

  "double-slit": {
  "intuition": "Young's Double Slit calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "y",
      "siUnit": "m",
      "altUnits": "",
      "description": "Fringe Spacing",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "lambda",
      "siUnit": "nm",
      "altUnits": "",
      "description": "Wavelength",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Screen Distance",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "d",
      "siUnit": "m",
      "altUnits": "",
      "description": "Slit Separation",
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
    "problem": "Find the unknown y using Young's Double Slit with: y = 5, lambda = 500, L = 5.",
    "solution": [
      "Identify known quantities and the target (y).",
      "Write the formula and solve for y.",
      "Substitute the values: y = 5, lambda = 500, L = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "y = computed result (run Solve mode to see the exact value)"
  }
},

};
