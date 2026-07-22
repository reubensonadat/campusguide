export const computer_science_information_theory = {
  "shannon-capacity": {
  "intuition": "Shannon-Hartley Channel Capacity calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "C",
      "siUnit": "bps",
      "altUnits": "",
      "description": "Channel Capacity",
      "commonTraps": "Capacitance (farads) and concentration (mol/L) share symbol C � check units."
    },
    {
      "id": "B",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Bandwidth",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "SNR",
      "siUnit": "",
      "altUnits": "",
      "description": "Signal-to-Noise Ratio",
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
    "problem": "Find the unknown C using Shannon-Hartley Channel Capacity with: C = 10, B = 50, SNR = 10.",
    "solution": [
      "Identify known quantities and the target (C).",
      "Write the formula and solve for C.",
      "Substitute the values: C = 10, B = 50, SNR = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "C = computed result (run Solve mode to see the exact value)"
  }
},

  "amdahls-law": {
  "intuition": "Amdahl's Law (Speedup) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "S",
      "siUnit": "",
      "altUnits": "",
      "description": "Speedup",
      "commonTraps": "Entropy (J/K) vs Svedberg unit vs slope � context dependent."
    },
    {
      "id": "p",
      "siUnit": "",
      "altUnits": "",
      "description": "Parallel Proportion",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Number of Processors",
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
    "problem": "Find the unknown S using Amdahl's Law (Speedup) with: S = 10, p = 10, N = 10.",
    "solution": [
      "Identify known quantities and the target (S).",
      "Write the formula and solve for S.",
      "Substitute the values: S = 10, p = 10, N = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "S = computed result (run Solve mode to see the exact value)"
  }
},

  "gustafson": {
  "intuition": "Gustafson's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "S",
      "siUnit": "",
      "altUnits": "",
      "description": "Scaled Speedup",
      "commonTraps": "Entropy (J/K) vs Svedberg unit vs slope � context dependent."
    },
    {
      "id": "s",
      "siUnit": "",
      "altUnits": "",
      "description": "Serial Proportion",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Processors",
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
    "problem": "Find the unknown S using Gustafson's Law with: S = 10, s = 10, N = 10.",
    "solution": [
      "Identify known quantities and the target (S).",
      "Write the formula and solve for S.",
      "Substitute the values: S = 10, s = 10, N = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "S = computed result (run Solve mode to see the exact value)"
  }
},

  "littles-law": {
  "intuition": "Little's Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "L",
      "siUnit": "",
      "altUnits": "",
      "description": "Items in System",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
    },
    {
      "id": "lambda",
      "siUnit": "1/s",
      "altUnits": "",
      "description": "Arrival Rate",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
    },
    {
      "id": "W",
      "siUnit": "s",
      "altUnits": "",
      "description": "Wait Time",
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
    "problem": "Find the unknown L using Little's Law with: L = 10, lambda = 10, W = 2.",
    "solution": [
      "Identify known quantities and the target (L).",
      "Write the formula and solve for L.",
      "Substitute the values: L = 10, lambda = 10, W = 2.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "L = computed result (run Solve mode to see the exact value)"
  }
},

  "network-transfer": {
  "intuition": "Network Transfer Time calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "T",
      "siUnit": "s",
      "altUnits": "",
      "description": "Time",
      "commonTraps": "Always use absolute temperature in Kelvin (K = �C + 273.15) in gas and thermodynamic laws."
    },
    {
      "id": "S",
      "siUnit": "MB",
      "altUnits": "",
      "description": "Size",
      "commonTraps": "Entropy (J/K) vs Svedberg unit vs slope � context dependent."
    },
    {
      "id": "B",
      "siUnit": "MB/s",
      "altUnits": "",
      "description": "Bandwidth",
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
    "problem": "Find the unknown T using Network Transfer Time with: T = 2, S = 10, B = 10.",
    "solution": [
      "Identify known quantities and the target (T).",
      "Write the formula and solve for T.",
      "Substitute the values: T = 2, S = 10, B = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "T = computed result (run Solve mode to see the exact value)"
  }
},

};
