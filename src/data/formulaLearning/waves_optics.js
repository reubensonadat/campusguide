export const waves_optics = {
  "wave-speed": {
    intuition: "The wave equation relates wave speed, frequency, and wavelength. It describes how fast a wave propagates through a medium based on its oscillatory properties.",
    variableBreakdown: [
      {
        id: "v",
        siUnit: "m/s",
        altUnits: "",
        description: "Wave speed, the rate at which the wave travels through the medium, measured in meters per second (m/s).",
        commonTraps: "Wave speed depends on the medium; for light in vacuum it's constant (c ≈ 3×10⁸ m/s), but for sound it varies with temperature and medium."
      },
      {
        id: "f",
        siUnit: "Hz",
        altUnits: "",
        description: "Frequency, the number of oscillations per second, measured in hertz (Hz).",
        commonTraps: "Do not confuse frequency (Hz) with angular frequency (rad/s); angular frequency ω = 2πf."
      },
      {
        id: "lambda",
        siUnit: "m",
        altUnits: "",
        description: "Wavelength, the spatial period of the wave, measured in meters (m).",
        commonTraps: "Convert nanometers to meters (1 nm = 10⁻⁹ m) before using in calculations."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (v, f, or λ).",
      "2. Write the wave equation: v = f × λ.",
      "3. Ensure frequency is in hertz (Hz) and wavelength is in meters (m).",
      "4. Rearrange the equation to solve for the target variable:",
      "   - For v: v = f × λ",
      "   - For f: f = v / λ",
      "   - For λ: λ = v / f",
      "5. Substitute the known values and compute.",
      "6. Verify the result is physically reasonable (positive values, correct magnitude)."
    ],
    edgeCases: [
      {
        title: "Zero Frequency",
        description: "If f = 0, the wave has no oscillations; wavelength becomes infinite and wave speed is zero."
      },
      {
        title: "Zero Wavelength",
        description: "If λ = 0, the wave has no spatial extent; frequency would need to be infinite for any non-zero speed."
      },
      {
        title: "Light in Vacuum",
        description: "For electromagnetic waves in vacuum, v = c ≈ 3×10⁸ m/s is constant; frequency and wavelength are inversely proportional."
      },
      {
        title: "Medium Dependence",
        description: "Wave speed changes with medium properties (e.g., sound speed in air varies with temperature); always use the correct speed for the medium."
      }
    ],
    walkthroughExample: {
      problem: "A sound wave has a frequency of 440 Hz and travels at 343 m/s in air. What is its wavelength?",
      solution: [
        "Use λ = v / f.",
        "Substitute: v = 343 m/s, f = 440 Hz.",
        "Compute: λ = 343 / 440 ≈ 0.7795 m.",
        "The wavelength is approximately 0.78 m."
      ],
      "answer": "λ ≈ 0.78 m"
    }
  },

  "doppler-effect": {
    intuition: "The Doppler effect describes how the observed frequency of a wave changes when there is relative motion between the source and observer. It applies to sound, light, and other waves.",
    variableBreakdown: [
      {
        id: "fp",
        siUnit: "Hz",
        altUnits: "",
        description: "Observed Freq",
        commonTraps: "Always positive."
      },
      {
        id: "f",
        siUnit: "Hz",
        altUnits: "",
        description: "Source Freq",
        commonTraps: "The original frequency emitted by the source."
      },
      {
        id: "vw",
        siUnit: "m/s",
        altUnits: "",
        description: "Wave Speed",
        commonTraps: "Speed of the wave in the given medium (e.g., 343 m/s for sound in air)."
      },
      {
        id: "vo",
        siUnit: "m/s",
        altUnits: "",
        description: "Observer Speed",
        commonTraps: "Positive if moving towards the source, negative if moving away."
      },
      {
        id: "vs",
        siUnit: "m/s",
        altUnits: "",
        description: "Source Speed",
        commonTraps: "Positive if moving away from the observer, negative if moving towards."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (f', f, v, v₀, or vₛ).",
      "2. Write the full Doppler formula: f' = f × (v + v₀) / (v - vₛ).",
      "3. Ensure all speeds are in m/s and frequencies in Hz. Use correct sign conventions for v₀ and vₛ.",
      "4. Rearrange the equation to isolate the target variable.",
      "4. Substitute the known values, being careful with signs.",
      "5. Compute the result and verify it is physically reasonable (f' > 0, no division by zero)."
    ],
    edgeCases: [
      {
        title: "Sonic Boom (v = vₛ)",
        description: "If the source speed equals the wave speed (vₛ = v), the denominator becomes zero, leading to infinite frequency (shock wave)."
      },
      {
        title: "Stationary Source and Observer",
        description: "If v₀ = 0 and vₛ = 0, then f' = f; no frequency shift occurs."
      },
      {
        title: "Observer Moving at Wave Speed",
        description: "If v₀ = v (observer moves toward source at wave speed), f' = 2f; the observed frequency doubles."
      },
      {
        title: "Source Moving Away at Wave Speed",
        description: "If vₛ = -v (source moves away at wave speed), f' = f/2; the observed frequency halves."
      }
    ],
    walkthroughExample: {
      problem: "An ambulance siren emits a frequency of 800 Hz. The ambulance moves toward a stationary observer at 30 m/s. The speed of sound is 343 m/s. What frequency does the observer hear?",
      solution: [
        "Identify: f = 800 Hz, v = 343 m/s, v₀ = 0 (stationary observer), vₛ = 30 m/s (source moving toward observer, positive).",
        "Use f' = f × (v + v₀) / (v - vₛ) = 800 × (343 + 0) / (343 - 30).",
        "Compute denominator: 343 - 30 = 313.",
        "Compute ratio: 343 / 313 ≈ 1.0958.",
        "Multiply: f' = 800 × 1.0958 ≈ 876.7 Hz.",
        "The observer hears a frequency of approximately 877 Hz (higher than the source)."
      ],
      "answer": "f' ≈ 877 Hz"
    }
  },

  "lens-equation": {
    intuition: "The thin lens equation relates the focal length of a lens to the object and image distances. It describes how lenses form images and is fundamental to geometric optics.",
    variableBreakdown: [
      {
        id: "f",
        siUnit: "m",
        altUnits: "",
        description: "Focal Length",
        commonTraps: "Positive for a converging lens, negative for a diverging lens."
      },
      {
        id: "do",
        siUnit: "m",
        altUnits: "",
        description: "Object Distance",
        commonTraps: "Always positive for real objects."
      },
      {
        id: "di",
        siUnit: "m",
        altUnits: "",
        description: "Image Distance",
        commonTraps: "Positive for real images (opposite side of lens), negative for virtual images (same side)."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (f, dₒ, or dᵢ).",
      "2. Write the thin lens equation: 1/f = 1/dₒ + 1/dᵢ.",
      "3. Apply sign conventions: f > 0 for converging, f < 0 for diverging; dₒ > 0 for real objects; dᵢ > 0 for real images, dᵢ < 0 for virtual images.",
      "4. Rearrange the equation to solve for the target variable:",
      "   - For f: f = (dₒ × dᵢ) / (dₒ + dᵢ)",
      "   - For dₒ: dₒ = (f × dᵢ) / (dᵢ - f)",
      "   - For dᵢ: dᵢ = (f × dₒ) / (dₒ - f)",
      "5. Substitute the known values with correct signs.",
      "6. Compute the result and determine image type (real/virtual) and orientation from magnification M = -dᵢ/dₒ."
    ],
    edgeCases: [
      {
        title: "Object at Focal Point (dₒ = f)",
        description: "If the object is placed at the focal point, the image forms at infinity (dᵢ → ∞); rays emerge parallel."
      },
      {
        title: "Object at 2f (dₒ = 2f)",
        description: "For a converging lens, if dₒ = 2f, then dᵢ = 2f and magnification M = -1; image is real, inverted, and same size."
      },
      {
        title: "Object Inside Focal Length (dₒ < f for converging lens)",
        description: "The image is virtual, upright, and magnified (magnifying glass effect); dᵢ is negative."
      },
      {
        title: "Diverging Lens (f < 0)",
        description: "A diverging lens always produces a virtual, upright, reduced image regardless of object position; dᵢ is always negative."
      }
    ],
    walkthroughExample: {
      problem: "A converging lens has a focal length of 10 cm. An object is placed 15 cm from the lens. Find the image distance and magnification.",
      solution: [
        "Convert to meters: f = 0.10 m, dₒ = 0.15 m.",
        "Use dᵢ = (f × dₒ) / (dₒ - f) = (0.10 × 0.15) / (0.15 - 0.10).",
        "Compute numerator: 0.10 × 0.15 = 0.015.",
        "Compute denominator: 0.15 - 0.10 = 0.05.",
        "Divide: dᵢ = 0.015 / 0.05 = 0.30 m = 30 cm.",
        "Since dᵢ > 0, the image is real and on the opposite side of the lens.",
        "Magnification M = -dᵢ/dₒ = -0.30/0.15 = -2.0.",
        "The image is inverted (M < 0) and magnified 2×."
      ],
      "answer": "dᵢ = 30 cm, M = -2.0 (real, inverted, magnified)"
    }
  },

  "snells-law": {
    intuition: "Snell's law describes how light bends when passing between two media with different refractive indices. It relates the angles of incidence and refraction to the indices of refraction.",
    variableBreakdown: [
      {
        id: "n1",
        siUnit: "",
        altUnits: "",
        description: "Index 1",
        commonTraps: "The refractive index of the medium the light is coming from."
      },
      {
        id: "theta1",
        siUnit: "°",
        altUnits: "",
        description: "Angle 1",
        commonTraps: "Angle of incidence, measured relative to the normal (perpendicular) of the boundary."
      },
      {
        id: "n2",
        siUnit: "",
        altUnits: "",
        description: "Index 2",
        commonTraps: "The refractive index of the medium the light is entering."
      },
      {
        id: "theta2",
        siUnit: "°",
        altUnits: "",
        description: "Angle 2",
        commonTraps: "Angle of refraction, measured relative to the normal."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (n₁, θ₁, n₂, or θ₂).",
      "2. Write Snell's law: n₁ × sin(θ₁) = n₂ × sin(θ₂).",
      "3. Ensure angles are in degrees (or convert to radians for sine calculations).",
      "4. Rearrange to solve for the target variable:",
      "   - For θ₂: θ₂ = arcsin(n₁ × sin(θ₁) / n₂)",
      "   - For θ₁: θ₁ = arcsin(n₂ × sin(θ₂) / n₁)",
      "   - For n₂: n₂ = n₁ × sin(θ₁) / sin(θ₂)",
      "   - For n₁: n₁ = n₂ × sin(θ₂) / sin(θ₁)",
      "4. Check for total internal reflection: if n₁ > n₂ and n₁ × sin(θ₁) / n₂ > 1, no real θ₂ exists.",
      "5. Compute the result and verify angles are between 0° and 90°. "
    ],
    edgeCases: [
      {
        title: "Total Internal Reflection",
        description: "When light travels from a higher-index medium to a lower-index medium (n₁ > n₂) and the incident angle exceeds the critical angle θc = arcsin(n₂/n₁), all light is reflected and no refraction occurs."
      },
      {
        title: "Normal Incidence (θ₁ = 0°)",
        description: "If θ₁ = 0°, then sin(θ₁) = 0, so θ₂ = 0° regardless of refractive indices; light passes straight through without bending."
      },
      {
        title: "Equal Indices (n₁ = n₂)",
        description: "If n₁ = n₂, then θ₁ = θ₂; light passes through without bending (no interface effect)."
      },
      {
        title: "Grazing Incidence (θ₁ → 90°)",
        description: "As θ₁ approaches 90°, sin(θ₁) → 1; the refracted angle approaches the critical angle if n₁ > n₂, or 90° if n₁ < n₂."
      }
    ],
    walkthroughExample: {
      problem: "Light travels from air (n₁ = 1.00) into water (n₂ = 1.33) at an incident angle of 30°. What is the angle of refraction?",
      solution: [
        "Use θ₂ = arcsin(n₁ × sin(θ₁) / n₂).",
        "Substitute: n₁ = 1.00, θ₁ = 30°, n₂ = 1.33.",
        "Compute sin(30°) = 0.5.",
        "Compute n₁ × sin(θ₁) / n₂ = 1.00 × 0.5 / 1.33 ≈ 0.3759.",
        "Take arcsin: θ₂ = arcsin(0.3759) ≈ 22.1°.",
        "The light bends toward the normal (θ₂ < θ₁) as expected when entering a higher-index medium."
      ],
      "answer": "θ₂ ≈ 22.1°"
    }
  },

  "photoelectric": {
    intuition: "The photoelectric effect describes how light can eject electrons from a metal surface. The kinetic energy of emitted electrons depends on the light frequency and the material's work function, demonstrating the particle nature of light.",
    variableBreakdown: [
      {
        id: "KE",
        siUnit: "eV",
        altUnits: "",
        description: "Kinetic Energy",
        commonTraps: "Verify units and sign conventions before calculating."
      },
      {
        id: "f",
        siUnit: "Hz",
        altUnits: "",
        description: "Photon Frequency",
        commonTraps: "Do not confuse frequency with focal length \� check the context and units (Hz vs m)."
      },
      {
        id: "phi",
        siUnit: "eV",
        altUnits: "",
        description: "Work Function",
        commonTraps: "Verify units and sign conventions before calculating."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (KE, f, φ, or λ).",
      "2. Write the photoelectric equation: KE = hf - φ = hc/λ - φ, where h = 6.626×10⁻³⁴ J·s, c = 3×10⁸ m/s, 1 eV = 1.602×10⁻¹⁹ J.",
      "3. Use the convenient conversion: photon energy (eV) = 1240 / λ(nm).",
      "4. Check if emission occurs: if hf < φ (or 1240/λ < φ), no electrons are emitted (KE = 0).",
      "5. Rearrange to solve for the target variable:",
      "   - For KE: KE = hf - φ (or 1240/λ - φ)",
      "   - For f: f = (KE + φ) / h",
      "   - For φ: φ = hf - KE",
      "   - For λ: λ = hc / (KE + φ) = 1240 / (KE + φ) nm",
      "6. Substitute known values and compute.",
      "7. Verify that KE ≥ 0; if negative, emission does not occur."
    ],
    edgeCases: [
      {
        title: "Below Threshold Frequency",
        description: "If photon energy hf < φ, no photoelectrons are emitted regardless of light intensity; KE = 0 and the effect does not occur."
      },
      {
        title: "At Threshold Frequency",
        description: "If hf = φ, electrons are emitted with zero kinetic energy (KE = 0); this defines the threshold frequency f₀ = φ/h."
      },
      {
        title: "Intensity Independence",
        description: "Increasing light intensity increases the number of emitted electrons (photocurrent) but does not change their kinetic energy; KE depends only on frequency."
      },
      {
        title: "Wavelength Cutoff",
        description: "There is a maximum wavelength λ_max = hc/φ = 1240/φ nm for emission; longer wavelengths cannot eject electrons regardless of intensity."
      }
    ],
    walkthroughExample: {
      problem: "Light of wavelength 400 nm shines on a metal with work function 2.0 eV. Calculate the maximum kinetic energy of the emitted photoelectrons.",
      solution: [
        "Compute photon energy: E = 1240 / λ(nm) = 1240 / 400 = 3.10 eV.",
        "Use KE = E - φ = 3.10 eV - 2.0 eV = 1.10 eV.",
        "Since photon energy (3.10 eV) > work function (2.0 eV), emission occurs.",
        "The maximum kinetic energy of the photoelectrons is 1.10 eV."
      ],
      "answer": "KE = 1.10 eV"
    }
  }
};
