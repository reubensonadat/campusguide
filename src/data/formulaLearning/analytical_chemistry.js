export const analytical_chemistry = {
  "beer-lambert": {
    "intuition": "The Beer-Lambert Law explains how sunglasses work. The thicker the glass (path length), and the darker the tint (concentration), the less light makes it to your eye. In chemistry, we use this to shoot a laser through a liquid to instantly calculate exactly how much of a chemical is dissolved in it, just by seeing how much light gets blocked.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "",
        "altUnits": "",
        "description": "Absorbance",
        "commonTraps": "It has absolutely no units! It is a logarithmic ratio of light in vs. light out."
      },
      {
        "id": "eps",
        "siUnit": "L/(mol·cm)",
        "altUnits": "",
        "description": "Molar Absorptivity (ε)",
        "commonTraps": "A constant specific to the chemical and the exact color (wavelength) of the laser being used."
      },
      {
        "id": "c",
        "siUnit": "mol/L",
        "altUnits": "",
        "description": "Concentration",
        "commonTraps": "Must be in Molarity."
      },
      {
        "id": "l",
        "siUnit": "cm",
        "altUnits": "",
        "description": "Path Length",
        "commonTraps": "Almost always 1 cm, because standard laboratory cuvettes are exactly 1 cm wide."
      }
    ],
    "solvingLogic": [
      "1. Multiply the molar absorptivity (ε) by the path length (l).",
      "2. Multiply that result by the concentration (c)."
    ],
    "edgeCases": [
      {
        "title": "Too Dark to See",
        "description": "If Absorbance (A) goes above 2.0, the liquid is blocking 99% of the light. At this point, the law breaks down mathematically because stray light bouncing off the room starts corrupting the tiny amount of laser light hitting the sensor. You MUST dilute the sample and try again."
      }
    ],
    "walkthroughExample": {
      "problem": "A protein solution has an absorbance of 0.5. The cuvette is 1 cm wide. ε is 10,000. Find the concentration.",
      "solution": [
        "A = ε × c × l",
        "0.5 = 10000 × c × 1",
        "c = 0.5 / 10000"
      ],
      "answer": "c = 0.00005 mol/L (50 μM)"
    }
  },

  "henderson-hasselbalch": {
    "intuition": "This is the 'Buffer' equation. It tells you exactly what the pH of a liquid will be when you mix a weak acid with its conjugate base. This is the exact math your blood uses to prevent you from dying when you drink acidic orange juice.",
    "variableBreakdown": [
      {
        "id": "pH",
        "siUnit": "",
        "altUnits": "",
        "description": "pH of the Solution",
        "commonTraps": "Below 7 is acidic, above 7 is basic."
      },
      {
        "id": "pKa",
        "siUnit": "",
        "altUnits": "",
        "description": "Acid Dissociation Constant (pKa)",
        "commonTraps": "The 'native' pH where the acid is exactly 50% neutralized."
      },
      {
        "id": "ratio",
        "siUnit": "",
        "altUnits": "",
        "description": "Ratio [Base] / [Acid]",
        "commonTraps": "Must be the Base divided by the Acid! Flipping this ratio upside down is the #1 mistake on chemistry finals."
      }
    ],
    "solvingLogic": [
      "1. Divide the concentration of the Base by the concentration of the Acid.",
      "2. Take the Log (base 10) of that ratio.",
      "3. Add the result to the pKa."
    ],
    "edgeCases": [
      {
        "title": "Perfect Buffers",
        "description": "If you mix exactly equal amounts of Acid and Base, the ratio is 1. The log of 1 is ZERO. Therefore, pH = pKa perfectly. This is the 'maximum buffering capacity' sweet spot."
      }
    ],
    "walkthroughExample": {
      "problem": "pKa is 4.76. You have 0.1M of Acetate (Base) and 0.01M of Acetic Acid (Acid). Find pH.",
      "solution": [
        "Ratio = 0.1 / 0.01 = 10.",
        "Log(10) = 1.",
        "pH = 4.76 + 1."
      ],
      "answer": "pH = 5.76"
    }
  },

  "titration-equivalence": {
    "intuition": "When neutralizing an acid with a base (titration), this formula acts as a perfectly balanced seesaw. It proves that the total number of acid molecules must perfectly equal the total number of base molecules to reach the exact 'equivalence point'.",
    "variableBreakdown": [
      {
        "id": "C1",
        "siUnit": "mol/L",
        "altUnits": "",
        "description": "Concentration of Acid",
        "commonTraps": "Molarity (M)."
      },
      {
        "id": "V1",
        "siUnit": "mL",
        "altUnits": "L",
        "description": "Volume of Acid",
        "commonTraps": "Can be in mL or L, as long as it matches V2 perfectly."
      },
      {
        "id": "C2",
        "siUnit": "mol/L",
        "altUnits": "",
        "description": "Concentration of Base",
        "commonTraps": ""
      },
      {
        "id": "V2",
        "siUnit": "mL",
        "altUnits": "L",
        "description": "Volume of Base",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Multiply Concentration 1 by Volume 1.",
      "2. Divide by the known value on the other side of the equation (either C2 or V2) to solve for the missing variable."
    ],
    "edgeCases": [
      {
        "title": "Diprotic Acids",
        "description": "This simple formula breaks if the acid is Sulfuric Acid (H₂SO₄), because it has TWO acidic protons per molecule. You must multiply the Acid side by 2 (or use the Normality formula instead)."
      }
    ],
    "walkthroughExample": {
      "problem": "It takes 50 mL of 0.1M NaOH to neutralize 25 mL of unknown HCl. Find HCl concentration.",
      "solution": [
        "Base side: 50 × 0.1 = 5.",
        "Acid side: 25 × C1 = 5.",
        "C1 = 5 / 25 = 0.2."
      ],
      "answer": "C1 = 0.2 M"
    }
  },

  "delta-g": {
    "intuition": "Gibbs Free Energy is the ultimate judge of chemistry. It mathematically decides if a reaction will happen spontaneously (on its own), or if you have to force it to happen by adding energy. It balances the heat given off (Enthalpy) against the chaos created (Entropy).",
    "variableBreakdown": [
      {
        "id": "dG",
        "siUnit": "kJ/mol",
        "altUnits": "",
        "description": "Change in Free Energy (ΔG)",
        "commonTraps": "Negative ΔG means SPONTANEOUS (it will happen). Positive ΔG means NON-SPONTANEOUS."
      },
      {
        "id": "dH",
        "siUnit": "kJ/mol",
        "altUnits": "",
        "description": "Change in Enthalpy (ΔH)",
        "commonTraps": "Heat. Negative means it gives off heat (exothermic), which the universe likes."
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Temperature (T)",
        "commonTraps": "Must be in Kelvin."
      },
      {
        "id": "dS",
        "siUnit": "J/(mol·K)",
        "altUnits": "",
        "description": "Change in Entropy (ΔS)",
        "commonTraps": "CRITICAL TRAP: Entropy is almost always given in JOULES, but Enthalpy is in KILOJOULES. You MUST divide Entropy by 1000 before plugging it in!"
      }
    ],
    "solvingLogic": [
      "1. Convert ΔS to kJ/mol (divide by 1000).",
      "2. Multiply Temperature (T) by ΔS.",
      "3. Subtract that result from ΔH."
    ],
    "edgeCases": [
      {
        "title": "Melting Ice",
        "description": "Ice melting requires heat (ΔH is positive / bad), but creates a puddle of chaotic liquid (ΔS is positive / good). Because 'T' is multiplied by ΔS, at high temperatures, the chaos wins, ΔG becomes negative, and the ice spontaneously melts!"
      }
    ],
    "walkthroughExample": {
      "problem": "ΔH = -50 kJ/mol. ΔS = -100 J/(mol·K). T = 300 K. Find ΔG.",
      "solution": [
        "Convert ΔS: -100 / 1000 = -0.1 kJ.",
        "T × ΔS = 300 × (-0.1) = -30.",
        "ΔG = ΔH - (TΔS) = -50 - (-30) = -20."
      ],
      "answer": "ΔG = -20 kJ/mol (Spontaneous)"
    }
  }
};
