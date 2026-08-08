export const advanced_chemistry = {
  "molality": {
    "intuition": "Unlike 'Molarity' (which depends on fluid volume), 'Molality' depends strictly on the MASS of the solvent. Because fluid volume expands when heated, Molarity breaks at extreme temperatures. Molality stays perfectly consistent whether the solution is freezing or boiling.",
    "variableBreakdown": [
      {
        "id": "m",
        "siUnit": "mol/kg",
        "altUnits": "",
        "description": "Molality (m)",
        "commonTraps": "Represented by a lowercase 'm', easily confused with mass!"
      },
      {
        "id": "n",
        "siUnit": "mol",
        "altUnits": "",
        "description": "Moles of Solute",
        "commonTraps": "The substance being dissolved (e.g. salt)."
      },
      {
        "id": "kg",
        "siUnit": "kg",
        "altUnits": "g",
        "description": "Mass of Solvent",
        "commonTraps": "Must be in kilograms! And it is ONLY the mass of the solvent (the water), NOT the total mass of the solution."
      }
    ],
    "solvingLogic": [
      "1. Find the moles of the solute (divide grams by molar mass).",
      "2. Find the mass of the solvent in kg.",
      "3. Divide moles by kg."
    ],
    "edgeCases": [
      {
        "title": "Aqueous Approximations",
        "description": "For very dilute solutions in water at exactly room temperature, 1 Liter of water weighs exactly 1 kg. In this extremely specific scenario, Molarity and Molality are virtually identical."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the molality of 2 moles of NaCl dissolved in 500 grams of water.",
      "solution": [
        "Convert grams to kg: 500 g = 0.5 kg.",
        "Divide: 2 moles / 0.5 kg = 4."
      ],
      "answer": "m = 4 mol/kg"
    }
  },

  "dalton-law": {
    "intuition": "Dalton's Law of Partial Pressures states that gases are incredibly antisocial. If you pump three different gases into a single tank, they completely ignore each other. The total pressure on the tank walls is simply the sum of each gas acting like it's alone.",
    "variableBreakdown": [
      {
        "id": "Pt",
        "siUnit": "atm",
        "altUnits": "Pa, mmHg",
        "description": "Total Pressure",
        "commonTraps": "The pressure read by a gauge on the outside of the tank."
      },
      {
        "id": "P1",
        "siUnit": "atm",
        "altUnits": "",
        "description": "Partial Pressure Gas 1",
        "commonTraps": "Must be in the exact same units as all other pressures."
      },
      {
        "id": "P2",
        "siUnit": "atm",
        "altUnits": "",
        "description": "Partial Pressure Gas 2",
        "commonTraps": ""
      },
      {
        "id": "P3",
        "siUnit": "atm",
        "altUnits": "",
        "description": "Partial Pressure Gas 3",
        "commonTraps": "If a gas isn't present, its partial pressure is 0."
      }
    ],
    "solvingLogic": [
      "1. Ensure all partial pressures are converted to the same unit (e.g. all in atm).",
      "2. Add them all together."
    ],
    "edgeCases": [
      {
        "title": "Collecting Gas Over Water",
        "description": "If you trap a gas in a tube bubbling up through water, the gas inside the tube isn't pure! Water constantly evaporates. The total pressure in the tube is P_gas + P_water_vapor. You must subtract the vapor pressure of water to find the true pressure of your gas."
      }
    ],
    "walkthroughExample": {
      "problem": "A tank contains Nitrogen at 1.5 atm, Oxygen at 0.5 atm, and Argon at 0.1 atm. Find total pressure.",
      "solution": [
        "P_total = 1.5 + 0.5 + 0.1 = 2.1."
      ],
      "answer": "P_total = 2.1 atm"
    }
  },

  "rms-speed": {
    "intuition": "Root Mean Square (RMS) Speed calculates how fast individual gas molecules are zipping around inside a container. It proves that lighter molecules (like Helium) move insanely fast, while heavy molecules (like Radon) move sluggishly at the exact same temperature.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "RMS Speed (v_rms)",
        "commonTraps": "The 'average' speed of a molecule."
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "°C",
        "description": "Temperature (T)",
        "commonTraps": "Must be in Kelvin! Add 273.15 to Celsius."
      },
      {
        "id": "M",
        "siUnit": "kg/mol",
        "altUnits": "g/mol",
        "description": "Molar Mass (M)",
        "commonTraps": "CRITICAL TRAP: Must be in kilograms per mole (kg/mol), NOT the grams per mole found on the periodic table! You must divide standard molar mass by 1000."
      }
    ],
    "solvingLogic": [
      "1. Multiply 3 × R (8.314) × T (Kelvin).",
      "2. Divide by Molar Mass (M) in kg/mol.",
      "3. Take the square root of the entire result."
    ],
    "edgeCases": [
      {
        "title": "Not the True Average",
        "description": "The 'Root Mean Square' speed is slightly higher than the actual mathematical average speed of the particles. Because squaring numbers gives heavy weight to the fastest-moving outlier particles, the RMS 'average' is skewed slightly upward."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the RMS speed of Oxygen gas (O2, 32 g/mol) at 27°C.",
      "solution": [
        "T in Kelvin: 27 + 273 = 300 K.",
        "M in kg: 32 g/mol = 0.032 kg/mol.",
        "Numerator: 3 × 8.314 × 300 = 7482.6.",
        "Divide by M: 7482.6 / 0.032 = 233831.25.",
        "Square Root = √(233831.25) ≈ 483.5."
      ],
      "answer": "v ≈ 483.5 m/s (Over 1000 mph!)"
    }
  },

  "van-der-waals": {
    "intuition": "The Ideal Gas Law (PV=nRT) assumes gas molecules take up zero space and don't attract each other. That's a lie. The Van der Waals equation 'fixes' the Ideal Gas Law by adding two correction factors: 'a' (accounting for sticky molecular attraction) and 'b' (accounting for the physical space the molecules take up).",
    "variableBreakdown": [
      {
        "id": "P",
        "siUnit": "atm",
        "altUnits": "",
        "description": "Pressure",
        "commonTraps": ""
      },
      {
        "id": "V",
        "siUnit": "L",
        "altUnits": "",
        "description": "Volume",
        "commonTraps": ""
      },
      {
        "id": "n",
        "siUnit": "mol",
        "altUnits": "",
        "description": "Moles",
        "commonTraps": ""
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Temperature",
        "commonTraps": "Must be in Kelvin."
      },
      {
        "id": "a",
        "siUnit": "atm·L²/mol²",
        "altUnits": "",
        "description": "Attraction Constant (a)",
        "commonTraps": "Specific to each gas. Water has a huge 'a' because of hydrogen bonding."
      },
      {
        "id": "b",
        "siUnit": "L/mol",
        "altUnits": "",
        "description": "Volume Constant (b)",
        "commonTraps": "Specific to each gas. Radon has a huge 'b' because it's a massive atom."
      }
    ],
    "solvingLogic": [
      "1. The fixed pressure term is: (P + a(n/V)²).",
      "2. The fixed volume term is: (V - nb).",
      "3. Multiply them together. They must exactly equal nRT."
    ],
    "edgeCases": [
      {
        "title": "High Pressures",
        "description": "The Ideal Gas Law works perfectly fine at 1 atm. But at 100 atm, the gas molecules are crushed so close together that they physically bump into each other and stick together. At these extreme pressures, you MUST use Van der Waals, or your calculations will be wildly wrong."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the effective pressure of 1 mole of CO2 in a 1L tank at 300K, given the raw measured pressure P is 20 atm, and 'a' = 3.59.",
      "solution": [
        "Focus on the pressure correction term: (P + a(n/V)²).",
        "Correction: 3.59 × (1/1)² = 3.59 atm.",
        "Effective Pressure = 20 + 3.59 = 23.59 atm."
      ],
      "answer": "Effective P = 23.59 atm (The gas is 'pulling' on itself)"
    }
  },

  "mass-percent": {
    "intuition": "Mass percent simply answers the question: 'Out of the entire weight of this mixture, what percentage of the weight is made of this specific ingredient?'",
    "variableBreakdown": [
      {
        "id": "ms",
        "siUnit": "g",
        "altUnits": "kg",
        "description": "Mass of Solute",
        "commonTraps": "The mass of the specific ingredient you care about."
      },
      {
        "id": "mt",
        "siUnit": "g",
        "altUnits": "kg",
        "description": "Total Mass of Solution",
        "commonTraps": "Must be the mass of the Solute PLUS the mass of the Solvent! A common mistake is just dividing by the solvent."
      }
    ],
    "solvingLogic": [
      "1. Add the solute mass and solvent mass to get the Total Mass (if not given).",
      "2. Divide the Solute Mass by the Total Mass.",
      "3. Multiply by 100 to get a percentage."
    ],
    "edgeCases": [
      {
        "title": "ppm and ppb",
        "description": "For toxic chemicals in drinking water, the percentage is so tiny (like 0.000001%) that scientists multiply by 1,000,000 instead of 100 to get 'Parts Per Million' (ppm), or multiply by 1,000,000,000 for 'Parts Per Billion' (ppb)."
      }
    ],
    "walkthroughExample": {
      "problem": "You dissolve 20g of salt into 80g of water. What is the mass percent of the salt?",
      "solution": [
        "Total Mass = 20 + 80 = 100g.",
        "Ratio = 20 / 100 = 0.2.",
        "Percentage = 0.2 × 100 = 20%."
      ],
      "answer": "20% Salt by mass"
    }
  }
};
