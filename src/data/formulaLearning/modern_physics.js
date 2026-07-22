export const modern_physics = {
  "de-broglie": {
  "intuition": "De Broglie Wavelength calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "lambda",
      "siUnit": "nm",
      "altUnits": "",
      "description": "Wavelength",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
    },
    {
      "id": "p",
      "siUnit": "kg·m/s",
      "altUnits": "",
      "description": "Momentum",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
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
    "problem": "Find the unknown lambda using De Broglie Wavelength with: lambda = 500, p = 10, v = 9.8.",
    "solution": [
      "Identify known quantities and the target (lambda).",
      "Write the formula and solve for lambda.",
      "Substitute the values: lambda = 500, p = 10, v = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "lambda = computed result (run Solve mode to see the exact value)"
  }
},

  "compton": {
  "intuition": "Compton Scattering calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dL",
      "siUnit": "pm",
      "altUnits": "",
      "description": "Wavelength Shift",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Scatter Angle",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
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
    "problem": "Find the unknown dL using Compton Scattering with: dL = 10, theta = 10.",
    "solution": [
      "Identify known quantities and the target (dL).",
      "Write the formula and solve for dL.",
      "Substitute the values: dL = 10, theta = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dL = computed result (run Solve mode to see the exact value)"
  }
},

  "einstein-mass-energy": {
  "intuition": "Mass-Energy Equivalence calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "J",
      "altUnits": "",
      "description": "Energy",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
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
    "problem": "Find the unknown E using Mass-Energy Equivalence with: E = 100, m = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 100, m = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "radioactive-decay": {
  "intuition": "Radioactive Decay Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Remaining Nuclei",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
    },
    {
      "id": "N0",
      "siUnit": "",
      "altUnits": "",
      "description": "Initial Nuclei",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "lambda",
      "siUnit": "s⁻¹",
      "altUnits": "",
      "description": "Decay Constant",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
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
    "problem": "Find the unknown N using Radioactive Decay Law with: N = 10, N0 = 10, lambda = 10.",
    "solution": [
      "Identify known quantities and the target (N).",
      "Write the formula and solve for N.",
      "Substitute the values: N = 10, N0 = 10, lambda = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "N = computed result (run Solve mode to see the exact value)"
  }
},

  "heisenberg": {
  "intuition": "Heisenberg Uncertainty calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dx",
      "siUnit": "m",
      "altUnits": "",
      "description": "Position Uncertainty",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dp",
      "siUnit": "kg·m/s",
      "altUnits": "",
      "description": "Momentum Uncertainty",
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
    "problem": "Find the unknown dx using Heisenberg Uncertainty with: dx = 5, dp = 10.",
    "solution": [
      "Identify known quantities and the target (dx).",
      "Write the formula and solve for dx.",
      "Substitute the values: dx = 5, dp = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dx = computed result (run Solve mode to see the exact value)"
  }
},

};
