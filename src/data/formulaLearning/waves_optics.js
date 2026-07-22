export const waves_optics = {
  "wave-speed": {
  "intuition": "Wave Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Wave Speed",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
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
      "siUnit": "m",
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
    "problem": "Find the unknown v using Wave Equation with: v = 9.8, f = 50, lambda = 5.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 9.8, f = 50, lambda = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "doppler-effect": {
  "intuition": "Doppler Effect calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "fp",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Observed Freq",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "f",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Source Freq",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "vw",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Wave Speed",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "vo",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Observer Speed",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "vs",
      "siUnit": "m/s",
      "altUnits": "",
      "description": "Source Speed",
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
    "problem": "Find the unknown fp using Doppler Effect with: fp = 50, f = 50, vw = 9.8.",
    "solution": [
      "Identify known quantities and the target (fp).",
      "Write the formula and solve for fp.",
      "Substitute the values: fp = 50, f = 50, vw = 9.8.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "fp = computed result (run Solve mode to see the exact value)"
  }
},

  "lens-equation": {
  "intuition": "Thin Lens Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "f",
      "siUnit": "m",
      "altUnits": "",
      "description": "Focal Length",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "do",
      "siUnit": "m",
      "altUnits": "",
      "description": "Object Distance",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "di",
      "siUnit": "m",
      "altUnits": "",
      "description": "Image Distance",
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
    "problem": "Find the unknown f using Thin Lens Equation with: f = 5, do = 5, di = 5.",
    "solution": [
      "Identify known quantities and the target (f).",
      "Write the formula and solve for f.",
      "Substitute the values: f = 5, do = 5, di = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "f = computed result (run Solve mode to see the exact value)"
  }
},

  "snells-law": {
  "intuition": "Snell's Law (Refraction) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "n1",
      "siUnit": "",
      "altUnits": "",
      "description": "Index 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "theta1",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "n2",
      "siUnit": "",
      "altUnits": "",
      "description": "Index 2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "theta2",
      "siUnit": "°",
      "altUnits": "",
      "description": "Angle 2",
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
    "problem": "Find the unknown n1 using Snell's Law (Refraction) with: n1 = 10, theta1 = 10, n2 = 10.",
    "solution": [
      "Identify known quantities and the target (n1).",
      "Write the formula and solve for n1.",
      "Substitute the values: n1 = 10, theta1 = 10, n2 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "n1 = computed result (run Solve mode to see the exact value)"
  }
},

  "photoelectric": {
  "intuition": "Photoelectric Effect calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Ek",
      "siUnit": "eV",
      "altUnits": "",
      "description": "Kinetic Energy",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "f",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Photon Frequency",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "phi",
      "siUnit": "eV",
      "altUnits": "",
      "description": "Work Function",
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
    "problem": "Find the unknown Ek using Photoelectric Effect with: Ek = 2, f = 50, phi = 2.",
    "solution": [
      "Identify known quantities and the target (Ek).",
      "Write the formula and solve for Ek.",
      "Substitute the values: Ek = 2, f = 50, phi = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Ek = computed result (run Solve mode to see the exact value)"
  }
},

};
