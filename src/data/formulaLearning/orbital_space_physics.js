export const orbital_space_physics = {
  "escape-velocity": {
    "intuition": "Escape velocity is the exact speed an object needs to break free from a planet's gravitational pull forever without any further propulsion. Once it hits this speed, it will never fall back down.",
    "variableBreakdown": [
      {
        "id": "ve",
        "siUnit": "m/s",
        "altUnits": "km/s",
        "description": "Escape Velocity (v_e)",
        "commonTraps": "Does not depend on the mass of the escaping object (e.g. a spaceship and a baseball have the same escape velocity)."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass of Planet (M)",
        "commonTraps": "Mass of the massive body being escaped from."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "km",
        "description": "Distance from Center (r)",
        "commonTraps": "Must be measured from the CENTER of the planet, not the surface. At the surface, r is the planet's radius."
      }
    ],
    "solvingLogic": [
      "1. Calculate 2 × G × M (G is the gravitational constant, 6.674 × 10⁻¹¹).",
      "2. Divide by r.",
      "3. Take the square root of the entire result to find v_e."
    ],
    "edgeCases": [
      {
        "title": "Black Holes",
        "description": "If a body is so dense that its escape velocity exceeds the speed of light (3 × 10⁸ m/s), not even light can escape, forming a black hole."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the escape velocity from Earth's surface (M = 5.97×10²⁴ kg, r = 6.37×10⁶ m).",
      "solution": [
        "2 × G × M = 2 × (6.674×10⁻¹¹) × (5.97×10²⁴) ≈ 7.97 × 10¹⁴.",
        "Divide by r: (7.97 × 10¹⁴) / (6.37 × 10⁶) ≈ 1.25 × 10⁸.",
        "v_e = √(1.25 × 10⁸) ≈ 11180 m/s."
      ],
      "answer": "v_e ≈ 11.2 km/s"
    }
  },

  "orbital-period": {
    "intuition": "The orbital period is the time it takes for a satellite to complete one full revolution around a central body. It depends strictly on how far away it is and the mass of the central body.",
    "variableBreakdown": [
      {
        "id": "T",
        "siUnit": "s",
        "altUnits": "days, years",
        "description": "Orbital Period (T)",
        "commonTraps": "Output is in seconds. You will usually need to divide by 86400 to get days."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "km",
        "description": "Orbital Radius (r)",
        "commonTraps": "For circular orbits, this is the distance from the center of the massive body to the satellite."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass of Central Body (M)",
        "commonTraps": "The mass of the star or planet being orbited."
      }
    ],
    "solvingLogic": [
      "1. Cube the radius (r³).",
      "2. Multiply by 4π².",
      "3. Divide by (G × M).",
      "4. Take the square root of the result to find T."
    ],
    "edgeCases": [
      {
        "title": "Geosynchronous Orbits",
        "description": "If you set T to exactly one Earth day (86,164 seconds for a sidereal day) and solve for r, you find the exact height where satellites hover over the same spot on Earth."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the period of the ISS orbiting Earth at r = 6.77×10⁶ m (M = 5.97×10²⁴ kg).",
      "solution": [
        "r³ = 3.1 × 10²⁰.",
        "4π² × r³ ≈ 1.22 × 10²².",
        "G × M ≈ 3.98 × 10¹⁴.",
        "T² = 1.22×10²² / 3.98×10¹⁴ ≈ 3.06 × 10⁷.",
        "T = √(3.06 × 10⁷) ≈ 5530 s."
      ],
      "answer": "T ≈ 5530 seconds (about 92 mins)"
    }
  },

  "schwarzschild-radius": {
    "intuition": "The Schwarzschild radius defines the 'event horizon' of a black hole. If you compress any mass down into a sphere smaller than this radius, its gravity becomes so intense that it inevitably collapses into a black hole.",
    "variableBreakdown": [
      {
        "id": "rs",
        "siUnit": "m",
        "altUnits": "km",
        "description": "Schwarzschild Radius (r_s)",
        "commonTraps": "The distance from the singularity to the event horizon."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "Solar Masses",
        "description": "Mass (M)",
        "commonTraps": "The total mass of the object."
      }
    ],
    "solvingLogic": [
      "1. Multiply 2 × G × M.",
      "2. Divide by the speed of light squared (c² = 9 × 10¹⁶)."
    ],
    "edgeCases": [
      {
        "title": "The Earth as a Black Hole",
        "description": "If you wanted to turn Earth into a black hole, you would have to compress its entire mass into a sphere the size of a marble (r_s ≈ 9 mm)."
      }
    ],
    "walkthroughExample": {
      "problem": "What is the Schwarzschild radius of a star with mass 2 × 10³⁰ kg (the Sun)?",
      "solution": [
        "2 × (6.674×10⁻¹¹) × (2×10³⁰) ≈ 2.67 × 10²⁰.",
        "c² = 9 × 10¹⁶.",
        "r_s = 2.67×10²⁰ / 9×10¹⁶ ≈ 2966 m."
      ],
      "answer": "r_s ≈ 2.97 km"
    }
  },

  "hubble-law": {
    "intuition": "Hubble's Law describes the expansion of the universe. It states that the further away a galaxy is from us, the faster it is receding (moving away) from us.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "km/s",
        "altUnits": "",
        "description": "Recessional Velocity (v)",
        "commonTraps": "Normally expressed in km/s instead of standard m/s in cosmology."
      },
      {
        "id": "H0",
        "siUnit": "km/s/Mpc",
        "altUnits": "",
        "description": "Hubble Constant (H₀)",
        "commonTraps": "Current best estimates place this around 70 km/s per Megaparsec."
      },
      {
        "id": "d",
        "siUnit": "Mpc",
        "altUnits": "kly",
        "description": "Distance (d)",
        "commonTraps": "Must be in Megaparsecs (Mpc) to match the Hubble Constant units."
      }
    ],
    "solvingLogic": [
      "1. Ensure the distance is in Mpc (1 Mpc = 3.26 million lightyears).",
      "2. Multiply H₀ × d to find the velocity in km/s."
    ],
    "edgeCases": [
      {
        "title": "Faster than Light?",
        "description": "At sufficiently large distances (beyond the observable universe), Hubble's law predicts v > c. This doesn't violate relativity because space itself is expanding, not the galaxies moving THROUGH space."
      }
    ],
    "walkthroughExample": {
      "problem": "A galaxy is 100 Mpc away. H₀ = 70 km/s/Mpc. How fast is it moving away?",
      "solution": [
        "v = H₀ × d",
        "v = 70 × 100 = 7000."
      ],
      "answer": "v = 7000 km/s"
    }
  },

  "kepler-third": {
    "intuition": "Kepler's Third Law states that the square of a planet's orbital period is proportional to the cube of the semi-major axis of its orbit. It proves that planets further from the sun take drastically longer to orbit.",
    "variableBreakdown": [
      {
        "id": "T",
        "siUnit": "s",
        "altUnits": "years",
        "description": "Orbital Period (T)",
        "commonTraps": "For the simplified version used in our solar system, T is often in Earth Years."
      },
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "AU",
        "description": "Semi-Major Axis (a)",
        "commonTraps": "For the solar system, usually given in Astronomical Units (AU), where 1 AU = Earth-Sun distance."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "Solar Masses",
        "description": "Mass of Central Body (M)",
        "commonTraps": "If using Years and AU, M is in Solar Masses (so for the sun, M=1, simplifying the equation to T² = a³)."
      }
    ],
    "solvingLogic": [
      "1. (If using standard SI) Calculate (4π² × a³) / (G × M).",
      "2. (If using AU and Years) T² = a³ / M_solar.",
      "3. Take the square root to find T."
    ],
    "edgeCases": [
      {
        "title": "Elliptical Orbits",
        "description": "This law works perfectly for highly elliptical orbits (like comets). Just make sure 'a' is the semi-major axis, not the perihelion or aphelion."
      }
    ],
    "walkthroughExample": {
      "problem": "Jupiter is 5.2 AU from the Sun. What is its orbital period in Earth years?",
      "solution": [
        "Since we orbit the Sun, M_solar = 1.",
        "T² = 5.2³ = 140.6.",
        "T = √140.6 ≈ 11.86."
      ],
      "answer": "T = 11.86 years"
    }
  },

  "orbital-velocity": {
    "intuition": "Orbital velocity is the exact speed an object must travel horizontally to ensure that as gravity pulls it down, the curvature of the planet drops away beneath it at the exact same rate. It is falling continuously, but missing the ground.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "km/s",
        "description": "Orbital Velocity (v)",
        "commonTraps": "This is for a perfectly circular orbit."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass of Planet (M)",
        "commonTraps": "The mass of the central body."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "km",
        "description": "Radius of Orbit (r)",
        "commonTraps": "Distance from the center of the planet to the satellite."
      }
    ],
    "solvingLogic": [
      "1. Multiply G × M.",
      "2. Divide by r.",
      "3. Take the square root of the result: √(GM/r)."
    ],
    "edgeCases": [
      {
        "title": "Compare to Escape Velocity",
        "description": "Orbital velocity is exactly the escape velocity divided by √2. Therefore, escaping orbit requires multiplying your speed by roughly 1.414."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the orbital velocity of the ISS at r = 6.77×10⁶ m (M = 5.97×10²⁴ kg).",
      "solution": [
        "G × M ≈ 3.98 × 10¹⁴.",
        "Divide by r: (3.98 × 10¹⁴) / (6.77 × 10⁶) ≈ 5.88 × 10⁷.",
        "v = √(5.88 × 10⁷) ≈ 7668 m/s."
      ],
      "answer": "v ≈ 7668 m/s"
    }
  },

  "gravitational-pe": {
    "intuition": "Gravitational potential energy between two objects in space is defined as zero when they are infinitely far apart. As they fall toward each other, they lose potential energy (converting it to kinetic). Since they start at zero and lose energy, gravitational PE in space is always negative.",
    "variableBreakdown": [
      {
        "id": "U",
        "siUnit": "J",
        "altUnits": "MJ",
        "description": "Potential Energy (U)",
        "commonTraps": "Must be negative! U = -GmM/r."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 1 (M)",
        "commonTraps": "Mass of the heavier body."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 2 (m)",
        "commonTraps": "Mass of the lighter body (the satellite)."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance (r)",
        "commonTraps": "Distance between the centers of mass."
      }
    ],
    "solvingLogic": [
      "1. Multiply G × M × m.",
      "2. Divide by r.",
      "3. Make the final answer negative."
    ],
    "edgeCases": [
      {
        "title": "Surface vs Space",
        "description": "On Earth's surface we use U = mgh (which is positive). But mgh is just an approximation for very tiny changes in height. For space, you must use the full negative equation."
      }
    ],
    "walkthroughExample": {
      "problem": "A 100 kg satellite orbits Earth (M = 5.97×10²⁴ kg) at r = 7×10⁶ m. Find U.",
      "solution": [
        "Numerator: (6.674×10⁻¹¹) × (5.97×10²⁴) × 100 ≈ 3.98 × 10¹⁶.",
        "Divide by 7×10⁶: (3.98 × 10¹⁶) / (7×10⁶) ≈ 5.69 × 10⁹.",
        "Make negative."
      ],
      "answer": "U = -5.69 × 10⁹ J"
    }
  },

  "vis-viva": {
    "intuition": "The Vis-Viva equation is arguably the most important formula in astrodynamics. It relates an object's instantaneous speed to its current distance and the semi-major axis of its elliptical orbit. It perfectly models how objects speed up at periapsis and slow down at apoapsis.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity (v)",
        "commonTraps": "Instantaneous velocity at that exact moment in the orbit."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Central Mass (M)",
        "commonTraps": "Mass of the planet being orbited."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Current Distance (r)",
        "commonTraps": "How far the object is from the planet at this exact moment."
      },
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "",
        "description": "Semi-Major Axis (a)",
        "commonTraps": "The 'average' size of the entire elliptical orbit."
      }
    ],
    "solvingLogic": [
      "1. Calculate (2/r - 1/a).",
      "2. Multiply by G × M.",
      "3. Take the square root to find v."
    ],
    "edgeCases": [
      {
        "title": "Circular Orbits",
        "description": "In a perfect circle, the current distance (r) equals the semi-major axis (a). Therefore (2/r - 1/r) = 1/r, and the equation perfectly reduces back to standard orbital velocity: √(GM/r)."
      }
    ],
    "walkthroughExample": {
      "problem": "An asteroid orbits the sun (M=2×10³⁰). Its semi-major axis is 4×10¹¹ m. It is currently at r = 2×10¹¹ m. Find v.",
      "solution": [
        "GM = 1.33 × 10²⁰.",
        "(2/r - 1/a) = (2 / 2×10¹¹ - 1 / 4×10¹¹) = (10⁻¹¹ - 0.25×10⁻¹¹) = 0.75 × 10⁻¹¹.",
        "v² = (1.33 × 10²⁰) × (0.75 × 10⁻¹¹) = 1 × 10⁹.",
        "v = √(10⁹) ≈ 31622 m/s."
      ],
      "answer": "v ≈ 31.6 km/s"
    }
  },

  "roche-limit": {
    "intuition": "The Roche limit is the distance at which a celestial body, held together only by its own gravity, will disintegrate because a second body's tidal forces exceed the first body's gravitational self-attraction. This is how planetary rings (like Saturn's) are formed from shredded moons.",
    "variableBreakdown": [
      {
        "id": "d",
        "siUnit": "m",
        "altUnits": "km",
        "description": "Roche Limit Distance (d)",
        "commonTraps": "If a moon crosses this line, it gets torn to pieces."
      },
      {
        "id": "R",
        "siUnit": "m",
        "altUnits": "km",
        "description": "Primary Radius (R)",
        "commonTraps": "Radius of the massive planet."
      },
      {
        "id": "rhoM",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Primary Density (ρ_M)",
        "commonTraps": "Density of the massive planet."
      },
      {
        "id": "rhom",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Satellite Density (ρ_m)",
        "commonTraps": "Density of the orbiting moon."
      }
    ],
    "solvingLogic": [
      "1. Divide the primary's density by the moon's density: ρ_M / ρ_m.",
      "2. Take the cube root of that ratio: (ρ_M / ρ_m)^(1/3).",
      "3. Multiply by the primary's radius (R).",
      "4. Multiply by the constant 2.44 (for fluid bodies) or 1.26 (for rigid bodies)."
    ],
    "edgeCases": [
      {
        "title": "Artificial Satellites",
        "description": "The ISS is well within Earth's Roche limit. Why doesn't it shred? Because it's held together by chemical bonds (metal), not just its own gravity. The Roche limit only applies to gravity-bound clumps of rock or fluid."
      }
    ],
    "walkthroughExample": {
      "problem": "A rigid icy moon (ρ = 1000) approaches a gas giant (R = 60000 km, ρ = 1300). Find the rigid Roche limit.",
      "solution": [
        "Ratio: 1300 / 1000 = 1.3.",
        "Cube root of 1.3 ≈ 1.09.",
        "d = 1.26 × R × 1.09",
        "d = 1.26 × 60000 × 1.09 ≈ 82400 km."
      ],
      "answer": "d ≈ 82,400 km"
    }
  },

  "tidal-force": {
    "intuition": "Tidal forces arise because gravity drops off with distance. The near side of a moon is pulled by a planet slightly stronger than the far side of the moon is pulled. This difference in pull creates a stretching force that causes ocean tides and can eventually rip bodies apart.",
    "variableBreakdown": [
      {
        "id": "dF",
        "siUnit": "N",
        "altUnits": "",
        "description": "Tidal Force Difference (ΔF)",
        "commonTraps": "The difference in force between the center of the object and its edge."
      },
      {
        "id": "M",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass of Primary (M)",
        "commonTraps": "Mass of the body creating the gravity (e.g. Earth or Moon)."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass of Subject (m)",
        "commonTraps": "Mass of the object feeling the stretch (e.g. an ocean drop)."
      },
      {
        "id": "R",
        "siUnit": "m",
        "altUnits": "",
        "description": "Radius of Subject (R)",
        "commonTraps": "How wide the stretched object is."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance Between Them (r)",
        "commonTraps": "Notice this is cubed (r³) in the denominator, meaning tidal forces drop off extremely fast with distance!"
      }
    ],
    "solvingLogic": [
      "1. Multiply 2 × G × M × m × R.",
      "2. Cube the distance (r³).",
      "3. Divide the numerator by r³."
    ],
    "edgeCases": [
      {
        "title": "Spaghettification",
        "description": "Near a black hole, r gets incredibly small while M is huge, meaning the tidal force (ΔF) becomes infinite, stretching anything into a long, thin string of atoms."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the tidal stretch on a 10 kg, 1m radius object 1000m from a 10¹⁵ kg asteroid.",
      "solution": [
        "Numerator: 2 × (6.674×10⁻¹¹) × 10¹⁵ × 10 × 1 = 1334800.",
        "Denominator: 1000³ = 10⁹.",
        "ΔF = 1334800 / 10⁹ = 0.00133 N."
      ],
      "answer": "ΔF ≈ 0.00133 N"
    }
  }
};
