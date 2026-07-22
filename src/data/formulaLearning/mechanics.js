export const mechanics = {
  "projectile-motion": {
  "intuition": "Projectile Motion (Full) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "R",
      "siUnit": "m",
      "altUnits": "",
      "description": "Range",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "H",
      "siUnit": "m",
      "altUnits": "",
      "description": "Max Height",
      "commonTraps": "Enthalpy (J) vs magnetic field (A/m) vs height (m)."
    },
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Flight Time",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Initial Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Launch Angle",
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
    },
    {
      "title": "Degenerate Launch Angle",
      "description": "At ? = 0� or 90�, sin2? = 0 and the range formula breaks down. No horizontal range at vertical launch."
    }
  ],
  "walkthroughExample": {
    "problem": "Find the unknown R using Projectile Motion (Full) with: R = 5, H = 5, T = 2.",
    "solution": [
      "Identify known quantities and the target (R).",
      "Write the formula and solve for R.",
      "Substitute the values: R = 5, H = 5, T = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "R = computed result (run Solve mode to see the exact value)"
  }
},

  "relativistic-energy": {
  "intuition": "Relativistic Energy-Momentum calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "J",
      "altUnits": "",
      "description": "Total Energy",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "p",
      "siUnit": "kg·m/s",
      "altUnits": "",
      "description": "Momentum",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "m0",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Rest Mass",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown E using Relativistic Energy-Momentum with: E = 100, p = 10, m0 = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 100, p = 10, m0 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "elastic-collision": {
  "intuition": "1D Elastic Collision calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "m1",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "m2",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v1i",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Initial Vel 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v2i",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Initial Vel 2",
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
    "problem": "Find the unknown m1 using 1D Elastic Collision with: m1 = 10, m2 = 10, v1i = 9.8.",
    "solution": [
      "Identify known quantities and the target (m1).",
      "Write the formula and solve for m1.",
      "Substitute the values: m1 = 10, m2 = 10, v1i = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "m1 = computed result (run Solve mode to see the exact value)"
  }
},

  "shm": {
  "intuition": "Simple Harmonic Motion calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "A",
      "siUnit": "m",
      "altUnits": "",
      "description": "Amplitude",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "omega",
      "siUnit": "rad/s",
      "altUnits": "",
      "description": "Angular Freq",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Period",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "f",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Frequency",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "k",
      "siUnit": "N/m",
      "altUnits": "",
      "description": "Spring Const",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown A using Simple Harmonic Motion with: A = 5, omega = 10, T = 2.",
    "solution": [
      "Identify known quantities and the target (A).",
      "Write the formula and solve for A.",
      "Substitute the values: A = 5, omega = 10, T = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "A = computed result (run Solve mode to see the exact value)"
  }
},

  "newtons-second-law": {
  "intuition": "Newton's Second Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Force",
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
      "id": "a",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Acceleration",
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
    "problem": "Find the unknown F using Newton's Second Law with: F = 50, m = 10, a = 10.",
    "solution": [
      "Identify known quantities and the target (F).",
      "Write the formula and solve for F.",
      "Substitute the values: F = 50, m = 10, a = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "F = computed result (run Solve mode to see the exact value)"
  }
},

  "work-energy": {
  "intuition": "Work-Energy Theorem calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "W",
      "siUnit": "J",
      "altUnits": "",
      "description": "Net Work",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "v1",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Initial Vel",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v2",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Final Vel",
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
    "problem": "Find the unknown W using Work-Energy Theorem with: W = 100, m = 10, v1 = 9.8.",
    "solution": [
      "Identify known quantities and the target (W).",
      "Write the formula and solve for W.",
      "Substitute the values: W = 100, m = 10, v1 = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "W = computed result (run Solve mode to see the exact value)"
  }
},

  "gravitation": {
  "intuition": "Universal Gravitation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "m1",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "m2",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass 2",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown F using Universal Gravitation with: F = 50, m1 = 10, m2 = 10.",
    "solution": [
      "Identify known quantities and the target (F).",
      "Write the formula and solve for F.",
      "Substitute the values: F = 50, m1 = 10, m2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "F = computed result (run Solve mode to see the exact value)"
  }
},

};
