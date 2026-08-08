export const nuclear_particle_physics = {
  "radioactive-decay": {
    "intuition": "Radioactive decay is identical to the modern physics formula. The amount of radioactive material drops exponentially over time based on its unique decay constant. It cannot be stopped, slowed down, or sped up by boiling, freezing, or chemically burning the material.",
    "variableBreakdown": [
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Remaining Amount",
        "commonTraps": "Usually given in atoms, mass, or becquerels."
      },
      {
        "id": "N0",
        "siUnit": "",
        "altUnits": "",
        "description": "Initial Amount",
        "commonTraps": ""
      },
      {
        "id": "lambda",
        "siUnit": "1/s",
        "altUnits": "",
        "description": "Decay Constant (λ)",
        "commonTraps": ""
      },
      {
        "id": "t",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time",
        "commonTraps": "Must match units of λ."
      }
    ],
    "solvingLogic": [
      "1. Multiply λ by t.",
      "2. Calculate e^(-λt).",
      "3. Multiply by initial amount (N0)."
    ],
    "edgeCases": [
      {
        "title": "Infinite Time",
        "description": "Mathematically, an exponential curve never truly hits zero. However, practically, once 'N' drops below 1 single atom, the sample is completely dead."
      }
    ],
    "walkthroughExample": {
      "problem": "Start with 100g. λ is 0.1/yr. Find remaining after 5 years.",
      "solution": [
        "e^(-0.1 × 5) = e^(-0.5) ≈ 0.606.",
        "100 × 0.606 = 60.6."
      ],
      "answer": "N = 60.6g"
    }
  },

  "half-life": {
    "intuition": "Half-life is simply the amount of time it takes for exactly 50% of a radioactive chunk to turn into lead. A short half-life means the rock is ferociously radioactive (dumping its energy rapidly). A long half-life (like Uranium-238 at 4.5 billion years) means it's barely radioactive and perfectly safe to hold in your hand.",
    "variableBreakdown": [
      {
        "id": "Thalf",
        "siUnit": "s",
        "altUnits": "yr",
        "description": "Half-Life (T_½)",
        "commonTraps": ""
      },
      {
        "id": "lambda",
        "siUnit": "1/s",
        "altUnits": "1/yr",
        "description": "Decay Constant (λ)",
        "commonTraps": "Inversely proportional. High constant = tiny half life."
      }
    ],
    "solvingLogic": [
      "1. Take the natural logarithm of 2 (ln(2) ≈ 0.693).",
      "2. Divide 0.693 by the decay constant (λ)."
    ],
    "edgeCases": [
      {
        "title": "Medical Tracers",
        "description": "Technetium-99m is injected into patients for bone scans. It has a half-life of exactly 6 hours. This means after just a few days, it has decayed through so many half-lives that it is functionally gone, preventing the patient from receiving a lethal radiation dose."
      }
    ],
    "walkthroughExample": {
      "problem": "A rare isotope has a decay constant of 0.05 per day. Find its half-life.",
      "solution": [
        "ln(2) ≈ 0.693.",
        "0.693 / 0.05 = 13.86."
      ],
      "answer": "T_½ = 13.86 days"
    }
  },

  "mass-energy": {
    "intuition": "Standard E=mc². A repetition of the modern physics formula, fundamentally defining nuclear physics.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "J",
        "altUnits": "",
        "description": "Energy",
        "commonTraps": ""
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Multiply mass by the speed of light squared (9×10¹⁶)."
    ],
    "edgeCases": [
      {
        "title": "Antimatter",
        "description": "When 1kg of matter hits 1kg of antimatter, 100% of their mass is converted to energy via E=mc². It is the most perfectly efficient, devastating reaction in the universe."
      }
    ],
    "walkthroughExample": {
      "problem": "Convert 1 kg to energy.",
      "solution": [
        "E = 1 × (9 × 10¹⁶)"
      ],
      "answer": "9 × 10¹⁶ J"
    }
  },

  "binding-energy": {
    "intuition": "If you put 2 Protons and 2 Neutrons on a scale, they weigh 4.032 amu. But if you fuse them together into a Helium nucleus, it only weighs 4.002 amu! Where did the missing mass go? It was converted into 'Binding Energy' (the glue holding the nucleus together) via E=mc².",
    "variableBreakdown": [
      {
        "id": "B",
        "siUnit": "MeV",
        "altUnits": "",
        "description": "Binding Energy",
        "commonTraps": "Usually calculated in Mega-electron Volts (MeV)."
      },
      {
        "id": "Z",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Protons",
        "commonTraps": ""
      },
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Neutrons",
        "commonTraps": ""
      },
      {
        "id": "mass",
        "siUnit": "amu",
        "altUnits": "",
        "description": "Actual Nucleus Mass",
        "commonTraps": "The mass of the fully assembled atom."
      }
    ],
    "solvingLogic": [
      "1. Find the theoretical mass: (Z × mass of a proton) + (N × mass of a neutron).",
      "2. Subtract the Actual measured mass from the theoretical mass to find the 'Mass Defect'.",
      "3. Multiply the Mass Defect (if in amu) by 931.5 to instantly convert it to MeV of Binding Energy."
    ],
    "edgeCases": [
      {
        "title": "Iron-56",
        "description": "If you divide Binding Energy by the total number of nucleons (Protons+Neutrons), Iron-56 has the highest value in the universe. It is the most stable atom in existence. This is why dying stars stop producing energy once their core turns to iron, triggering a supernova."
      }
    ],
    "walkthroughExample": {
      "problem": "Theoretical mass of a nucleus is 10.1 amu. Actual mass is 10.0 amu. Find binding energy.",
      "solution": [
        "Mass Defect = 10.1 - 10.0 = 0.1 amu.",
        "0.1 × 931.5 MeV/amu = 93.15 MeV."
      ],
      "answer": "Binding Energy = 93.15 MeV"
    }
  }
};
