export const general_chemistry = {
  "density": {
    "intuition": "Density measures how tightly packed the matter in a substance is. It is the ratio of mass to volume. Objects with lower density will float in fluids with higher density.",
    "variableBreakdown": [
      {
        "id": "rho",
        "siUnit": "kg/m³",
        "altUnits": "g/mL",
        "description": "Density (ρ)",
        "commonTraps": "In chemistry, density is most often measured in g/mL or g/cm³, unlike in physics where kg/m³ is preferred."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "g",
        "description": "Mass (m)",
        "commonTraps": "Ensure the mass unit matches the numerator of the density unit."
      },
      {
        "id": "V",
        "siUnit": "m³",
        "altUnits": "mL, cm³",
        "description": "Volume (V)",
        "commonTraps": "Ensure the volume unit matches the denominator of the density unit. Note: 1 mL = 1 cm³."
      }
    ],
    "solvingLogic": [
      "1. Identify the given mass and volume.",
      "2. Check that the units are consistent.",
      "3. Use ρ = m / V to find density.",
      "4. Rearrange to m = ρ × V or V = m / ρ to find unknowns."
    ],
    "edgeCases": [
      {
        "title": "Gases vs Liquids",
        "description": "Gas densities are usually much lower and often reported in g/L rather than g/mL."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the density of a 50 g object that takes up 10 mL of space.",
      "solution": [
        "m = 50 g.",
        "V = 10 mL.",
        "ρ = 50 / 10 = 5 g/mL."
      ],
      "answer": "ρ = 5 g/mL"
    }
  },

  "moles-calc": {
    "intuition": "The mole is the standard unit for counting atoms and molecules. Molar mass (M) bridges the gap between the mass you can weigh on a scale and the number of particles (moles) present.",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "mol",
        "altUnits": "",
        "description": "Moles (n)",
        "commonTraps": "Moles represent a count (like a 'dozen'). 1 mole = 6.022 × 10²³ particles."
      },
      {
        "id": "m",
        "siUnit": "g",
        "altUnits": "kg",
        "description": "Mass (m)",
        "commonTraps": "In chemistry, mass is almost always used in grams (g) when converting to moles."
      },
      {
        "id": "M",
        "siUnit": "g/mol",
        "altUnits": "",
        "description": "Molar Mass (M)",
        "commonTraps": "Calculated by adding the atomic weights of all atoms in the chemical formula from the periodic table."
      }
    ],
    "solvingLogic": [
      "1. Find the molar mass M from the periodic table if it is not given.",
      "2. Ensure the given mass is in grams.",
      "3. Use n = m / M to find moles.",
      "4. Rearrange to m = n × M to find mass."
    ],
    "edgeCases": [
      {
        "title": "Diatomic Elements",
        "description": "For elements like Oxygen gas (O₂), the molar mass is twice the atomic weight (16 × 2 = 32 g/mol)."
      }
    ],
    "walkthroughExample": {
      "problem": "How many moles are in 36 grams of Water (H₂O)? (Molar mass = 18 g/mol)",
      "solution": [
        "m = 36 g, M = 18 g/mol.",
        "n = m / M = 36 / 18 = 2 moles."
      ],
      "answer": "n = 2 moles"
    }
  },

  "molarity": {
    "intuition": "Molarity measures the concentration of a solution. It tells you exactly how many moles of solute are dissolved in every liter of the total solution.",
    "variableBreakdown": [
      {
        "id": "M",
        "siUnit": "M",
        "altUnits": "mol/L",
        "description": "Molarity (M)",
        "commonTraps": "The unit 'M' means moles per liter. Do not confuse it with molar mass."
      },
      {
        "id": "n",
        "siUnit": "mol",
        "altUnits": "",
        "description": "Moles of Solute (n)",
        "commonTraps": "If given mass, first convert to moles using n = m / Molar Mass."
      },
      {
        "id": "V",
        "siUnit": "L",
        "altUnits": "mL",
        "description": "Volume of Solution (V)",
        "commonTraps": "MUST be in Liters. If given in mL, divide by 1000 before dividing."
      }
    ],
    "solvingLogic": [
      "1. Find the moles of solute (n).",
      "2. Find the total volume of the solution in Liters (V).",
      "3. Divide moles by Liters: Molarity = n / V."
    ],
    "edgeCases": [
      {
        "title": "Volume of Solution vs Solvent",
        "description": "Molarity uses the volume of the ENTIRE solution, not just the water/solvent added."
      }
    ],
    "walkthroughExample": {
      "problem": "What is the molarity of a solution with 0.5 moles of NaCl dissolved in 250 mL of solution?",
      "solution": [
        "n = 0.5 moles.",
        "V = 250 mL = 0.250 L.",
        "M = 0.5 / 0.250 = 2.0 M."
      ],
      "answer": "Molarity = 2.0 M"
    }
  },

  "percent-yield": {
    "intuition": "Percent yield measures the efficiency of a chemical reaction. It compares the amount actually produced in the real world to the maximum amount that could theoretically be produced on paper.",
    "variableBreakdown": [
      {
        "id": "actual",
        "siUnit": "g",
        "altUnits": "mol",
        "description": "Actual Yield",
        "commonTraps": "The amount recovered from the experiment. It is almost always less than the theoretical yield."
      },
      {
        "id": "theoretical",
        "siUnit": "g",
        "altUnits": "mol",
        "description": "Theoretical Yield",
        "commonTraps": "The calculated maximum amount based on stoichiometry and the limiting reactant. Must have the same units as the actual yield."
      }
    ],
    "solvingLogic": [
      "1. Calculate the theoretical yield using stoichiometry.",
      "2. Identify the actual yield given in the problem.",
      "3. Ensure both are in the same units (usually grams).",
      "4. Use % Yield = (Actual / Theoretical) × 100."
    ],
    "edgeCases": [
      {
        "title": "Yield > 100%",
        "description": "If your yield is over 100%, your product is likely contaminated (e.g., it is still wet) or a calculation error was made."
      }
    ],
    "walkthroughExample": {
      "problem": "You calculate that a reaction should produce 50g of product, but you only recover 40g. What is the percent yield?",
      "solution": [
        "Actual = 40g.",
        "Theoretical = 50g.",
        "% Yield = (40 / 50) × 100 = 0.8 × 100 = 80%."
      ],
      "answer": "Percent Yield = 80%"
    }
  },

  "boyle-law": {
    "intuition": "Boyle's Law states that at a constant temperature, the pressure and volume of a gas are inversely proportional. Squeezing a gas into a smaller space increases its pressure.",
    "variableBreakdown": [
      {
        "id": "P1",
        "siUnit": "atm",
        "altUnits": "Pa, mmHg, torr",
        "description": "Initial Pressure (P₁)",
        "commonTraps": "Must use the exact same unit as P₂."
      },
      {
        "id": "V1",
        "siUnit": "L",
        "altUnits": "mL, m³",
        "description": "Initial Volume (V₁)",
        "commonTraps": "Must use the exact same unit as V₂."
      },
      {
        "id": "P2",
        "siUnit": "atm",
        "altUnits": "Pa, mmHg, torr",
        "description": "Final Pressure (P₂)",
        "commonTraps": "Must use the exact same unit as P₁."
      },
      {
        "id": "V2",
        "siUnit": "L",
        "altUnits": "mL, m³",
        "description": "Final Volume (V₂)",
        "commonTraps": "Must use the exact same unit as V₁."
      }
    ],
    "solvingLogic": [
      "1. Ensure pressures match units and volumes match units.",
      "2. Use P₁ × V₁ = P₂ × V₂.",
      "3. Divide to isolate the unknown variable."
    ],
    "edgeCases": [
      {
        "title": "Temperature Change",
        "description": "Boyle's Law ONLY works if the temperature and amount of gas stay constant."
      }
    ],
    "walkthroughExample": {
      "problem": "A 10 L balloon at 1 atm is compressed to 5 L. What is the new pressure?",
      "solution": [
        "P₁ = 1, V₁ = 10, V₂ = 5.",
        "1 × 10 = P₂ × 5.",
        "10 = 5 × P₂.",
        "P₂ = 2 atm."
      ],
      "answer": "P₂ = 2 atm"
    }
  },

  "charles-law": {
    "intuition": "Charles's Law states that at a constant pressure, the volume of a gas is directly proportional to its absolute temperature. Heating a gas causes it to expand.",
    "variableBreakdown": [
      {
        "id": "V1",
        "siUnit": "L",
        "altUnits": "mL",
        "description": "Initial Volume (V₁)",
        "commonTraps": "Must use the exact same unit as V₂."
      },
      {
        "id": "T1",
        "siUnit": "K",
        "altUnits": "",
        "description": "Initial Temperature (T₁)",
        "commonTraps": "MUST be in Kelvin. Celsius will give the wrong answer."
      },
      {
        "id": "V2",
        "siUnit": "L",
        "altUnits": "mL",
        "description": "Final Volume (V₂)",
        "commonTraps": "Must use the exact same unit as V₁."
      },
      {
        "id": "T2",
        "siUnit": "K",
        "altUnits": "",
        "description": "Final Temperature (T₂)",
        "commonTraps": "MUST be in Kelvin."
      }
    ],
    "solvingLogic": [
      "1. Convert all temperatures to Kelvin (K = °C + 273.15).",
      "2. Use V₁ / T₁ = V₂ / T₂.",
      "3. Cross-multiply to solve for the unknown."
    ],
    "edgeCases": [
      {
        "title": "Absolute Zero",
        "description": "If T approaches 0 K, V mathematically approaches 0, though real gases condense into liquids long before then."
      }
    ],
    "walkthroughExample": {
      "problem": "A 2 L balloon at 300 K is heated to 600 K. What is the new volume?",
      "solution": [
        "V₁ = 2, T₁ = 300, T₂ = 600.",
        "2 / 300 = V₂ / 600.",
        "Cross multiply: 300 × V₂ = 1200.",
        "V₂ = 1200 / 300 = 4 L."
      ],
      "answer": "V₂ = 4 L"
    }
  },

  "combined-gas": {
    "intuition": "The Combined Gas Law merges Boyle's, Charles's, and Gay-Lussac's laws. It is used when pressure, volume, and temperature all change simultaneously, but the amount of gas is fixed.",
    "variableBreakdown": [
      {
        "id": "P1",
        "siUnit": "atm",
        "altUnits": "",
        "description": "Initial Pressure (P₁)",
        "commonTraps": "Must match the unit of P₂."
      },
      {
        "id": "V1",
        "siUnit": "L",
        "altUnits": "",
        "description": "Initial Volume (V₁)",
        "commonTraps": "Must match the unit of V₂."
      },
      {
        "id": "T1",
        "siUnit": "K",
        "altUnits": "",
        "description": "Initial Temperature (T₁)",
        "commonTraps": "MUST be in Kelvin."
      },
      {
        "id": "P2",
        "siUnit": "atm",
        "altUnits": "",
        "description": "Final Pressure (P₂)",
        "commonTraps": "Must match the unit of P₁."
      },
      {
        "id": "V2",
        "siUnit": "L",
        "altUnits": "",
        "description": "Final Volume (V₂)",
        "commonTraps": "Must match the unit of V₁."
      },
      {
        "id": "T2",
        "siUnit": "K",
        "altUnits": "",
        "description": "Final Temperature (T₂)",
        "commonTraps": "MUST be in Kelvin."
      }
    ],
    "solvingLogic": [
      "1. Convert both temperatures to Kelvin.",
      "2. Check that P₁ matches P₂ and V₁ matches V₂ units.",
      "3. Use (P₁ × V₁) / T₁ = (P₂ × V₂) / T₂.",
      "4. Cross-multiply and solve algebraically."
    ],
    "edgeCases": [
      {
        "title": "Constant Variable",
        "description": "If any variable remains constant (e.g., T₁ = T₂), it cancels out on both sides, reducing the equation to Boyle's, Charles's, or Gay-Lussac's Law."
      }
    ],
    "walkthroughExample": {
      "problem": "A gas at 1 atm, 2 L, and 300 K is changed to 2 atm and 600 K. Find the final volume.",
      "solution": [
        "(1 × 2) / 300 = (2 × V₂) / 600.",
        "2 / 300 = 2V₂ / 600.",
        "Cross multiply: 1200 = 600 × V₂.",
        "V₂ = 2 L."
      ],
      "answer": "V₂ = 2 L"
    }
  },

  "gibbs-free": {
    "intuition": "Gibbs Free Energy predicts whether a chemical reaction will happen spontaneously. If ΔG is negative, the reaction is spontaneous; it releases free energy that can do work.",
    "variableBreakdown": [
      {
        "id": "dG",
        "siUnit": "J",
        "altUnits": "kJ",
        "description": "Change in Gibbs Free Energy (ΔG)",
        "commonTraps": "Negative means spontaneous. Positive means non-spontaneous."
      },
      {
        "id": "dH",
        "siUnit": "J",
        "altUnits": "kJ",
        "description": "Change in Enthalpy (ΔH)",
        "commonTraps": "Often given in kJ, while entropy (ΔS) is often in J. Be sure to convert so they match!"
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Absolute Temperature (T)",
        "commonTraps": "MUST be in Kelvin."
      },
      {
        "id": "dS",
        "siUnit": "J/K",
        "altUnits": "",
        "description": "Change in Entropy (ΔS)",
        "commonTraps": "Often given in Joules. Convert to kJ if ΔH is in kJ (divide by 1000)."
      }
    ],
    "solvingLogic": [
      "1. Ensure ΔH and ΔS are in the SAME energy unit (typically both in kJ or both in J).",
      "2. Convert T to Kelvin.",
      "3. Multiply T × ΔS.",
      "4. Subtract that from ΔH: ΔG = ΔH - TΔS."
    ],
    "edgeCases": [
      {
        "title": "Temperature Dependence",
        "description": "If ΔH and ΔS have the same sign, the spontaneity depends entirely on the temperature. There is a crossover point where ΔG = 0 at T = ΔH/ΔS."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate ΔG at 300 K if ΔH = -50 kJ and ΔS = -0.1 kJ/K.",
      "solution": [
        "ΔH = -50 kJ.",
        "T = 300 K.",
        "ΔS = -0.1 kJ/K.",
        "TΔS = 300 × (-0.1) = -30 kJ.",
        "ΔG = -50 - (-30) = -50 + 30 = -20 kJ."
      ],
      "answer": "ΔG = -20 kJ (Spontaneous)"
    }
  },

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

  "half-life-first": {
    "intuition": "For a first-order reaction or radioactive decay, the half-life is completely independent of the starting concentration. It always takes exactly the same amount of time for half the material to decay.",
    "variableBreakdown": [
      {
        "id": "thalf",
        "siUnit": "s",
        "altUnits": "min, hours, years",
        "description": "Half-Life (t₁/₂)",
        "commonTraps": "The time it takes for concentration to drop to exactly half its current value."
      },
      {
        "id": "k",
        "siUnit": "s⁻¹",
        "altUnits": "",
        "description": "Rate Constant (k)",
        "commonTraps": "Must be in the inverse unit of the half-life (e.g., if t_half is in hours, k is in hours⁻¹)."
      }
    ],
    "solvingLogic": [
      "1. Use the natural logarithm of 2: ln(2) ≈ 0.693.",
      "2. If k is known, t₁/₂ = 0.693 / k.",
      "3. If t₁/₂ is known, k = 0.693 / t₁/₂."
    ],
    "edgeCases": [
      {
        "title": "Zero Order / Second Order",
        "description": "This specific formula t₁/₂ = ln(2)/k ONLY applies to first-order reactions. Zero and second-order half-lives depend on the initial concentration."
      }
    ],
    "walkthroughExample": {
      "problem": "A radioactive isotope has a rate constant k = 0.1 yr⁻¹. What is its half-life?",
      "solution": [
        "t₁/₂ = ln(2) / k",
        "t₁/₂ = 0.693 / 0.1",
        "t₁/₂ = 6.93 years."
      ],
      "answer": "t₁/₂ = 6.93 years"
    }
  },

  "equilibrium-kc": {
    "intuition": "The Equilibrium Constant (Kc) is the ratio of product concentrations to reactant concentrations at equilibrium, raised to the power of their stoichiometric coefficients. A high Kc means products are favored.",
    "variableBreakdown": [
      {
        "id": "Kc",
        "siUnit": "",
        "altUnits": "",
        "description": "Equilibrium Constant (Kc)",
        "commonTraps": "A unitless value. Applies only when the reaction has reached equilibrium."
      },
      {
        "id": "products",
        "siUnit": "M",
        "altUnits": "",
        "description": "Concentration of Products",
        "commonTraps": "Multiply the concentrations of all aqueous/gaseous products, each raised to the power of its coefficient."
      },
      {
        "id": "reactants",
        "siUnit": "M",
        "altUnits": "",
        "description": "Concentration of Reactants",
        "commonTraps": "Multiply the concentrations of all aqueous/gaseous reactants, each raised to the power of its coefficient. NEVER include pure solids (s) or liquids (l)."
      }
    ],
    "solvingLogic": [
      "1. Write the balanced chemical equation.",
      "2. Construct the expression: Kc = [Products]^coefficients / [Reactants]^coefficients.",
      "3. Substitute the equilibrium molar concentrations into the expression.",
      "4. Calculate Kc."
    ],
    "edgeCases": [
      {
        "title": "Reaction Quotient (Q)",
        "description": "If you plug in initial concentrations instead of equilibrium concentrations, you get Q instead of Kc. Comparing Q to Kc tells you which way the reaction will shift."
      }
    ],
    "walkthroughExample": {
      "problem": "For A ⇌ 2B, the equilibrium concentrations are [A] = 1 M and [B] = 2 M. Find Kc.",
      "solution": [
        "The expression is Kc = [B]² / [A]¹.",
        "Kc = (2)² / (1)¹.",
        "Kc = 4 / 1 = 4."
      ],
      "answer": "Kc = 4"
    }
  },

  "graham-law": {
    "intuition": "Graham's Law states that lighter gases diffuse and effuse faster than heavier gases. Specifically, the rate is inversely proportional to the square root of their molar masses.",
    "variableBreakdown": [
      {
        "id": "rate1",
        "siUnit": "m/s",
        "altUnits": "mol/s",
        "description": "Rate of Gas 1",
        "commonTraps": "Ensure it is the rate (speed), not the time. If time is given, rate is inversely proportional to time."
      },
      {
        "id": "rate2",
        "siUnit": "m/s",
        "altUnits": "mol/s",
        "description": "Rate of Gas 2",
        "commonTraps": "Ensure the units match rate1."
      },
      {
        "id": "M1",
        "siUnit": "g/mol",
        "altUnits": "",
        "description": "Molar Mass of Gas 1",
        "commonTraps": "Gas 1 goes in the denominator inside the square root."
      },
      {
        "id": "M2",
        "siUnit": "g/mol",
        "altUnits": "",
        "description": "Molar Mass of Gas 2",
        "commonTraps": "Gas 2 goes in the numerator inside the square root."
      }
    ],
    "solvingLogic": [
      "1. Assign Gas 1 and Gas 2.",
      "2. Find their molar masses (M₁ and M₂).",
      "3. The formula is (Rate 1 / Rate 2) = √(M₂ / M₁).",
      "4. Notice the flip! M₂ is on top, M₁ is on the bottom."
    ],
    "edgeCases": [
      {
        "title": "Given Times instead of Rates",
        "description": "If asked about the time (t) it takes to effuse, the equation flips: (t₁ / t₂) = √(M₁ / M₂)."
      }
    ],
    "walkthroughExample": {
      "problem": "How much faster does Hydrogen gas (H₂, M = 2 g/mol) effuse compared to Oxygen gas (O₂, M = 32 g/mol)?",
      "solution": [
        "Let Gas 1 = H₂ and Gas 2 = O₂.",
        "(Rate H₂ / Rate O₂) = √(M₂ / M₁).",
        "Ratio = √(32 / 2) = √16 = 4.",
        "Hydrogen effuses 4 times faster than Oxygen."
      ],
      "answer": "Ratio = 4"
    }
  }
};
