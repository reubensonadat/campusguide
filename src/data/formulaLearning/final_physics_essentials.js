export const final_physics_essentials = {
  "wave-string": {
    "intuition": "This formula explains how a guitar works. To make a wave travel faster (which creates a higher pitched note), you must tighten the string (increase Tension). If you use a thicker, heavier string (higher linear mass density), the wave travels slower, producing a deep bass note.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Wave Speed",
        "commonTraps": "The speed the wave physically moves down the string."
      },
      {
        "id": "T",
        "siUnit": "N",
        "altUnits": "",
        "description": "Tension (T)",
        "commonTraps": "Must be in Newtons."
      },
      {
        "id": "mu",
        "siUnit": "kg/m",
        "altUnits": "",
        "description": "Linear Mass Density (μ)",
        "commonTraps": "This is NOT standard density! It is Mass divided by Length, not volume."
      }
    ],
    "solvingLogic": [
      "1. Divide Tension (T) by the Linear Mass Density (μ).",
      "2. Take the square root of the result."
    ],
    "edgeCases": [
      {
        "title": "Snapping point",
        "description": "Because the speed only goes up with the SQUARE ROOT of the tension, to double the pitch of a guitar string, you have to quadruple the tension. The string will usually snap before it gets that tight."
      }
    ],
    "walkthroughExample": {
      "problem": "A guitar string has a tension of 400 N and a density of 0.01 kg/m. Find wave speed.",
      "solution": [
        "Divide: 400 / 0.01 = 40,000.",
        "Square root: √40,000 = 200."
      ],
      "answer": "v = 200 m/s"
    }
  },

  "refraction-index": {
    "intuition": "The Index of Refraction measures how much light 'bogs down' when it hits a transparent material. Light always travels at 'c' in a vacuum, but in water or glass, it physically slows down. A high index means the material is incredibly dense and slows the light massively.",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Index of Refraction",
        "commonTraps": "Unitless. Must be ≥ 1.0. A vacuum is exactly 1.0."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Speed of Light in Material",
        "commonTraps": "Must be less than or equal to c (3×10⁸)."
      }
    ],
    "solvingLogic": [
      "1. Divide the speed of light in a vacuum (c = 3×10⁸ m/s) by the speed in the material (v)."
    ],
    "edgeCases": [
      {
        "title": "Diamonds",
        "description": "A diamond has an extremely high index (n = 2.42). This means light travels at less than half its normal speed inside a diamond. This extreme slowing is what causes the light to bend violently and create the diamond's legendary 'sparkle'."
      }
    ],
    "walkthroughExample": {
      "problem": "Light travels at 2×10⁸ m/s through a block of glass. Find the index (n).",
      "solution": [
        "n = c / v",
        "n = (3×10⁸) / (2×10⁸)",
        "n = 1.5."
      ],
      "answer": "n = 1.5"
    }
  },

  "magnification": {
    "intuition": "Magnification tells you exactly how much larger (or smaller) a lens or mirror makes an object look. It is simply the ratio of where the image forms compared to where the real object is sitting.",
    "variableBreakdown": [
      {
        "id": "di",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Image Distance (di)",
        "commonTraps": "If the image forms BEHIND a mirror (a virtual image), 'di' must be a negative number!"
      },
      {
        "id": "do",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Object Distance (do)",
        "commonTraps": "Always positive."
      },
      {
        "id": "ho",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Object Height (ho)",
        "commonTraps": "Optional: used to find the final height of the image."
      }
    ],
    "solvingLogic": [
      "1. Divide the image distance (di) by the object distance (do).",
      "2. Put a negative sign in front of it: M = -(di / do).",
      "3. If solving for image height, multiply M by the object height (ho)."
    ],
    "edgeCases": [
      {
        "title": "Negative Magnification",
        "description": "If M comes out negative, it doesn't mean the object shrank! It means the image is perfectly UPSIDE DOWN (inverted). For example, a projector lens has a negative magnification, so they have to put the film slide in upside down to make it look right on the wall."
      }
    ],
    "walkthroughExample": {
      "problem": "An object is 5 cm away from a lens (do = 5). The image forms at 10 cm on the other side (di = 10). Find M.",
      "solution": [
        "M = -(di / do)",
        "M = -(10 / 5) = -2."
      ],
      "answer": "M = -2 (Twice as large, but upside down)"
    }
  },

  "isobaric-work": {
    "intuition": "Isobaric means 'Constant Pressure'. If you trap gas in a cylinder with a sliding roof (a piston), and the gas expands, it literally pushes the roof up. It physically does 'Work' on the outside world.",
    "variableBreakdown": [
      {
        "id": "W",
        "siUnit": "J",
        "altUnits": "",
        "description": "Work Done BY the gas",
        "commonTraps": "If the gas expands (volume increases), it does POSITIVE work. If it is crushed, it does NEGATIVE work."
      },
      {
        "id": "P",
        "siUnit": "Pa",
        "altUnits": "",
        "description": "Constant Pressure (P)",
        "commonTraps": "Must be in Pascals (N/m²)."
      },
      {
        "id": "dV",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Change in Volume (ΔV)",
        "commonTraps": "Must be (Final Volume - Initial Volume). Must be in m³ (not liters!)."
      }
    ],
    "solvingLogic": [
      "1. Multiply the constant pressure (P) by the change in volume (ΔV)."
    ],
    "edgeCases": [
      {
        "title": "Isochoric Trap",
        "description": "If the volume doesn't change (ΔV = 0), the work done is exactly ZERO. You can pump infinite heat into a rigid, sealed steel tank, but because it can't expand, it will never do any physical work (until it explodes)."
      }
    ],
    "walkthroughExample": {
      "problem": "A gas expands from 1 m³ to 3 m³ at a constant pressure of 100,000 Pa. Find work done.",
      "solution": [
        "ΔV = 3 - 1 = 2.",
        "W = 100,000 × 2 = 200,000."
      ],
      "answer": "W = 200,000 J (200 kJ)"
    }
  },

  "parallel-axis": {
    "intuition": "Moment of Inertia measures how hard it is to spin an object. It's easiest to spin an object exactly through its center of mass. The Parallel Axis Theorem says that if you try to spin the object from off-center (like spinning a hammer from the handle instead of the heavy metal head), it becomes drastically harder.",
    "variableBreakdown": [
      {
        "id": "I",
        "siUnit": "kg·m²",
        "altUnits": "",
        "description": "New Moment of Inertia (I)",
        "commonTraps": "Will always be strictly LARGER than the center-of-mass inertia."
      },
      {
        "id": "Icm",
        "siUnit": "kg·m²",
        "altUnits": "",
        "description": "Center of Mass Inertia",
        "commonTraps": "The baseline inertia if you spin it perfectly down the middle."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Total Mass",
        "commonTraps": ""
      },
      {
        "id": "d",
        "siUnit": "m",
        "altUnits": "",
        "description": "Shift Distance (d)",
        "commonTraps": "How far away from the center of mass the new spinning axis is."
      }
    ],
    "solvingLogic": [
      "1. Square the shift distance (d²).",
      "2. Multiply by the total mass (m × d²).",
      "3. Add this 'penalty' to the baseline Center of Mass Inertia (I_cm)."
    ],
    "edgeCases": [
      {
        "title": "Baseball Bats",
        "description": "A baseball bat has a massive inertia when swung from the handle because 'd' is huge. If you hold it 'choked up' (moving your hands closer to the fat center of the bat), 'd' shrinks. Because 'd' is squared, even a 2-inch shift drops the inertia massively, making the bat swing drastically faster!"
      }
    ],
    "walkthroughExample": {
      "problem": "A 2kg rod has an I_cm of 5. You want to spin it from a point 3m away from the center. Find new I.",
      "solution": [
        "d² = 3² = 9.",
        "Penalty (md²) = 2 × 9 = 18.",
        "New I = 5 + 18 = 23."
      ],
      "answer": "I = 23 kg·m² (Over 4x harder to spin)"
    }
  },

  "rydberg": {
    "intuition": "When an electron in a hydrogen atom jumps from a high orbit to a low orbit, it flashes a very specific color of light. The Rydberg equation perfectly predicts the exact wavelength (color) of that flash just by knowing which two orbits the electron jumped between.",
    "variableBreakdown": [
      {
        "id": "n1",
        "siUnit": "",
        "altUnits": "",
        "description": "Lower Orbit (n₁)",
        "commonTraps": "Must be the smaller integer (e.g. 1, 2, 3)."
      },
      {
        "id": "n2",
        "siUnit": "",
        "altUnits": "",
        "description": "Higher Orbit (n₂)",
        "commonTraps": "Must be strictly larger than n₁."
      }
    ],
    "solvingLogic": [
      "1. Calculate (1 / n₁²) - (1 / n₂²).",
      "2. Multiply by the Rydberg constant (R_H ≈ 1.097 × 10⁷ m⁻¹).",
      "3. The result is 1/Wavelength. You MUST flip the fraction (1 / result) to get the actual wavelength in meters!"
    ],
    "edgeCases": [
      {
        "title": "Balmer Series (Visible Light)",
        "description": "If an electron jumps down to orbit n₁=1, the flash is invisible ultraviolet light. If it drops to n₁=3, it's invisible infrared. ONLY drops that land perfectly on orbit n₁=2 create visible colors that the human eye can see (The Balmer Series)."
      }
    ],
    "walkthroughExample": {
      "problem": "An electron drops from orbit 3 to orbit 2. Find the wavelength (given R = 1.097e7).",
      "solution": [
        "1/2² = 1/4 = 0.25.",
        "1/3² = 1/9 ≈ 0.111.",
        "Difference: 0.25 - 0.111 = 0.1389.",
        "Multiply by R: 0.1389 × 1.097e7 ≈ 1,523,611.",
        "Flip fraction: 1 / 1,523,611 ≈ 6.56 × 10⁻⁷ m."
      ],
      "answer": "Wavelength = 656 nm (Bright Red Light)"
    }
  },

  "bohr-energy": {
    "intuition": "The Bohr Model states that electrons are locked onto specific train tracks (orbits) around the nucleus and cannot exist in the space between. This formula calculates exactly how much 'negative' binding energy is holding the electron in a specific orbit.",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Principal Quantum Number (n)",
        "commonTraps": "The orbit number (1, 2, 3...)"
      }
    ],
    "solvingLogic": [
      "1. Square the orbit number (n²).",
      "2. Divide -13.6 eV by that squared number."
    ],
    "edgeCases": [
      {
        "title": "Ionization",
        "description": "If you pump exactly 13.6 eV of energy into an electron trapped in the lowest orbit (n=1), the formula hits 0 eV. At 0 eV, the electron has broken completely free of the atom's gravity. The atom is now an ion."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the energy of an electron in the 2nd orbit (n=2) of Hydrogen.",
      "solution": [
        "n² = 2² = 4.",
        "E = -13.6 / 4 = -3.4."
      ],
      "answer": "E = -3.4 eV"
    }
  },

  "bragg-law": {
    "intuition": "Bragg's Law is used to mathematically reverse-engineer the molecular structure of crystals (like DNA or salt). You shoot X-rays at the crystal, they bounce off the atoms inside, and based on the bright spots where the X-rays hit the wall, you can calculate exactly how far apart the atoms in the crystal are.",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Order of Reflection (n)",
        "commonTraps": "Usually 1 (the first bright spot)."
      },
      {
        "id": "lambda",
        "siUnit": "m",
        "altUnits": "nm",
        "description": "X-ray Wavelength (λ)",
        "commonTraps": ""
      },
      {
        "id": "d",
        "siUnit": "m",
        "altUnits": "nm",
        "description": "Lattice Spacing (d)",
        "commonTraps": "The physical distance between two layers of atoms in the crystal."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "",
        "description": "Scattering Angle (θ)",
        "commonTraps": "The angle the X-ray hits the crystal at."
      }
    ],
    "solvingLogic": [
      "1. Take the sine of the angle (sin θ).",
      "2. Multiply by the atom spacing (d) and by 2.",
      "3. This must equal n × λ for a bright spot to form."
    ],
    "edgeCases": [
      {
        "title": "Rosalind Franklin",
        "description": "This exact formula is what Rosalind Franklin used in 1952 (Photo 51) to prove that DNA was shaped like a double helix, permanently altering the course of biology."
      }
    ],
    "walkthroughExample": {
      "problem": "First order reflection (n=1) happens at 30° using 10 nm X-rays. Find the atom spacing (d).",
      "solution": [
        "1 × 10 = 2 × d × sin(30°)",
        "10 = 2 × d × 0.5",
        "10 = 1 × d",
        "d = 10"
      ],
      "answer": "d = 10 nm"
    }
  }
};
