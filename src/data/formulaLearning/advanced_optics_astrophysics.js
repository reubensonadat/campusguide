export const advanced_optics_astrophysics = {
  "rayleigh": {
  "intuition": "Rayleigh Criterion (Angular) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "theta",
      "siUnit": "rad",
      "altUnits": "",
      "description": "Resolution Angle",
      "commonTraps": "Angle must be in radians for trigonometric functions; convert degrees by multiplying by p/180."
    },
    {
      "id": "lambda",
      "siUnit": "nm",
      "altUnits": "",
      "description": "Wavelength",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
    },
    {
      "id": "D",
      "siUnit": "m",
      "altUnits": "",
      "description": "Aperture",
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
    "problem": "Find the unknown theta using Rayleigh Criterion (Angular) with: theta = 10, lambda = 500, D = 5.",
    "solution": [
      "Identify known quantities and the target (theta).",
      "Write the formula and solve for theta.",
      "Substitute the values: theta = 10, lambda = 500, D = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "theta = computed result (run Solve mode to see the exact value)"
  }
},

  "telescope-mag": {
  "intuition": "Telescope Magnification calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M",
      "siUnit": "",
      "altUnits": "",
      "description": "Magnification",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "fo",
      "siUnit": "m",
      "altUnits": "",
      "description": "Objective Focal Length",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "fe",
      "siUnit": "m",
      "altUnits": "",
      "description": "Eyepiece Focal Length",
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
    "problem": "Find the unknown M using Telescope Magnification with: M = 10, fo = 5, fe = 5.",
    "solution": [
      "Identify known quantities and the target (M).",
      "Write the formula and solve for M.",
      "Substitute the values: M = 10, fo = 5, fe = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M = computed result (run Solve mode to see the exact value)"
  }
},

  "distance-modulus": {
  "intuition": "Distance Modulus calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "mu",
      "siUnit": "",
      "altUnits": "",
      "description": "Modulus",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "d",
      "siUnit": "pc",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Ensure consistent distance units. Convert all inputs to the same unit system."
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
    "problem": "Find the unknown mu using Distance Modulus with: mu = 10, d = 10.",
    "solution": [
      "Identify known quantities and the target (mu).",
      "Write the formula and solve for mu.",
      "Substitute the values: mu = 10, d = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "mu = computed result (run Solve mode to see the exact value)"
  }
},

  "wiens-law": {
  "intuition": "Wien's Displacement Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "lambda",
      "siUnit": "nm",
      "altUnits": "",
      "description": "Peak Wavelength",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
    },
    {
      "id": "T",
      "siUnit": "K",
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
    "problem": "Find the unknown lambda using Wien's Displacement Law with: lambda = 500, T = 300.",
    "solution": [
      "Identify known quantities and the target (lambda).",
      "Write the formula and solve for lambda.",
      "Substitute the values: lambda = 500, T = 300.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "lambda = computed result (run Solve mode to see the exact value)"
  }
},

  "lens-maker": {
  "intuition": "Lens Maker's Equation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "f",
      "siUnit": "m",
      "altUnits": "",
      "description": "Focal Length",
      "commonTraps": "Do not confuse frequency with focal length � check the context and units (Hz vs m)."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Refractive Index",
      "commonTraps": "In chemistry, n is moles; in physics, n is index of refraction or quantum number."
    },
    {
      "id": "R1",
      "siUnit": "m",
      "altUnits": "",
      "description": "Radius 1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R2",
      "siUnit": "m",
      "altUnits": "",
      "description": "Radius 2",
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
    "problem": "Find the unknown f using Lens Maker's Equation with: f = 5, n = 10, R1 = 5.",
    "solution": [
      "Identify known quantities and the target (f).",
      "Write the formula and solve for f.",
      "Substitute the values: f = 5, n = 10, R1 = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "f = computed result (run Solve mode to see the exact value)"
  }
},

  "larmor": {
  "intuition": "Larmor Formula calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "W",
      "altUnits": "",
      "description": "Radiated Power",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "q",
      "siUnit": "C",
      "altUnits": "",
      "description": "Charge",
      "commonTraps": "Verify units and sign conventions before calculating."
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
    "problem": "Find the unknown P using Larmor Formula with: P = 100, q = 10, a = 10.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 100, q = 10, a = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "straight_line_depreciation": {
  "intuition": "Straight-Line Depreciation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "D",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Annual Depreciation",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "C",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Cost of Asset",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "S",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Salvage Value",
      "commonTraps": "Entropy (J/K) vs Svedberg unit vs slope � context dependent."
    },
    {
      "id": "N",
      "siUnit": "years",
      "altUnits": "",
      "description": "Useful Life",
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
    "problem": "Find the unknown D using Straight-Line Depreciation with: D = 10, C = 10, S = 10.",
    "solution": [
      "Identify known quantities and the target (D).",
      "Write the formula and solve for D.",
      "Substitute the values: D = 10, C = 10, S = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "D = computed result (run Solve mode to see the exact value)"
  }
},

  "declining_balance_depreciation": {
  "intuition": "Declining Balance Depreciation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "D",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Depreciation Expense",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R",
      "siUnit": "",
      "altUnits": "",
      "description": "Depreciation Rate",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "BV",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Book Value",
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
    "problem": "Find the unknown D using Declining Balance Depreciation with: D = 10, R = 10, BV = 10.",
    "solution": [
      "Identify known quantities and the target (D).",
      "Write the formula and solve for D.",
      "Substitute the values: D = 10, R = 10, BV = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "D = computed result (run Solve mode to see the exact value)"
  }
},

  "net_present_value": {
  "intuition": "Net Present Value (NPV) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "NPV",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Net Present Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CF",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Cash Flow",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "C0",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Initial Investment",
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
    "problem": "Find the unknown NPV using Net Present Value (NPV) with: NPV = 10, CF = 10, C0 = 10.",
    "solution": [
      "Identify known quantities and the target (NPV).",
      "Write the formula and solve for NPV.",
      "Substitute the values: NPV = 10, CF = 10, C0 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "NPV = computed result (run Solve mode to see the exact value)"
  }
},

  "payback_period": {
  "intuition": "Payback Period calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "PP",
      "siUnit": "years",
      "altUnits": "",
      "description": "Payback Period",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "C0",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Initial Investment",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CF",
      "siUnit": "GH¢/year",
      "altUnits": "",
      "description": "Annual Cash Inflow",
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
    "problem": "Find the unknown PP using Payback Period with: PP = 10, C0 = 10, CF = 10.",
    "solution": [
      "Identify known quantities and the target (PP).",
      "Write the formula and solve for PP.",
      "Substitute the values: PP = 10, C0 = 10, CF = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "PP = computed result (run Solve mode to see the exact value)"
  }
},

  "contribution_margin": {
  "intuition": "Contribution Margin calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "CM",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Contribution Margin per Unit",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Selling Price per Unit",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "VC",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Variable Cost per Unit",
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
    "problem": "Find the unknown CM using Contribution Margin with: CM = 10, P = 10, VC = 10.",
    "solution": [
      "Identify known quantities and the target (CM).",
      "Write the formula and solve for CM.",
      "Substitute the values: CM = 10, P = 10, VC = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "CM = computed result (run Solve mode to see the exact value)"
  }
},

  "breakeven_units": {
  "intuition": "Break-Even Point (Units) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "BEP",
      "siUnit": "units",
      "altUnits": "",
      "description": "Break-Even Units",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "FC",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Total Fixed Costs",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CM",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Contribution Margin per Unit",
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
    "problem": "Find the unknown BEP using Break-Even Point (Units) with: BEP = 10, FC = 10, CM = 10.",
    "solution": [
      "Identify known quantities and the target (BEP).",
      "Write the formula and solve for BEP.",
      "Substitute the values: BEP = 10, FC = 10, CM = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "BEP = computed result (run Solve mode to see the exact value)"
  }
},

  "current_ratio": {
  "intuition": "Current Ratio calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "CR",
      "siUnit": "",
      "altUnits": "",
      "description": "Current Ratio",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CA",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Current Assets",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CL",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Current Liabilities",
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
    "problem": "Find the unknown CR using Current Ratio with: CR = 10, CA = 10, CL = 10.",
    "solution": [
      "Identify known quantities and the target (CR).",
      "Write the formula and solve for CR.",
      "Substitute the values: CR = 10, CA = 10, CL = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "CR = computed result (run Solve mode to see the exact value)"
  }
},

  "acid_test_ratio": {
  "intuition": "Acid-Test (Quick) Ratio calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "QR",
      "siUnit": "",
      "altUnits": "",
      "description": "Quick Ratio",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CA",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Current Assets",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Inv",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Inventory",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CL",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Current Liabilities",
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
    "problem": "Find the unknown QR using Acid-Test (Quick) Ratio with: QR = 10, CA = 10, Inv = 10.",
    "solution": [
      "Identify known quantities and the target (QR).",
      "Write the formula and solve for QR.",
      "Substitute the values: QR = 10, CA = 10, Inv = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "QR = computed result (run Solve mode to see the exact value)"
  }
},

  "debt_to_equity": {
  "intuition": "Debt-to-Equity Ratio calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "DE",
      "siUnit": "",
      "altUnits": "",
      "description": "Debt-to-Equity Ratio",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "TL",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Total Liabilities",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SE",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Shareholders Equity",
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
    "problem": "Find the unknown DE using Debt-to-Equity Ratio with: DE = 10, TL = 10, SE = 10.",
    "solution": [
      "Identify known quantities and the target (DE).",
      "Write the formula and solve for DE.",
      "Substitute the values: DE = 10, TL = 10, SE = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "DE = computed result (run Solve mode to see the exact value)"
  }
},

  "margin_of_safety": {
  "intuition": "Margin of Safety calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "MoS",
      "siUnit": "%",
      "altUnits": "",
      "description": "Margin of Safety",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Actual",
      "siUnit": "",
      "altUnits": "",
      "description": "Actual Sales",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "BEP",
      "siUnit": "",
      "altUnits": "",
      "description": "Break-Even Point",
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
    "problem": "Find the unknown MoS using Margin of Safety with: MoS = 5, Actual = 10, BEP = 10.",
    "solution": [
      "Identify known quantities and the target (MoS).",
      "Write the formula and solve for MoS.",
      "Substitute the values: MoS = 5, Actual = 10, BEP = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "MoS = computed result (run Solve mode to see the exact value)"
  }
},

  "bmi_calculation": {
  "intuition": "Body Mass Index (BMI) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "BMI",
      "siUnit": "kg/m²",
      "altUnits": "",
      "description": "Body Mass Index",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "W",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Weight",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
    },
    {
      "id": "H",
      "siUnit": "m",
      "altUnits": "",
      "description": "Height",
      "commonTraps": "Enthalpy (J) vs magnetic field (A/m) vs height (m)."
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
    "problem": "Find the unknown BMI using Body Mass Index (BMI) with: BMI = 10, W = 10, H = 5.",
    "solution": [
      "Identify known quantities and the target (BMI).",
      "Write the formula and solve for BMI.",
      "Substitute the values: BMI = 10, W = 10, H = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "BMI = computed result (run Solve mode to see the exact value)"
  }
},

  "drug_dosage_weight": {
  "intuition": "Drug Dosage by Weight calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Dose",
      "siUnit": "mg",
      "altUnits": "",
      "description": "Total Dose",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "W",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Patient Weight",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
    },
    {
      "id": "DPK",
      "siUnit": "mg/kg",
      "altUnits": "",
      "description": "Dose per kg",
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
    "problem": "Find the unknown Dose using Drug Dosage by Weight with: Dose = 10, W = 10, DPK = 10.",
    "solution": [
      "Identify known quantities and the target (Dose).",
      "Write the formula and solve for Dose.",
      "Substitute the values: Dose = 10, W = 10, DPK = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Dose = computed result (run Solve mode to see the exact value)"
  }
},

  "iv_flow_rate": {
  "intuition": "IV Flow Rate calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Rate",
      "siUnit": "drops/min",
      "altUnits": "",
      "description": "Flow Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vol",
      "siUnit": "mL",
      "altUnits": "",
      "description": "Volume to Infuse",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "DF",
      "siUnit": "drops/mL",
      "altUnits": "",
      "description": "Drop Factor",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Time",
      "siUnit": "minutes",
      "altUnits": "",
      "description": "Infusion Time",
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
    "problem": "Find the unknown Rate using IV Flow Rate with: Rate = 10, Vol = 10, DF = 10.",
    "solution": [
      "Identify known quantities and the target (Rate).",
      "Write the formula and solve for Rate.",
      "Substitute the values: Rate = 10, Vol = 10, DF = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Rate = computed result (run Solve mode to see the exact value)"
  }
},

  "body_surface_area": {
  "intuition": "Body Surface Area (Mosteller) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "BSA",
      "siUnit": "m²",
      "altUnits": "",
      "description": "Body Surface Area",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "H",
      "siUnit": "cm",
      "altUnits": "",
      "description": "Height",
      "commonTraps": "Enthalpy (J) vs magnetic field (A/m) vs height (m)."
    },
    {
      "id": "W",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Weight",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
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
    "problem": "Find the unknown BSA using Body Surface Area (Mosteller) with: BSA = 10, H = 10, W = 10.",
    "solution": [
      "Identify known quantities and the target (BSA).",
      "Write the formula and solve for BSA.",
      "Substitute the values: BSA = 10, H = 10, W = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "BSA = computed result (run Solve mode to see the exact value)"
  }
},

  "mean_arterial_pressure": {
  "intuition": "Mean Arterial Pressure (MAP) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "MAP",
      "siUnit": "mmHg",
      "altUnits": "",
      "description": "Mean Arterial Pressure",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SBP",
      "siUnit": "mmHg",
      "altUnits": "",
      "description": "Systolic Blood Pressure",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "DBP",
      "siUnit": "mmHg",
      "altUnits": "",
      "description": "Diastolic Blood Pressure",
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
    "problem": "Find the unknown MAP using Mean Arterial Pressure (MAP) with: MAP = 10, SBP = 10, DBP = 10.",
    "solution": [
      "Identify known quantities and the target (MAP).",
      "Write the formula and solve for MAP.",
      "Substitute the values: MAP = 10, SBP = 10, DBP = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "MAP = computed result (run Solve mode to see the exact value)"
  }
},

  "cardiac_output": {
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
      "siUnit": "beats/min",
      "altUnits": "",
      "description": "Heart Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SV",
      "siUnit": "mL/beat",
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

  "creatinine_clearance": {
  "intuition": "Creatinine Clearance (Cockcroft-Gault) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "CrCl",
      "siUnit": "mL/min",
      "altUnits": "",
      "description": "Creatinine Clearance",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Age",
      "siUnit": "years",
      "altUnits": "",
      "description": "Age",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "W",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Weight",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
    },
    {
      "id": "SCr",
      "siUnit": "mg/dL",
      "altUnits": "",
      "description": "Serum Creatinine",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "F",
      "siUnit": "",
      "altUnits": "",
      "description": "Female?",
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
    "problem": "Find the unknown CrCl using Creatinine Clearance (Cockcroft-Gault) with: CrCl = 10, Age = 10, W = 10.",
    "solution": [
      "Identify known quantities and the target (CrCl).",
      "Write the formula and solve for CrCl.",
      "Substitute the values: CrCl = 10, Age = 10, W = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "CrCl = computed result (run Solve mode to see the exact value)"
  }
},

  "fi_o2_delivery": {
  "intuition": "FiO2 Delivery Estimation calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "FiO2",
      "siUnit": "",
      "altUnits": "",
      "description": "Fraction of Inspired O2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "LPM",
      "siUnit": "L/min",
      "altUnits": "",
      "description": "Nasal Cannula Flow",
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
    "problem": "Find the unknown FiO2 using FiO2 Delivery Estimation with: FiO2 = 10, LPM = 10.",
    "solution": [
      "Identify known quantities and the target (FiO2).",
      "Write the formula and solve for FiO2.",
      "Substitute the values: FiO2 = 10, LPM = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "FiO2 = computed result (run Solve mode to see the exact value)"
  }
},

  "fluid_maintenance": {
  "intuition": "Fluid Maintenance Rate (4-2-1 Rule) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Rate",
      "siUnit": "mL/hr",
      "altUnits": "",
      "description": "Fluid Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "W",
      "siUnit": "kg",
      "altUnits": "",
      "description": "Weight",
      "commonTraps": "Work (J) and weight (N) � work = force � distance, weight = mg."
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
    "problem": "Find the unknown Rate using Fluid Maintenance Rate (4-2-1 Rule) with: Rate = 10, W = 10.",
    "solution": [
      "Identify known quantities and the target (Rate).",
      "Write the formula and solve for Rate.",
      "Substitute the values: Rate = 10, W = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Rate = computed result (run Solve mode to see the exact value)"
  }
},

  "anion_gap": {
  "intuition": "Anion Gap calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "AG",
      "siUnit": "mEq/L",
      "altUnits": "",
      "description": "Anion Gap",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Na",
      "siUnit": "mEq/L",
      "altUnits": "",
      "description": "Sodium",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Cl",
      "siUnit": "mEq/L",
      "altUnits": "",
      "description": "Chloride",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "HCO3",
      "siUnit": "mEq/L",
      "altUnits": "",
      "description": "Bicarbonate",
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
    "problem": "Find the unknown AG using Anion Gap with: AG = 10, Na = 10, Cl = 10.",
    "solution": [
      "Identify known quantities and the target (AG).",
      "Write the formula and solve for AG.",
      "Substitute the values: AG = 10, Na = 10, Cl = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "AG = computed result (run Solve mode to see the exact value)"
  }
},

  "gdp_nominal": {
  "intuition": "Nominal GDP calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "GDP",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Nominal GDP",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "C",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Consumption",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "I",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Investment",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "G",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Government Spending",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "NX",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Net Exports",
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
    "problem": "Find the unknown GDP using Nominal GDP with: GDP = 10, C = 10, I = 10.",
    "solution": [
      "Identify known quantities and the target (GDP).",
      "Write the formula and solve for GDP.",
      "Substitute the values: GDP = 10, C = 10, I = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "GDP = computed result (run Solve mode to see the exact value)"
  }
},

  "cpi_inflation": {
  "intuition": "CPI Inflation Rate calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Inf",
      "siUnit": "%",
      "altUnits": "",
      "description": "Inflation Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CPI2",
      "siUnit": "",
      "altUnits": "",
      "description": "CPI Current Period",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "CPI1",
      "siUnit": "",
      "altUnits": "",
      "description": "CPI Base Period",
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
    "problem": "Find the unknown Inf using CPI Inflation Rate with: Inf = 5, CPI2 = 10, CPI1 = 10.",
    "solution": [
      "Identify known quantities and the target (Inf).",
      "Write the formula and solve for Inf.",
      "Substitute the values: Inf = 5, CPI2 = 10, CPI1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Inf = computed result (run Solve mode to see the exact value)"
  }
},

  "unemployment_rate": {
  "intuition": "Unemployment Rate calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "UR",
      "siUnit": "%",
      "altUnits": "",
      "description": "Unemployment Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "U",
      "siUnit": "",
      "altUnits": "",
      "description": "Number Unemployed",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "LF",
      "siUnit": "",
      "altUnits": "",
      "description": "Labor Force",
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
    "problem": "Find the unknown UR using Unemployment Rate with: UR = 5, U = 10, LF = 10.",
    "solution": [
      "Identify known quantities and the target (UR).",
      "Write the formula and solve for UR.",
      "Substitute the values: UR = 5, U = 10, LF = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "UR = computed result (run Solve mode to see the exact value)"
  }
},

  "multiplier_effect": {
  "intuition": "Spending Multiplier calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "k",
      "siUnit": "",
      "altUnits": "",
      "description": "Multiplier",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "MPC",
      "siUnit": "",
      "altUnits": "",
      "description": "Marginal Propensity to Consume",
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
    "problem": "Find the unknown k using Spending Multiplier with: k = 10, MPC = 10.",
    "solution": [
      "Identify known quantities and the target (k).",
      "Write the formula and solve for k.",
      "Substitute the values: k = 10, MPC = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "k = computed result (run Solve mode to see the exact value)"
  }
},

  "mps_from_mpc": {
  "intuition": "Marginal Propensity to Save calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "MPS",
      "siUnit": "",
      "altUnits": "",
      "description": "MPS",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "MPC",
      "siUnit": "",
      "altUnits": "",
      "description": "MPC",
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
    "problem": "Find the unknown MPS using Marginal Propensity to Save with: MPS = 10, MPC = 10.",
    "solution": [
      "Identify known quantities and the target (MPS).",
      "Write the formula and solve for MPS.",
      "Substitute the values: MPS = 10, MPC = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "MPS = computed result (run Solve mode to see the exact value)"
  }
},

  "cross_price_elasticity": {
  "intuition": "Cross-Price Elasticity of Demand calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "XED",
      "siUnit": "",
      "altUnits": "",
      "description": "Cross-Price Elasticity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dQ",
      "siUnit": "%",
      "altUnits": "",
      "description": "% Change in Qd of A",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dP",
      "siUnit": "%",
      "altUnits": "",
      "description": "% Change in Price of B",
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
    "problem": "Find the unknown XED using Cross-Price Elasticity of Demand with: XED = 10, dQ = 5, dP = 5.",
    "solution": [
      "Identify known quantities and the target (XED).",
      "Write the formula and solve for XED.",
      "Substitute the values: XED = 10, dQ = 5, dP = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "XED = computed result (run Solve mode to see the exact value)"
  }
},

  "income_elasticity": {
  "intuition": "Income Elasticity of Demand calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "YED",
      "siUnit": "",
      "altUnits": "",
      "description": "Income Elasticity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dQ",
      "siUnit": "%",
      "altUnits": "",
      "description": "% Change in Qd",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "dY",
      "siUnit": "%",
      "altUnits": "",
      "description": "% Change in Income",
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
    "problem": "Find the unknown YED using Income Elasticity of Demand with: YED = 10, dQ = 5, dY = 5.",
    "solution": [
      "Identify known quantities and the target (YED).",
      "Write the formula and solve for YED.",
      "Substitute the values: YED = 10, dQ = 5, dY = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "YED = computed result (run Solve mode to see the exact value)"
  }
},

  "cobb_douglas": {
  "intuition": "Cobb-Douglas Production Function calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Y",
      "siUnit": "",
      "altUnits": "",
      "description": "Output",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "A",
      "siUnit": "",
      "altUnits": "",
      "description": "Total Factor Productivity",
      "commonTraps": "Area (m�), amplitude (m), and mass number all use A � context matters."
    },
    {
      "id": "L",
      "siUnit": "",
      "altUnits": "",
      "description": "Labor",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "alpha",
      "siUnit": "",
      "altUnits": "",
      "description": "Labor Elasticity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "K",
      "siUnit": "",
      "altUnits": "",
      "description": "Capital",
      "commonTraps": "Equilibrium constant (dimensionless) vs thermal conductivity (W/(m�K))."
    },
    {
      "id": "beta",
      "siUnit": "",
      "altUnits": "",
      "description": "Capital Elasticity",
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
    "problem": "Find the unknown Y using Cobb-Douglas Production Function with: Y = 10, A = 10, L = 10.",
    "solution": [
      "Identify known quantities and the target (Y).",
      "Write the formula and solve for Y.",
      "Substitute the values: Y = 10, A = 10, L = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Y = computed result (run Solve mode to see the exact value)"
  }
},

  "phillips_curve": {
  "intuition": "Simple Phillips Curve calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "pi",
      "siUnit": "%",
      "altUnits": "",
      "description": "Actual Inflation",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "pie",
      "siUnit": "%",
      "altUnits": "",
      "description": "Expected Inflation",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "a",
      "siUnit": "",
      "altUnits": "",
      "description": "Sensitivity Parameter",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "U",
      "siUnit": "%",
      "altUnits": "",
      "description": "Actual Unemployment",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Un",
      "siUnit": "%",
      "altUnits": "",
      "description": "Natural Unemployment",
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
    "problem": "Find the unknown pi using Simple Phillips Curve with: pi = 5, pie = 5, a = 10.",
    "solution": [
      "Identify known quantities and the target (pi).",
      "Write the formula and solve for pi.",
      "Substitute the values: pi = 5, pie = 5, a = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "pi = computed result (run Solve mode to see the exact value)"
  }
},

  "real_gdp_growth": {
  "intuition": "Real GDP Growth Rate calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Growth",
      "siUnit": "%",
      "altUnits": "",
      "description": "Growth Rate",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "RGDP2",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Real GDP Current",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "RGDP1",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Real GDP Previous",
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
    "problem": "Find the unknown Growth using Real GDP Growth Rate with: Growth = 5, RGDP2 = 10, RGDP1 = 10.",
    "solution": [
      "Identify known quantities and the target (Growth).",
      "Write the formula and solve for Growth.",
      "Substitute the values: Growth = 5, RGDP2 = 10, RGDP1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Growth = computed result (run Solve mode to see the exact value)"
  }
},

  "ohms_law_power": {
  "intuition": "Ohm\\ calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "W",
      "altUnits": "",
      "description": "Power",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "V",
      "siUnit": "V",
      "altUnits": "",
      "description": "Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "I",
      "siUnit": "A",
      "altUnits": "",
      "description": "Current",
      "commonTraps": "Current (A), moment of inertia (kg�m�), and intensity (W/m�) all use I."
    },
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
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
    "problem": "Find the unknown P using Ohm\\ with: P = 100, V = 12, I = 2.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 100, V = 12, I = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "kvl": {
  "intuition": "Kirchhoff\\ calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Vs",
      "siUnit": "V",
      "altUnits": "",
      "description": "Source Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vd",
      "siUnit": "V",
      "altUnits": "",
      "description": "Sum of Voltage Drops",
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
    "problem": "Find the unknown Vs using Kirchhoff\\ with: Vs = 12, Vd = 12.",
    "solution": [
      "Identify known quantities and the target (Vs).",
      "Write the formula and solve for Vs.",
      "Substitute the values: Vs = 12, Vd = 12.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Vs = computed result (run Solve mode to see the exact value)"
  }
},

  "kcl": {
  "intuition": "Kirchhoff\\ calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Iin",
      "siUnit": "A",
      "altUnits": "",
      "description": "Sum of Incoming Currents",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Iout",
      "siUnit": "A",
      "altUnits": "",
      "description": "Sum of Outgoing Currents",
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
    "problem": "Find the unknown Iin using Kirchhoff\\ with: Iin = 2, Iout = 2.",
    "solution": [
      "Identify known quantities and the target (Iin).",
      "Write the formula and solve for Iin.",
      "Substitute the values: Iin = 2, Iout = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Iin = computed result (run Solve mode to see the exact value)"
  }
},

  "rc_time_constant": {
  "intuition": "RC Time Constant calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "tau",
      "siUnit": "s",
      "altUnits": "",
      "description": "Time Constant",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "C",
      "siUnit": "F",
      "altUnits": "",
      "description": "Capacitance",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
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
    "problem": "Find the unknown tau using RC Time Constant with: tau = 2, R = 10, C = 0.001.",
    "solution": [
      "Identify known quantities and the target (tau).",
      "Write the formula and solve for tau.",
      "Substitute the values: tau = 2, R = 10, C = 0.001.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "tau = computed result (run Solve mode to see the exact value)"
  }
},

  "rl_time_constant": {
  "intuition": "RL Time Constant calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "tau",
      "siUnit": "s",
      "altUnits": "",
      "description": "Time Constant",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L",
      "siUnit": "H",
      "altUnits": "",
      "description": "Inductance",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
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
    "problem": "Find the unknown tau using RL Time Constant with: tau = 2, L = 10, R = 10.",
    "solution": [
      "Identify known quantities and the target (tau).",
      "Write the formula and solve for tau.",
      "Substitute the values: tau = 2, L = 10, R = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "tau = computed result (run Solve mode to see the exact value)"
  }
},

  "impedance_series_rcl": {
  "intuition": "Series RCL Impedance calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Z",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Impedance",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Resistance",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "XL",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Inductive Reactance",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "XC",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "Capacitive Reactance",
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
    "problem": "Find the unknown Z using Series RCL Impedance with: Z = 10, R = 10, XL = 10.",
    "solution": [
      "Identify known quantities and the target (Z).",
      "Write the formula and solve for Z.",
      "Substitute the values: Z = 10, R = 10, XL = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Z = computed result (run Solve mode to see the exact value)"
  }
},

  "transformer_ratio": {
  "intuition": "Transformer Turns Ratio calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Vp",
      "siUnit": "V",
      "altUnits": "",
      "description": "Primary Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Vs",
      "siUnit": "V",
      "altUnits": "",
      "description": "Secondary Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Np",
      "siUnit": "",
      "altUnits": "",
      "description": "Primary Turns",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Ns",
      "siUnit": "",
      "altUnits": "",
      "description": "Secondary Turns",
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
    "problem": "Find the unknown Vp using Transformer Turns Ratio with: Vp = 12, Vs = 12, Np = 10.",
    "solution": [
      "Identify known quantities and the target (Vp).",
      "Write the formula and solve for Vp.",
      "Substitute the values: Vp = 12, Vs = 12, Np = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Vp = computed result (run Solve mode to see the exact value)"
  }
},

  "three_phase_power": {
  "intuition": "Three-Phase Power calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "P",
      "siUnit": "W",
      "altUnits": "",
      "description": "Three-Phase Power",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "VL",
      "siUnit": "V",
      "altUnits": "",
      "description": "Line Voltage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "IL",
      "siUnit": "A",
      "altUnits": "",
      "description": "Line Current",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "pf",
      "siUnit": "",
      "altUnits": "",
      "description": "Power Factor",
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
    "problem": "Find the unknown P using Three-Phase Power with: P = 100, VL = 12, IL = 2.",
    "solution": [
      "Identify known quantities and the target (P).",
      "Write the formula and solve for P.",
      "Substitute the values: P = 100, VL = 12, IL = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "P = computed result (run Solve mode to see the exact value)"
  }
},

  "motor_slip": {
  "intuition": "Induction Motor Slip calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "s",
      "siUnit": "%",
      "altUnits": "",
      "description": "Slip",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Ns",
      "siUnit": "RPM",
      "altUnits": "",
      "description": "Synchronous Speed",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Nr",
      "siUnit": "RPM",
      "altUnits": "",
      "description": "Rotor Speed",
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
    "problem": "Find the unknown s using Induction Motor Slip with: s = 5, Ns = 10, Nr = 10.",
    "solution": [
      "Identify known quantities and the target (s).",
      "Write the formula and solve for s.",
      "Substitute the values: s = 5, Ns = 10, Nr = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "s = computed result (run Solve mode to see the exact value)"
  }
},

  "wheatstone_bridge": {
  "intuition": "Wheatstone Bridge calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "R1",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "R1",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R2",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "R2",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R3",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "R3",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "R4",
      "siUnit": "Ω",
      "altUnits": "",
      "description": "R4",
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
    "problem": "Find the unknown R1 using Wheatstone Bridge with: R1 = 10, R2 = 10, R3 = 10.",
    "solution": [
      "Identify known quantities and the target (R1).",
      "Write the formula and solve for R1.",
      "Substitute the values: R1 = 10, R2 = 10, R3 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "R1 = computed result (run Solve mode to see the exact value)"
  }
},

  "tip_split_calculator": {
  "intuition": "Tip and Split Calculator calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Each",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Amount per Person",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Bill",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Total Bill",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "TipPct",
      "siUnit": "%",
      "altUnits": "",
      "description": "Tip Percentage",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "People",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of People",
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
    "problem": "Find the unknown Each using Tip and Split Calculator with: Each = 10, Bill = 10, TipPct = 5.",
    "solution": [
      "Identify known quantities and the target (Each).",
      "Write the formula and solve for Each.",
      "Substitute the values: Each = 10, Bill = 10, TipPct = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Each = computed result (run Solve mode to see the exact value)"
  }
},

  "loan_amortization_monthly": {
  "intuition": "Monthly Loan Payment calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "M",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Monthly Payment",
      "commonTraps": "Molar mass (g/mol) vs central mass (kg) � check magnitude."
    },
    {
      "id": "P",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Loan Principal",
      "commonTraps": "Power (W) and pressure (Pa) both use P. Verify units: W = J/s, Pa = N/m�."
    },
    {
      "id": "r",
      "siUnit": "",
      "altUnits": "",
      "description": "Monthly Interest Rate",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of Payments",
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
    "problem": "Find the unknown M using Monthly Loan Payment with: M = 10, P = 10, r = 10.",
    "solution": [
      "Identify known quantities and the target (M).",
      "Write the formula and solve for M.",
      "Substitute the values: M = 10, P = 10, r = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "M = computed result (run Solve mode to see the exact value)"
  }
},

  "currency_conversion": {
  "intuition": "Currency Conversion calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Conv",
      "siUnit": "",
      "altUnits": "",
      "description": "Converted Amount",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Amt",
      "siUnit": "",
      "altUnits": "",
      "description": "Original Amount",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Rate",
      "siUnit": "",
      "altUnits": "",
      "description": "Exchange Rate",
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
    "problem": "Find the unknown Conv using Currency Conversion with: Conv = 10, Amt = 10, Rate = 10.",
    "solution": [
      "Identify known quantities and the target (Conv).",
      "Write the formula and solve for Conv.",
      "Substitute the values: Conv = 10, Amt = 10, Rate = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Conv = computed result (run Solve mode to see the exact value)"
  }
},

  "fuel_cost_calculator": {
  "intuition": "Fuel Cost Calculator calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Cost",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Total Fuel Cost",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Dist",
      "siUnit": "km",
      "altUnits": "",
      "description": "Distance",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Eff",
      "siUnit": "km/L",
      "altUnits": "",
      "description": "Fuel Efficiency",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Price",
      "siUnit": "GH¢/L",
      "altUnits": "",
      "description": "Fuel Price per Liter",
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
    "problem": "Find the unknown Cost using Fuel Cost Calculator with: Cost = 10, Dist = 10, Eff = 10.",
    "solution": [
      "Identify known quantities and the target (Cost).",
      "Write the formula and solve for Cost.",
      "Substitute the values: Cost = 10, Dist = 10, Eff = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Cost = computed result (run Solve mode to see the exact value)"
  }
},

  "age_calculator": {
  "intuition": "Age Calculator calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Years",
      "siUnit": "years",
      "altUnits": "",
      "description": "Age",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "BY",
      "siUnit": "",
      "altUnits": "",
      "description": "Birth Year",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "BM",
      "siUnit": "",
      "altUnits": "",
      "description": "Birth Month",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "BD",
      "siUnit": "",
      "altUnits": "",
      "description": "Birth Day",
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
    "problem": "Find the unknown Years using Age Calculator with: Years = 10, BY = 10, BM = 10.",
    "solution": [
      "Identify known quantities and the target (Years).",
      "Write the formula and solve for Years.",
      "Substitute the values: Years = 10, BY = 10, BM = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Years = computed result (run Solve mode to see the exact value)"
  }
},

  "gpa_projection": {
  "intuition": "GPA Projection (What-If) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "NewCGPA",
      "siUnit": "",
      "altUnits": "",
      "description": "Projected Cumulative GPA",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "OldCGPA",
      "siUnit": "",
      "altUnits": "",
      "description": "Current Cumulative GPA",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "OldCr",
      "siUnit": "",
      "altUnits": "",
      "description": "Total Credits Earned",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SemGPA",
      "siUnit": "",
      "altUnits": "",
      "description": "Expected Semester GPA",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SemCr",
      "siUnit": "",
      "altUnits": "",
      "description": "Semester Credits",
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
    "problem": "Find the unknown NewCGPA using GPA Projection (What-If) with: NewCGPA = 10, OldCGPA = 10, OldCr = 10.",
    "solution": [
      "Identify known quantities and the target (NewCGPA).",
      "Write the formula and solve for NewCGPA.",
      "Substitute the values: NewCGPA = 10, OldCGPA = 10, OldCr = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "NewCGPA = computed result (run Solve mode to see the exact value)"
  }
},

  "savings_goal": {
  "intuition": "Savings Goal Calculator calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Monthly",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Monthly Savings",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Goal",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Savings Target",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Months",
      "siUnit": "months",
      "altUnits": "",
      "description": "Time to Goal",
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
    "problem": "Find the unknown Monthly using Savings Goal Calculator with: Monthly = 10, Goal = 10, Months = 10.",
    "solution": [
      "Identify known quantities and the target (Monthly).",
      "Write the formula and solve for Monthly.",
      "Substitute the values: Monthly = 10, Goal = 10, Months = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Monthly = computed result (run Solve mode to see the exact value)"
  }
},

  "compound_growth": {
  "intuition": "Compound Growth (Population/Investment) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "FV",
      "siUnit": "",
      "altUnits": "",
      "description": "Future Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "PV",
      "siUnit": "",
      "altUnits": "",
      "description": "Present Value",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "r",
      "siUnit": "",
      "altUnits": "",
      "description": "Growth Rate per Period",
      "commonTraps": "Radius must be in meters for standard physics formulas."
    },
    {
      "id": "n",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of Periods",
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
    "problem": "Find the unknown FV using Compound Growth (Population/Investment) with: FV = 10, PV = 10, r = 10.",
    "solution": [
      "Identify known quantities and the target (FV).",
      "Write the formula and solve for FV.",
      "Substitute the values: FV = 10, PV = 10, r = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "FV = computed result (run Solve mode to see the exact value)"
  }
},

  "unit_price_comparison": {
  "intuition": "Unit Price Comparison calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "UP1",
      "siUnit": "GH¢/unit",
      "altUnits": "",
      "description": "Unit Price",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P1",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Price",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Q1",
      "siUnit": "",
      "altUnits": "",
      "description": "Quantity",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "UP2",
      "siUnit": "GH¢/unit",
      "altUnits": "",
      "description": "Unit Price",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "P2",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Price",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Q2",
      "siUnit": "",
      "altUnits": "",
      "description": "Quantity",
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
    "problem": "Find the unknown UP1 using Unit Price Comparison with: UP1 = 10, P1 = 10, Q1 = 10.",
    "solution": [
      "Identify known quantities and the target (UP1).",
      "Write the formula and solve for UP1.",
      "Substitute the values: UP1 = 10, P1 = 10, Q1 = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "UP1 = computed result (run Solve mode to see the exact value)"
  }
},

  "salary_tax_estimator": {
  "intuition": "Simple Salary Tax Estimator calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "TakeHome",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Take-Home Pay",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Salary",
      "siUnit": "GH¢",
      "altUnits": "",
      "description": "Gross Salary",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "TaxRate",
      "siUnit": "%",
      "altUnits": "",
      "description": "Tax Rate",
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
    "problem": "Find the unknown TakeHome using Simple Salary Tax Estimator with: TakeHome = 10, Salary = 10, TaxRate = 5.",
    "solution": [
      "Identify known quantities and the target (TakeHome).",
      "Write the formula and solve for TakeHome.",
      "Substitute the values: TakeHome = 10, Salary = 10, TaxRate = 5.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "TakeHome = computed result (run Solve mode to see the exact value)"
  }
},

};
