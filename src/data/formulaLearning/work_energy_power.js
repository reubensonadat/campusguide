export const work_energy_power = {
  "work-done": {
  "intuition": "Work Done by Force calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "W",
      "siUnit": "J",
      "altUnits": "",
      "description": "Work",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
    },
    {
      "id": "F",
      "siUnit": "N",
      "altUnits": "",
      "description": "Force",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "d",
      "siUnit": "m",
      "altUnits": "",
      "description": "Displacement",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
    },
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle",
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
    "problem": "Find the unknown W using Work Done by Force with: W = 100, F = 50, d = 5.",
    "solution": [
      "Identify known quantities and the target (W).",
      "Write the formula and solve for W.",
      "Substitute the values: W = 100, F = 50, d = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "W = computed result (run Solve mode to see the exact value)"
  }
},

  "kinetic-energy": {
  "intuition": "Kinetic Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "KE",
      "siUnit": "J",
      "altUnits": "",
      "description": "Kinetic Energy",
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
    "problem": "Find the unknown KE using Kinetic Energy with: KE = 100, m = 10, v = 9.8.",
    "solution": [
      "Identify known quantities and the target (KE).",
      "Write the formula and solve for KE.",
      "Substitute the values: KE = 100, m = 10, v = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "KE = computed result (run Solve mode to see the exact value)"
  }
},

  "gpe-local": {
  "intuition": "Gravitational PE (Local) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "PE",
      "siUnit": "J",
      "altUnits": "",
      "description": "Potential Energy",
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
      "id": "g",
      "siUnit": "m/s²",
      "altUnits": "",
      "description": "Gravity",
      "commonTraps": "g = 9.81 m/s� is an average. Use local g for high-precision work."
    },
    {
      "id": "h",
      "siUnit": "m",
      "altUnits": "",
      "description": "Height",
      "commonTraps": "Height (m) vs Planck's constant (6.626�10?�4 J�s) � order-of-magnitude check."
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
    "problem": "Find the unknown PE using Gravitational PE (Local) with: PE = 100, m = 10, g = 10.",
    "solution": [
      "Identify known quantities and the target (PE).",
      "Write the formula and solve for PE.",
      "Substitute the values: PE = 100, m = 10, g = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "PE = computed result (run Solve mode to see the exact value)"
  }
},

  "elastic-pe": {
  "intuition": "Elastic PE (Spring) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "PE",
      "siUnit": "J",
      "altUnits": "",
      "description": "Elastic PE",
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
    "problem": "Find the unknown PE using Elastic PE (Spring) with: PE = 100, k = 10, x = 5.",
    "solution": [
      "Identify known quantities and the target (PE).",
      "Write the formula and solve for PE.",
      "Substitute the values: PE = 100, k = 10, x = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "PE = computed result (run Solve mode to see the exact value)"
  }
},

  "power-mechanical": {
  "intuition": "Mechanical Power calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "W",
      "altUnits": "",
      "description": "Power",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "W",
      "siUnit": "J",
      "altUnits": "",
      "description": "Work",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
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
    "problem": "Find the unknown P using Mechanical Power with: P = 100, W = 100, t = 2.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 100, W = 100, t = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "rotational-kinematics": {
  "intuition": "Rotational Kinematics calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "omega",
      "siUnit": "rad/s",
      "altUnits": "",
      "description": "Final Angular Vel",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "omega0",
      "siUnit": "rad/s",
      "altUnits": "",
      "description": "Initial Angular Vel",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "alpha",
      "siUnit": "rad/s²",
      "altUnits": "",
      "description": "Angular Accel",
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
    "problem": "Find the unknown omega using Rotational Kinematics with: omega = 10, omega0 = 10, alpha = 10.",
    "solution": [
      "Identify known quantities and the target (omega).",
      "Write the formula and solve for omega.",
      "Substitute the values: omega = 10, omega0 = 10, alpha = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "omega = computed result (run Solve mode to see the exact value)"
  }
},

  "rotational-ke": {
  "intuition": "Rotational Kinetic Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "KE",
      "siUnit": "J",
      "altUnits": "",
      "description": "Rotational KE",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown KE using Rotational Kinetic Energy with: KE = 100, I = 10, omega = 10.",
    "solution": [
      "Identify known quantities and the target (KE).",
      "Write the formula and solve for KE.",
      "Substitute the values: KE = 100, I = 10, omega = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "KE = computed result (run Solve mode to see the exact value)"
  }
},

  "mass-spring-period": {
  "intuition": "Mass-Spring System (SHM) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Period",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "m",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Mass",
      "commonTraps": "Mass must be in kilograms for SI calculations."
    },
    {
      "id": "k",
      "siUnit": "N/m",
      "altUnits": "",
      "description": "Spring Constant",
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
    "problem": "Find the unknown T using Mass-Spring System (SHM) with: T = 2, m = 10, k = 10.",
    "solution": [
      "Identify known quantities and the target (T).",
      "Write the formula and solve for T.",
      "Substitute the values: T = 2, m = 10, k = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "T = computed result (run Solve mode to see the exact value)"
  }
},

};
