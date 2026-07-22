export const biology_biochemistry = {
  "hardy-weinberg": {
  "intuition": "Hardy-Weinberg Equilibrium calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "p",
      "siUnit": "",
      "altUnits": "",
      "description": "Dominant Allele Freq",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "q",
      "siUnit": "",
      "altUnits": "",
      "description": "Recessive Allele Freq",
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
    "problem": "Find the unknown p using Hardy-Weinberg Equilibrium with: p = 10, q = 10.",
    "solution": [
      "Identify known quantities and the target (p).",
      "Write the formula and solve for p.",
      "Substitute the values: p = 10, q = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "p = computed result (run Solve mode to see the exact value)"
  }
},

  "population-growth": {
  "intuition": "Population Growth calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Future Population",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
    },
    {
      "id": "N0",
      "siUnit": "",
      "altUnits": "",
      "description": "Initial Population",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "r",
      "siUnit": "",
      "altUnits": "",
      "description": "Growth Rate",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "t",
      "siUnit": "",
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
    "problem": "Find the unknown N using Population Growth with: N = 10, N0 = 10, r = 10.",
    "solution": [
      "Identify known quantities and the target (N).",
      "Write the formula and solve for N.",
      "Substitute the values: N = 10, N0 = 10, r = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "N = computed result (run Solve mode to see the exact value)"
  }
},

  "bmi": {
  "intuition": "Body Mass Index (BMI) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "weight",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Weight",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "height",
      "siUnit": "m",
      "altUnits": "",
      "description": "Height",
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
    "problem": "Find the unknown weight using Body Mass Index (BMI) with: weight = 10, height = 5.",
    "solution": [
      "Identify known quantities and the target (weight).",
      "Write the formula and solve for weight.",
      "Substitute the values: weight = 10, height = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "weight = computed result (run Solve mode to see the exact value)"
  }
},

  "cardiac-output": {
  "intuition": "Cardiac Output calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "CO",
      "siUnit": "L/min",
      "altUnits": "",
      "description": "Cardiac Output",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "HR",
      "siUnit": "bpm",
      "altUnits": "",
      "description": "Heart Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SV",
      "siUnit": "mL",
      "altUnits": "",
      "description": "Stroke Volume",
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
    "problem": "Find the unknown CO using Cardiac Output with: CO = 10, HR = 10, SV = 10.",
    "solution": [
      "Identify known quantities and the target (CO).",
      "Write the formula and solve for CO.",
      "Substitute the values: CO = 10, HR = 10, SV = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "CO = computed result (run Solve mode to see the exact value)"
  }
},

  "map-calc": {
  "intuition": "Mean Arterial Pressure (MAP) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "SBP",
      "siUnit": "mmHg",
      "altUnits": "",
      "description": "Systolic BP",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "DBP",
      "siUnit": "mmHg",
      "altUnits": "",
      "description": "Diastolic BP",
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
    "problem": "Find the unknown SBP using Mean Arterial Pressure (MAP) with: SBP = 10, DBP = 10.",
    "solution": [
      "Identify known quantities and the target (SBP).",
      "Write the formula and solve for SBP.",
      "Substitute the values: SBP = 10, DBP = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "SBP = computed result (run Solve mode to see the exact value)"
  }
},

  "fick-diffusion": {
  "intuition": "Fick's Law of Diffusion calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "J",
      "siUnit": "mol/s",
      "altUnits": "",
      "description": "Diffusion Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "D",
      "siUnit": "m²/s",
      "altUnits": "",
      "description": "Diffusion Coefficient",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Area",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "dCdx",
      "siUnit": "mol/m⁴",
      "altUnits": "",
      "description": "Concentration Gradient",
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
    "problem": "Find the unknown J using Fick's Law of Diffusion with: J = 10, D = 10, A = 10.",
    "solution": [
      "Identify known quantities and the target (J).",
      "Write the formula and solve for J.",
      "Substitute the values: J = 10, D = 10, A = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "J = computed result (run Solve mode to see the exact value)"
  }
},

  "michaelis-menten": {
  "intuition": "Michaelis-Menten Kinetics calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "v",
      "siUnit": "µM/min",
      "altUnits": "",
      "description": "Reaction Velocity",
      "commonTraps": "Velocity is a vector; direction matters. Use consistent sign conventions."
    },
    {
      "id": "Vmax",
      "siUnit": "µM/min",
      "altUnits": "",
      "description": "Max Velocity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "S",
      "siUnit": "µM",
      "altUnits": "",
      "description": "Substrate Concentration",
      "commonTraps": "Entropy (J/K) vs Svedberg unit vs slope � context dependent."
    },
    {
      "id": "Km",
      "siUnit": "µM",
      "altUnits": "",
      "description": "Michaelis Constant",
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
    "problem": "Find the unknown v using Michaelis-Menten Kinetics with: v = 10, Vmax = 10, S = 10.",
    "solution": [
      "Identify known quantities and the target (v).",
      "Write the formula and solve for v.",
      "Substitute the values: v = 10, Vmax = 10, S = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "v = computed result (run Solve mode to see the exact value)"
  }
},

  "bacterial-growth": {
  "intuition": "Bacterial Doubling Time calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Final Population",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
    },
    {
      "id": "N0",
      "siUnit": "",
      "altUnits": "",
      "description": "Initial Population",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "t",
      "siUnit": "min",
      "altUnits": "",
      "description": "Time",
      "commonTraps": "Use consistent time units throughout � convert minutes/hours to seconds."
    },
    {
      "id": "td",
      "siUnit": "min",
      "altUnits": "",
      "description": "Doubling Time",
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
    "problem": "Find the unknown N using Bacterial Doubling Time with: N = 10, N0 = 10, t = 10.",
    "solution": [
      "Identify known quantities and the target (N).",
      "Write the formula and solve for N.",
      "Substitute the values: N = 10, N0 = 10, t = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "N = computed result (run Solve mode to see the exact value)"
  }
},

  "nernst-membrane": {
  "intuition": "Nernst Equation (Membrane) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "mV",
      "altUnits": "",
      "description": "Equilibrium Potential",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
    },
    {
      "id": "z",
      "siUnit": "",
      "altUnits": "",
      "description": "Ion Charge",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "out",
      "siUnit": "mM",
      "altUnits": "",
      "description": "[Ion] outside",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "inn",
      "siUnit": "mM",
      "altUnits": "",
      "description": "[Ion] inside",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "T",
      "siUnit": "°C",
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
    "problem": "Find the unknown E using Nernst Equation (Membrane) with: E = 10, z = 10, out = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 10, z = 10, out = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "stroke-volume": {
  "intuition": "Stroke Volume & Ejection Fraction calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "EDV",
      "siUnit": "mL",
      "altUnits": "",
      "description": "End Diastolic Volume",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "ESV",
      "siUnit": "mL",
      "altUnits": "",
      "description": "End Systolic Volume",
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
    "problem": "Find the unknown EDV using Stroke Volume & Ejection Fraction with: EDV = 10, ESV = 10.",
    "solution": [
      "Identify known quantities and the target (EDV).",
      "Write the formula and solve for EDV.",
      "Substitute the values: EDV = 10, ESV = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "EDV = computed result (run Solve mode to see the exact value)"
  }
},

};
