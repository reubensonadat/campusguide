export const thermodynamics_waves = {
  "thermal-expansion": {
    "intuition": "Thermal Linear Expansion describes how materials change in length when their temperature changes. The amount of expansion or contraction depends on the material's specific properties, its original length, and the magnitude of the temperature change.",
    "variableBreakdown": [
      {
        "id": "dL",
        "siUnit": "m",
        "altUnits": "mm, cm",
        "description": "Change in Length (ΔL)",
        "commonTraps": "Ensure it has the same units as the original length L₀."
      },
      {
        "id": "alpha",
        "siUnit": "1/°C",
        "altUnits": "1/K",
        "description": "Linear Expansion Coefficient (α)",
        "commonTraps": "This value is typically very small (e.g., 10⁻⁶), so scientific notation is required."
      },
      {
        "id": "L0",
        "siUnit": "m",
        "altUnits": "mm, cm",
        "description": "Original Length (L₀)",
        "commonTraps": "Must use the same units as ΔL."
      },
      {
        "id": "dT",
        "siUnit": "°C",
        "altUnits": "K",
        "description": "Temperature Change (ΔT)",
        "commonTraps": "A negative ΔT means cooling, which results in a negative ΔL (contraction). Celsius and Kelvin have the same scale for ΔT."
      }
    ],
    "solvingLogic": [
      "1. Identify known variables.",
      "2. Calculate temperature change if given initial and final temperatures (ΔT = T_final - T_initial).",
      "3. Use the formula: ΔL = α × L₀ × ΔT.",
      "4. The final length is L_final = L₀ + ΔL."
    ],
    "edgeCases": [
      {
        "title": "Cooling",
        "description": "If ΔT is negative, ΔL is negative, indicating the material shrank."
      }
    ],
    "walkthroughExample": {
      "problem": "A 10 m steel bridge girder (α = 12×10⁻⁶ /°C) heats up by 20°C. Find the change in length.",
      "solution": [
        "ΔL = α × L₀ × ΔT",
        "ΔL = (12 × 10⁻⁶) × 10 × 20 = 0.0024 m (2.4 mm)."
      ],
      "answer": "ΔL = 0.0024 m"
    }
  },

  "latent-heat": {
    "intuition": "Latent Heat describes the energy required to change the phase of a substance (e.g., solid to liquid) without changing its temperature. During a phase transition, all energy goes into breaking or forming bonds.",
    "variableBreakdown": [
      {
        "id": "Q",
        "siUnit": "J",
        "altUnits": "kJ",
        "description": "Heat Energy (Q) required or released.",
        "commonTraps": "Verify if the question uses kJ and convert to Joules."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "g",
        "description": "Mass (m) of the substance.",
        "commonTraps": "Ensure mass is in kilograms if Latent Heat is in J/kg."
      },
      {
        "id": "L",
        "siUnit": "J/kg",
        "altUnits": "kJ/kg",
        "description": "Specific Latent Heat (L)",
        "commonTraps": "Use L_f (fusion) for melting/freezing and L_v (vaporization) for boiling/condensing."
      }
    ],
    "solvingLogic": [
      "1. Identify the phase change to select the correct Latent Heat (fusion or vaporization).",
      "2. Ensure m is in kg and L is in J/kg.",
      "3. Use Q = m × L."
    ],
    "edgeCases": [
      {
        "title": "Mixed Phases",
        "description": "If the substance is not entirely at the phase change temperature, you must also use Q = mcΔT to get it there first."
      }
    ],
    "walkthroughExample": {
      "problem": "How much heat is required to melt 2 kg of ice? (L_f = 3.34 × 10⁵ J/kg)",
      "solution": [
        "Q = m × L_f = 2 × (3.34 × 10⁵) = 6.68 × 10⁵ J."
      ],
      "answer": "Q = 6.68 × 10⁵ J"
    }
  },

  "first-law-thermo": {
    "intuition": "The First Law of Thermodynamics is the conservation of energy applied to thermal systems. The change in internal energy equals the heat added to the system minus the work done by the system.",
    "variableBreakdown": [
      {
        "id": "dU",
        "siUnit": "J",
        "altUnits": "",
        "description": "Change in Internal Energy (ΔU)",
        "commonTraps": "Positive means energy increased; negative means it decreased."
      },
      {
        "id": "Q",
        "siUnit": "J",
        "altUnits": "",
        "description": "Heat Added (Q)",
        "commonTraps": "Heat added TO the system is positive. Heat removed is negative."
      },
      {
        "id": "W",
        "siUnit": "J",
        "altUnits": "",
        "description": "Work Done BY the System (W)",
        "commonTraps": "Work done BY the system is positive. Work done ON the system is negative."
      }
    ],
    "solvingLogic": [
      "1. Assign proper signs to Q and W based on the problem text.",
      "2. Use ΔU = Q - W.",
      "3. Solve algebraically for the unknown."
    ],
    "edgeCases": [
      {
        "title": "Adiabatic Process",
        "description": "If no heat is exchanged, Q = 0, so ΔU = -W."
      }
    ],
    "walkthroughExample": {
      "problem": "A gas absorbs 500 J of heat and does 200 J of work expanding. Find the change in internal energy.",
      "solution": [
        "Q = +500 J (heat added).",
        "W = +200 J (work done by).",
        "ΔU = Q - W = 500 - 200 = 300 J."
      ],
      "answer": "ΔU = 300 J"
    }
  },

  "entropy": {
    "intuition": "Entropy change measures the dispersal of energy at a specific temperature. For reversible heat transfer, it is the heat exchanged divided by the absolute temperature.",
    "variableBreakdown": [
      {
        "id": "dS",
        "siUnit": "J/K",
        "altUnits": "",
        "description": "Change in Entropy (ΔS)",
        "commonTraps": "Entropy increases when heat is added."
      },
      {
        "id": "Q",
        "siUnit": "J",
        "altUnits": "",
        "description": "Heat Transfer (Q)",
        "commonTraps": "Use correct sign: positive for heat absorbed."
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Absolute Temperature (T)",
        "commonTraps": "MUST be in Kelvin. Celsius will yield completely incorrect results."
      }
    ],
    "solvingLogic": [
      "1. Convert T to Kelvin: T(K) = T(°C) + 273.15.",
      "2. Use ΔS = Q / T for constant temperature processes."
    ],
    "edgeCases": [
      {
        "title": "Variable Temperature",
        "description": "If temperature changes during the process, simple division doesn't work; integration is required: ΔS = ∫(dQ/T)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the entropy change when 600 J of heat is added reversibly to a system at 300 K.",
      "solution": [
        "ΔS = Q / T = 600 / 300 = 2 J/K."
      ],
      "answer": "ΔS = 2 J/K"
    }
  },

  "sound-level": {
    "intuition": "Sound Intensity Level is a logarithmic scale (decibels) that reflects how human hearing perceives loudness. It compares a given sound intensity to the threshold of hearing.",
    "variableBreakdown": [
      {
        "id": "beta",
        "siUnit": "dB",
        "altUnits": "",
        "description": "Sound Level (β)",
        "commonTraps": "Adding two 50 dB sounds doesn't make 100 dB; you must add their intensities (W/m²), not the dB values."
      },
      {
        "id": "I",
        "siUnit": "W/m²",
        "altUnits": "",
        "description": "Sound Intensity (I)",
        "commonTraps": "A very small number, usually requiring scientific notation."
      },
      {
        "id": "I0",
        "siUnit": "W/m²",
        "altUnits": "",
        "description": "Reference Intensity (I₀)",
        "commonTraps": "Typically the threshold of human hearing, 10⁻¹² W/m²."
      }
    ],
    "solvingLogic": [
      "1. Identify I and I₀ (usually 10⁻¹² W/m²).",
      "2. Use β = 10 × log₁₀(I / I₀).",
      "3. To solve for I, use I = I₀ × 10^(β/10)."
    ],
    "edgeCases": [
      {
        "title": "Below Threshold",
        "description": "If I < I₀, the dB level will be negative, meaning the sound is too quiet for humans to hear."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the sound level in dB if the intensity is 10⁻⁸ W/m². (I₀ = 10⁻¹²)",
      "solution": [
        "Ratio: I/I₀ = 10⁻⁸ / 10⁻¹² = 10⁴.",
        "log₁₀(10⁴) = 4.",
        "β = 10 × 4 = 40 dB."
      ],
      "answer": "β = 40 dB"
    }
  },

  "beat-frequency": {
    "intuition": "Beat Frequency occurs when two sound waves of slightly different frequencies interfere with each other, creating a pulsating volume effect. The beat frequency is simply the absolute difference between the two.",
    "variableBreakdown": [
      {
        "id": "fb",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Beat Frequency (f_b)",
        "commonTraps": "Always a positive number."
      },
      {
        "id": "f1",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Frequency 1 (f₁)",
        "commonTraps": "Must be in Hz."
      },
      {
        "id": "f2",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Frequency 2 (f₂)",
        "commonTraps": "Must be in Hz."
      }
    ],
    "solvingLogic": [
      "1. Use f_b = |f₁ - f₂|.",
      "2. If given f_b and f₁, f₂ could be f₁ + f_b OR f₁ - f_b. More context is needed to definitively determine which one."
    ],
    "edgeCases": [
      {
        "title": "Identical Frequencies",
        "description": "If f₁ = f₂, the beat frequency is 0 Hz, meaning they are perfectly in tune."
      }
    ],
    "walkthroughExample": {
      "problem": "A guitar string plays 440 Hz, and a tuning fork plays 444 Hz. Find the beat frequency.",
      "solution": [
        "f_b = |440 - 444| = |-4| = 4 Hz."
      ],
      "answer": "f_b = 4 Hz"
    }
  },

  "critical-angle": {
    "intuition": "The Critical Angle is the angle of incidence above which Total Internal Reflection (TIR) occurs. Light is trapped inside the denser medium and cannot refract out.",
    "variableBreakdown": [
      {
        "id": "n1",
        "siUnit": "",
        "altUnits": "",
        "description": "Refractive Index of Denser Medium (n₁)",
        "commonTraps": "Must be greater than n₂ for TIR to occur."
      },
      {
        "id": "n2",
        "siUnit": "",
        "altUnits": "",
        "description": "Refractive Index of Less Dense Medium (n₂)",
        "commonTraps": "Typically air (n ≈ 1)."
      }
    ],
    "solvingLogic": [
      "1. Check that n₁ > n₂. If not, total internal reflection is impossible.",
      "2. Use θ_c = arcsin(n₂ / n₁).",
      "3. Make sure calculator is in Degrees for degree output."
    ],
    "edgeCases": [
      {
        "title": "n1 < n2",
        "description": "Arcsine of a number > 1 is mathematically undefined, reflecting the physical impossibility of TIR when moving to a denser medium."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the critical angle from glass (n = 1.5) to air (n = 1.0).",
      "solution": [
        "Ratio: n₂ / n₁ = 1.0 / 1.5 = 0.6667.",
        "θ_c = arcsin(0.6667) ≈ 41.8°."
      ],
      "answer": "θ_c ≈ 41.8°"
    }
  },

  "double-slit": {
    "intuition": "Young's Double Slit experiment shows the wave nature of light. Light passing through two slits interferes to create bright and dark fringes on a screen. The spacing depends on the wavelength, slit separation, and screen distance.",
    "variableBreakdown": [
      {
        "id": "y",
        "siUnit": "m",
        "altUnits": "cm, mm",
        "description": "Fringe Spacing (y) — distance between adjacent bright spots.",
        "commonTraps": "Often very small, commonly given in mm."
      },
      {
        "id": "lambda",
        "siUnit": "nm",
        "altUnits": "m",
        "description": "Wavelength (λ) of the light.",
        "commonTraps": "Convert nm to meters (multiply by 10⁻⁹)."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance to Screen (L)",
        "commonTraps": "Must be much larger than slit separation for the small-angle approximation to hold."
      },
      {
        "id": "d",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Slit Separation (d) — distance between the two slits.",
        "commonTraps": "Convert mm to meters."
      }
    ],
    "solvingLogic": [
      "1. Convert all distance units to meters.",
      "2. Convert wavelength to meters.",
      "3. Use y = (λ × L) / d."
    ],
    "edgeCases": [
      {
        "title": "Large Angles",
        "description": "If the screen is close or slits are very narrow, the small angle approximation (sin θ ≈ tan θ) breaks down, and y = λL/d becomes inaccurate."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the fringe spacing for 600 nm light passing through slits 0.1 mm apart, hitting a screen 2 m away.",
      "solution": [
        "λ = 600 × 10⁻⁹ m.",
        "d = 0.1 × 10⁻³ m = 1 × 10⁻⁴ m.",
        "y = (600 × 10⁻⁹ × 2) / (1 × 10⁻⁴) = 0.012 m (12 mm)."
      ],
      "answer": "y = 12 mm"
    }
  }
};
