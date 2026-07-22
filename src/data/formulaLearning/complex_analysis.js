export const complex_analysis = {
  "cauchy-riemann": {
  "intuition": "Cauchy-Riemann Equations calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "ux",
      "siUnit": "",
      "altUnits": "",
      "description": "∂u/∂x",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "vy",
      "siUnit": "",
      "altUnits": "",
      "description": "∂v/∂y",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "uy",
      "siUnit": "",
      "altUnits": "",
      "description": "∂u/∂y",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "vx",
      "siUnit": "",
      "altUnits": "",
      "description": "∂v/∂x",
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
    "problem": "Find the unknown ux using Cauchy-Riemann Equations with: ux = 10, vy = 10, uy = 10.",
    "solution": [
      "Identify known quantities and the target (ux).",
      "Write the formula and solve for ux.",
      "Substitute the values: ux = 10, vy = 10, uy = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "ux = computed result (run Solve mode to see the exact value)"
  }
},

  "euler-formula": {
  "intuition": "Euler's Formula calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
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
    "problem": "Find the unknown theta using Euler's Formula with: theta = 10.",
    "solution": [
      "Identify known quantities and the target (theta).",
      "Write the formula and solve for theta.",
      "Substitute the values: theta = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "theta = computed result (run Solve mode to see the exact value)"
  }
},

  "demoivre": {
  "intuition": "De Moivre's Theorem calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "theta",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Power",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
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
    "problem": "Find the unknown theta using De Moivre's Theorem with: theta = 10, n = 10.",
    "solution": [
      "Identify known quantities and the target (theta).",
      "Write the formula and solve for theta.",
      "Substitute the values: theta = 10, n = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "theta = computed result (run Solve mode to see the exact value)"
  }
},

};
