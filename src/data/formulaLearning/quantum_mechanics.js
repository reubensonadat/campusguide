export const quantum_mechanics = {
  "schrodinger-1d": {
    "intuition": "The 1D Schrödinger equation (specifically for a particle in a box) reveals that quantum particles are trapped like guitar strings. They can't just have ANY energy; they can only vibrate at specific, rigid 'harmonics' (n=1, 2, 3...). Energy is 'quantized' into steps, with absolutely no in-between states allowed.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "J",
        "altUnits": "eV",
        "description": "Energy Level (E_n)",
        "commonTraps": "Because 'n' is squared in the formula, energy levels get further apart as you go up!"
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass of Particle",
        "commonTraps": "Usually an electron."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "nm",
        "description": "Length of the Box",
        "commonTraps": "The width of the physical space the particle is trapped in. Must be in meters."
      }
    ],
    "solvingLogic": [
      "1. Pick a quantum number (n = 1, 2, 3...).",
      "2. Square 'n' and multiply by Planck's constant squared (h²).",
      "3. Divide that whole numerator by (8 × mass × L²)."
    ],
    "edgeCases": [
      {
        "title": "Zero-Point Energy",
        "description": "Notice that 'n' can never be 0. (If n=0, the particle mathematically ceases to exist). Because the lowest possible state is n=1, a particle in a box ALWAYS has some kinetic energy. It can never be perfectly frozen, even at absolute zero! This is called 'zero-point energy'."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the ground state (n=1) energy of an electron (m=9.1×10⁻³¹ kg) in a 1 nm box.",
      "solution": [
        "L = 1×10⁻⁹ m. n = 1.",
        "h = 6.626×10⁻³⁴.",
        "Numerator: (1)² × (6.626×10⁻³⁴)² ≈ 4.39×10⁻⁶⁷.",
        "Denominator: 8 × (9.1×10⁻³¹) × (1×10⁻⁹)² = 7.28×10⁻⁴⁸.",
        "Divide: 4.39×10⁻⁶⁷ / 7.28×10⁻⁴⁸ ≈ 6.03×10⁻²⁰ J."
      ],
      "answer": "E ≈ 6.03×10⁻²⁰ Joules (~0.37 eV)"
    }
  },

  "heisenberg-uncertainty": {
    "intuition": "The Heisenberg Uncertainty Principle shows the limit of knowledge in the universe. If you pinch a particle to measure its exact location (Δx approaches 0), its momentum (Δp) violently spikes, meaning you have no idea how fast it is now moving or where it will be a split second later.",
    "variableBreakdown": [
      {
        "id": "dx",
        "siUnit": "m",
        "altUnits": "",
        "description": "Uncertainty in Position (Δx)",
        "commonTraps": "How tightly you have pinned down the particle's location."
      },
      {
        "id": "dp",
        "siUnit": "kg·m/s",
        "altUnits": "",
        "description": "Uncertainty in Momentum (Δp)",
        "commonTraps": "The blurriness of its speed/direction."
      }
    ],
    "solvingLogic": [
      "1. The product of (Δx × Δp) must be greater than or equal to (h / 4π).",
      "2. (h / 4π) is roughly 5.27 × 10⁻³⁵ J·s."
    ],
    "edgeCases": [
      {
        "title": "Macroscopic Irrelevance",
        "description": "Why don't we see this in daily life? Because 10⁻³⁵ is so microscopic. If you throw a 1 kg baseball, the uncertainty limit is instantly satisfied by unmeasurably tiny fractions of a nanometer. It only matters for electrons."
      }
    ],
    "walkthroughExample": {
      "problem": "If Δx is exactly 10⁻¹² m, find the minimum Δp.",
      "solution": [
        "Limit = 5.27 × 10⁻³⁵.",
        "Δp ≥ (5.27 × 10⁻³⁵) / 10⁻¹²."
      ],
      "answer": "Δp ≥ 5.27 × 10⁻²³ kg·m/s"
    }
  },

  "compton-effect": {
    "intuition": "The Compton Effect proves light has physical momentum. When an X-ray (a wave) hits an electron (a particle), they crash like billiard balls. The X-ray gives some energy to the electron, so the X-ray bounces off weaker, which physically means it has a longer wavelength.",
    "variableBreakdown": [
      {
        "id": "dlambda",
        "siUnit": "m",
        "altUnits": "",
        "description": "Change in Wavelength (Δλ)",
        "commonTraps": "This is the shift (new minus old), not the total wavelength!"
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Scattering Angle (θ)",
        "commonTraps": "The angle the photon was deflected."
      }
    ],
    "solvingLogic": [
      "1. Find the Compton Wavelength of the electron: h / (m × c) = 2.426 × 10⁻¹² m.",
      "2. Calculate 1 - cos(θ).",
      "3. Multiply them together to find the shift (Δλ)."
    ],
    "edgeCases": [
      {
        "title": "Straight Through (0°)",
        "description": "If the photon misses the electron and passes straight through (θ = 0), then cos(0) = 1. The bracket (1 - 1) equals 0. The wavelength shift is 0. It lost no energy."
      }
    ],
    "walkthroughExample": {
      "problem": "An X-ray is deflected at 60°. Find the wavelength shift.",
      "solution": [
        "cos(60°) = 0.5.",
        "1 - 0.5 = 0.5.",
        "Δλ = (2.426 × 10⁻¹²) × 0.5."
      ],
      "answer": "Δλ = 1.213 × 10⁻¹² m"
    }
  },

  "photoelectric": {
    "intuition": "Einstein won his Nobel Prize for this! He proved light acts as 'packets' (photons). If you shine red light on metal, no electrons escape, no matter how bright it is, because individual red photons are too weak. But a dim blue light knocks electrons loose instantly, because blue photons have higher energy.",
    "variableBreakdown": [
      {
        "id": "Ek",
        "siUnit": "J",
        "altUnits": "eV",
        "description": "Max Kinetic Energy",
        "commonTraps": "How fast the electron flies away from the metal."
      },
      {
        "id": "f",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Frequency of Light",
        "commonTraps": "Higher frequency = bluer light."
      },
      {
        "id": "phi",
        "siUnit": "J",
        "altUnits": "eV",
        "description": "Work Function (Φ)",
        "commonTraps": "The specific 'glue' strength of the metal. How much energy it takes just to rip the electron out."
      }
    ],
    "solvingLogic": [
      "1. Multiply Planck's constant (h) by the frequency of light (f). This is the incoming photon's total energy.",
      "2. Subtract the Work Function (Φ) of the metal.",
      "3. Whatever energy is left over becomes the Kinetic Energy (Ek) of the escaping electron."
    ],
    "edgeCases": [
      {
        "title": "Below Threshold",
        "description": "If the incoming photon energy (hf) is LESS than the Work Function (Φ), the result is theoretically negative. In reality, nothing happens. The metal just gets slightly warm, and no electrons are ejected at all."
      }
    ],
    "walkthroughExample": {
      "problem": "A photon with 5 eV of energy hits a metal with a work function of 2 eV. Find the electron's kinetic energy.",
      "solution": [
        "Incoming Energy (hf) = 5 eV.",
        "Work Function (Φ) = 2 eV.",
        "Ek = 5 - 2 = 3 eV."
      ],
      "answer": "Ek = 3 eV"
    }
  },

  "de-broglie": {
    "intuition": "Matter-wave duality. Just as light (a wave) can act like a particle, physical matter (like a baseball) can act like a wave. The wavelength of any physical object is dictated by its momentum.",
    "variableBreakdown": [
      {
        "id": "lambda",
        "siUnit": "m",
        "altUnits": "",
        "description": "Wavelength (λ)",
        "commonTraps": ""
      },
      {
        "id": "p",
        "siUnit": "kg·m/s",
        "altUnits": "",
        "description": "Momentum (p)",
        "commonTraps": "Mass × Velocity."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity",
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
      "1. Multiply mass by velocity to find momentum (p).",
      "2. Divide Planck's constant (h) by the momentum."
    ],
    "edgeCases": [
      {
        "title": "Electron Microscopes",
        "description": "Visible light has a wavelength of ~500 nm, meaning we can't see anything smaller than that. Because we can accelerate electrons to incredible speeds, their de Broglie wavelength drops to 0.01 nm! This allows electron microscopes to 'see' individual atoms, shattering the limits of optical lenses."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the wavelength of an electron (m = 9.1×10⁻³¹ kg) moving at 1,000,000 m/s.",
      "solution": [
        "p = (9.1×10⁻³¹) × (1,000,000) = 9.1×10⁻²⁵.",
        "λ = (6.626×10⁻³⁴) / (9.1×10⁻²⁵) ≈ 7.28×10⁻¹⁰ m."
      ],
      "answer": "λ ≈ 7.28×10⁻¹⁰ m"
    }
  }
};
