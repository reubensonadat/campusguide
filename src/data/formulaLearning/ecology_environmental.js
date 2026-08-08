export const ecology_environmental = {
  "chi-square": {
    "intuition": "A Chi-Square test compares what you actually counted in an experiment (Observed) with what you mathematically expected to happen (Expected). It tells you whether the difference is just random luck, or if there is a real scientific reason behind the mismatch.",
    "variableBreakdown": [
      {
        "id": "observed",
        "siUnit": "",
        "altUnits": "",
        "description": "Observed Data (O)",
        "commonTraps": "An array/list of the raw counts you actually tallied in real life."
      },
      {
        "id": "expected",
        "siUnit": "",
        "altUnits": "",
        "description": "Expected Data (E)",
        "commonTraps": "An array of what you predicted to see (e.g., from a Punnett square)."
      }
    ],
    "solvingLogic": [
      "1. For each category, subtract Expected from Observed (O - E).",
      "2. Square that difference (O - E)².",
      "3. Divide by the Expected value for that category.",
      "4. Add up all the results across every category to get your Chi-Square value (X²)."
    ],
    "edgeCases": [
      {
        "title": "Degrees of Freedom",
        "description": "The final X² number is meaningless on its own. You MUST look it up in a Chi-Square Table based on your 'Degrees of Freedom' (number of categories minus 1) to find the actual P-value!"
      }
    ],
    "walkthroughExample": {
      "problem": "You expected 50 red and 50 white flowers. You got 60 red and 40 white.",
      "solution": [
        "Red: (60 - 50)² / 50 = 100 / 50 = 2.",
        "White: (40 - 50)² / 50 = 100 / 50 = 2.",
        "Add them up: 2 + 2 = 4."
      ],
      "answer": "Chi-Square = 4"
    }
  },

  "shannon-index": {
    "intuition": "The Shannon Diversity Index (H) measures how biodiverse a habitat is. It looks at both the total number of species (richness) AND how evenly distributed they are (evenness). A high index means a very healthy, complex ecosystem like a rainforest.",
    "variableBreakdown": [
      {
        "id": "data",
        "siUnit": "",
        "altUnits": "",
        "description": "Species Counts",
        "commonTraps": "An array of numbers representing how many individuals were found for each species (e.g., [10, 15, 2])."
      }
    ],
    "solvingLogic": [
      "1. Find the total number of individuals across all species.",
      "2. For each species, calculate its proportion of the total (p_i).",
      "3. Multiply that proportion by its natural log (p_i × ln(p_i)).",
      "4. Add all these values together.",
      "5. Multiply the final sum by -1 to make the index positive."
    ],
    "edgeCases": [
      {
        "title": "Monocultures",
        "description": "If an ecosystem only has exactly 1 species (a monoculture cornfield), the proportion is 1. The natural log of 1 is 0. Therefore, the Shannon index is exactly 0—representing zero diversity."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate H for a habitat with 50 lions and 50 tigers.",
      "solution": [
        "Total = 100.",
        "Lions (p_1): 50/100 = 0.5.",
        "Tigers (p_2): 50/100 = 0.5.",
        "0.5 × ln(0.5) ≈ 0.5 × (-0.693) = -0.346.",
        "Sum = (-0.346) + (-0.346) = -0.692.",
        "Make positive."
      ],
      "answer": "H = 0.692"
    }
  },

  "rule-of-70": {
    "intuition": "The Rule of 70 is a mental math trick used in ecology and finance to instantly estimate how long it takes for an exponentially growing population (or bank account) to exactly double in size.",
    "variableBreakdown": [
      {
        "id": "td",
        "siUnit": "years",
        "altUnits": "",
        "description": "Doubling Time",
        "commonTraps": "The time it takes for the population to double."
      },
      {
        "id": "r",
        "siUnit": "%",
        "altUnits": "",
        "description": "Growth Rate (percentage)",
        "commonTraps": "CRITICAL: Leave this as a whole number percentage, NOT a decimal! If the rate is 5%, use 5, NOT 0.05!"
      }
    ],
    "solvingLogic": [
      "1. Take the number 70.",
      "2. Divide it by the growth rate percentage.",
      "3. The result is the doubling time."
    ],
    "edgeCases": [
      {
        "title": "Why 70?",
        "description": "The math behind this comes from the natural log of 2 (which is ~0.693). When dealing with percentages, 0.693 × 100 = 69.3. We round up to 70 just to make the mental math easier!"
      }
    ],
    "walkthroughExample": {
      "problem": "A town's population is growing at 5% per year. How long until the population doubles?",
      "solution": [
        "Use the rule of 70.",
        "Divide 70 by the rate (5).",
        "70 / 5 = 14."
      ],
      "answer": "14 years"
    }
  },

  "npp": {
    "intuition": "Net Primary Productivity (NPP) is the amount of energy (or biomass) that plants actually keep and make available to herbivores. It is the total energy they created via photosynthesis (GPP) MINUS the energy they burned to keep themselves alive (Respiration).",
    "variableBreakdown": [
      {
        "id": "NPP",
        "siUnit": "kcal/m²/yr",
        "altUnits": "",
        "description": "Net Primary Productivity",
        "commonTraps": "The 'net paycheck' the plant takes home."
      },
      {
        "id": "GPP",
        "siUnit": "kcal/m²/yr",
        "altUnits": "",
        "description": "Gross Primary Productivity",
        "commonTraps": "The total energy captured from the sun (the 'gross salary')."
      },
      {
        "id": "R",
        "siUnit": "kcal/m²/yr",
        "altUnits": "",
        "description": "Respiration",
        "commonTraps": "Energy the plant burns through cellular respiration (the 'taxes' or 'living expenses')."
      }
    ],
    "solvingLogic": [
      "1. Subtract Respiration (R) from Gross Primary Productivity (GPP).",
      "2. NPP = GPP - R."
    ],
    "edgeCases": [
      {
        "title": "The 10% Rule",
        "description": "When a deer eats the plant, it only gets access to the NPP, NOT the GPP. Furthermore, the deer will burn 90% of that NPP just staying warm and moving, meaning only ~10% gets passed up to a wolf."
      }
    ],
    "walkthroughExample": {
      "problem": "A forest captures 20,000 kcal/m²/yr (GPP). The trees burn 12,000 kcal/m²/yr for respiration. Find the NPP.",
      "solution": [
        "NPP = GPP - R",
        "NPP = 20,000 - 12,000",
        "NPP = 8,000."
      ],
      "answer": "8,000 kcal/m²/yr"
    }
  },

  "cell-sa-vol": {
    "intuition": "As a cell grows larger, its volume (the 'guts' that need food) increases much faster than its surface area (the 'mouth' that eats food). Eventually, the cell starves because its surface can't bring in nutrients fast enough. This ratio is why cells MUST be microscopic!",
    "variableBreakdown": [
      {
        "id": "r",
        "siUnit": "μm",
        "altUnits": "m",
        "description": "Radius of Cell",
        "commonTraps": "Assuming the cell is a perfect sphere."
      }
    ],
    "solvingLogic": [
      "1. Calculate Surface Area (4πr²).",
      "2. Calculate Volume (4/3 πr³).",
      "3. Divide Surface Area by Volume.",
      "4. The formula beautifully simplifies to just: 3 / r."
    ],
    "edgeCases": [
      {
        "title": "Flattening Out",
        "description": "If a cell MUST be large, it avoids the spherical trap by flattening out into a pancake or growing long, skinny tentacles (like neurons). This vastly increases surface area without adding much volume!"
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the Surface Area to Volume ratio for a spherical cell with a radius of 2 μm.",
      "solution": [
        "Ratio = 3 / r",
        "Ratio = 3 / 2 = 1.5."
      ],
      "answer": "Ratio = 1.5"
    }
  },

  "q10": {
    "intuition": "The Q10 temperature coefficient shows how much a biological or chemical reaction speeds up when the temperature is raised by exactly 10 degrees Celsius. For most biological systems, Q10 is around 2 (meaning the reaction rate doubles every 10 degrees).",
    "variableBreakdown": [
      {
        "id": "Q10",
        "siUnit": "",
        "altUnits": "",
        "description": "Temperature Coefficient",
        "commonTraps": "A multiplier showing the rate change over 10°C."
      },
      {
        "id": "R1",
        "siUnit": "",
        "altUnits": "",
        "description": "Rate at T1",
        "commonTraps": "The speed of the reaction at the colder temperature."
      },
      {
        "id": "R2",
        "siUnit": "",
        "altUnits": "",
        "description": "Rate at T2",
        "commonTraps": "The speed of the reaction at the hotter temperature."
      },
      {
        "id": "T1",
        "siUnit": "°C",
        "altUnits": "",
        "description": "Lower Temperature",
        "commonTraps": "Must be in Celsius or Kelvin (the difference is the same)."
      },
      {
        "id": "T2",
        "siUnit": "°C",
        "altUnits": "",
        "description": "Higher Temperature",
        "commonTraps": "Must be higher than T1."
      }
    ],
    "solvingLogic": [
      "1. Divide R2 by R1 to find the ratio of the rates.",
      "2. Divide 10 by the difference in temperatures (T2 - T1).",
      "3. Raise the rate ratio (R2/R1) to the power of [ 10 / (T2-T1) ]."
    ],
    "edgeCases": [
      {
        "title": "Protein Denaturation",
        "description": "In living things, this rule only works up to a certain point (usually ~40°C). After that, the enzymes melt (denature) and the reaction rate drops to absolutely zero, breaking the Q10 rule entirely."
      }
    ],
    "walkthroughExample": {
      "problem": "A bug's metabolism is 5 units at 20°C. It rises to 15 units at 30°C. Find Q10.",
      "solution": [
        "Since the temperature jump is exactly 10°C, the power [10 / (30-20)] is just 1.",
        "Therefore, Q10 is just R2 / R1.",
        "Q10 = 15 / 5 = 3."
      ],
      "answer": "Q10 = 3 (The rate triples every 10°C)"
    }
  }
};
