export const chemistry = {
  "ph-calc": {
    "intuition": "The pH scale measures how acidic or basic an aqueous solution is. It is a logarithmic scale inversely indicating the concentration of hydrogen ions [H+]. A lower pH means higher acidity.",
    "variableBreakdown": [
      {
        "id": "pH",
        "siUnit": "",
        "altUnits": "",
        "description": "pH",
        "commonTraps": "A change of 1 in pH means a 10-fold change in [H+]."
      },
      {
        "id": "pOH",
        "siUnit": "",
        "altUnits": "",
        "description": "pOH",
        "commonTraps": "pH + pOH = 14 only at 25°C."
      },
      {
        "id": "H",
        "siUnit": "M",
        "altUnits": "mol/L",
        "description": "Hydrogen Ion Concentration [H+]",
        "commonTraps": "Must be in molarity (mol/L). Often a very small number requiring scientific notation."
      },
      {
        "id": "OH",
        "siUnit": "M",
        "altUnits": "mol/L",
        "description": "Hydroxide Ion Concentration [OH-]",
        "commonTraps": "Must be in molarity (mol/L)."
      }
    ],
    "solvingLogic": [
      "1. pH = -log₁₀([H+]) and pOH = -log₁₀([OH-]).",
      "2. To find concentration from pH/pOH: [H+] = 10^(-pH) and [OH-] = 10^(-pOH).",
      "3. At 25°C, pH + pOH = 14, and [H+] × [OH-] = 1.0 × 10⁻¹⁴."
    ],
    "edgeCases": [
      {
        "title": "Negative pH",
        "description": "If [H+] > 1.0 M (e.g., highly concentrated strong acid), the pH will be negative. This is physically valid."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the pH of a solution with a hydrogen ion concentration of 1.0 × 10⁻³ M.",
      "solution": [
        "[H+] = 10⁻³.",
        "pH = -log₁₀(10⁻³) = 3."
      ],
      "answer": "pH = 3"
    }
  },

  "dilution": {
    "intuition": "The dilution formula M₁V₁ = M₂V₂ works because adding solvent (like water) to a solution changes its volume and concentration, but the total number of moles of solute remains exactly the same.",
    "variableBreakdown": [
      {
        "id": "M1",
        "siUnit": "M",
        "altUnits": "mol/L",
        "description": "Initial Concentration (M₁)",
        "commonTraps": "Usually the more concentrated stock solution."
      },
      {
        "id": "V1",
        "siUnit": "L",
        "altUnits": "mL",
        "description": "Initial Volume (V₁)",
        "commonTraps": "Must use the same volume units as V₂ (e.g., both mL or both L)."
      },
      {
        "id": "M2",
        "siUnit": "M",
        "altUnits": "mol/L",
        "description": "Final Concentration (M₂)",
        "commonTraps": "Should always be less than M₁ in a dilution."
      },
      {
        "id": "V2",
        "siUnit": "L",
        "altUnits": "mL",
        "description": "Final Volume (V₂)",
        "commonTraps": "This is the TOTAL final volume, not the amount of solvent added!"
      }
    ],
    "solvingLogic": [
      "1. Identify the given initial and final states.",
      "2. Ensure V₁ and V₂ are in the same units.",
      "3. Use M₁ × V₁ = M₂ × V₂.",
      "4. Divide to isolate the unknown variable."
    ],
    "edgeCases": [
      {
        "title": "Adding Solvent",
        "description": "If asked 'how much water to add', first find V₂, then subtract V₁ from V₂ to find the added volume."
      }
    ],
    "walkthroughExample": {
      "problem": "What volume of 10M HCl is needed to make 500 mL of 2M HCl?",
      "solution": [
        "M₁ = 10, M₂ = 2, V₂ = 500 mL.",
        "10 × V₁ = 2 × 500",
        "10 × V₁ = 1000",
        "V₁ = 100 mL."
      ],
      "answer": "V₁ = 100 mL"
    }
  },

  "beer-lambert": {
    "intuition": "The Beer-Lambert law relates the attenuation of light to the properties of the material through which the light is traveling. The darker or more concentrated a solution is, the more light it absorbs.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "",
        "altUnits": "",
        "description": "Absorbance (A)",
        "commonTraps": "Absorbance has no units. It is derived from log(I₀/I)."
      },
      {
        "id": "epsilon",
        "siUnit": "L/(mol·cm)",
        "altUnits": "M⁻¹cm⁻¹",
        "description": "Molar Absorptivity (ε)",
        "commonTraps": "A constant specific to the molecule being measured at a specific wavelength."
      },
      {
        "id": "c",
        "siUnit": "M",
        "altUnits": "mol/L",
        "description": "Concentration (c)",
        "commonTraps": "Must be in mol/L (M) to cancel out with ε."
      },
      {
        "id": "l",
        "siUnit": "cm",
        "altUnits": "",
        "description": "Path Length (l)",
        "commonTraps": "Usually 1 cm (the width of a standard cuvette). Must be in cm."
      }
    ],
    "solvingLogic": [
      "1. Identify A, ε, c, and l.",
      "2. Ensure units match (ε in M⁻¹cm⁻¹, c in M, l in cm).",
      "3. Use A = ε × c × l.",
      "4. Rearrange to solve for the unknown."
    ],
    "edgeCases": [
      {
        "title": "High Concentrations",
        "description": "At very high concentrations (typically >0.01M), the linear relationship breaks down due to molecular interactions, and Beer's Law is no longer accurate."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the concentration if Absorbance is 0.5, path length is 1 cm, and ε is 1000 M⁻¹cm⁻¹.",
      "solution": [
        "A = ε × c × l",
        "0.5 = 1000 × c × 1",
        "c = 0.5 / 1000 = 0.0005 M."
      ],
      "answer": "c = 0.0005 M"
    }
  },

  "nernst": {
    "intuition": "The Nernst Equation calculates the cell potential of an electrochemical cell at any concentration, temperature, and pressure. It adjusts the standard cell potential based on the reaction quotient (Q).",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "V",
        "altUnits": "",
        "description": "Cell Potential (E)",
        "commonTraps": "If E is positive, the reaction is spontaneous."
      },
      {
        "id": "E0",
        "siUnit": "V",
        "altUnits": "",
        "description": "Standard Cell Potential (E°)",
        "commonTraps": "The potential when all concentrations are exactly 1M."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Electrons (n)",
        "commonTraps": "The total number of moles of electrons transferred in the balanced redox reaction."
      },
      {
        "id": "Q",
        "siUnit": "",
        "altUnits": "",
        "description": "Reaction Quotient (Q)",
        "commonTraps": "Q = [Products] / [Reactants]. Do not include pure solids or liquids in the Q expression."
      }
    ],
    "solvingLogic": [
      "1. Determine E° by subtracting anode potential from cathode potential (if not given).",
      "2. Determine n from the balanced half-reactions.",
      "3. Calculate Q using given concentrations.",
      "4. Use the simplified Nernst equation at 25°C: E = E° - (0.0592 / n) × log₁₀(Q)."
    ],
    "edgeCases": [
      {
        "title": "Standard Conditions",
        "description": "If all concentrations are 1M, Q = 1. Since log(1) = 0, the equation simplifies to E = E°."
      },
      {
        "title": "At Equilibrium",
        "description": "At equilibrium, the battery is dead (E = 0), and Q becomes K (equilibrium constant). E° = (0.0592 / n) × log(K)."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate E for a cell where E° = 1.10 V, n = 2, and Q = 100 at 25°C.",
      "solution": [
        "log₁₀(Q) = log₁₀(100) = 2.",
        "E = 1.10 - (0.0592 / 2) × 2.",
        "E = 1.10 - 0.0592 = 1.0408 V."
      ],
      "answer": "E ≈ 1.04 V"
    }
  },

  "ideal-gas-molar": {
    "intuition": "The Ideal Gas Law relates the pressure, volume, temperature, and amount of a hypothetical ideal gas. It assumes gas particles have no volume and do not attract each other.",
    "variableBreakdown": [
      {
        "id": "P",
        "siUnit": "Pa",
        "altUnits": "atm, mmHg",
        "description": "Pressure (P)",
        "commonTraps": "The unit of P dictates which value of the gas constant (R) you must use."
      },
      {
        "id": "V",
        "siUnit": "m³",
        "altUnits": "L",
        "description": "Volume (V)",
        "commonTraps": "If P is in atm and R = 0.0821, V MUST be in Liters."
      },
      {
        "id": "n",
        "siUnit": "mol",
        "altUnits": "",
        "description": "Moles (n)",
        "commonTraps": "If given mass in grams, divide by molar mass to find moles."
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Temperature (T)",
        "commonTraps": "MUST be in Kelvin. Convert from Celsius by adding 273.15."
      }
    ],
    "solvingLogic": [
      "1. Identify the given variables and their units.",
      "2. Choose the correct R (e.g., 0.08206 L·atm/(mol·K) or 8.314 J/(mol·K)).",
      "3. Convert T to Kelvin.",
      "4. Use P × V = n × R × T.",
      "5. Rearrange to solve for the unknown."
    ],
    "edgeCases": [
      {
        "title": "Extreme Conditions",
        "description": "At very high pressures or very low temperatures, real gases deviate significantly from ideal behavior, requiring the Van der Waals equation instead."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the volume of 1 mole of an ideal gas at 1 atm and 273.15 K (0°C).",
      "solution": [
        "P = 1 atm, n = 1 mol, T = 273.15 K.",
        "Use R = 0.08206 L·atm/(mol·K).",
        "V = (nRT) / P = (1 × 0.08206 × 273.15) / 1 ≈ 22.41 L."
      ],
      "answer": "V ≈ 22.41 L"
    }
  }
};
