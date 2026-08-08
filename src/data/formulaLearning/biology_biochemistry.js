export const biology_biochemistry = {
  "hardy-weinberg": {
    "intuition": "The Hardy-Weinberg principle states that allele frequencies in a population will remain perfectly constant from generation to generation in the absence of other evolutionary influences. If the frequencies shift, evolution is happening!",
    "variableBreakdown": [
      {
        "id": "p",
        "siUnit": "",
        "altUnits": "%",
        "description": "Frequency of Dominant Allele (p)",
        "commonTraps": "This is the allele frequency, NOT the phenotype frequency."
      },
      {
        "id": "q",
        "siUnit": "",
        "altUnits": "%",
        "description": "Frequency of Recessive Allele (q)",
        "commonTraps": "Since there are only two alleles in simple traits, p + q MUST exactly equal 1."
      }
    ],
    "solvingLogic": [
      "1. Ensure p + q = 1.",
      "2. The frequency of homozygous dominant individuals is p².",
      "3. The frequency of homozygous recessive individuals is q².",
      "4. The frequency of heterozygous individuals is 2pq.",
      "5. Equation: p² + 2pq + q² = 1."
    ],
    "edgeCases": [
      {
        "title": "Finding q from Phenotypes",
        "description": "If you know 16% of a population shows the recessive trait (q² = 0.16), you must take the square root to find q (q = 0.4). Then, p = 1 - 0.4 = 0.6."
      }
    ],
    "walkthroughExample": {
      "problem": "If the dominant allele frequency (p) is 0.7, what percentage of the population is heterozygous?",
      "solution": [
        "First find q: q = 1 - p = 1 - 0.7 = 0.3.",
        "Heterozygous frequency = 2pq.",
        "2 × 0.7 × 0.3 = 0.42."
      ],
      "answer": "42% of the population"
    }
  },

  "population-growth": {
    "intuition": "Exponential population growth assumes infinite resources. The population (N) grows based on its intrinsic growth rate (r). The larger the population gets, the faster it adds new individuals.",
    "variableBreakdown": [
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Final Population (N)",
        "commonTraps": "The total number of individuals after time 't'."
      },
      {
        "id": "N0",
        "siUnit": "",
        "altUnits": "",
        "description": "Initial Population (N₀)",
        "commonTraps": "The starting number of individuals."
      },
      {
        "id": "r",
        "siUnit": "",
        "altUnits": "",
        "description": "Growth Rate (r)",
        "commonTraps": "The continuous growth rate (often birth rate minus death rate). Must be a decimal (e.g. 5% = 0.05)."
      },
      {
        "id": "t",
        "siUnit": "years",
        "altUnits": "days",
        "description": "Time (t)",
        "commonTraps": "Must match the time units used in the growth rate 'r'."
      }
    ],
    "solvingLogic": [
      "1. Multiply growth rate by time: r × t.",
      "2. Raise 'e' (approx 2.718) to that power: e^(rt).",
      "3. Multiply by the initial population N₀."
    ],
    "edgeCases": [
      {
        "title": "Logistic Growth Reality",
        "description": "In the real world, exponential growth eventually hits a 'carrying capacity' (K) due to lack of food or space, shifting the curve from a J-shape into an S-shape (logistic growth)."
      }
    ],
    "walkthroughExample": {
      "problem": "A bacterial colony of 100 individuals grows at a rate of r = 0.2 per hour. How many after 5 hours?",
      "solution": [
        "r × t = 0.2 × 5 = 1.",
        "e¹ ≈ 2.718.",
        "N = 100 × 2.718 = 271.8."
      ],
      "answer": "N ≈ 271 bacteria"
    }
  },

  "bmi": {
    "intuition": "Body Mass Index (BMI) is a simple height-to-weight ratio used as a quick screening tool for weight categories. It scales weight against the square of height.",
    "variableBreakdown": [
      {
        "id": "weight",
        "siUnit": "kg",
        "altUnits": "lbs",
        "description": "Weight",
        "commonTraps": "Standard formula strictly requires Kilograms (kg)."
      },
      {
        "id": "height",
        "siUnit": "m",
        "altUnits": "cm, in",
        "description": "Height",
        "commonTraps": "Standard formula strictly requires Meters (m). Be careful not to use centimeters!"
      }
    ],
    "solvingLogic": [
      "1. (If using Metric): Divide weight (kg) by height squared (m²).",
      "2. (If using US units): Divide weight (lbs) by height squared (in²), then multiply the whole thing by 703."
    ],
    "edgeCases": [
      {
        "title": "Athletes and Muscle",
        "description": "BMI cannot distinguish between fat mass and muscle mass. A heavily muscled bodybuilder often registers as 'Obese' (BMI > 30) despite having very low body fat."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the BMI for someone who weighs 80 kg and is 1.8 m tall.",
      "solution": [
        "Height squared: 1.8² = 3.24.",
        "BMI = 80 / 3.24 ≈ 24.69."
      ],
      "answer": "BMI = 24.7 (Normal weight)"
    }
  },

  "cardiac-output": {
    "intuition": "Cardiac Output (CO) is the total volume of blood the heart pumps in one minute. It is simply the amount pumped per beat multiplied by the number of beats per minute.",
    "variableBreakdown": [
      {
        "id": "CO",
        "siUnit": "L/min",
        "altUnits": "mL/min",
        "description": "Cardiac Output (CO)",
        "commonTraps": "Typically measured in Liters per minute for adults (normally 4.5 to 5.5 L/min at rest)."
      },
      {
        "id": "HR",
        "siUnit": "bpm",
        "altUnits": "",
        "description": "Heart Rate (HR)",
        "commonTraps": "Beats per minute."
      },
      {
        "id": "SV",
        "siUnit": "L/beat",
        "altUnits": "mL/beat",
        "description": "Stroke Volume (SV)",
        "commonTraps": "The volume of blood ejected with each beat. Usually given in mL (e.g. 70 mL), so you must divide by 1000 to get Liters."
      }
    ],
    "solvingLogic": [
      "1. Ensure SV is in Liters (if the answer needs to be in L/min).",
      "2. Multiply HR × SV."
    ],
    "edgeCases": [
      {
        "title": "Exercise Limits",
        "description": "During intense exercise, heart rate increases drastically, but stroke volume only increases slightly before plateauing, so CO maxes out."
      }
    ],
    "walkthroughExample": {
      "problem": "HR is 70 bpm, SV is 75 mL. Find Cardiac Output in L/min.",
      "solution": [
        "Convert SV to Liters: 75 / 1000 = 0.075 L.",
        "Multiply: 70 × 0.075 = 5.25."
      ],
      "answer": "CO = 5.25 L/min"
    }
  },

  "map-calc": {
    "intuition": "Mean Arterial Pressure (MAP) is the average pressure in a patient's arteries during one cardiac cycle. It is considered a better indicator of organ perfusion (blood flow) than systolic blood pressure alone.",
    "variableBreakdown": [
      {
        "id": "SBP",
        "siUnit": "mmHg",
        "altUnits": "",
        "description": "Systolic Blood Pressure",
        "commonTraps": "The 'top' number in a blood pressure reading (the pressure during heart contraction)."
      },
      {
        "id": "DBP",
        "siUnit": "mmHg",
        "altUnits": "",
        "description": "Diastolic Blood Pressure",
        "commonTraps": "The 'bottom' number (pressure while the heart rests). MAP weights diastolic heavily because the heart spends twice as much time resting as contracting!"
      }
    ],
    "solvingLogic": [
      "1. Multiply the Diastolic pressure by 2.",
      "2. Add the Systolic pressure.",
      "3. Divide the total by 3."
    ],
    "edgeCases": [
      {
        "title": "Minimum Perfusion",
        "description": "A MAP of at least 60 mmHg is generally required to maintain adequate blood flow (perfusion) to the brain, kidneys, and coronary arteries."
      }
    ],
    "walkthroughExample": {
      "problem": "Patient's BP is 120/80. Find the MAP.",
      "solution": [
        "2 × Diastolic: 2 × 80 = 160.",
        "Add Systolic: 160 + 120 = 280.",
        "Divide by 3: 280 / 3 ≈ 93.3."
      ],
      "answer": "MAP ≈ 93 mmHg"
    }
  },

  "fick-diffusion": {
    "intuition": "Fick's First Law calculates how fast molecules spread from high concentration to low concentration. Diffusion is faster if the area is large, the membrane is thin, or the concentration difference is massive.",
    "variableBreakdown": [
      {
        "id": "J",
        "siUnit": "mol/(m²·s)",
        "altUnits": "",
        "description": "Diffusion Flux (J)",
        "commonTraps": "Amount of substance flowing through a unit area per unit time."
      },
      {
        "id": "D",
        "siUnit": "m²/s",
        "altUnits": "",
        "description": "Diffusion Coefficient (D)",
        "commonTraps": "Depends on both the molecule's size and the fluid's viscosity."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Surface Area (A)",
        "commonTraps": "The total area available for diffusion (like the massive surface area of alveoli in lungs)."
      },
      {
        "id": "dCdx",
        "siUnit": "mol/m⁴",
        "altUnits": "",
        "description": "Concentration Gradient",
        "commonTraps": "The change in concentration (ΔC) divided by the thickness of the membrane (Δx)."
      }
    ],
    "solvingLogic": [
      "1. Determine the concentration gradient: (C2 - C1) / thickness.",
      "2. Multiply by the Area and the Diffusion Coefficient.",
      "3. Formula: J = -D × A × (ΔC / Δx)."
    ],
    "edgeCases": [
      {
        "title": "Negative Sign",
        "description": "The formula technically has a negative sign (-D) because molecules flow 'down' the gradient (from high to low), meaning the concentration change (ΔC) is negative. The negative sign makes the final Flux (J) positive."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the flux J given D=0.1, A=10, and a gradient of -5.",
      "solution": [
        "J = -D × A × gradient",
        "J = -0.1 × 10 × (-5)",
        "J = -1 × -5 = 5."
      ],
      "answer": "J = 5 mol/s"
    }
  },

  "michaelis-menten": {
    "intuition": "The Michaelis-Menten equation models enzyme reaction rates. As you add more substrate (stuff for the enzyme to process), the reaction speeds up, but eventually 'maxes out' (Vmax) because all the enzymes are fully occupied.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "mol/s",
        "altUnits": "",
        "description": "Reaction Velocity (v)",
        "commonTraps": "The current speed of the chemical reaction."
      },
      {
        "id": "Vmax",
        "siUnit": "mol/s",
        "altUnits": "",
        "description": "Maximum Velocity (V_max)",
        "commonTraps": "The absolute speed limit of the reaction when saturated with substrate."
      },
      {
        "id": "S",
        "siUnit": "M",
        "altUnits": "mM",
        "description": "Substrate Concentration [S]",
        "commonTraps": "How much 'fuel' is available."
      },
      {
        "id": "Km",
        "siUnit": "M",
        "altUnits": "mM",
        "description": "Michaelis Constant (K_m)",
        "commonTraps": "The exact substrate concentration needed to reach exactly half of Vmax. Indicates how strongly the enzyme binds to the substrate."
      }
    ],
    "solvingLogic": [
      "1. Multiply Vmax by [S] for the numerator.",
      "2. Add Km + [S] for the denominator.",
      "3. Divide the numerator by the denominator."
    ],
    "edgeCases": [
      {
        "title": "When [S] equals Km",
        "description": "If [S] = Km, the denominator becomes 2[S]. The [S] terms cancel out, leaving v = Vmax / 2. This is the very definition of Km!"
      }
    ],
    "walkthroughExample": {
      "problem": "An enzyme has Vmax = 100 and Km = 2 mM. Find the velocity when [S] = 8 mM.",
      "solution": [
        "Numerator: Vmax × [S] = 100 × 8 = 800.",
        "Denominator: Km + [S] = 2 + 8 = 10.",
        "Velocity: 800 / 10 = 80."
      ],
      "answer": "v = 80"
    }
  },

  "bacterial-growth": {
    "intuition": "Bacteria grow by binary fission (splitting in half). This means their population doubles at a constant interval. 1 becomes 2, 2 becomes 4, 4 becomes 8, causing insanely fast exponential growth.",
    "variableBreakdown": [
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Final Number of Cells (N)",
        "commonTraps": "The population after time t."
      },
      {
        "id": "N0",
        "siUnit": "",
        "altUnits": "",
        "description": "Initial Number of Cells (N₀)",
        "commonTraps": "Starting population."
      },
      {
        "id": "t",
        "siUnit": "mins",
        "altUnits": "hours",
        "description": "Total Time Elapsed (t)",
        "commonTraps": "Must be in the same time units as doubling time."
      },
      {
        "id": "td",
        "siUnit": "mins",
        "altUnits": "hours",
        "description": "Doubling Time (td)",
        "commonTraps": "Also known as generation time. E. coli takes about 20 minutes."
      }
    ],
    "solvingLogic": [
      "1. Calculate the number of generations (n): Divide total time (t) by doubling time (td).",
      "2. Raise 2 to the power of n: 2^n.",
      "3. Multiply the initial population (N₀) by 2^n."
    ],
    "edgeCases": [
      {
        "title": "Lag Phase",
        "description": "This formula only applies perfectly during the 'Log Phase' (exponential phase) of growth. It fails during the initial lag phase or the final stationary phase when nutrients run out."
      }
    ],
    "walkthroughExample": {
      "problem": "You start with 5 bacteria. Doubling time is 30 mins. How many bacteria after 2 hours (120 mins)?",
      "solution": [
        "Generations (n) = 120 / 30 = 4.",
        "Multiplier = 2⁴ = 16.",
        "N = 5 × 16 = 80."
      ],
      "answer": "N = 80 bacteria"
    }
  },

  "nernst-membrane": {
    "intuition": "The Nernst equation calculates the electrical voltage needed to perfectly balance a chemical concentration gradient across a cell membrane. When perfectly balanced, ions stop flowing in or out.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "V",
        "altUnits": "mV",
        "description": "Equilibrium Potential (E)",
        "commonTraps": "Often expressed in millivolts (mV). For potassium in human cells, it's about -90 mV."
      },
      {
        "id": "z",
        "siUnit": "",
        "altUnits": "",
        "description": "Valence / Charge (z)",
        "commonTraps": "+1 for Potassium/Sodium, +2 for Calcium, -1 for Chloride."
      },
      {
        "id": "out",
        "siUnit": "mM",
        "altUnits": "",
        "description": "Outside Concentration [Ion]out",
        "commonTraps": "Concentration of the ion outside the cell."
      },
      {
        "id": "inn",
        "siUnit": "mM",
        "altUnits": "",
        "description": "Inside Concentration [Ion]in",
        "commonTraps": "Concentration of the ion inside the cell."
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Temperature (T)",
        "commonTraps": "Must be in Kelvin! Human body temp is 310K."
      }
    ],
    "solvingLogic": [
      "1. At standard human body temp (37°C), the complex constants (RT/F) simplify to approximately 61.5 mV (if using log10).",
      "2. Calculate the ratio: [Ion]out / [Ion]in.",
      "3. Take the base-10 logarithm of that ratio.",
      "4. Multiply by (61.5 / z) to find the potential in mV."
    ],
    "edgeCases": [
      {
        "title": "Chloride Flip",
        "description": "Because Chloride has a charge of -1 (z = -1), the fraction (61.5 / -1) becomes negative, flipping the sign of the entire equation compared to positive ions."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the Potassium (z=+1) potential at 37°C if [K]out is 5 mM and [K]in is 150 mM.",
      "solution": [
        "Ratio: 5 / 150 = 1 / 30 ≈ 0.0333.",
        "log10(0.0333) ≈ -1.477.",
        "Multiply by (61.5 / 1): 61.5 × -1.477 ≈ -90.8."
      ],
      "answer": "E ≈ -90.8 mV"
    }
  },

  "stroke-volume": {
    "intuition": "Stroke Volume is the amount of blood pumped by the left ventricle of the heart in one contraction. It's simply the difference between how full the heart was before it squeezed, and how much blood is left over after the squeeze.",
    "variableBreakdown": [
      {
        "id": "EDV",
        "siUnit": "mL",
        "altUnits": "L",
        "description": "End-Diastolic Volume (EDV)",
        "commonTraps": "The volume of blood in the ventricle right before it contracts (when it is fully relaxed and 'full'). Typically ~120 mL."
      },
      {
        "id": "ESV",
        "siUnit": "mL",
        "altUnits": "L",
        "description": "End-Systolic Volume (ESV)",
        "commonTraps": "The volume of blood left inside the ventricle immediately after it contracts. The heart never pumps completely empty! Typically ~50 mL."
      }
    ],
    "solvingLogic": [
      "1. Subtract the 'leftover' blood (ESV) from the 'starting' blood (EDV).",
      "2. Formula: SV = EDV - ESV."
    ],
    "edgeCases": [
      {
        "title": "Ejection Fraction",
        "description": "Cardiologists rarely just look at Stroke Volume. They divide SV by EDV to find the 'Ejection Fraction' (usually ~60%), which is a critical percentage for diagnosing heart failure."
      }
    ],
    "walkthroughExample": {
      "problem": "A patient's heart fills to 130 mL (EDV) and has 60 mL remaining after a heartbeat (ESV). What is their stroke volume?",
      "solution": [
        "SV = EDV - ESV",
        "SV = 130 - 60 = 70."
      ],
      "answer": "SV = 70 mL"
    }
  }
};
