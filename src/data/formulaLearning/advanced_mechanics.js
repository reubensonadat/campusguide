export const advanced_mechanics = {
  "centripetal-force": {
  "intuition": "Centripetal Force calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Centripetal Force",
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
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Tangential Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Radius",
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
    "problem": "Find the unknown F using Centripetal Force with: F = 50, m = 10, v = 9.8.",
    "solution": [
      "Identify known quantities and the target (F).",
      "Write the formula and solve for F.",
      "Substitute the values: F = 50, m = 10, v = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "F = computed result (run Solve mode to see the exact value)"
  }
},

  "torque": {
  "intuition": "Torque calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "tau",
      "siUnit": "N·m",
      "altUnits": "",
      "description": "Torque",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Lever Arm",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle between r and F",
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
    "problem": "Find the unknown tau using Torque with: tau = 10, r = 5, F = 50.",
    "solution": [
      "Identify known quantities and the target (tau).",
      "Write the formula and solve for tau.",
      "Substitute the values: tau = 10, r = 5, F = 50.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "tau = computed result (run Solve mode to see the exact value)"
  }
},

  "angular-momentum": {
  "intuition": "Angular Momentum calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "L",
      "siUnit": "kg·m²/s",
      "altUnits": "",
      "description": "Angular Momentum",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "I",
      "siUnit": "kg·m²",
      "altUnits": "",
      "description": "Moment of Inertia",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "omega",
      "siUnit": "rad/s",
      "altUnits": "",
      "description": "Angular Velocity",
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
    "problem": "Find the unknown L using Angular Momentum with: L = 10, I = 10, omega = 10.",
    "solution": [
      "Identify known quantities and the target (L).",
      "Write the formula and solve for L.",
      "Substitute the values: L = 10, I = 10, omega = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "L = computed result (run Solve mode to see the exact value)"
  }
},

  "rocket-equation": {
  "intuition": "Tsiolkovsky Rocket Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "dv",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Delta-v",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "ve",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Exhaust Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "m0",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Initial Mass",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "mf",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Final Mass",
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
    "problem": "Find the unknown dv using Tsiolkovsky Rocket Equation with: dv = 9.8, ve = 9.8, m0 = 10.",
    "solution": [
      "Identify known quantities and the target (dv).",
      "Write the formula and solve for dv.",
      "Substitute the values: dv = 9.8, ve = 9.8, m0 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "dv = computed result (run Solve mode to see the exact value)"
  }
},

  "pendulum-period": {
  "intuition": "Simple Pendulum calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Period",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "Length",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "g",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Gravity",
      "commonTraps": "g = 9.81 m/s� is an average. Use local g for high-precision work."
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
    "problem": "Find the unknown T using Simple Pendulum with: T = 2, L = 5, g = 10.",
    "solution": [
      "Identify known quantities and the target (T).",
      "Write the formula and solve for T.",
      "Substitute the values: T = 2, L = 5, g = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "T = computed result (run Solve mode to see the exact value)"
  }
},

  "conical-pendulum": {
  "intuition": "Conical Pendulum calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Period",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "L",
      "siUnit": "m",
      "altUnits": "",
      "description": "String Length",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle from Vertical",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
    },
    {
      "id": "g",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Gravity",
      "commonTraps": "g = 9.81 m/s� is an average. Use local g for high-precision work."
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
    "problem": "Find the unknown T using Conical Pendulum with: T = 2, L = 5, theta = 10.",
    "solution": [
      "Identify known quantities and the target (T).",
      "Write the formula and solve for T.",
      "Substitute the values: T = 2, L = 5, theta = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "T = computed result (run Solve mode to see the exact value)"
  }
},

  "banked-curve": {
  "intuition": "Banked Curve (No Friction) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Optimal Speed",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Curve Radius",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Bank Angle",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
    },
    {
      "id": "g",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Gravity",
      "commonTraps": "g = 9.81 m/s� is an average. Use local g for high-precision work."
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
    "problem": "Find the unknown v using Banked Curve (No Friction) with: v = 9.8, r = 5, theta = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, r = 5, theta = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "moment-of-inertia": {
  "intuition": "Moment of Inertia calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "I",
      "siUnit": "kg·m²",
      "altUnits": "",
      "description": "Moment of Inertia",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "r",
      "siUnit": "m",
      "altUnits": "",
      "description": "Radius / Length",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "k",
      "siUnit": "",
      "altUnits": "",
      "description": "Shape Factor",
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
    "problem": "Find the unknown I using Moment of Inertia with: I = 10, m = 10, r = 5.",
    "solution": [
      "Identify known quantities and the target (I).",
      "Write the formula and solve for I.",
      "Substitute the values: I = 10, m = 10, r = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "I = computed result (run Solve mode to see the exact value)"
  }
},

  "terminal-velocity": {
  "intuition": "Terminal Velocity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "vt",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Terminal Velocity",
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
      "id": "rho",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Fluid Density",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Cross-section Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "Cd",
      "siUnit": "",
      "altUnits": "",
      "description": "Drag Coefficient",
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
    "problem": "Find the unknown vt using Terminal Velocity with: vt = 9.8, m = 10, rho = 10.",
    "solution": [
      "Identify known quantities and the target (vt).",
      "Write the formula and solve for vt.",
      "Substitute the values: vt = 9.8, m = 10, rho = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "vt = computed result (run Solve mode to see the exact value)"
  }
},

  "drag-force": {
  "intuition": "Drag Force calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Fd",
      "siUnit": "N",
      "altUnits": "",
      "description": "Drag Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "rho",
      "siUnit": "kg/m³",
      "altUnits": "",
      "description": "Fluid Density",
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
      "id": "Cd",
      "siUnit": "",
      "altUnits": "",
      "description": "Drag Coefficient",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown Fd using Drag Force with: Fd = 50, rho = 10, v = 9.8.",
    "solution": [
      "Identify known quantities and the target (Fd).",
      "Write the formula and solve for Fd.",
      "Substitute the values: Fd = 50, rho = 10, v = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Fd = computed result (run Solve mode to see the exact value)"
  }
},

};
