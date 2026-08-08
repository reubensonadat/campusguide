export const modern_physics = {
  "de-broglie": {
    "intuition": "The de Broglie wavelength proposes a mind-bending idea: ALL matter acts like a wave. Not just light, but baseballs and planets too! However, because Planck's constant is so unimaginably tiny, the 'wavelength' of a macroscopic object like a baseball is too small to ever measure. Only quantum objects like electrons show obvious wavy behavior.",
    "variableBreakdown": [
      {
        "id": "lambda",
        "siUnit": "m",
        "altUnits": "nm",
        "description": "Wavelength (λ)",
        "commonTraps": "The physical 'length' of the matter-wave."
      },
      {
        "id": "p",
        "siUnit": "kg·m/s",
        "altUnits": "",
        "description": "Momentum (p)",
        "commonTraps": "Calculated by multiplying mass by velocity (p = m × v)."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity",
        "commonTraps": "Speed of the object."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass",
        "commonTraps": "Must be in kilograms."
      }
    ],
    "solvingLogic": [
      "1. Find the momentum (p) by multiplying mass × velocity.",
      "2. Divide Planck's constant (h ≈ 6.626 × 10⁻³⁴) by the momentum."
    ],
    "edgeCases": [
      {
        "title": "Rest Mass of Zero?",
        "description": "Photons (light) have exactly zero rest mass, so how can they have momentum? For photons, we flip the equation: p = h / λ. Light definitely has momentum and can physically 'push' things (like solar sails), even without mass!"
      }
    ],
    "walkthroughExample": {
      "problem": "Find the wavelength of an electron (m = 9.1×10⁻³¹ kg) moving at 10% the speed of light (v = 3×10⁷ m/s).",
      "solution": [
        "p = (9.1×10⁻³¹) × (3×10⁷) = 2.73 × 10⁻²³.",
        "λ = (6.626×10⁻³⁴) / (2.73×10⁻²³) ≈ 2.42 × 10⁻¹¹ m."
      ],
      "answer": "λ ≈ 2.42 × 10⁻¹¹ m (Similar to the size of an atom!)"
    }
  },

  "compton": {
    "intuition": "When an X-ray photon crashes into an electron, it bounces off like a billiard ball. Because it gave some of its energy to the electron, the photon bounces away with LESS energy, which physically stretches its wavelength. This was proof that light acts as a physical particle.",
    "variableBreakdown": [
      {
        "id": "dL",
        "siUnit": "m",
        "altUnits": "",
        "description": "Wavelength Shift (Δλ)",
        "commonTraps": "This is the CHANGE in the wavelength, not the final wavelength!"
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Scattering Angle (θ)",
        "commonTraps": "The angle the photon bounced away at."
      }
    ],
    "solvingLogic": [
      "1. Calculate the 'Compton Wavelength' of an electron: h / (m × c) ≈ 2.426 × 10⁻¹² m.",
      "2. Calculate (1 - cos(θ)).",
      "3. Multiply them together to find the shift Δλ.",
      "4. Add Δλ to the original wavelength to find the final wavelength."
    ],
    "edgeCases": [
      {
        "title": "Head-on Collision (180°)",
        "description": "If the photon bounces straight backwards (180°), cos(180°) = -1. The bracket becomes (1 - -1) = 2. This causes the MAXIMUM possible wavelength shift (exactly twice the Compton wavelength)."
      }
    ],
    "walkthroughExample": {
      "problem": "An X-ray bounces off an electron at 90°. Find the change in wavelength.",
      "solution": [
        "cos(90°) = 0.",
        "(1 - 0) = 1.",
        "Δλ = (2.426×10⁻¹² m) × 1."
      ],
      "answer": "Δλ = 2.426×10⁻¹² m"
    }
  },

  "einstein-mass-energy": {
    "intuition": "E=mc² proves that mass and energy are the exact same thing, just in different forms (like ice and steam). Because the speed of light squared (c²) is such a massive number, a tiny crumb of matter contains an apocalyptic amount of energy.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "J",
        "altUnits": "MeV",
        "description": "Rest Energy (E)",
        "commonTraps": "Result is in Joules. To get MeV (often used in physics), you must divide Joules by 1.6×10⁻¹³."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass (m)",
        "commonTraps": "Must be in kilograms."
      }
    ],
    "solvingLogic": [
      "1. Square the speed of light: (3 × 10⁸)² = 9 × 10¹⁶.",
      "2. Multiply by the mass in kg."
    ],
    "edgeCases": [
      {
        "title": "Nuclear Bombs",
        "description": "The atomic bomb dropped on Hiroshima converted less than 1 gram of matter into pure energy. That tiny 1 gram multiplied by 9×10¹⁶ released 63 Terajoules of destructive force."
      }
    ],
    "walkthroughExample": {
      "problem": "How much energy is locked inside 1 kilogram of water?",
      "solution": [
        "c² = 9 × 10¹⁶.",
        "E = 1 × (9 × 10¹⁶)."
      ],
      "answer": "E = 9 × 10¹⁶ Joules (Enough to power the entire USA for a year)"
    }
  },

  "radioactive-decay": {
    "intuition": "Radioactive decay is perfectly random for a single atom, but mathematically perfect for a billion of them. The amount of radioactive material drops exponentially over time based on its unique decay constant.",
    "variableBreakdown": [
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Remaining Amount (N)",
        "commonTraps": "Can be measured in atoms, grams, or radiation activity (Bq)."
      },
      {
        "id": "N0",
        "siUnit": "",
        "altUnits": "",
        "description": "Initial Amount (N₀)",
        "commonTraps": "The starting amount at time zero."
      },
      {
        "id": "lambda",
        "siUnit": "1/s",
        "altUnits": "1/yr",
        "description": "Decay Constant (λ)",
        "commonTraps": "Often you are given the 'Half-Life' instead. You must find λ by calculating: λ = ln(2) / Half-Life."
      },
      {
        "id": "t",
        "siUnit": "s",
        "altUnits": "yr",
        "description": "Time Elapsed (t)",
        "commonTraps": "Must match the time unit used in λ or the Half-Life."
      }
    ],
    "solvingLogic": [
      "1. Multiply the decay constant (λ) by time (t).",
      "2. Make it negative: -λt.",
      "3. Raise 'e' (2.718) to that power: e^(-λt).",
      "4. Multiply by the initial amount N₀."
    ],
    "edgeCases": [
      {
        "title": "Carbon Dating",
        "description": "By measuring how much Carbon-14 is left in a bone (N), knowing how much it started with (N₀), and knowing the half-life is 5730 years, archaeologists use this exact formula in reverse to solve for 't' (the age of the fossil)."
      }
    ],
    "walkthroughExample": {
      "problem": "Start with 100g of a material (N₀=100). The decay constant is 0.1 per year. How much remains after 5 years?",
      "solution": [
        "λ × t = 0.1 × 5 = 0.5.",
        "e^(-0.5) ≈ 0.6065.",
        "N = 100 × 0.6065 = 60.65."
      ],
      "answer": "N ≈ 60.65 grams left"
    }
  },

  "heisenberg": {
    "intuition": "The Heisenberg Uncertainty Principle states that the universe physically forbids you from knowing both the exact position and exact momentum of a particle at the same time. The more precisely you measure where a particle is, the wilder and more unknown its speed becomes.",
    "variableBreakdown": [
      {
        "id": "dx",
        "siUnit": "m",
        "altUnits": "",
        "description": "Uncertainty in Position (Δx)",
        "commonTraps": "The margin of error in your location measurement."
      },
      {
        "id": "dp",
        "siUnit": "kg·m/s",
        "altUnits": "",
        "description": "Uncertainty in Momentum (Δp)",
        "commonTraps": "The margin of error in your momentum measurement."
      }
    ],
    "solvingLogic": [
      "1. The absolute minimum possible uncertainty in the universe is Planck's constant (h) divided by 4π.",
      "2. (Δx × Δp) MUST be greater than or equal to this limit (~5.27 × 10⁻³⁵).",
      "3. If you force Δx to be tiny, Δp MUST become huge to keep the product above the limit."
    ],
    "edgeCases": [
      {
        "title": "Energy-Time Uncertainty",
        "description": "A less famous version of this law (ΔE × Δt ≥ h/4π) allows particles to 'borrow' massive amounts of energy out of absolutely nowhere (violating conservation of energy), as long as they 'pay it back' in a tiny fraction of a second. This explains quantum tunneling!"
      }
    ],
    "walkthroughExample": {
      "problem": "An electron's position is measured with an uncertainty of 10⁻¹⁰ m. What is the MINIMUM uncertainty in its momentum?",
      "solution": [
        "Limit = h / 4π ≈ 5.27 × 10⁻³⁵.",
        "Δp ≥ (5.27 × 10⁻³⁵) / (10⁻¹⁰).",
        "Δp ≥ 5.27 × 10⁻²⁵."
      ],
      "answer": "Δp ≥ 5.27 × 10⁻²⁵ kg·m/s"
    }
  }
};
