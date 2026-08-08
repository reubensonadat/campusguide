export const physical_chemistry = {
  "arrhenius": {
    "intuition": "The Arrhenius equation describes how the speed (rate constant) of a chemical reaction changes with temperature and activation energy. Higher temperature or lower activation energy makes the reaction go much faster.",
    "variableBreakdown": [
      {
        "id": "k",
        "siUnit": "",
        "altUnits": "",
        "description": "Rate Constant (k)",
        "commonTraps": "Units depend on the order of the reaction."
      },
      {
        "id": "A",
        "siUnit": "",
        "altUnits": "",
        "description": "Pre-exponential Factor (A)",
        "commonTraps": "Represents the frequency of correct collisions. Has the same units as k."
      },
      {
        "id": "Ea",
        "siUnit": "J/mol",
        "altUnits": "kJ/mol",
        "description": "Activation Energy (Ea)",
        "commonTraps": "MUST be in Joules/mol if using R = 8.314 J/(mol·K). Multiply kJ by 1000."
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Temperature (T)",
        "commonTraps": "MUST be in Kelvin."
      }
    ],
    "solvingLogic": [
      "1. Ensure Ea is in Joules/mol.",
      "2. Convert T to Kelvin.",
      "3. Use the gas constant R = 8.314 J/(mol·K).",
      "4. Calculate the exponent: -Ea / (R × T).",
      "5. Calculate k = A × e^(-Ea / RT)."
    ],
    "edgeCases": [
      {
        "title": "Infinite Temperature",
        "description": "As T approaches infinity, the exponent approaches 0, and e^0 = 1. The rate constant k approaches the maximum possible limit, A."
      }
    ],
    "walkthroughExample": {
      "problem": "Find k if A = 10, Ea = 0 J/mol, and T = 300 K.",
      "solution": [
        "Since Ea = 0, -Ea/RT = 0.",
        "e^0 = 1.",
        "k = 10 × 1 = 10."
      ],
      "answer": "k = 10"
    }
  },

  "vanthoff": {
    "intuition": "The van 't Hoff equation describes how the equilibrium constant (K) of a reaction shifts as temperature changes, depending on whether the reaction is endothermic (absorbs heat) or exothermic (releases heat).",
    "variableBreakdown": [
      {
        "id": "K1",
        "siUnit": "",
        "altUnits": "",
        "description": "Equilibrium Constant 1 (K₁)",
        "commonTraps": "Unitless. Must correspond exactly to T₁."
      },
      {
        "id": "K2",
        "siUnit": "",
        "altUnits": "",
        "description": "Equilibrium Constant 2 (K₂)",
        "commonTraps": "Unitless. Must correspond exactly to T₂."
      },
      {
        "id": "T1",
        "siUnit": "K",
        "altUnits": "",
        "description": "Initial Temperature (T₁)",
        "commonTraps": "MUST be in Kelvin."
      },
      {
        "id": "T2",
        "siUnit": "K",
        "altUnits": "",
        "description": "Final Temperature (T₂)",
        "commonTraps": "MUST be in Kelvin."
      },
      {
        "id": "dH",
        "siUnit": "J/mol",
        "altUnits": "kJ/mol",
        "description": "Standard Enthalpy Change (ΔH°)",
        "commonTraps": "Must be in Joules to match the gas constant R (8.314 J/mol·K). Multiply kJ by 1000."
      }
    ],
    "solvingLogic": [
      "1. Ensure T₁ and T₂ are in Kelvin.",
      "2. Ensure ΔH° is in J/mol.",
      "3. Use ln(K₂/K₁) = (-ΔH°/R) × (1/T₂ - 1/T₁).",
      "4. Exponentiate both sides if solving for K₂: K₂/K₁ = e^(...)"
    ],
    "edgeCases": [
      {
        "title": "Thermoneutral Reactions",
        "description": "If ΔH° = 0, the right side is 0, so ln(K₂/K₁) = 0. This means K₂ = K₁ (equilibrium is unaffected by temperature)."
      }
    ],
    "walkthroughExample": {
      "problem": "For a reaction with ΔH° = 0, how does K change when heated from 300K to 400K?",
      "solution": [
        "Since ΔH° = 0, the term (-ΔH°/R) is 0.",
        "ln(K₂/K₁) = 0 × (1/400 - 1/300) = 0.",
        "e^0 = 1, so K₂/K₁ = 1. Therefore, K₂ = K₁."
      ],
      "answer": "K remains unchanged"
    }
  },

  "clausius-clapeyron": {
    "intuition": "The Clausius-Clapeyron equation links the vapor pressure of a liquid to its temperature and its heat of vaporization. It explains why water boils at a lower temperature at higher altitudes (lower pressure).",
    "variableBreakdown": [
      {
        "id": "P1",
        "siUnit": "atm",
        "altUnits": "mmHg, torr",
        "description": "Vapor Pressure 1 (P₁)",
        "commonTraps": "Units must match P₂. Often, standard pressure (1 atm) is used at the normal boiling point."
      },
      {
        "id": "P2",
        "siUnit": "atm",
        "altUnits": "mmHg, torr",
        "description": "Vapor Pressure 2 (P₂)",
        "commonTraps": "Units must match P₁."
      },
      {
        "id": "T1",
        "siUnit": "K",
        "altUnits": "",
        "description": "Temperature 1 (T₁)",
        "commonTraps": "MUST be in Kelvin."
      },
      {
        "id": "T2",
        "siUnit": "K",
        "altUnits": "",
        "description": "Temperature 2 (T₂)",
        "commonTraps": "MUST be in Kelvin."
      },
      {
        "id": "dHvap",
        "siUnit": "J/mol",
        "altUnits": "kJ/mol",
        "description": "Heat of Vaporization (ΔHvap)",
        "commonTraps": "Must be in Joules/mol to match R (8.314 J/mol·K). Multiply kJ by 1000."
      }
    ],
    "solvingLogic": [
      "1. Convert T₁ and T₂ to Kelvin.",
      "2. Convert ΔHvap to Joules/mol.",
      "3. Use ln(P₂/P₁) = (-ΔHvap / R) × (1/T₂ - 1/T₁).",
      "4. Exponentiate if solving for pressure, or isolate the T term if solving for temperature."
    ],
    "edgeCases": [
      {
        "title": "Normal Boiling Point",
        "description": "The normal boiling point is specifically T₂ when P₂ is exactly 1 atm."
      }
    ],
    "walkthroughExample": {
      "problem": "If a liquid's vapor pressure is P₁ at 300K, what happens if it is heated to 300K?",
      "solution": [
        "Since T₁ = T₂ = 300K, (1/T₂ - 1/T₁) = 0.",
        "ln(P₂/P₁) = 0.",
        "e^0 = 1, so P₂ = P₁."
      ],
      "answer": "P₂ = P₁ (No change)"
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
  }
};
