export const advanced_optics_astrophysics = {
  "rayleigh": {
    "intuition": "The Rayleigh Criterion determines the maximum resolving power of an optical system. It tells you exactly how close two point sources of light can be before they blur together into a single indistinguishable blob.",
    "variableBreakdown": [
      {
        "id": "theta",
        "siUnit": "rad",
        "altUnits": "",
        "description": "Angular Resolution (θ)",
        "commonTraps": "Must be in radians. A smaller angle means BETTER resolution (you can see finer details)."
      },
      {
        "id": "lambda",
        "siUnit": "m",
        "altUnits": "nm",
        "description": "Wavelength (λ)",
        "commonTraps": "Shorter wavelengths (like blue/UV) give better resolution than longer ones (red/IR). Ensure you convert nm to meters."
      },
      {
        "id": "D",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Aperture Diameter (D)",
        "commonTraps": "Larger telescope mirrors (bigger D) provide better resolution."
      }
    ],
    "solvingLogic": [
      "1. Ensure wavelength (λ) and aperture diameter (D) are in the same unit (typically meters).",
      "2. Divide λ by D.",
      "3. Multiply by the constant 1.22 to find θ = 1.22 × (λ / D)."
    ],
    "edgeCases": [
      {
        "title": "Radio Telescopes",
        "description": "Because radio waves are huge (λ ≈ meters), radio telescopes must have enormous dishes (huge D) to achieve the same resolution as a small optical telescope."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the angular resolution of a telescope with D = 2.4 m (Hubble) for light with λ = 500 nm.",
      "solution": [
        "λ = 500 nm = 5 × 10⁻⁷ m.",
        "λ / D = (5 × 10⁻⁷) / 2.4 ≈ 2.083 × 10⁻⁷.",
        "θ = 1.22 × 2.083 × 10⁻⁷ ≈ 2.54 × 10⁻⁷ radians."
      ],
      "answer": "θ ≈ 2.54 × 10⁻⁷ rad"
    }
  },

  "telescope-mag": {
    "intuition": "Telescope magnification is simply the ratio of the focal length of the main objective lens (or mirror) to the focal length of the small eyepiece lens you look through.",
    "variableBreakdown": [
      {
        "id": "M",
        "siUnit": "",
        "altUnits": "x",
        "description": "Magnification (M)",
        "commonTraps": "A unitless multiplier (e.g., 50x magnification)."
      },
      {
        "id": "fo",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Objective Focal Length (fo)",
        "commonTraps": "The large lens/mirror at the front. Longer fo means more magnification."
      },
      {
        "id": "fe",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Eyepiece Focal Length (fe)",
        "commonTraps": "The small lens near your eye. Shorter fe means MORE magnification."
      }
    ],
    "solvingLogic": [
      "1. Check that both focal lengths (fo and fe) are in the same unit (often mm is used in astronomy).",
      "2. Divide fo by fe: M = fo / fe."
    ],
    "edgeCases": [
      {
        "title": "Maximum Usable Magnification",
        "description": "While you can technically make M infinitely large by using a tiny eyepiece (fe), atmospheric blurring and diffraction limit useful magnification to about 2x the aperture diameter in mm."
      }
    ],
    "walkthroughExample": {
      "problem": "A telescope has an objective focal length of 1000 mm and you use a 10 mm eyepiece. What is the magnification?",
      "solution": [
        "M = 1000 / 10 = 100."
      ],
      "answer": "M = 100x"
    }
  },

  "distance-modulus": {
    "intuition": "The distance modulus relates a star's apparent brightness (how bright it looks to us) with its absolute brightness (how bright it actually is). This allows astronomers to calculate the distance to stars.",
    "variableBreakdown": [
      {
        "id": "mu",
        "siUnit": "",
        "altUnits": "mag",
        "description": "Distance Modulus (μ)",
        "commonTraps": "Defined as m - M (apparent magnitude minus absolute magnitude)."
      },
      {
        "id": "d",
        "siUnit": "pc",
        "altUnits": "kpc",
        "description": "Distance (d)",
        "commonTraps": "Must be in parsecs (pc), not lightyears. (1 pc ≈ 3.26 lightyears)."
      }
    ],
    "solvingLogic": [
      "1. To find distance modulus: μ = 5 × log₁₀(d) - 5.",
      "2. To find distance from modulus: Rearrange to log₁₀(d) = (μ + 5) / 5.",
      "3. Take 10 to the power of that result: d = 10^((μ+5)/5)."
    ],
    "edgeCases": [
      {
        "title": "Distance = 10 Parsecs",
        "description": "If a star is exactly 10 pc away, log₁₀(10) = 1. Therefore μ = 5(1) - 5 = 0. Apparent and absolute magnitudes are perfectly equal at 10 pc."
      }
    ],
    "walkthroughExample": {
      "problem": "A star has a distance modulus of 10. How far away is it?",
      "solution": [
        "μ = 10.",
        "(10 + 5) / 5 = 15 / 5 = 3.",
        "d = 10³ = 1000."
      ],
      "answer": "d = 1000 pc"
    }
  },

  "wiens-law": {
    "intuition": "Wien's Displacement Law explains why hotter objects glow blue and cooler objects glow red. It states that the peak wavelength of light emitted by a black body is inversely proportional to its temperature.",
    "variableBreakdown": [
      {
        "id": "lambda",
        "siUnit": "m",
        "altUnits": "nm",
        "description": "Peak Wavelength (λ_max)",
        "commonTraps": "Usually calculated in meters, but often converted to nm to describe visible colors."
      },
      {
        "id": "T",
        "siUnit": "K",
        "altUnits": "",
        "description": "Absolute Temperature (T)",
        "commonTraps": "MUST be in Kelvin."
      }
    ],
    "solvingLogic": [
      "1. Use Wien's constant: b ≈ 2.89777 × 10⁻³ m·K.",
      "2. To find wavelength: λ = b / T.",
      "3. To find temperature: T = b / λ."
    ],
    "edgeCases": [
      {
        "title": "Human Body Temperature",
        "description": "Humans at ~310K emit peak radiation at ~9300 nm, which is deep in the infrared. This is why night vision goggles see body heat!"
      }
    ],
    "walkthroughExample": {
      "problem": "The sun's surface is roughly 5800 K. What is its peak wavelength?",
      "solution": [
        "λ = (2.89777 × 10⁻³) / 5800.",
        "λ ≈ 4.996 × 10⁻⁷ m = 499.6 nm (which is in the green-blue part of the visible spectrum)."
      ],
      "answer": "λ ≈ 500 nm"
    }
  },

  "lens-maker": {
    "intuition": "The Lens Maker's Equation allows you to calculate the focal length of a lens based on the curvature of its two surfaces and the refractive index of the glass. This is how optometrists design glasses.",
    "variableBreakdown": [
      {
        "id": "f",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Focal Length (f)",
        "commonTraps": "If f is positive, the lens is converging (convex). If f is negative, it's diverging (concave)."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Refractive Index (n)",
        "commonTraps": "Unitless. Usually ~1.5 for standard glass."
      },
      {
        "id": "R1",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Radius of Curvature 1 (R₁)",
        "commonTraps": "Positive if the center of curvature is behind the lens, negative if in front."
      },
      {
        "id": "R2",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Radius of Curvature 2 (R₂)",
        "commonTraps": "Follows the same sign convention as R₁."
      }
    ],
    "solvingLogic": [
      "1. Calculate (n - 1).",
      "2. Calculate (1/R₁ - 1/R₂). Pay extreme attention to the signs of the radii!",
      "3. Multiply them together to find 1/f.",
      "4. Take the reciprocal of the result to find f."
    ],
    "edgeCases": [
      {
        "title": "Plano-Convex Lenses",
        "description": "If one side of the lens is perfectly flat, its radius of curvature is infinity (∞). Since 1/∞ = 0, that term drops out of the equation entirely."
      }
    ],
    "walkthroughExample": {
      "problem": "A glass lens (n=1.5) has R₁ = 0.5 m (convex) and R₂ = -0.5 m (convex back). Find f.",
      "solution": [
        "1/f = (1.5 - 1) × (1/0.5 - 1/-0.5).",
        "1/f = (0.5) × (2 - (-2)) = 0.5 × 4 = 2.",
        "f = 1/2 = 0.5 m."
      ],
      "answer": "f = 0.5 m"
    }
  },

  "larmor": {
    "intuition": "The Larmor formula calculates the total power radiated by an accelerating point charge. It explains why moving charges emit electromagnetic radiation (like radio antennas or synchrotrons).",
    "variableBreakdown": [
      {
        "id": "P",
        "siUnit": "W",
        "altUnits": "",
        "description": "Radiated Power (P)",
        "commonTraps": "Total energy lost per second."
      },
      {
        "id": "q",
        "siUnit": "C",
        "altUnits": "e",
        "description": "Electric Charge (q)",
        "commonTraps": "Must be squared in the formula."
      },
      {
        "id": "a",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Acceleration (a)",
        "commonTraps": "Must be squared in the formula. A charge moving at a constant velocity (a=0) radiates no power."
      }
    ],
    "solvingLogic": [
      "1. Square the charge (q²) and the acceleration (a²).",
      "2. Use constants: magnetic permeability (μ₀) and speed of light (c).",
      "3. P = (μ₀ × q² × a²) / (6π × c)."
    ],
    "edgeCases": [
      {
        "title": "Relativistic Speeds",
        "description": "This classical formula breaks down if the charge is moving close to the speed of light. In that case, the relativistic Liénard-Wiechert potentials must be used instead."
      }
    ],
    "walkthroughExample": {
      "problem": "An electron (q ≈ 1.6×10⁻¹⁹ C) accelerates at 10²⁰ m/s². What is the radiated power?",
      "solution": [
        "q² = 2.56 × 10⁻³⁸.",
        "a² = 10⁴⁰.",
        "Constants: μ₀ = 4π×10⁻⁷, c = 3×10⁸.",
        "P = (4π×10⁻⁷ × 2.56×10⁻³⁸ × 10⁴⁰) / (6π × 3×10⁸).",
        "P = (10.24π × 10⁻⁵) / (18π × 10⁸) ≈ 0.569 × 10⁻¹³ W."
      ],
      "answer": "P ≈ 5.69 × 10⁻¹⁴ W"
    }
  }
};
