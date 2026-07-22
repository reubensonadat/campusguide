export const nuclear_particle_physics = {
  "radioactive-decay": {
  "intuition": "Radioactive Decay Law calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Remaining Nuclei",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
    },
    {
      "id": "N0",
      "siUnit": "",
      "altUnits": "",
      "description": "Initial Nuclei",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "lambda",
      "siUnit": "s⁻¹",
      "altUnits": "",
      "description": "Decay Constant",
      "commonTraps": "Wavelength must be in meters. Convert from nm by multiplying by 10??."
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
    "problem": "Find the unknown N using Radioactive Decay Law with: N = 10, N0 = 10, lambda = 10.",
    "solution": [
      "Identify known quantities and the target (N).",
      "Write the formula and solve for N.",
      "Substitute the values: N = 10, N0 = 10, lambda = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "N = computed result (run Solve mode to see the exact value)"
  }
},

  "half-life": {
  "intuition": "Half-Life calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "Thalf",
      "siUnit": "s",
      "altUnits": "",
      "description": "Half-Life",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "lambda",
      "siUnit": "s⁻¹",
      "altUnits": "",
      "description": "Decay Constant",
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
    "problem": "Find the unknown Thalf using Half-Life with: Thalf = 2, lambda = 10.",
    "solution": [
      "Identify known quantities and the target (Thalf).",
      "Write the formula and solve for Thalf.",
      "Substitute the values: Thalf = 2, lambda = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "Thalf = computed result (run Solve mode to see the exact value)"
  }
},

  "mass-energy": {
  "intuition": "Mass-Energy Equivalence calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "E",
      "siUnit": "J",
      "altUnits": "",
      "description": "Energy",
      "commonTraps": "Energy (J) and electric field (N/C or V/m) both use E."
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
    "problem": "Find the unknown E using Mass-Energy Equivalence with: E = 100, m = 10.",
    "solution": [
      "Identify known quantities and the target (E).",
      "Write the formula and solve for E.",
      "Substitute the values: E = 100, m = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "E = computed result (run Solve mode to see the exact value)"
  }
},

  "binding-energy": {
  "intuition": "Nuclear Binding Energy calculates a key relationship between physical quantities. It provides a direct method to solve for unknown variables when others are known, making it essential for both theoretical understanding and practical applications.",
  "variableBreakdown": [
    {
      "id": "B",
      "siUnit": "MeV",
      "altUnits": "",
      "description": "Binding Energy",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "Z",
      "siUnit": "",
      "altUnits": "",
      "description": "Proton Number",
      "commonTraps": "Verify units and sign conventions before calculating."
    },
    {
      "id": "N",
      "siUnit": "",
      "altUnits": "",
      "description": "Neutron Number",
      "commonTraps": "Number of turns, population size, or normal force � depends on context."
    },
    {
      "id": "mass",
      "siUnit": "u",
      "altUnits": "",
      "description": "Nuclear Mass",
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
    "problem": "Find the unknown B using Nuclear Binding Energy with: B = 10, Z = 10, N = 10.",
    "solution": [
      "Identify known quantities and the target (B).",
      "Write the formula and solve for B.",
      "Substitute the values: B = 10, Z = 10, N = 10.",
      "Perform the calculation with consistent units.",
      "Verify the result is physically reasonable."
    ],
    "answer": "B = computed result (run Solve mode to see the exact value)"
  }
},

};
