export const work_energy_power = {
  "work-done": {
    intuition: "Work Done by Force describes the energy transferred when a force moves an object through a distance. It combines force magnitude, displacement, and the angle between them to quantify work.",
    variableBreakdown: [
      {
        id: "W",
        siUnit: "J",
        altUnits: "",
        description: "Work, the energy transferred to or from an object, measured in joules (J).",
        commonTraps: "Work is a scalar; a negative result indicates energy removed from the object."
      },
      {
        id: "F",
        siUnit: "N",
        altUnits: "",
        description: "Force applied to the object, measured in newtons (N).",
        commonTraps: "Direction matters; ensure the force component along displacement is used."
      },
      {
        id: "d",
        siUnit: "m",
        altUnits: "",
        description: "Displacement of the object, measured in meters (m).",
        commonTraps: "Use the component of displacement along the force direction."
      },
      {
        id: "theta",
        siUnit: "°",
        altUnits: "",
        description: "Angle between the force vector and displacement vector.",
        commonTraps: "Convert degrees to radians for trigonometric functions; misuse leads to incorrect cosine value."
      }
    ],
    solvingLogic: [
      "1. Identify which variable you need to solve for (W, F, d, or θ).",
      "2. Write the work formula: W = F·d·cos(θ).",
      "3. Ensure θ is in degrees; convert to radians if your calculation requires it.",
      "4. Rearrange the equation algebraically to isolate the target variable.",
      "5. Substitute the known values, keeping track of signs.",
      "6. Perform the arithmetic and verify the result’s magnitude and sign."
    ],
    edgeCases: [
      {
        title: "Zero Displacement",
        description: "If displacement d = 0, work done is zero regardless of force or angle."
      },
      {
        title: "Perpendicular Force",
        description: "If θ = 90°, cos(θ) = 0, so work done is zero (force does no work)."
      },
      {
        title: "Negative Work",
        description: "A negative work result means the force opposes motion, removing energy from the object."
      }
    ],
    walkthroughExample: {
      problem: "A force of 10 N acts at a 30° angle to move an object 5 m. Calculate the work done.",
      solution: [
        "Identify known values: F = 10 N, d = 5 m, θ = 30°.",
        "Convert angle to radians if needed (θ = 30°).",
        "Use the formula: W = F·d·cos(θ) = 10·5·cos(30°).",
        "Compute cos(30°) ≈ 0.866, so W ≈ 10·5·0.866 = 43.3 J.",
        "The work done is positive, indicating energy transferred to the object."
      ],
      "answer": "W ≈ 43.3 J"
    }
  },

  "kinetic-energy": {
    intuition: "Kinetic Energy quantifies the energy of a moving object, proportional to its mass and the square of its velocity.",
    variableBreakdown: [
      {
        id: "KE",
        siUnit: "J",
        altUnits: "",
        description: "Kinetic Energy, the energy of motion, measured in joules (J).",
        commonTraps: "Ensure velocity is linear speed; rotational speed requires conversion."
      },
      {
        id: "m",
        siUnit: "kg",
        altUnits: "",
        description: "Mass of the object, measured in kilograms (kg).",
        commonTraps: "Mass must be in kilograms for SI consistency."
      },
      {
        id: "v",
        siUnit: "m/s",
        altUnits: "",
        description: "Velocity of the object, measured in meters per second (m/s).",
        commonTraps: "Velocity is a vector; use speed for magnitude calculations."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (KE, m, or v).",
      "2. Write the kinetic energy formula: KE = ½·m·v².",
      "3. Ensure mass is in kilograms and velocity in meters per second.",
      "4. Rearrange the equation to solve for the desired variable.",
      "5. Substitute the known values, handling squares and roots carefully.",
      "6. Compute the result and verify units are joules (or appropriate)."
    ],
    edgeCases: [
      {
        title: "Zero Mass",
        description: "If mass m = 0, kinetic energy is zero regardless of velocity."
      },
      {
        title: "Zero Velocity",
        description: "If velocity v = 0, kinetic energy is zero regardless of mass."
      },
      {
        title: "Very High Velocity",
        description: "Because KE scales with v², small increases in speed produce large increases in energy."
      }
    ],
    walkthroughExample: {
      problem: "Calculate the kinetic energy of a 2 kg object moving at 3 m/s.",
      solution: [
        "Use KE = ½·m·v² = 0.5·2·3².",
        "Compute 3² = 9, then 0.5·2·9 = 9 J.",
        "The kinetic energy is 9 J."
      ],
      "answer": "KE = 9 J"
    }
  },

  "gpe-local": {
    intuition: "Gravitational Potential Energy represents the energy stored in an object due to its height in a gravitational field.",
    variableBreakdown: [
      {
        id: "PE",
        siUnit: "J",
        altUnits: "",
        description: "Potential Energy, the energy due to position, measured in joules (J).",
        commonTraps: "Potential energy is always relative to a chosen reference level."
      },
      {
        id: "m",
        siUnit: "kg",
        altUnits: "",
        description: "Mass of the object, measured in kilograms (kg).",
        commonTraps: "Mass must be in kilograms for SI calculations."
      },
      {
        id: "g",
        siUnit: "m/s²",
        altUnits: "",
        description: "Acceleration due to gravity, typically 9.81 m/s² near Earth's surface.",
        commonTraps: "Use the local value of g for higher precision; do not confuse with other g constants."
      },
      {
        id: "h",
        siUnit: "m",
        altUnits: "",
        description: "Height above the reference point, measured in meters (m).",
        commonTraps: "Height must be measured vertically from the reference level."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (PE, m, g, or h).",
      "2. Write the gravitational potential energy formula: PE = m·g·h.",
      "3. Ensure all quantities are in SI units (kg, m/s², m).",
      "4. Rearrange the formula to isolate the target variable.",
      "5. Substitute the known values, respecting sign conventions (height is non‑negative).",
      "6. Perform the calculation and verify the result's magnitude."
    ],
    edgeCases: [
      {
        title: "Zero Height",
        description: "If height h = 0, potential energy is zero."
      },
      {
        title: "Negative Height",
        description: "Negative height is non‑physical in the standard formulation; it would imply a reference below the chosen zero level."
      },
      {
        title: "Very Large Mass or Height",
        description: "Large values can lead to very large energy amounts, requiring careful handling of units."
      }
    ],
    walkthroughExample: {
      problem: "A 5 kg object is lifted 2 m above the ground. Calculate its gravitational potential energy (g = 9.81 m/s²).",
      solution: [
        "Use PE = m·g·h = 5·9.81·2.",
        "Compute 9.81·2 = 19.62, then 5·19.62 = 98.1 J.",
        "The gravitational potential energy is 98.1 J."
      ],
      "answer": "PE = 98.1 J"
    }
  },

  "elastic-pe": {
    intuition: "Elastic Potential Energy is stored in an elastic object (like a spring) when it is stretched or compressed.",
    variableBreakdown: [
      {
        id: "PE",
        siUnit: "J",
        altUnits: "",
        description: "Elastic Potential Energy, energy stored in a deformed spring, measured in joules (J).",
        commonTraps: "The sign of displacement does not affect energy; only magnitude matters."
      },
      {
        id: "k",
        siUnit: "N/m",
        altUnits: "",
        description: "Spring Constant, a measure of stiffness, measured in newtons per meter (N/m).",
        commonTraps: "Spring constant must be positive; a negative value is non‑physical."
      },
      {
        id: "x",
        siUnit: "m",
        altUnits: "",
        description: "Displacement from the equilibrium position, measured in meters (m).",
        commonTraps: "Displacement can be positive (stretch) or negative (compression); energy uses x²."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (PE, k, or x).",
      "2. Write the elastic potential energy formula: PE = ½·k·x².",
      "3. Ensure spring constant k is in newtons per meter and displacement x in meters.",
      "4. Rearrange the equation to solve for the desired variable.",
      "5. Substitute the known values, squaring the displacement term.",
      "6. Compute the result and verify units are joules."
    ],
    edgeCases: [
      {
        title: "Zero Spring Constant",
        description: "If k = 0, the spring is not elastic; the formula yields zero energy regardless of displacement."
      },
      {
        title: "Zero Displacement",
        description: "If x = 0, no deformation occurs, so stored energy is zero."
      },
      {
        title: "Large Displacement",
        description: "Energy grows quadratically with displacement; very large x can lead to impractically large energy values."
      }
    ],
    walkthroughExample: {
      problem: "A spring with k = 150 N/m is compressed by 0.04 m. Calculate the elastic potential energy stored.",
      solution: [
        "Use PE = ½·k·x² = 0.5·150·(0.04)².",
        "Compute (0.04)² = 0.0016, then 0.5·150·0.0016 = 75·0.0016 = 0.12 J.",
        "The stored elastic potential energy is 0.12 J."
      ],
      "answer": "PE = 0.12 J"
    }
  },

  "power-mechanical": {
    intuition: "Mechanical Power is the rate at which work is done or energy is transferred by a moving system.",
    variableBreakdown: [
      {
        id: "P",
        siUnit: "W",
        altUnits: "",
        description: "Power, the rate of energy transfer, measured in watts (W).",
        commonTraps: "Power is a scalar; ensure consistent time units when converting."
      },
      {
        id: "W",
        siUnit: "J",
        altUnits: "",
        description: "Work, the energy transferred, measured in joules (J).",
        commonTraps: "Work and energy are scalars; sign indicates direction of transfer."
      },
      {
        id: "t",
        siUnit: "s",
        altUnits: "",
        description: "Time over which the work is done, measured in seconds (s).",
        commonTraps: "Convert minutes or hours to seconds before calculation."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (P, W, or t).",
      "2. Choose the appropriate power formula: P = W/t or P = F·v (if force and velocity are known).",
      "3. Ensure work is in joules and time is in seconds.",
      "4. Rearrange the equation to isolate the target variable.",
      "4. Substitute the known values, maintaining unit consistency.",
      "5. Perform the calculation and verify the power rating is reasonable."
    ],
    edgeCases: [
      {
        title: "Zero Time",
        description: "If t = 0, power is undefined (infinite) because energy cannot be transferred instantaneously."
      },
      {
        title: "Zero Work",
        description: "If W = 0, power is zero regardless of time."
      },
      {
        title: "Negative Work",
        description: "Negative work indicates energy is being removed, which can yield negative power values in some contexts."
      }
    ],
    walkthroughExample: {
      problem: "A force moves an object, doing 120 J of work in 10 s. Calculate the average mechanical power.",
      solution: [
        "Use P = W/t = 120 J / 10 s.",
        "Compute 120/10 = 12.",
        "The average power is 12 W."
      ],
      "answer": "P = 12 W"
    }
  },

  "rotational-kinematics": {
    intuition: "Rotational Kinematics describes the relationships between angular displacement, angular velocity, angular acceleration, and time for rotating bodies.",
    variableBreakdown: [
      {
        id: "omega",
        siUnit: "rad/s",
        altUnits: "",
        description: "Final Angular Velocity, measured in radians per second (rad/s).",
        commonTraps: "Angular velocity is a vector; sign indicates direction of rotation."
      },
      {
        id: "omega0",
        siUnit: "rad/s",
        altUnits: "",
        description: "Initial Angular Velocity, measured in radians per second (rad/s).",
        commonTraps: "Initial angular velocity can be zero for a body starting from rest."
      },
      {
        id: "alpha",
        siUnit: "rad/s²",
        altUnits: "",
        description: "Angular Acceleration, measured in radians per second squared (rad/s²).",
        commonTraps: "Angular acceleration sign indicates speeding up or slowing down rotation."
      },
      {
        id: "t",
        siUnit: "s",
        altUnits: "",
        description: "Time, measured in seconds (s).",
        commonTraps: "Ensure time is measured from the start of acceleration."
      }
    ],
    solvingLogic: [
      "1. Identify which variable you need to find (ω, ω₀, α, or t).",
      "2. Write the basic kinematic equation: ω = ω₀ + αt.",
      "3. Ensure all angles are in radians; if given in degrees, convert.",
      "4. Rearrange the equation algebraically to solve for the target variable.",
      "5. Substitute known values, keeping track of signs.",
      "6. Perform the arithmetic and verify the result's magnitude and direction."
    ],
    edgeCases: [
      {
        title: "Zero Acceleration",
        description: "If α = 0, angular velocity remains constant (ω = ω₀)."
      },
      {
        title: "Zero Initial Velocity",
        description: "If ω₀ = 0, the object starts from rest; ω = αt."
      },
      {
        title: "Negative Acceleration",
        description: "Negative α indicates deceleration; it reduces ω if ω₀ is positive."
      }
    ],
    walkthroughExample: {
      problem: "A wheel starts from rest and accelerates uniformly at 2 rad/s² for 5 s. What is its final angular velocity?",
      solution: [
        "Initial angular velocity ω₀ = 0, α = 2 rad/s², t = 5 s.",
        "Use ω = ω₀ + αt = 0 + 2·5.",
        "Compute 2·5 = 10.",
        "The final angular velocity is 10 rad/s."
      ],
      "answer": "ω = 10 rad/s"
    }
  },

  "rotational-ke": {
    intuition: "Rotational Kinetic Energy is the kinetic energy associated with the rotation of an object about an axis.",
    variableBreakdown: [
      {
        id: "KE",
        siUnit: "J",
        altUnits: "",
        description: "Rotational Kinetic Energy, energy of a rotating object, measured in joules (J).",
        commonTraps: "Moment of inertia must be about the axis of rotation; using the wrong axis yields incorrect energy."
      },
      {
        id: "I",
        siUnit: "kg·m²",
        altUnits: "",
        description: "Moment of Inertia, a measure of rotational mass distribution, measured in kilogram‑meter squared (kg·m²).",
        commonTraps: "Moment of inertia depends on the axis; do not reuse values from unrelated problems."
      },
      {
        id: "omega",
        siUnit: "rad/s",
        altUnits: "",
        description: "Angular Velocity, measured in radians per second (rad/s).",
        commonTraps: "Angular velocity must be in radians per second; converting from RPM requires multiplication by 2π/60."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (KE, I, or ω).",
      "2. Write the rotational kinetic energy formula: KE = ½·I·ω².",
      "3. Ensure moment of inertia I is in kilogram‑meter squared and angular velocity ω in radians per second.",
      "4. Rearrange the equation to solve for the desired variable.",
      "5. Substitute the known values, squaring the angular velocity term.",
      "6. Compute the result and verify units are joules."
    ],
    edgeCases: [
      {
        title: "Zero Moment of Inertia",
        description: "If I = 0, the object has no rotational inertia; rotational kinetic energy is zero regardless of ω."
      },
      {
        title: "Zero Angular Velocity",
        description: "If ω = 0, rotational kinetic energy is zero regardless of I."
      },
      {
        title: "Very High Angular Velocity",
        description: "Because KE scales with ω², small increases in speed cause large increases in energy."
      }
    ],
    walkthroughExample: {
      problem: "A solid disk of mass 10 kg and radius 0.5 m rotates at 30 rad/s. Calculate its rotational kinetic energy. (Moment of inertia for a solid disk: I = ½·m·r².)",
      solution: [
        "Compute I = 0.5·10·(0.5)² = 0.5·10·0.25 = 1.25 kg·m².",
        "Use KE = 0.5·I·ω² = 0.5·1.25·30².",
        "Compute 30² = 900, then 0.5·1.25·900 = 0.625·900 = 562.5 J.",
        "The rotational kinetic energy is 562.5 J."
      ],
      "answer": "KE = 562.5 J"
    }
  },

  "mass-spring-period": {
    intuition: "The period of a mass‑spring system undergoing simple harmonic motion depends on the mass and the spring constant.",
    variableBreakdown: [
      {
        id: "T",
        siUnit: "s",
        altUnits: "",
        description: "Period, the time for one complete oscillation, measured in seconds (s).",
        commonTraps: "Period is always positive; ensure you are calculating the fundamental period, not multiples."
      },
      {
        id: "m",
        siUnit: "kg",
        altUnits: "",
        description: "Mass attached to the spring, measured in kilograms (kg).",
        commonTraps: "Mass must be in kilograms for SI consistency."
      },
      {
        id: "k",
        siUnit: "N/m",
        altUnits: "",
        description: "Spring Constant, a measure of stiffness, measured in newtons per meter (N/m).",
        commonTraps: "Spring constant must be positive; a negative value is non‑physical."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (T, m, or k).",
      "2. Write the period formula: T = 2π·√(m/k).",
      "3. Ensure mass m is in kilograms and spring constant k is in newtons per meter.",
      "4. Compute the ratio m/k, then take the square root.",
      "5. Multiply the result by 2π to obtain the period.",
      "6. Verify that the period is positive and has the correct magnitude."
    ],
    edgeCases: [
      {
        title: "Zero Spring Constant",
        description: "If k = 0, the formula is undefined; the system does not have a restoring force."
      },
      {
        title: "Zero Mass",
        description: "If m = 0, the period is zero, indicating no inertia to oscillate."
      },
      {
        title: "Very Stiff Spring (large k)",
        description: "A larger k reduces the period, leading to faster oscillations."
      }
    ],
    walkthroughExample: {
      problem: "A 0.2 kg mass is attached to a spring with k = 50 N/m. Calculate the period of oscillation.",
      solution: [
        "Compute m/k = 0.2/50 = 0.004.",
        "Take the square root: √0.004 ≈ 0.0632.",
        "Multiply by 2π: T = 2·π·0.0632 ≈ 0.397 s.",
        "The period of oscillation is approximately 0.40 s."
      ],
      "answer": "T ≈ 0.40 s"
    }
  }
};
