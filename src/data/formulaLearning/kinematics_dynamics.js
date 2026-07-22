export const kinematics_dynamics = {
  "kinematics-v": {
  "intuition": "Kinematics: Velocity-Time calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Final Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "v0",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Initial Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "a",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Acceleration",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown v using Kinematics: Velocity-Time with: v = 9.8, v0 = 9.8, a = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, v0 = 9.8, a = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "kinematics-x": {
  "intuition": "Kinematics: Position-Time calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "x",
      "siUnit": "m",
      "altUnits": "",
      "description": "Final Position",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x0",
      "siUnit": "m",
      "altUnits": "",
      "description": "Initial Position",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "v0",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Initial Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "a",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Acceleration",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown x using Kinematics: Position-Time with: x = 5, x0 = 5, v0 = 9.8.",
    "solution": [
      "Identify known quantities and the target (x).",
      "Write the formula and solve for x.",
      "Substitute the values: x = 5, x0 = 5, v0 = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "x = computed result (run Solve mode to see the exact value)"
  }
},

  "kinematics-v2": {
  "intuition": "Kinematics: Velocity-Position calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Final Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "v0",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Initial Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "a",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Acceleration",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dx",
      "siUnit": "m",
      "altUnits": "",
      "description": "Displacement",
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
    "problem": "Find the unknown v using Kinematics: Velocity-Position with: v = 9.8, v0 = 9.8, a = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, v0 = 9.8, a = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "weight": {
  "intuition": "Weight / Gravitational Force calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "W",
      "siUnit": "N",
      "altUnits": "",
      "description": "Weight",
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
    "problem": "Find the unknown W using Weight / Gravitational Force with: W = 50, m = 10, g = 10.",
    "solution": [
      "Identify known quantities and the target (W).",
      "Write the formula and solve for W.",
      "Substitute the values: W = 50, m = 10, g = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "W = computed result (run Solve mode to see the exact value)"
  }
},

  "friction": {
  "intuition": "Friction Forces calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "mu_s",
      "siUnit": "",
      "altUnits": "",
      "description": "Static Friction Coeff",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "mu_k",
      "siUnit": "",
      "altUnits": "",
      "description": "Kinetic Friction Coeff",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "N",
      "siUnit": "N",
      "altUnits": "",
      "description": "Normal Force",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
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
    "problem": "Find the unknown mu_s using Friction Forces with: mu_s = 10, mu_k = 10, N = 50.",
    "solution": [
      "Identify known quantities and the target (mu_s).",
      "Write the formula and solve for mu_s.",
      "Substitute the values: mu_s = 10, mu_k = 10, N = 50.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "mu_s = computed result (run Solve mode to see the exact value)"
  }
},

  "hookes-law": {
  "intuition": "Hooke's Law (Spring Force) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Spring Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "k",
      "siUnit": "N/m",
      "altUnits": "",
      "description": "Spring Constant",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "x",
      "siUnit": "m",
      "altUnits": "",
      "description": "Displacement",
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
    "problem": "Find the unknown F using Hooke's Law (Spring Force) with: F = 50, k = 10, x = 5.",
    "solution": [
      "Identify known quantities and the target (F).",
      "Write the formula and solve for F.",
      "Substitute the values: F = 50, k = 10, x = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "F = computed result (run Solve mode to see the exact value)"
  }
},

  "center-of-mass": {
  "intuition": "Center of Mass (2 Particles) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "xcm",
      "siUnit": "m",
      "altUnits": "",
      "description": "Center of Mass",
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
      "id": "x1",
      "siUnit": "m",
      "altUnits": "",
      "description": "Position 1",
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
      "id": "x2",
      "siUnit": "m",
      "altUnits": "",
      "description": "Position 2",
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
    "problem": "Find the unknown xcm using Center of Mass (2 Particles) with: xcm = 5, m1 = 10, x1 = 5.",
    "solution": [
      "Identify known quantities and the target (xcm).",
      "Write the formula and solve for xcm.",
      "Substitute the values: xcm = 5, m1 = 10, x1 = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "xcm = computed result (run Solve mode to see the exact value)"
  }
},

};
