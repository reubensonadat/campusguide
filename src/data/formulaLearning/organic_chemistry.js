export const organic_chemistry = {
  "degree-unsaturation": {
    "intuition": "The Degree of Unsaturation (or HDI) tells you immediately if a mystery molecule has rings or double bonds hidden inside it. Every time you bend a carbon chain into a ring, or add a double bond, you are forced to 'delete' two Hydrogen atoms from the molecule. This formula just counts the missing Hydrogens.",
    "variableBreakdown": [
      {
        "id": "DU",
        "siUnit": "",
        "altUnits": "",
        "description": "Degree of Unsaturation",
        "commonTraps": "Also called Hydrogen Deficiency Index (HDI)."
      },
      {
        "id": "C",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Carbons",
        "commonTraps": "Forms the backbone."
      },
      {
        "id": "H",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Hydrogens",
        "commonTraps": "The atoms being deleted to make rings/bonds."
      },
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Nitrogens",
        "commonTraps": "Nitrogen forms 3 bonds, so it accidentally 'adds' a hydrogen space. You must subtract it."
      },
      {
        "id": "X",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Halogens",
        "commonTraps": "Fluorine, Chlorine, Bromine. They act exactly like Hydrogens, so you add them."
      }
    ],
    "solvingLogic": [
      "1. Start with Carbons (C) + 1.",
      "2. Subtract half of the Hydrogens (H/2).",
      "3. Subtract half of the Halogens (X/2).",
      "4. ADD half of the Nitrogens (N/2)."
    ],
    "edgeCases": [
      {
        "title": "Ignoring Oxygen",
        "description": "Notice that Oxygen (O) is completely missing from the formula! Because Oxygen forms exactly 2 bonds, you can seamlessly slide it into the middle of any carbon chain without altering the hydrogen count at all. You just ignore it completely."
      }
    ],
    "walkthroughExample": {
      "problem": "A molecule has the formula C₆H₆ (Benzene). Find the Degree of Unsaturation.",
      "solution": [
        "C + 1 = 6 + 1 = 7.",
        "Subtract H/2 = 6 / 2 = 3.",
        "7 - 3 = 4."
      ],
      "answer": "DU = 4 (Meaning Benzene has 1 ring and 3 double bonds!)"
    }
  },

  "hdi-index": {
    "intuition": "This is the exact same concept as the Degree of Unsaturation, just presented with a slightly different layout used in some textbooks. It answers the exact same question: 'How many missing pairs of Hydrogen are there?'",
    "variableBreakdown": [
      {
        "id": "HDI",
        "siUnit": "",
        "altUnits": "",
        "description": "Hydrogen Deficiency Index",
        "commonTraps": ""
      },
      {
        "id": "C",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Carbons",
        "commonTraps": ""
      },
      {
        "id": "H",
        "siUnit": "",
        "altUnits": "",
        "description": "Effective Hydrogens",
        "commonTraps": "Calculated by doing: Actual Hydrogens + Halogens - Nitrogens."
      }
    ],
    "solvingLogic": [
      "1. Calculate the 'Maximum' possible hydrogens if the chain was completely straight: (2C + 2).",
      "2. Subtract the 'Effective' hydrogens (H).",
      "3. Divide the result by 2."
    ],
    "edgeCases": [
      {
        "title": "Triple Bonds",
        "description": "A single triple bond (alkyne) deletes FOUR hydrogens (two pairs). Therefore, a single triple bond contributes exactly '2' to the HDI."
      }
    ],
    "walkthroughExample": {
      "problem": "Formula is C₄H₈. Find HDI.",
      "solution": [
        "Max Hydrogens = (2 × 4) + 2 = 10.",
        "Missing = 10 - 8 = 2.",
        "Divide by 2 = 1."
      ],
      "answer": "HDI = 1 (It has exactly one double bond or one ring)"
    }
  },

  "ee-optical-purity": {
    "intuition": "Enantiomeric Excess (ee) is a crucial metric in pharmaceuticals. Many drug molecules are 'handed' (like a left and right glove). The right-handed drug might cure your headache, while the left-handed version is completely toxic! This formula measures how 'pure' a batch of chemicals is, to make sure you didn't accidentally mix the two.",
    "variableBreakdown": [
      {
        "id": "ee",
        "siUnit": "%",
        "altUnits": "",
        "description": "Enantiomeric Excess",
        "commonTraps": "An 'ee' of 0% means you have exactly a 50/50 mix (a Racemic mixture). This is very bad for drugs."
      },
      {
        "id": "R",
        "siUnit": "%",
        "altUnits": "moles",
        "description": "Amount of R Enantiomer",
        "commonTraps": "Right-handed molecule."
      },
      {
        "id": "S",
        "siUnit": "%",
        "altUnits": "moles",
        "description": "Amount of S Enantiomer",
        "commonTraps": "Left-handed molecule."
      }
    ],
    "solvingLogic": [
      "1. Take the absolute difference between the two amounts: |R - S|.",
      "2. Divide by the total amount (R + S).",
      "3. Multiply by 100 to get a percentage."
    ],
    "edgeCases": [
      {
        "title": "Optical Rotation",
        "description": "Because left and right-handed molecules look perfectly identical to standard chemistry tests, the only way to measure them is to shine polarized light through the beaker. The 'R' molecules rotate the light clockwise, and the 'S' molecules rotate it counter-clockwise. The 'ee' is literally just how far the light twisted!"
      }
    ],
    "walkthroughExample": {
      "problem": "A drug batch contains 90% of the active R enantiomer and 10% of the toxic S enantiomer. Find the 'ee'.",
      "solution": [
        "Difference: |90 - 10| = 80.",
        "Total: 90 + 10 = 100.",
        "Ratio: 80 / 100 = 80%."
      ],
      "answer": "ee = 80% (You have an 80% excess of pure R, and the remaining 20% is perfectly canceled out as a 50/50 mix)"
    }
  }
};
