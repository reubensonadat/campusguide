export const biochemistry_molecular_biology = {
  "michaelis-menten": {
    "intuition": "Enzymes are like factory workers. If you give them a few raw materials, they work faster. If you dump a million raw materials on them, they hit their maximum physical speed and can't work any faster, no matter how much more you add. This equation models that exact curve.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "μmol/min",
        "altUnits": "",
        "description": "Reaction Velocity (v)",
        "commonTraps": "The current speed of the enzyme."
      },
      {
        "id": "Vmax",
        "siUnit": "μmol/min",
        "altUnits": "",
        "description": "Maximum Velocity (Vmax)",
        "commonTraps": "The absolute speed limit when every single enzyme worker is 100% busy."
      },
      {
        "id": "S",
        "siUnit": "mM",
        "altUnits": "",
        "description": "Substrate Concentration [S]",
        "commonTraps": "How much raw material you dumped in."
      },
      {
        "id": "Km",
        "siUnit": "mM",
        "altUnits": "",
        "description": "Michaelis Constant (Km)",
        "commonTraps": "This is a measure of AFFINITY. A LOW Km means the enzyme loves the substrate and grips it tightly. A HIGH Km means the enzyme is sloppy and barely holds on."
      }
    ],
    "solvingLogic": [
      "1. Multiply Vmax by Substrate [S].",
      "2. Add Km to Substrate [S].",
      "3. Divide step 1 by step 2."
    ],
    "edgeCases": [
      {
        "title": "Half Speed",
        "description": "When the amount of Substrate [S] is EXACTLY equal to the enzyme's Km, the formula becomes (Vmax * S) / (S + S), which simplifies to exactly 1/2 Vmax. Km is literally defined as the substrate amount needed to hit 50% max speed!"
      }
    ],
    "walkthroughExample": {
      "problem": "Vmax is 100. Km is 10. You add 10 mM of substrate. Find velocity.",
      "solution": [
        "Since [S] = Km, velocity should be exactly half of Vmax (50). Let's prove it:",
        "Numerator: 100 × 10 = 1000.",
        "Denominator: 10 + 10 = 20.",
        "1000 / 20 = 50."
      ],
      "answer": "v = 50 μmol/min"
    }
  },

  "dna-gc-content": {
    "intuition": "In DNA, A pairs with T (using 2 weak hydrogen bonds), and G pairs with C (using 3 strong hydrogen bonds). Therefore, the more GC pairs a strand of DNA has, the stronger the 'glue' holding it together, making it physically harder to melt apart.",
    "variableBreakdown": [
      {
        "id": "GC",
        "siUnit": "%",
        "altUnits": "",
        "description": "GC Content Percentage",
        "commonTraps": "Higher percentage means a higher melting temperature (Tm) for the DNA."
      },
      {
        "id": "A",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Adenines",
        "commonTraps": ""
      },
      {
        "id": "T",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Thymines",
        "commonTraps": ""
      },
      {
        "id": "G",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Guanines",
        "commonTraps": ""
      },
      {
        "id": "C",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Cytosines",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Add the number of Gs and Cs together.",
      "2. Add ALL nucleotides together (A + T + G + C) to get the total length.",
      "3. Divide (G+C) by the total length, and multiply by 100."
    ],
    "edgeCases": [
      {
        "title": "Thermophilic Bacteria",
        "description": "Bacteria that live in boiling volcanic hot springs have evolved to have massive GC content (over 65%) in their genomes. If they didn't, their DNA would literally melt into soup in the hot water!"
      }
    ],
    "walkthroughExample": {
      "problem": "A DNA strand has 10 A's, 10 T's, 40 G's, and 40 C's. Find GC content.",
      "solution": [
        "G + C = 40 + 40 = 80.",
        "Total length = 10 + 10 + 40 + 40 = 100.",
        "(80 / 100) × 100 = 80%."
      ],
      "answer": "80% GC Content"
    }
  },

  "charged-aa": {
    "intuition": "Amino acids have protons that they can hold onto or drop depending on the pH of the blood. This formula uses the Henderson-Hasselbalch equation specifically to predict if an amino acid will have a positive, negative, or neutral electrical charge in a specific part of the body.",
    "variableBreakdown": [
      {
        "id": "pH",
        "siUnit": "",
        "altUnits": "",
        "description": "Local pH",
        "commonTraps": "Blood is ~7.4, but the stomach is ~2.0!"
      },
      {
        "id": "pKa",
        "siUnit": "",
        "altUnits": "",
        "description": "Side-Chain pKa",
        "commonTraps": "The specific pH where the amino acid drops its proton."
      },
      {
        "id": "z",
        "siUnit": "",
        "altUnits": "",
        "description": "Net Charge",
        "commonTraps": "Result is an electrical charge (+1, 0, or -1)."
      }
    ],
    "solvingLogic": [
      "1. Compare pH to pKa.",
      "2. If pH < pKa, the environment is drowning in protons (acidic). The amino acid holds onto its proton. (Resulting in a +1 or 0 charge depending on the specific side chain).",
      "3. If pH > pKa, the environment strips the proton away. (Resulting in a 0 or -1 charge)."
    ],
    "edgeCases": [
      {
        "title": "Isoelectric Point (pI)",
        "description": "When the positive charges and negative charges perfectly cancel each other out, the whole protein has a net charge of EXACTLY ZERO. At this pH (the pI), proteins lose their solubility and clump together into solid white chunks (which is exactly how you make cheese from milk!)."
      }
    ],
    "walkthroughExample": {
      "problem": "Histidine has a side-chain pKa of 6.0. It is in blood (pH 7.4). Is it protonated?",
      "solution": [
        "pH (7.4) is GREATER than pKa (6.0).",
        "The environment strips the proton away (deprotonated).",
        "For Histidine, losing its proton makes it neutral."
      ],
      "answer": "Net Charge = 0 (Neutral)"
    }
  },

  "cell-potential": {
    "intuition": "The Nernst Equation calculates the exact electrical voltage that a biological cell battery (like a nerve cell or the mitochondria) can output. It adjusts the 'standard' voltage based on how many chemicals are physically stuffed inside vs outside the cell.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "V",
        "altUnits": "mV",
        "description": "Actual Cell Potential (E)",
        "commonTraps": "A positive voltage means the cell is charged and ready to fire."
      },
      {
        "id": "z",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Electrons (z or n)",
        "commonTraps": "How many electrons are transferred in the chemical reaction."
      },
      {
        "id": "ratio",
        "siUnit": "",
        "altUnits": "",
        "description": "Reaction Quotient (Q)",
        "commonTraps": "Products divided by Reactants."
      }
    ],
    "solvingLogic": [
      "1. Calculate (RT/zF) * ln(Q). At body temperature, this simplifies to roughly (0.061 / z) * log10(Q).",
      "2. Subtract that value from the Standard Potential (E°)."
    ],
    "edgeCases": [
      {
        "title": "The Dead Battery",
        "description": "As a cell uses up its chemicals, the amount of Products goes up and Reactants goes down. This makes the log(Q) term larger. Eventually, the subtraction perfectly wipes out the Standard Potential (E°), the voltage hits 0.0V, and the battery (or the human cell) is dead."
      }
    ],
    "walkthroughExample": {
      "problem": "Standard potential is 1.0 V. Electrons (z) = 2. Q = 10. (Use the 0.059 constant for standard temp).",
      "solution": [
        "log10(10) = 1.",
        "0.059 / 2 = 0.0295.",
        "1.0 - 0.0295 = 0.9705."
      ],
      "answer": "E ≈ 0.97 V"
    }
  }
};
