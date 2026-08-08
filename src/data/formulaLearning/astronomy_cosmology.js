export const astronomy_cosmology = {
  "redshift": {
    "intuition": "Redshift is the Doppler effect for light. Just like an ambulance siren sounds lower pitched as it drives away from you, a galaxy flying away from Earth physically stretches the light waves it emits. The 'Redshift (z)' is a direct measure of how severely the light has been stretched into the red part of the spectrum.",
    "variableBreakdown": [
      {
        "id": "z",
        "siUnit": "",
        "altUnits": "",
        "description": "Redshift (z)",
        "commonTraps": "It is unitless. A higher number means it's moving away faster."
      },
      {
        "id": "lObs",
        "siUnit": "nm",
        "altUnits": "m",
        "description": "Observed Wavelength",
        "commonTraps": "The wavelength measured by a telescope on Earth."
      },
      {
        "id": "lRest",
        "siUnit": "nm",
        "altUnits": "m",
        "description": "Rest Wavelength",
        "commonTraps": "The true, original wavelength emitted by the star (known from lab experiments)."
      }
    ],
    "solvingLogic": [
      "1. Subtract the Rest Wavelength from the Observed Wavelength (lObs - lRest).",
      "2. Divide the result by the Rest Wavelength."
    ],
    "edgeCases": [
      {
        "title": "Blueshift (Negative z)",
        "description": "If a galaxy is flying TOWARDS us (like the Andromeda Galaxy is currently doing), the light gets squished instead of stretched. The observed wavelength will be smaller than the rest wavelength, resulting in a negative 'z' value. This is called Blueshift."
      }
    ],
    "walkthroughExample": {
      "problem": "Hydrogen normally emits light at 656 nm (Rest). We observe a galaxy emitting this line at 688 nm. Find the Redshift.",
      "solution": [
        "Change: 688 - 656 = 32.",
        "Divide by Rest: 32 / 656 ≈ 0.0487."
      ],
      "answer": "z ≈ 0.0487"
    }
  },

  "hubbles-law": {
    "intuition": "Edwin Hubble made the most terrifying discovery in human history: the universe is actively exploding. Every galaxy is flying away from us. Hubble's Law proves that the further away a galaxy is, the FASTER it is flying away, meaning space itself is expanding like a balloon.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "km/s",
        "altUnits": "",
        "description": "Recessional Velocity (v)",
        "commonTraps": "How fast the galaxy is flying away from Earth."
      },
      {
        "id": "d",
        "siUnit": "Mpc",
        "altUnits": "",
        "description": "Distance (d)",
        "commonTraps": "Measured in Megaparsecs (1 Mpc is about 3.26 million light-years)."
      },
      {
        "id": "H0",
        "siUnit": "km/s/Mpc",
        "altUnits": "",
        "description": "Hubble Constant (H₀)",
        "commonTraps": "The rate of universal expansion (currently estimated around 70 km/s/Mpc)."
      }
    ],
    "solvingLogic": [
      "1. Multiply the Distance to the galaxy by the Hubble Constant."
    ],
    "edgeCases": [
      {
        "title": "Faster than Light?",
        "description": "Because velocity increases with distance, galaxies that are incredibly far away (beyond the 'Hubble Horizon') are actually receding from us FASTER than the speed of light! This doesn't violate Einstein's laws, because the galaxies aren't moving THROUGH space; the space BETWEEN us is expanding."
      }
    ],
    "walkthroughExample": {
      "problem": "A galaxy is 100 Mpc away. H₀ is 70 km/s/Mpc. How fast is it moving away?",
      "solution": [
        "v = 100 × 70 = 7000."
      ],
      "answer": "v = 7,000 km/s"
    }
  },

  "luminosity-distance": {
    "intuition": "The 'Distance Modulus' formula is how astronomers measure the universe. If you know exactly how bright a star TRULY is (Absolute Magnitude), and you measure how dim it APPEARS from Earth (Apparent Magnitude), you can perfectly calculate how many parsecs away it must be.",
    "variableBreakdown": [
      {
        "id": "d",
        "siUnit": "pc",
        "altUnits": "",
        "description": "Distance in Parsecs",
        "commonTraps": "A parsec is 3.26 light years."
      },
      {
        "id": "m",
        "siUnit": "",
        "altUnits": "",
        "description": "Apparent Magnitude (m)",
        "commonTraps": "How bright it looks to us. A HIGHER number means it is DIMMER!"
      },
      {
        "id": "M",
        "siUnit": "",
        "altUnits": "",
        "description": "Absolute Magnitude (M)",
        "commonTraps": "How bright the star actually is if it were exactly 10 parsecs away."
      }
    ],
    "solvingLogic": [
      "1. Subtract Absolute Magnitude from Apparent Magnitude (m - M).",
      "2. Add 5 to that result.",
      "3. Divide by 5.",
      "4. Raise 10 to that power: 10^(result)."
    ],
    "edgeCases": [
      {
        "title": "Perfect 10",
        "description": "If a star is exactly 10 parsecs away from Earth, its Apparent Magnitude (m) and Absolute Magnitude (M) are perfectly equal. (m - M) becomes 0, the exponent is (0+5)/5 = 1. And 10¹ is exactly 10!"
      }
    ],
    "walkthroughExample": {
      "problem": "A star has an apparent magnitude of 15 and an absolute magnitude of 5. Find its distance.",
      "solution": [
        "m - M = 15 - 5 = 10.",
        "Add 5: 10 + 5 = 15.",
        "Divide by 5: 15 / 5 = 3.",
        "10³ = 1000."
      ],
      "answer": "d = 1,000 parsecs"
    }
  }
};
