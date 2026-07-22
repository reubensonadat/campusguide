export const differential_equations = {
  "separable-ode": {
  "intuition": "Separable ODE calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "f",
      "siUnit": "",
      "altUnits": "",
      "description": "f",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "g",
      "siUnit": "",
      "altUnits": "",
      "description": "g",
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
    "problem": "Find the unknown f using Separable ODE with: f = 10, g = 10.",
    "solution": [
      "Identify known quantities and the target (f).",
      "Write the formula and solve for f.",
      "Substitute the values: f = 10, g = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "f = computed result (run Solve mode to see the exact value)"
  }
},

  "linear-1st-order": {
  "intuition": "First-Order Linear ODE calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "",
      "altUnits": "",
      "description": "P",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "Q",
      "siUnit": "",
      "altUnits": "",
      "description": "Q",
      "commonTraps": "Heat (J), charge (C), and flow rate (m�/s) � verify units."
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
    "problem": "Find the unknown P using First-Order Linear ODE with: P = 10, Q = 10.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 10, Q = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "euler-method": {
  "intuition": "Euler's Method (Numerical) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "y0",
      "siUnit": "",
      "altUnits": "",
      "description": "Initial y",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "h",
      "siUnit": "",
      "altUnits": "",
      "description": "Step Size",
      "commonTraps": "Height (m) vs Planck's constant (6.626�10?�4 J�s) � order-of-magnitude check."
    },
    {
      "id": "steps",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of Steps",
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
    "problem": "Find the unknown y0 using Euler's Method (Numerical) with: y0 = 10, h = 10, steps = 10.",
    "solution": [
      "Identify known quantities and the target (y0).",
      "Write the formula and solve for y0.",
      "Substitute the values: y0 = 10, h = 10, steps = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "y0 = computed result (run Solve mode to see the exact value)"
  }
},

  "char-eqn-2nd-order": {
  "intuition": "Characteristic Equation (2nd Order ODE) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "Coefficient a",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "b",
      "siUnit": "",
      "altUnits": "",
      "description": "Coefficient b",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "c",
      "siUnit": "",
      "altUnits": "",
      "description": "Coefficient c",
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
    "problem": "Find the unknown a using Characteristic Equation (2nd Order ODE) with: a = 10, b = 10, c = 10.",
    "solution": [
      "Identify known quantities and the target (a).",
      "Write the formula and solve for a.",
      "Substitute the values: a = 10, b = 10, c = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "a = computed result (run Solve mode to see the exact value)"
  }
},

};
