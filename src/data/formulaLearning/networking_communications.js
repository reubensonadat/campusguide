export const networking_communications = {
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

  "nyquist-bitrate": {
  "intuition": "Nyquist Bit Rate (Noiseless) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "R",
      "siUnit": "bps",
      "altUnits": "",
      "description": "Bit Rate",
      "commonTraps": "Gas constant R = 8.314 J/(mol�K). Do not confuse with electrical resistance."
    },
    {
      "id": "B",
      "siUnit": "Hz",
      "altUnits": "",
      "description": "Bandwidth",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "L",
      "siUnit": "",
      "altUnits": "",
      "description": "Signal Levels",
      "commonTraps": "Length (m), inductance (H), or angular momentum (kg�m�/s) � context-specific."
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
    "problem": "Find the unknown R using Nyquist Bit Rate (Noiseless) with: R = 10, B = 50, L = 10.",
    "solution": [
      "Identify known quantities and the target (R).",
      "Write the formula and solve for R.",
      "Substitute the values: R = 10, B = 50, L = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "R = computed result (run Solve mode to see the exact value)"
  }
},

  "crc-check": {
  "intuition": "Cyclic Redundancy Check (CRC Concept) calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "data",
      "siUnit": "",
      "altUnits": "",
      "description": "Data Bits",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "divisor",
      "siUnit": "",
      "altUnits": "",
      "description": "Divisor Polynomial",
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
    "problem": "Find the unknown data using Cyclic Redundancy Check (CRC Concept) with: data = 10, divisor = 10.",
    "solution": [
      "Identify known quantities and the target (data).",
      "Write the formula and solve for data.",
      "Substitute the values: data = 10, divisor = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "data = computed result (run Solve mode to see the exact value)"
  }
},

};
