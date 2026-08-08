export const advanced_mechanics = {
  "centripetal-force": {
    "intuition": "Centripetal force is the 'center-seeking' force that keeps an object moving in a circular path. Without it, the object would fly off in a straight line due to inertia.",
    "variableBreakdown": [
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Centripetal Force (F)",
        "commonTraps": "Always points toward the center of the circle."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "g",
        "description": "Mass (m)",
        "commonTraps": "Must be in kg."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity (v)",
        "commonTraps": "Remember to square the velocity in the formula!"
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Radius (r)",
        "commonTraps": "Must be the distance to the axis of rotation, not the diameter."
      }
    ],
    "solvingLogic": [
      "1. Ensure mass is in kg, velocity in m/s, and radius in m.",
      "2. Calculate v².",
      "3. Multiply by m: m × v².",
      "4. Divide by r to find F = (mv²) / r."
    ],
    "edgeCases": [
      {
        "title": "Not a New Force",
        "description": "Centripetal force is not a 'new' force; it must be provided by something else like gravity, tension, or friction."
      }
    ],
    "walkthroughExample": {
      "problem": "A 1000 kg car rounds a 50 m radius turn at 20 m/s. What is the centripetal force?",
      "solution": [
        "F = (1000 × 20²) / 50",
        "F = (1000 × 400) / 50",
        "F = 400000 / 50 = 8000 N."
      ],
      "answer": "F = 8000 N"
    }
  },

  "torque": {
    "intuition": "Torque is the rotational equivalent of linear force. It measures how much a force acting on an object causes that object to rotate around an axis or pivot point.",
    "variableBreakdown": [
      {
        "id": "tau",
        "siUnit": "N·m",
        "altUnits": "",
        "description": "Torque (τ)",
        "commonTraps": "Unit is N·m, which looks like Joules, but torque is not energy."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Lever Arm Distance (r)",
        "commonTraps": "Distance from the pivot point to where the force is applied."
      },
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Force (F)",
        "commonTraps": "Only the component of force perpendicular to the lever arm creates torque."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle (θ)",
        "commonTraps": "Angle between the force vector and the lever arm."
      }
    ],
    "solvingLogic": [
      "1. Identify r, F, and θ.",
      "2. Calculate sin(θ). Ensure your calculator is in the right mode (degrees/radians).",
      "3. Multiply r × F × sin(θ) to find τ."
    ],
    "edgeCases": [
      {
        "title": "Parallel Force",
        "description": "If the force points directly at or away from the pivot (θ = 0° or 180°), sin(θ) = 0, meaning zero torque is applied."
      }
    ],
    "walkthroughExample": {
      "problem": "A 50 N force is applied 0.2 m from a door hinge at a 90° angle. Find the torque.",
      "solution": [
        "sin(90°) = 1.",
        "τ = 0.2 × 50 × 1 = 10 N·m."
      ],
      "answer": "τ = 10 N·m"
    }
  },

  "angular-momentum": {
    "intuition": "Angular momentum measures the amount of rotation an object has, taking into account its mass, shape, and speed. It is conserved unless an outside torque acts upon it.",
    "variableBreakdown": [
      {
        "id": "L",
        "siUnit": "kg·m²/s",
        "altUnits": "",
        "description": "Angular Momentum (L)",
        "commonTraps": "Remains constant in a closed system (e.g., a spinning ice skater)."
      },
      {
        "id": "I",
        "siUnit": "kg·m²",
        "altUnits": "",
        "description": "Moment of Inertia (I)",
        "commonTraps": "Depends on both the mass and how that mass is distributed relative to the axis of rotation."
      },
      {
        "id": "omega",
        "siUnit": "rad/s",
        "altUnits": "",
        "description": "Angular Velocity (ω)",
        "commonTraps": "Must be in radians per second, not RPM."
      }
    ],
    "solvingLogic": [
      "1. Convert ω to rad/s if given in RPM (multiply by 2π/60).",
      "2. Ensure I is in kg·m².",
      "3. Multiply I × ω to find L."
    ],
    "edgeCases": [
      {
        "title": "Changing Inertia",
        "description": "If a spinning object pulls its mass closer to the center, I decreases. To conserve L, ω MUST increase (it spins faster)."
      }
    ],
    "walkthroughExample": {
      "problem": "A wheel has a moment of inertia of 5 kg·m² and spins at 4 rad/s. Find L.",
      "solution": [
        "L = I × ω.",
        "L = 5 × 4 = 20 kg·m²/s."
      ],
      "answer": "L = 20 kg·m²/s"
    }
  },

  "rocket-equation": {
    "intuition": "The Tsiolkovsky rocket equation describes the motion of vehicles that follow the basic principle of a rocket: a device that can apply acceleration to itself using thrust by expelling part of its mass with high velocity.",
    "variableBreakdown": [
      {
        "id": "dv",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Delta-v (Δv)",
        "commonTraps": "The maximum change of velocity of the vehicle."
      },
      {
        "id": "ve",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Exhaust Velocity (vₑ)",
        "commonTraps": "Sometimes given as Specific Impulse (Isp). vₑ = Isp × g."
      },
      {
        "id": "m0",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Initial Mass (m₀)",
        "commonTraps": "Total mass including propellant."
      },
      {
        "id": "mf",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Final Mass (mf)",
        "commonTraps": "Dry mass (after all propellant is burned)."
      }
    ],
    "solvingLogic": [
      "1. Calculate the mass ratio: m₀ / mf.",
      "2. Take the natural logarithm: ln(m₀ / mf).",
      "3. Multiply by exhaust velocity: Δv = vₑ × ln(m₀ / mf)."
    ],
    "edgeCases": [
      {
        "title": "Mass Ratio Limit",
        "description": "Because of the logarithm, to get a linear increase in Δv, you need an exponential increase in fuel mass (the 'tyranny of the rocket equation')."
      }
    ],
    "walkthroughExample": {
      "problem": "A rocket has vₑ = 3000 m/s, m₀ = 100000 kg, mf = 10000 kg. Find Δv.",
      "solution": [
        "m₀ / mf = 10.",
        "ln(10) ≈ 2.30.",
        "Δv = 3000 × 2.30 = 6900 m/s."
      ],
      "answer": "Δv = 6900 m/s"
    }
  },

  "pendulum-period": {
    "intuition": "The period of a simple pendulum depends ONLY on its length and the local acceleration of gravity. Mass and the amplitude of the swing (if small) do not affect the period.",
    "variableBreakdown": [
      {
        "id": "T",
        "siUnit": "s",
        "altUnits": "",
        "description": "Period (T)",
        "commonTraps": "The time for one complete back-and-forth swing."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Length (L)",
        "commonTraps": "Measured from the pivot to the center of mass of the bob."
      },
      {
        "id": "g",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Gravity (g)",
        "commonTraps": "Usually 9.81 m/s² on Earth. Will be different on other planets!"
      }
    ],
    "solvingLogic": [
      "1. Divide L by g.",
      "2. Take the square root of the result: √(L/g).",
      "3. Multiply by 2π."
    ],
    "edgeCases": [
      {
        "title": "Large Angles",
        "description": "This formula is an approximation that only works accurately for small swing angles (less than 15°). For larger swings, a more complex formula is required."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the period of a 2 m long pendulum on Earth (g = 9.81).",
      "solution": [
        "L/g = 2 / 9.81 ≈ 0.2038.",
        "√(0.2038) ≈ 0.451.",
        "T = 2π × 0.451 ≈ 2.84 s."
      ],
      "answer": "T ≈ 2.84 s"
    }
  },

  "conical-pendulum": {
    "intuition": "In a conical pendulum, the bob moves in a horizontal circle instead of swinging back and forth. The tension in the string provides both the vertical force to fight gravity and the horizontal centripetal force.",
    "variableBreakdown": [
      {
        "id": "T",
        "siUnit": "s",
        "altUnits": "",
        "description": "Period (T)",
        "commonTraps": "Time to complete one horizontal circle."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "String Length (L)",
        "commonTraps": "Must be in meters."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle from Vertical (θ)",
        "commonTraps": "Angle between the string and the straight-down vertical line."
      },
      {
        "id": "g",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Gravity (g)",
        "commonTraps": "9.81 m/s² on Earth."
      }
    ],
    "solvingLogic": [
      "1. Find cos(θ).",
      "2. Multiply L × cos(θ) (this is the vertical height of the cone).",
      "3. Divide by g.",
      "4. Take the square root and multiply by 2π."
    ],
    "edgeCases": [
      {
        "title": "Horizontal Swing",
        "description": "If θ approaches 90°, cos(θ) approaches 0, meaning the period approaches 0, which requires infinite tension to achieve."
      }
    ],
    "walkthroughExample": {
      "problem": "A 1 m conical pendulum swings at a 60° angle. Find the period.",
      "solution": [
        "cos(60°) = 0.5.",
        "L cos(θ) = 1 × 0.5 = 0.5.",
        "0.5 / 9.81 ≈ 0.051.",
        "√(0.051) ≈ 0.226.",
        "T = 2π × 0.226 ≈ 1.42 s."
      ],
      "answer": "T ≈ 1.42 s"
    }
  },

  "banked-curve": {
    "intuition": "Roads are banked at curves so that a component of the normal force provides the centripetal force needed to turn. At the 'ideal' speed, no friction is needed to stay on the road.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "km/h",
        "description": "Ideal Velocity (v)",
        "commonTraps": "The exact speed where no friction is required."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Curve Radius (r)",
        "commonTraps": "Radius of the turn in meters."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Banking Angle (θ)",
        "commonTraps": "The angle the road tilts up from horizontal."
      },
      {
        "id": "g",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Gravity (g)",
        "commonTraps": "9.81 m/s² on Earth."
      }
    ],
    "solvingLogic": [
      "1. Calculate tan(θ).",
      "2. Multiply by r and g.",
      "3. The formula is v² = r × g × tan(θ). Take the square root to find v."
    ],
    "edgeCases": [
      {
        "title": "Flat Road",
        "description": "If θ = 0°, tan(θ) = 0, so ideal speed is 0. Any turning on a flat road strictly requires friction."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the ideal speed for a 100 m radius curve banked at 15°.",
      "solution": [
        "tan(15°) ≈ 0.268.",
        "v² = 100 × 9.81 × 0.268 ≈ 262.8.",
        "v = √262.8 ≈ 16.2 m/s."
      ],
      "answer": "v ≈ 16.2 m/s"
    }
  },

  "moment-of-inertia": {
    "intuition": "Moment of inertia (I) is the rotational equivalent of mass. It measures how difficult it is to change an object's rotational speed. It depends not just on mass, but how far that mass is from the axis.",
    "variableBreakdown": [
      {
        "id": "I",
        "siUnit": "kg·m²",
        "altUnits": "",
        "description": "Moment of Inertia (I)",
        "commonTraps": "Changes if you change the axis of rotation!"
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "g",
        "description": "Mass (m)",
        "commonTraps": "Must be in kilograms."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Radius or Length (r)",
        "commonTraps": "Distance to the axis."
      },
      {
        "id": "k",
        "siUnit": "",
        "altUnits": "",
        "description": "Shape Factor (k)",
        "commonTraps": "A unitless constant (e.g., 1/2 for a solid disk, 2/5 for a solid sphere, 1 for a hoop)."
      }
    ],
    "solvingLogic": [
      "1. Identify the shape to find k.",
      "2. Square the radius r².",
      "3. Multiply k × m × r²."
    ],
    "edgeCases": [
      {
        "title": "Point Mass",
        "description": "For a single tiny particle at distance r, k = 1, so I = mr²."
      }
    ],
    "walkthroughExample": {
      "problem": "Find I for a solid cylinder (k = 0.5) with mass 4 kg and radius 0.5 m.",
      "solution": [
        "I = 0.5 × 4 × (0.5)².",
        "I = 2 × 0.25 = 0.5 kg·m²."
      ],
      "answer": "I = 0.5 kg·m²"
    }
  },

  "terminal-velocity": {
    "intuition": "As an object falls, it speeds up until the drag force pushing up exactly equals the gravitational force pulling down. At this point, net force is zero, and it falls at a constant 'terminal' velocity.",
    "variableBreakdown": [
      {
        "id": "vt",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Terminal Velocity (v_t)",
        "commonTraps": "The maximum speed achievable by the object."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass (m)",
        "commonTraps": "More massive objects have a higher terminal velocity."
      },
      {
        "id": "rho",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Fluid Density (ρ)",
        "commonTraps": "Density of the air or fluid the object is falling through."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Cross-Sectional Area (A)",
        "commonTraps": "The projected area facing the flow. A parachute dramatically increases this."
      },
      {
        "id": "Cd",
        "siUnit": "",
        "altUnits": "",
        "description": "Drag Coefficient (Cd)",
        "commonTraps": "A unitless number based on the object's aerodynamic shape."
      }
    ],
    "solvingLogic": [
      "1. Calculate the weight: 2 × m × g.",
      "2. Calculate the drag denominator: ρ × A × Cd.",
      "3. Divide the weight by the drag denominator.",
      "4. Take the square root of the result."
    ],
    "edgeCases": [
      {
        "title": "Vacuum",
        "description": "In a vacuum, ρ = 0. You'd divide by zero, meaning there is no terminal velocity—the object accelerates forever."
      }
    ],
    "walkthroughExample": {
      "problem": "A 70kg skydiver (A=0.7 m², Cd=1.0) falls through air (ρ=1.2 kg/m³). Find terminal velocity.",
      "solution": [
        "Numerator: 2 × 70 × 9.81 = 1373.4.",
        "Denominator: 1.2 × 0.7 × 1.0 = 0.84.",
        "1373.4 / 0.84 ≈ 1635.",
        "v = √1635 ≈ 40.4 m/s."
      ],
      "answer": "v ≈ 40.4 m/s"
    }
  },

  "drag-force": {
    "intuition": "Drag force is fluid resistance. It increases heavily (squared) as an object moves faster through a fluid. This is why driving a car at 80 mph uses much more fuel than 40 mph.",
    "variableBreakdown": [
      {
        "id": "Fd",
        "siUnit": "N",
        "altUnits": "",
        "description": "Drag Force (Fd)",
        "commonTraps": "Always points opposite to the direction of motion."
      },
      {
        "id": "rho",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Fluid Density (ρ)",
        "commonTraps": "Density of the air or fluid."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity (v)",
        "commonTraps": "Must be squared in the equation!"
      },
      {
        "id": "Cd",
        "siUnit": "",
        "altUnits": "",
        "description": "Drag Coefficient (Cd)",
        "commonTraps": "Unitless number for the aerodynamic shape."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Cross-Sectional Area (A)",
        "commonTraps": "Must be in m²."
      }
    ],
    "solvingLogic": [
      "1. Ensure all values are in standard SI units.",
      "2. Square the velocity: v².",
      "3. Multiply ½ × ρ × v² × Cd × A to find Fd."
    ],
    "edgeCases": [
      {
        "title": "Low Speeds",
        "description": "At very low speeds, drag is often directly proportional to v instead of v² (Stokes' Law)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the drag on a car (Cd=0.3, A=2.5 m²) at 30 m/s in air (ρ=1.2 kg/m³).",
      "solution": [
        "Fd = 0.5 × 1.2 × (30²) × 0.3 × 2.5",
        "Fd = 0.5 × 1.2 × 900 × 0.75",
        "Fd = 405 N."
      ],
      "answer": "Fd = 405 N"
    }
  }
};
