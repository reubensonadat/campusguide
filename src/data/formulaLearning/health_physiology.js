export const health_physiology = {
  "bmr": {
    "intuition": "Basal Metabolic Rate (BMR) is the number of calories your body burns if you do absolutely nothing all day (just breathing and keeping organs running). It represents the baseline fuel requirement for human survival.",
    "variableBreakdown": [
      {
        "id": "gender",
        "siUnit": "",
        "altUnits": "",
        "description": "Biological Gender",
        "commonTraps": "The formula (Mifflin-St Jeor) adds +5 for males and subtracts -161 for females to account for average muscle mass differences."
      },
      {
        "id": "weight",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Weight",
        "commonTraps": "Must be in Kilograms."
      },
      {
        "id": "height",
        "siUnit": "cm",
        "altUnits": "",
        "description": "Height",
        "commonTraps": "Must be in Centimeters, not meters!"
      },
      {
        "id": "age",
        "siUnit": "years",
        "altUnits": "",
        "description": "Age",
        "commonTraps": "BMR naturally decreases as you age (subtracted in the formula)."
      }
    ],
    "solvingLogic": [
      "1. Multiply weight (kg) by 10.",
      "2. Multiply height (cm) by 6.25.",
      "3. Multiply age by 5.",
      "4. Calculate: (10 × W) + (6.25 × H) - (5 × A).",
      "5. Add 5 for men, or subtract 161 for women."
    ],
    "edgeCases": [
      {
        "title": "Total Daily Energy Expenditure (TDEE)",
        "description": "BMR is just the baseline. To find how many calories you actually need to maintain weight in real life, you must multiply BMR by an activity multiplier (e.g., 1.2 for sedentary, 1.55 for active)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the BMR for a 30-year-old male, 80 kg, 180 cm.",
      "solution": [
        "10 × 80 = 800.",
        "6.25 × 180 = 1125.",
        "5 × 30 = 150.",
        "800 + 1125 - 150 = 1775.",
        "Add 5 for male: 1775 + 5 = 1780."
      ],
      "answer": "BMR = 1780 kcal/day"
    }
  },

  "renal-clearance": {
    "intuition": "Renal clearance measures how effectively your kidneys can completely 'clean' a substance out of your blood. A high clearance means the kidneys are dumping it rapidly into urine.",
    "variableBreakdown": [
      {
        "id": "C",
        "siUnit": "mL/min",
        "altUnits": "",
        "description": "Clearance Rate",
        "commonTraps": "The volume of plasma that is completely cleared of the substance per minute."
      },
      {
        "id": "U",
        "siUnit": "mg/mL",
        "altUnits": "",
        "description": "Urine Concentration (U)",
        "commonTraps": "How much of the substance is found in the urine."
      },
      {
        "id": "V",
        "siUnit": "mL/min",
        "altUnits": "",
        "description": "Urine Flow Rate (V)",
        "commonTraps": "How fast urine is being produced."
      },
      {
        "id": "P",
        "siUnit": "mg/mL",
        "altUnits": "",
        "description": "Plasma Concentration (P)",
        "commonTraps": "How much of the substance is lingering in the blood."
      }
    ],
    "solvingLogic": [
      "1. Multiply Urine Concentration (U) by Urine Flow Rate (V). This gives the total excretion rate.",
      "2. Divide by the Plasma Concentration (P) to see how much blood had to be cleaned to produce that excretion."
    ],
    "edgeCases": [
      {
        "title": "Inulin Clearance",
        "description": "The plant carb 'Inulin' is the gold standard for testing kidney function because it is filtered perfectly but neither reabsorbed nor secreted, meaning its clearance exactly equals the Glomerular Filtration Rate (GFR)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find clearance if U = 100 mg/mL, V = 1 mL/min, and P = 1 mg/mL.",
      "solution": [
        "C = (U × V) / P",
        "C = (100 × 1) / 1 = 100."
      ],
      "answer": "C = 100 mL/min"
    }
  },

  "alveolar-gas": {
    "intuition": "The Alveolar Gas Equation calculates the exact oxygen pressure deep inside your lungs (alveoli). This pressure is always lower than the oxygen in the room because the air gets diluted by water vapor and carbon dioxide as you breathe it in.",
    "variableBreakdown": [
      {
        "id": "PAO2",
        "siUnit": "mmHg",
        "altUnits": "",
        "description": "Alveolar O2 Pressure (PAO2)",
        "commonTraps": "Notice the capital 'A' (Alveolar/lung). Don't confuse it with 'PaO2' (little 'a', meaning arterial blood)."
      },
      {
        "id": "FiO2",
        "siUnit": "",
        "altUnits": "%",
        "description": "Fraction of Inspired O2",
        "commonTraps": "Room air is 0.21 (21%)."
      },
      {
        "id": "PaCO2",
        "siUnit": "mmHg",
        "altUnits": "",
        "description": "Arterial CO2 Pressure",
        "commonTraps": "Normal is roughly 40 mmHg."
      },
      {
        "id": "RQ",
        "siUnit": "",
        "altUnits": "",
        "description": "Respiratory Quotient",
        "commonTraps": "Usually estimated at 0.8 on a normal mixed diet."
      }
    ],
    "solvingLogic": [
      "1. Subtract water vapor pressure (47) from atmospheric pressure (usually 760): 760 - 47 = 713.",
      "2. Multiply that by FiO2 (0.21 for room air): 713 × 0.21 ≈ 150.",
      "3. Divide PaCO2 by RQ: 40 / 0.8 = 50.",
      "4. Subtract step 3 from step 2: 150 - 50 = 100."
    ],
    "edgeCases": [
      {
        "title": "A-a Gradient",
        "description": "By subtracting a patient's arterial blood oxygen (from a blood draw) from this calculated Alveolar oxygen, doctors find the 'A-a Gradient'. A high gradient means oxygen is trapped in the lung and failing to cross into the blood (e.g. pneumonia or a blood clot)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find PAO2 at sea level (Patm=760), breathing room air (FiO2=0.21), with a PaCO2 of 40 and RQ of 0.8.",
      "solution": [
        "Inspired O2: (760 - 47) × 0.21 = 713 × 0.21 = 149.73.",
        "CO2 Displacement: 40 / 0.8 = 50.",
        "PAO2 = 149.73 - 50 = 99.73."
      ],
      "answer": "PAO2 ≈ 100 mmHg"
    }
  },

  "simpson-diversity": {
    "intuition": "Simpson's Diversity Index measures the probability that two individuals randomly selected from a sample will belong to the same species. It is widely used by ecologists to quantify biodiversity.",
    "variableBreakdown": [
      {
        "id": "data",
        "siUnit": "",
        "altUnits": "",
        "description": "Species Counts",
        "commonTraps": "An array of numbers representing how many individuals were found for each species."
      }
    ],
    "solvingLogic": [
      "1. For each species, take its count (n) and multiply it by (n-1).",
      "2. Add those results up for all species. This is the numerator.",
      "3. Let N be the total number of all individuals across all species.",
      "4. Multiply N by (N-1). This is the denominator.",
      "5. Divide numerator by denominator. This is 'D' (probability of matching).",
      "6. Finally, subtract D from 1 (1 - D) to get the Diversity Index."
    ],
    "edgeCases": [
      {
        "title": "Simpson's D vs 1-D",
        "description": "Be careful! The raw 'D' value goes DOWN as diversity goes UP. To fix this confusion, most scientists report '1 - D' (the Gini-Simpson index) so that higher numbers logically mean higher diversity."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate 1-D for a habitat with 5 lions, 3 tigers, and 2 bears.",
      "solution": [
        "Total (N) = 10. Denominator = 10 × 9 = 90.",
        "Lions: 5×4 = 20. Tigers: 3×2 = 6. Bears: 2×1 = 2.",
        "Numerator = 20 + 6 + 2 = 28.",
        "D = 28 / 90 ≈ 0.311.",
        "1 - D = 1 - 0.311 = 0.689."
      ],
      "answer": "Index = 0.689"
    }
  },

  "vector-cross": {
    "intuition": "The Cross Product of two 3D vectors generates an entirely new vector that is perfectly perpendicular to both of the originals. It is heavily used in physics to calculate torque and magnetic force.",
    "variableBreakdown": [
      {
        "id": "ax",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector A",
        "commonTraps": "Represented as an array [x, y, z]."
      },
      {
        "id": "bx",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector B",
        "commonTraps": "Represented as an array [x, y, z]."
      }
    ],
    "solvingLogic": [
      "1. New X = (A.y × B.z) - (A.z × B.y)",
      "2. New Y = (A.z × B.x) - (A.x × B.z)",
      "3. New Z = (A.x × B.y) - (A.y × B.x)"
    ],
    "edgeCases": [
      {
        "title": "Order Matters!",
        "description": "Unlike standard multiplication, A × B is NOT the same as B × A. Reversing the order flips the direction of the new vector completely backward (A × B = -[B × A])."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the cross product of A=[1, 0, 0] (x-axis) and B=[0, 1, 0] (y-axis).",
      "solution": [
        "X: (0×0) - (0×1) = 0",
        "Y: (0×0) - (1×0) = 0",
        "Z: (1×1) - (0×0) = 1"
      ],
      "answer": "Result = [0, 0, 1] (the z-axis!)"
    }
  },

  "half-angle": {
    "intuition": "Half-angle identities allow you to find the exact sine or cosine of a small angle by using the known values of an angle twice its size. Great for finding exact values for 15° by using 30°.",
    "variableBreakdown": [
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Full Angle (θ)",
        "commonTraps": "The formula requires you to plug in the full angle, not the half angle."
      }
    ],
    "solvingLogic": [
      "1. To find sin(θ/2): take the square root of [ (1 - cos(θ)) / 2 ].",
      "2. To find cos(θ/2): take the square root of [ (1 + cos(θ)) / 2 ]."
    ],
    "edgeCases": [
      {
        "title": "Plus or Minus Trap",
        "description": "The formulas have a ± sign in front of the square root. You must manually choose positive or negative depending on which quadrant the HALF angle lives in."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the exact value of sin(15°) by using θ = 30°.",
      "solution": [
        "cos(30°) = √3 / 2 ≈ 0.866.",
        "sin(15°) = √[ (1 - 0.866) / 2 ]",
        "sin(15°) = √[ 0.134 / 2 ] = √0.067 ≈ 0.258."
      ],
      "answer": "sin(15°) ≈ 0.258"
    }
  },

  "angle-between-vectors": {
    "intuition": "This formula finds the exact angle separating any two vectors in 3D space by comparing their dot product (how much they point in the same direction) to their individual lengths.",
    "variableBreakdown": [
      {
        "id": "ax",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector A",
        "commonTraps": "An array like [x, y, z]."
      },
      {
        "id": "bx",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector B",
        "commonTraps": "An array like [x, y, z]."
      }
    ],
    "solvingLogic": [
      "1. Calculate the Dot Product: multiply matching coordinates and add them (AxBx + AyBy + AzBz).",
      "2. Calculate the Magnitude (length) of Vector A: √(x² + y² + z²).",
      "3. Calculate the Magnitude of Vector B.",
      "4. Divide the Dot Product by (Mag A × Mag B).",
      "5. Take the inverse cosine (arccos) of that result to get the angle."
    ],
    "edgeCases": [
      {
        "title": "Orthogonal Vectors",
        "description": "If the dot product is exactly 0, the numerator is 0, so the arccos is of 0. The arccos of 0 is 90° (or π/2), perfectly proving the vectors are perpendicular!"
      }
    ],
    "walkthroughExample": {
      "problem": "Find the angle between A=[3, 0] and B=[3, 3].",
      "solution": [
        "Dot Product: (3×3) + (0×3) = 9.",
        "Mag A: √(3²+0) = 3.",
        "Mag B: √(3²+3²) = √18 ≈ 4.24.",
        "9 / (3 × 4.24) = 9 / 12.72 ≈ 0.707.",
        "arccos(0.707) = 45°."
      ],
      "answer": "Angle = 45°"
    }
  },

  "bmi_calculation": {
    "intuition": "Body Mass Index (BMI) is a medical screening tool. This clinical version ensures health professionals quickly categorize a patient's general risk for metabolic diseases.",
    "variableBreakdown": [
      {
        "id": "BMI",
        "siUnit": "kg/m²",
        "altUnits": "",
        "description": "Calculated BMI",
        "commonTraps": "<18.5 is Underweight, 18.5-24.9 is Normal, 25-29.9 is Overweight, >30 is Obese."
      },
      {
        "id": "W",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Patient Weight",
        "commonTraps": "Must be in kg."
      },
      {
        "id": "H",
        "siUnit": "m",
        "altUnits": "",
        "description": "Patient Height",
        "commonTraps": "Must be in meters!"
      }
    ],
    "solvingLogic": [
      "1. Square the height.",
      "2. Divide weight by the squared height."
    ],
    "edgeCases": [
      {
        "title": "Pediatric BMI",
        "description": "BMI numbers mean completely different things for children. Instead of strict cutoffs, pediatric BMI is plotted on a percentile chart against other kids of the exact same age and sex."
      }
    ],
    "walkthroughExample": {
      "problem": "Patient weighs 70 kg and is 1.75 m tall.",
      "solution": [
        "1.75² = 3.0625.",
        "70 / 3.0625 = 22.85."
      ],
      "answer": "BMI = 22.8 (Normal weight)"
    }
  },

  "drug_dosage_weight": {
    "intuition": "Almost all pediatric and many adult drugs are dosed based strictly on the patient's body weight to prevent fatal overdoses or ineffective underdosing.",
    "variableBreakdown": [
      {
        "id": "Dose",
        "siUnit": "mg",
        "altUnits": "mcg",
        "description": "Total Required Dose",
        "commonTraps": "The final amount you need to draw up in the syringe."
      },
      {
        "id": "W",
        "siUnit": "kg",
        "altUnits": "lbs",
        "description": "Patient Weight",
        "commonTraps": "CRITICAL: If the patient's weight is in pounds, you MUST divide by 2.2 to get kilograms first!"
      },
      {
        "id": "DPK",
        "siUnit": "mg/kg",
        "altUnits": "",
        "description": "Dose per Kilogram",
        "commonTraps": "The standard ordered rate (e.g., 'give 5 mg/kg')."
      }
    ],
    "solvingLogic": [
      "1. Ensure weight is in kg.",
      "2. Multiply the patient's weight by the ordered mg/kg rate."
    ],
    "edgeCases": [
      {
        "title": "Maximum Dosing Limits",
        "description": "For severely obese patients, calculating purely by weight might result in a toxic dose. Most drugs have an absolute 'max dose cap' (e.g. 1000 mg max) that cannot be exceeded regardless of weight."
      }
    ],
    "walkthroughExample": {
      "problem": "Order: Acetaminophen 15 mg/kg. Patient weighs 44 lbs.",
      "solution": [
        "Convert to kg: 44 / 2.2 = 20 kg.",
        "Multiply: 20 kg × 15 mg/kg = 300 mg."
      ],
      "answer": "Dose = 300 mg"
    }
  },

  "iv_flow_rate": {
    "intuition": "IV Flow Rate calculates exactly how many drops of fluid need to fall into the IV chamber every single minute to ensure the patient gets the correct amount of medication over the correct amount of time.",
    "variableBreakdown": [
      {
        "id": "Rate",
        "siUnit": "gtt/min",
        "altUnits": "",
        "description": "Flow Rate in Drops/Minute",
        "commonTraps": "'gtt' is the medical abbreviation for drops (from the Latin 'gutta')."
      },
      {
        "id": "Vol",
        "siUnit": "mL",
        "altUnits": "",
        "description": "Total Volume",
        "commonTraps": "How much fluid is in the bag to be infused."
      },
      {
        "id": "DF",
        "siUnit": "gtt/mL",
        "altUnits": "",
        "description": "Drop Factor",
        "commonTraps": "Printed on the IV tubing packaging! Microdrip tubing is always 60 gtt/mL. Macrodrip is usually 10, 15, or 20."
      },
      {
        "id": "Time",
        "siUnit": "mins",
        "altUnits": "hours",
        "description": "Total Time",
        "commonTraps": "Must be converted into total MINUTES (e.g., 2 hours = 120 mins)."
      }
    ],
    "solvingLogic": [
      "1. Multiply Total Volume (mL) by the Drop Factor (gtt/mL).",
      "2. Divide by the Total Time in minutes."
    ],
    "edgeCases": [
      {
        "title": "Pumps vs Gravity",
        "description": "If you are using a modern electronic IV Pump, you don't calculate drops (gtt/min). You just program the pump to mL/hour (Volume / Hours) and the machine does the rest. This formula is for manual gravity drips."
      }
    ],
    "walkthroughExample": {
      "problem": "Infuse 1000 mL Normal Saline over 8 hours. Tubing drop factor is 15 gtt/mL.",
      "solution": [
        "Time in mins: 8 × 60 = 480 mins.",
        "Formula: (1000 × 15) / 480.",
        "15000 / 480 = 31.25."
      ],
      "answer": "Rate = 31 drops/min"
    }
  },

  "body_surface_area": {
    "intuition": "Body Surface Area (BSA) is an incredibly accurate way to dose high-risk drugs (like Chemotherapy). Because humans are 3D, estimating based on 2D surface area often correlates better with metabolic rate and organ size than simple body weight.",
    "variableBreakdown": [
      {
        "id": "BSA",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Body Surface Area",
        "commonTraps": "Average adult BSA is about 1.7 to 1.9 m²."
      },
      {
        "id": "H",
        "siUnit": "cm",
        "altUnits": "",
        "description": "Height",
        "commonTraps": "Must be in Centimeters!"
      },
      {
        "id": "W",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Weight",
        "commonTraps": "Must be in Kilograms!"
      }
    ],
    "solvingLogic": [
      "1. Most common formula (Mosteller): Multiply Height (cm) by Weight (kg).",
      "2. Divide by 3600.",
      "3. Take the square root of the result."
    ],
    "edgeCases": [
      {
        "title": "Burn Victims",
        "description": "While BSA is used for dosing drugs, a completely different rule (The Rule of Nines) is used to estimate what *percentage* of a patient's BSA is damaged by burns for fluid resuscitation."
      }
    ],
    "walkthroughExample": {
      "problem": "Patient is 160 cm tall and weighs 65 kg. Find their BSA.",
      "solution": [
        "H × W = 160 × 65 = 10400.",
        "Divide by 3600: 10400 / 3600 ≈ 2.88.",
        "Square Root: √2.88 ≈ 1.7."
      ],
      "answer": "BSA ≈ 1.7 m²"
    }
  },

  "mean_arterial_pressure": {
    "intuition": "MAP is the clinical gold standard for measuring if a patient's organs are getting enough blood. Because the heart spends 2/3 of its time relaxing (diastole) and only 1/3 squeezing (systole), the 'average' pressure leans heavily toward the diastolic number.",
    "variableBreakdown": [
      {
        "id": "MAP",
        "siUnit": "mmHg",
        "altUnits": "",
        "description": "Mean Arterial Pressure",
        "commonTraps": "Normal is 70 - 100. Below 60 means organs are starving for blood (ischemia)."
      },
      {
        "id": "SBP",
        "siUnit": "mmHg",
        "altUnits": "",
        "description": "Systolic Pressure",
        "commonTraps": "The top BP number."
      },
      {
        "id": "DBP",
        "siUnit": "mmHg",
        "altUnits": "",
        "description": "Diastolic Pressure",
        "commonTraps": "The bottom BP number."
      }
    ],
    "solvingLogic": [
      "1. Find the 'Pulse Pressure' by subtracting Diastolic from Systolic (SBP - DBP).",
      "2. Divide the Pulse Pressure by 3.",
      "3. Add that result to the Diastolic Pressure."
    ],
    "edgeCases": [
      {
        "title": "Tachycardia Exception",
        "description": "If a patient's heart rate is insanely fast (like 150 bpm), the heart doesn't have time to fully relax. The 1/3 vs 2/3 assumption breaks down, making this standard formula slightly inaccurate."
      }
    ],
    "walkthroughExample": {
      "problem": "Patient BP is 90/60. Are their organs perfusing? (Needs MAP > 60).",
      "solution": [
        "Pulse Pressure = 90 - 60 = 30.",
        "Divide by 3: 30 / 3 = 10.",
        "Add to Diastolic: 60 + 10 = 70."
      ],
      "answer": "MAP = 70 (Yes, organs are perfusing)"
    }
  },

  "cardiac_output": {
    "intuition": "Cardiac output measures the heart's efficiency. A highly trained athlete can have a very low resting heart rate (like 40 bpm) but still maintain a normal Cardiac Output because their heart muscle is so strong it pumps a massive Stroke Volume with every single beat.",
    "variableBreakdown": [
      {
        "id": "CO",
        "siUnit": "L/min",
        "altUnits": "",
        "description": "Cardiac Output",
        "commonTraps": "The total volume moved in a minute."
      },
      {
        "id": "HR",
        "siUnit": "bpm",
        "altUnits": "",
        "description": "Heart Rate",
        "commonTraps": "Beats per minute."
      },
      {
        "id": "SV",
        "siUnit": "mL/beat",
        "altUnits": "L/beat",
        "description": "Stroke Volume",
        "commonTraps": "Usually given in mL. Must divide by 1000 to get Liters."
      }
    ],
    "solvingLogic": [
      "1. Convert Stroke Volume to Liters (divide mL by 1000).",
      "2. Multiply by Heart Rate."
    ],
    "edgeCases": [
      {
        "title": "Cardiac Index",
        "description": "A Cardiac Output of 4 L/min might be great for a small person, but terrible for a 300 lb person. Clinicians often divide CO by Body Surface Area (BSA) to find the 'Cardiac Index', which adjusts the requirement to the patient's size."
      }
    ],
    "walkthroughExample": {
      "problem": "Athlete HR = 50 bpm, SV = 100 mL.",
      "solution": [
        "SV = 0.1 Liters.",
        "CO = 50 × 0.1 = 5."
      ],
      "answer": "CO = 5.0 L/min"
    }
  },

  "creatinine_clearance": {
    "intuition": "Creatinine is a muscle waste product filtered by the kidneys. The Cockcroft-Gault equation estimates kidney function (GFR) by looking at how much creatinine is in the blood. If blood creatinine is high, the kidneys aren't filtering well.",
    "variableBreakdown": [
      {
        "id": "CrCl",
        "siUnit": "mL/min",
        "altUnits": "",
        "description": "Creatinine Clearance",
        "commonTraps": "Used to dose drugs cleared by the kidneys. Normal is roughly 90-120 mL/min."
      },
      {
        "id": "Age",
        "siUnit": "years",
        "altUnits": "",
        "description": "Patient Age",
        "commonTraps": "Kidney function naturally declines as you get older."
      },
      {
        "id": "W",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Weight",
        "commonTraps": "Must be in kg."
      },
      {
        "id": "SCr",
        "siUnit": "mg/dL",
        "altUnits": "",
        "description": "Serum Creatinine",
        "commonTraps": "Found on a standard blood test (BMP). Higher is WORSE."
      },
      {
        "id": "F",
        "siUnit": "",
        "altUnits": "",
        "description": "Gender Factor",
        "commonTraps": "Because women typically have less muscle mass than men (meaning less creatinine produced naturally), the final result is multiplied by 0.85 for female patients."
      }
    ],
    "solvingLogic": [
      "1. Calculate (140 - Age).",
      "2. Multiply by Weight (kg).",
      "3. Divide by (72 × Serum Creatinine).",
      "4. If patient is female, multiply the final result by 0.85."
    ],
    "edgeCases": [
      {
        "title": "The Elderly with Low Muscle",
        "description": "An 90-year-old bedbound patient has no muscle, so their blood creatinine might look 'normal' (e.g. 0.8 mg/dL) purely because they produce so little of it, masking severe kidney failure."
      }
    ],
    "walkthroughExample": {
      "problem": "Find CrCl for a 60 year old male, 72 kg, with a SCr of 1.5.",
      "solution": [
        "(140 - 60) = 80.",
        "Numerator: 80 × 72 = 5760.",
        "Denominator: 72 × 1.5 = 108.",
        "CrCl = 5760 / 108 ≈ 53.3."
      ],
      "answer": "CrCl ≈ 53 mL/min (Moderate kidney impairment)"
    }
  },

  "fi_o2_delivery": {
    "intuition": "When putting a patient on a simple nasal cannula oxygen tube, you need to estimate how much extra oxygen they are getting. Every 1 Liter Per Minute (LPM) of pure oxygen added increases the total oxygen they breathe by about 4%.",
    "variableBreakdown": [
      {
        "id": "FiO2",
        "siUnit": "%",
        "altUnits": "",
        "description": "Fraction of Inspired O2",
        "commonTraps": "Room air starts at a baseline of 21%."
      },
      {
        "id": "LPM",
        "siUnit": "L/min",
        "altUnits": "",
        "description": "Flow Rate",
        "commonTraps": "How much oxygen is dialed in on the wall flowmeter (e.g., 2 Liters)."
      }
    ],
    "solvingLogic": [
      "1. Take the Flow Rate (LPM) and multiply by 4.",
      "2. Add that to the baseline room air oxygen (21%).",
      "3. Formula: 21 + (4 × LPM)."
    ],
    "edgeCases": [
      {
        "title": "Nasal Cannula Limit",
        "description": "This math rule only works reliably up to 6 LPM (giving ~45% FiO2). Pushing a nasal cannula past 6 LPM just dries out the nose without significantly increasing oxygen, because the patient ends up inhaling lots of room air through their mouth to compensate."
      }
    ],
    "walkthroughExample": {
      "problem": "Patient is on a nasal cannula at 3 Liters Per Minute. Estimate their FiO2.",
      "solution": [
        "Multiply LPM by 4: 3 × 4 = 12.",
        "Add baseline room air: 21 + 12 = 33."
      ],
      "answer": "FiO2 ≈ 33%"
    }
  },

  "fluid_maintenance": {
    "intuition": "The '4-2-1 Rule' is the gold standard for calculating how much IV fluid a fasting patient (like someone in surgery) needs per hour to stay perfectly hydrated based on their weight.",
    "variableBreakdown": [
      {
        "id": "Rate",
        "siUnit": "mL/hr",
        "altUnits": "",
        "description": "Maintenance Fluid Rate",
        "commonTraps": "The speed you program the IV pump to."
      },
      {
        "id": "W",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Weight",
        "commonTraps": "Must be in Kilograms."
      }
    ],
    "solvingLogic": [
      "1. For the first 10 kg of weight: multiply by 4 (40 mL/hr).",
      "2. For the next 10 kg of weight (from 11-20 kg): multiply by 2 (max 20 mL/hr).",
      "3. For every kg of weight OVER 20 kg: multiply by 1.",
      "4. Add them all together."
    ],
    "edgeCases": [
      {
        "title": "The +40 Adult Shortcut",
        "description": "Because the first 20kg always equals exactly 60 mL/hr (40 + 20), for any adult over 20 kg, you can skip the complex math! Just take their weight in kg and add 40 to get the exact rate."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the hourly IV fluid rate for a 75 kg adult.",
      "solution": [
        "Using the Shortcut: Patient is >20kg.",
        "Rate = Weight + 40.",
        "75 + 40 = 115."
      ],
      "answer": "Rate = 115 mL/hr"
    }
  },

  "anion_gap": {
    "intuition": "The Anion Gap is a metabolic detective tool. Blood must be electrically neutral. By subtracting the main negatively charged ions (Chloride and Bicarb) from the main positive ion (Sodium), the leftover 'gap' tells doctors if there are hidden, unmeasured toxic acids in the blood (like lactic acid, ketones, or antifreeze).",
    "variableBreakdown": [
      {
        "id": "AG",
        "siUnit": "mEq/L",
        "altUnits": "",
        "description": "Anion Gap",
        "commonTraps": "Normal gap is roughly 8 to 12. >12 means metabolic acidosis caused by hidden acids."
      },
      {
        "id": "Na",
        "siUnit": "mEq/L",
        "altUnits": "",
        "description": "Sodium (Na+)",
        "commonTraps": "The primary positive ion (cation)."
      },
      {
        "id": "Cl",
        "siUnit": "mEq/L",
        "altUnits": "",
        "description": "Chloride (Cl-)",
        "commonTraps": "A primary negative ion (anion)."
      },
      {
        "id": "HCO3",
        "siUnit": "mEq/L",
        "altUnits": "",
        "description": "Bicarbonate (HCO3-)",
        "commonTraps": "Often labeled as 'CO2' on a metabolic blood panel."
      }
    ],
    "solvingLogic": [
      "1. Add the negative ions together: (Cl + HCO3).",
      "2. Subtract that total from the positive Sodium (Na).",
      "3. Formula: Na - (Cl + HCO3)."
    ],
    "edgeCases": [
      {
        "title": "Low Albumin Mask",
        "description": "Albumin is a naturally occurring negatively-charged protein in the blood. If a patient is malnourished and has low albumin, their baseline 'normal' anion gap shrinks. A gap of 12 might actually be dangerously high for them!"
      }
    ],
    "walkthroughExample": {
      "problem": "Patient lab results: Na=140, Cl=105, HCO3=15.",
      "solution": [
        "Negative Ions = 105 + 15 = 120.",
        "Na - Negative Ions = 140 - 120 = 20."
      ],
      "answer": "Gap = 20 (High! Patient is highly acidic)"
    }
  }
};
