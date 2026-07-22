export const essential_conversions = {
  "temp-conversion": {
  "intuition": "Temperature Conversion calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "C",
      "siUnit": "°C",
      "altUnits": "",
      "description": "Celsius",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "F",
      "siUnit": "°F",
      "altUnits": "",
      "description": "Fahrenheit",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "K",
      "siUnit": "K",
      "altUnits": "",
      "description": "Kelvin",
      "commonTraps": "Equilibrium constant (dimensionless) vs thermal conductivity (W/(m�K))."
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
    "problem": "Find the unknown C using Temperature Conversion with: C = 10, F = 10, K = 300.",
    "solution": [
      "Identify known quantities and the target (C).",
      "Write the formula and solve for C.",
      "Substitute the values: C = 10, F = 10, K = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "C = computed result (run Solve mode to see the exact value)"
  }
},

  "speed-distance-time": {
  "intuition": "Speed / Distance / Time calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Speed",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "d",
      "siUnit": "m",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
    },
    {
      "id": "t",
      "siUnit": "s",
      "altUnits": "",
      "description": "Time",
      "commonTraps": "Use consistent time units throughout � convert minutes/hours to seconds."
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
    "problem": "Find the unknown v using Speed / Distance / Time with: v = 9.8, d = 5, t = 2.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, d = 5, t = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "photon-energy": {
  "intuition": "Photon Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "eV",
      "altUnits": "",
      "description": "Energy",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "f",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Frequency",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "lambda",
      "siUnit": "nm",
      "altUnits": "",
      "description": "Wavelength",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
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
    "problem": "Find the unknown E using Photon Energy with: E = 2, f = 50, lambda = 500.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 2, f = 50, lambda = 500.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "mass-defect": {
  "intuition": "Mass Defect & Binding Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Z",
      "siUnit": "",
      "altUnits": "",
      "description": "Protons",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Neutrons",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
    },
    {
      "id": "M",
      "siUnit": "u",
      "altUnits": "",
      "description": "Actual Mass",
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
    "problem": "Find the unknown Z using Mass Defect & Binding Energy with: Z = 10, N = 10, M = 10.",
    "solution": [
      "Identify known quantities and the target (Z).",
      "Write the formula and solve for Z.",
      "Substitute the values: Z = 10, N = 10, M = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Z = computed result (run Solve mode to see the exact value)"
  }
},

};
