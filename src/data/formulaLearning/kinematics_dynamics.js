anexport const kinematics_dynamics = {
  "kinematics-v": {
    "intuition": "Velocity‑Time equations describe how an object's final velocity depends on its initial velocity, constant acceleration, and elapsed time.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Final Velocity (v) — Speed and direction of the object after time t under constant acceleration.",
        "commonTraps": "Final velocity can be negative if acceleration opposes motion; mixing up initial and final velocities leads to sign errors."
      },
      {
        "id": "v0",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity (v₀) — Speed at the start of the interval.",
        "commonTraps": "Initial velocity must be measured from the same reference direction; using the wrong sign yields incorrect results."
      },
      {
        "id": "a",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Acceleration (a) — Constant acceleration applied during the interval.",
        "commonTraps": "Acceleration must be constant; the equation does not apply to varying acceleration."
      },
      {
        "id": "t",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time (t) — Elapsed time during which acceleration acts.",
        "commonTraps": "Time must be expressed in seconds; mixing minutes or hours without conversion causes errors."
      }
    ],
    "solvingLogic": [
      "Confirm that acceleration is constant throughout the interval.",
      "Convert the time to seconds if it is given in another unit.",
      "Write the equation v = v₀ + a·t.",
      "Substitute the known values for v₀, a, and t.",
      "Solve for the unknown variable (v or t or a as needed).",
      "Check that the resulting velocity has the correct sign and magnitude."
    ],
    "edgeCases": [
      "When t = 0, the equation reduces to v = v₀; no division occurs.",
      "If a = 0, then v = v₀; the object moves with constant velocity.",
      "A negative acceleration reduces the magnitude of v if v₀ is positive, or makes v more negative if v₀ is negative; ensure the direction is physically reasonable.",
      "Very large values of a or t can cause floating‑point overflow; the calculator may flag unrealistic results."
    ],
    "walkthroughExample": {
      "problem": "A cyclist accelerates from an initial speed of 4 m/s at a constant acceleration of 1.2 m/s² for 7 seconds. What is the final speed?",
      "solution": [
        "Identify v₀ = 4 m/s, a = 1.2 m/s², t = 7 s.",
        "Use v = v₀ + a·t = 4 + 1.2·7.",
        "Calculate 1.2·7 = 8.4.",
        "Add to initial speed: 4 + 8.4 = 12.4.",
        "Thus the final speed is 12.4 m/s, which is positive and physically reasonable."
      ],
      "answer": "v = 12.4 m/s"
    }
  },

  "kinematics-x": {
    "intuition": "Position‑Time equations give the displacement of an object as a function of its initial position, initial velocity, constant acceleration, and elapsed time.",
    "variableBreakdown": [
      {
        "id": "x",
        "siUnit": "m",
        "altUnits": "",
        "description": "Final Position (x) — Location of the object after time t.",
        "commonTraps": "Final position must be measured from the same reference frame as initial position; sign errors can invert direction."
      },
      {
        "id": "x0",
        "siUnit": "m",
        "altUnits": "",
        "description": "Initial Position (x₀) — Starting location of the object.",
        "commonTraps": "Using inconsistent units for position (e.g., meters vs centimeters) leads to large errors."
      },
      {
        "id": "v0",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity (v₀) — Speed at the start of the motion.",
        "commonTraps": "Direction of initial velocity must be consistent with the chosen positive axis."
      },
      {
        "id": "a",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Acceleration (a) — Constant acceleration during the interval.",
        "commonTraps": "Acceleration must be constant; the formula is invalid for non‑linear motion."
      },
      {
        "id": "t",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time (t) — Elapsed time since the start.",
        "commonTraps": "Time must be in seconds; mixing units without conversion yields incorrect displacement."
      }
    ],
    "solvingLogic": [
      "Verify that acceleration is constant.",
      "Ensure all positions are expressed in meters (or consistent unit).",
      "Convert time to seconds.",
      "Insert known values into x = x₀ + v₀·t + 0.5·a·t².",
      "Perform the arithmetic, keeping track of each term.",
      "Check that the resulting position is reasonable (e.g., not negative if motion is only in positive direction)."
    ],
    "edgeCases": [
      "If a = 0, the equation reduces to uniform motion: x = x₀ + v₀·t; no special issues.",
      "If t = 0, then x = x₀; the object is at its starting point.",
      "When both v₀ and a are zero, the object does not move; any non‑zero displacement indicates an error.",
      "Very large values of a or t can cause overflow; ensure results stay within realistic bounds."
    ],
    "walkthroughExample": {
      "problem": "A ball is thrown upward from a platform 3 m above the ground with an initial speed of 15 m/s. Assuming upward is positive and g = 9.81 m/s² downward, what is its position after 2 seconds?",
      "solution": [
        "Take x₀ = 3 m, v₀ = 15 m/s, a = –9.81 m/s² (negative because gravity acts downward), t = 2 s.",
        "Compute each term: v₀·t = 15·2 = 30; 0.5·a·t² = 0.5·(–9.81)·(2)² = 0.5·(–9.81)·4 = –19.62.",
        "Add the terms: x = 3 + 30 – 19.62 = 13.38 m.",
        "Thus the ball is at 13.38 m above the reference origin after 2 seconds."
      ],
      "answer": "x ≈ 13.38 m"
    }
  },

  "kinematics-v2": {
    "intuition": "Velocity‑Position equations relate an object's speed to its initial speed, constant acceleration, and displacement.",
    "variableBreakdown": [
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Final Velocity (v) — Speed after traveling displacement dx.",
        "commonTraps": "Final velocity can be positive or negative depending on direction; mixing up signs yields incorrect results."
      },
      {
        "id": "v0",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity (v₀) — Speed at the start of the motion.",
        "commonTraps": "Initial velocity must be measured from the same reference direction as final velocity."
      },
      {
        "id": "a",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Acceleration (a) — Constant acceleration applied over the displacement.",
        "commonTraps": "Acceleration must be constant; the equation does not hold for varying acceleration."
      },
      {
        "id": "dx",
        "siUnit": "m",
        "altUnits": "",
        "description": "Displacement (dx) — Straight‑line distance traveled in the direction of motion.",
        "commonTraps": "Displacement must be measured in meters; using distance instead of displacement (ignoring direction) can cause sign errors."
      }
    ],
    "solvingLogic": [
      "Confirm that acceleration is constant over the interval.",
      "Ensure displacement is expressed in meters and corresponds to the direction of motion.",
      "Write the equation v² = v₀² + 2·a·dx.",
      "Substitute the known values for v₀, a, and dx.",
      "Solve for the unknown variable (v, v₀, a, or dx) using algebraic manipulation.",
      "Take the square root only after confirming the right‑hand side is non‑negative; otherwise the scenario is physically impossible."
    ],
    "edgeCases": [
      "If dx = 0, the equation reduces to v = ±v₀; the sign depends on direction.",
      "When solving for v, the quantity under the square root must be ≥ 0; otherwise the given inputs are inconsistent.",
      "A negative acceleration with a positive displacement can still yield a real v if v₀ is large enough; verify the result makes sense physically.",
      "Very large values may cause overflow; the calculator may flag unrealistic results."
    ],
    "walkthroughExample": {
      "problem": "A skier starts from rest and slides down a 100‑m slope with a constant acceleration of 0.8 m/s². What is the speed at the bottom?",
      "solution": [
        "Initial velocity v₀ = 0 m/s, acceleration a = 0.8 m/s², displacement dx = 100 m.",
        "Apply v² = 0² + 2·0.8·100 = 160.",
        "Take the square root: v = √160 ≈ 12.65 m/s.",
        "Thus the skier reaches a speed of about 12.65 m/s at the bottom."
      ],
      "answer": "v ≈ 12.65 m/s"
    }
  },

  "weight": {
    "intuition": "Weight is the gravitational force acting on a mass, calculated as the product of mass and the acceleration due to gravity.",
    "variableBreakdown": [
      {
        "id": "W",
        "siUnit": "N",
        "altUnits": "",
        "description": "Weight (W) — Gravitational force on the object.",
        "commonTraps": "Weight is a force; mixing it up with mass leads to unit errors (N vs kg)."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass (m) — Quantity of matter in the object.",
        "commonTraps": "Mass must be expressed in kilograms for standard gravity; using grams without conversion yields incorrect force."
      },
      {
        "id": "g",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Gravity (g) — Standard acceleration due to gravity (≈9.81 m/s² near Earth's surface).",
        "commonTraps": "Local variations in g (e.g., altitude, latitude) can change weight slightly; using 9.81 is an approximation."
      }
    ],
    "solvingLogic": [
      "Identify which two of the three variables (W, m, g) are known.",
      "If solving for W, multiply m by g.",
      "If solving for m, divide W by g.",
      "If solving for g, divide W by m.",
      "Ensure that mass is in kilograms and force is in newtons.",
      "Check that the resulting weight is positive and physically reasonable."
    ],
    "edgeCases": [
      "If mass is zero, weight is zero; no division by zero occurs.",
      "If g = 0 (e.g., in microgravity), weight is zero regardless of mass.",
      "Using a value of g that is not appropriate for the location (e.g., 9.81 on the Moon) yields an inaccurate weight; always specify the gravitational acceleration used."
    ],
    "walkthroughExample": {
      "problem": "Calculate the weight of a 25‑kg object on Earth.",
      "solution": [
        "Use g = 9.81 m/s².",
        "Weight W = m·g = 25·9.81 = 245.25 N.",
        "Thus the object exerts a force of about 245 N due to gravity."
      ],
      "answer": "W ≈ 245 N"
    }
  },

  "friction": {
    "intuition": "Friction forces resist relative motion; static friction prevents motion from starting and kinetic friction opposes motion once it is underway.",
    "variableBreakdown": [
      {
        "id": "mu_s",
        "siUnit": "",
        "altUnits": "",
        "description": "Static Friction Coefficient (μₛ) — Ratio that characterizes the grip before sliding begins.",
        "commonTraps": "μₛ must be between 0 and 1 for most material pairs; values outside this range indicate measurement errors."
      },
      {
        "id": "mu_k",
        "siUnit": "",
        "altUnits": "",
        "description": "Kinetic Friction Coefficient (μₖ) — Ratio that characterizes sliding friction.",
        "commonTraps": "μₖ is usually slightly lower than μₛ; using the wrong coefficient leads to under‑ or over‑estimated friction forces."
      },
      {
        "id": "N",
        "siUnit": "N",
        "altUnits": "",
        "description": "Normal Force (N) — Perpendicular force pressing the two surfaces together.",
        "commonTraps": "Normal force equals the weight only on a horizontal surface; on an incline it is reduced by the cosine of the angle."
      }
    ],
    "solvingLogic": [
      "Determine whether the object is at rest or sliding.",
      "If at rest, use static friction: fₛ = μₛ·N.",
      "If sliding, use kinetic friction: fₖ = μₖ·N.",
      "Calculate the normal force N (e.g., N = m·g on a horizontal surface).",
      "Multiply the appropriate coefficient by N to obtain the friction force.",
      "The direction of friction opposes the direction of motion."
    ],
    "edgeCases": [
      "If N = 0 (e.g., objects in free fall or on a frictionless surface), the friction force is zero regardless of μ.",
      "When μₛ or μₖ is zero, friction is zero; this can happen with lubricated or perfectly smooth surfaces.",
      "Values of μ outside the typical 0–1 range may indicate a need for careful unit checking or that the coefficient is dimensionless but context‑specific.",
      "Static and kinetic coefficients are often close; using the wrong one can lead to small but significant errors in force calculations."
    ],
    "walkthroughExample": {
      "problem": "A 40‑kg block rests on a horizontal floor. The coefficient of static friction is μₛ = 0.6. What is the maximum static friction force?",
      "solution": [
        "Normal force N = m·g = 40·9.81 = 392.4 N.",
        "Maximum static friction fₛ(max) = μₛ·N = 0.6·392.4 ≈ 235.44 N.",
        "Thus the block can withstand up to about 235 N of horizontal force before sliding."
      ],
      "answer": "fₛ(max) ≈ 235 N"
    }
  },

  "hookes-law": {
    "intuition": "Hooke's law describes the restoring force of an ideal spring as proportional to its displacement from equilibrium.",
    "variableBreakdown": [
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Spring Force (F) — Restoring force exerted by the spring.",
        "commonTraps": "Force direction is opposite to displacement; sign matters when indicating direction."
      },
      {
        "id": "k",
        "siUnit": "N/m",
        "altUnits": "",
        "description": "Spring Constant (k) — Measure of the spring's stiffness.",
        "commonTraps": "Spring constant must be positive; using a negative value incorrectly changes the sign of force."
      },
      {
        "id": "x",
        "siUnit": "m",
        "altUnits": "",
        "description": "Displacement (x) — Distance the spring is stretched or compressed from its relaxed length.",
        "commonTraps": "Displacement must be measured from the equilibrium position; using total length instead of extension/compression leads to errors."
      }
    ],
    "solvingLogic": [
      "Identify whether the spring is stretched (positive x) or compressed (negative x).",
      "Write the equation F = –k·x (sign indicates direction).",
      "Substitute the known values for k and x.",
      "Compute the magnitude of the force; the sign will indicate direction (toward equilibrium).",
      "If only magnitude is required, use |F| = k·|x|."
    ],
    "edgeCases": [
      "If k = 0, the spring is slack and cannot exert any force; force will be zero.",
      "If x = 0, the spring is at equilibrium and the force is zero.",
      "Very large displacements may cause the linear approximation to break down; the calculator may flag unrealistic values.",
      "Ensure that units are consistent (k in N/m, x in meters) to obtain force in newtons."
    ],
    "walkthroughExample": {
      "problem": "A spring with a spring constant of 200 N/m is compressed by 0.025 m. What is the magnitude of the restoring force?",
      "solution": [
        "k = 200 N/m, x = –0.025 m (compression).",
        "Force magnitude = k·|x| = 200·0.025 = 5 N.",
        "The force acts to push the spring back toward equilibrium."
      ],
      "answer": "F = 5 N (directed toward equilibrium)"
    }
  },

  "center-of-mass": {
    "intuition": "The center of mass of two particles divides the line segment joining them in inverse proportion to their masses, given by (m₁x₁ + m₂x₂)/(m₁ + m₂).",
    "variableBreakdown": [
      {
        "id": "xcm",
        "siUnit": "m",
        "altUnits": "",
        "description": "Center of Mass (x_cm) — Position of the balance point for the two‑particle system.",
        "commonTraps": "The denominator is the total mass; using zero total mass causes division by zero."
      },
      {
        "id": "m1",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 1 (m₁) — Mass of the first particle.",
        "commonTraps": "Mass must be positive; using zero or negative mass invalidates the formula."
      },
      {
        "id": "x1",
        "siUnit": "m",
        "altUnits": "",
        "description": "Position 1 (x₁) — Coordinate of the first particle along the chosen axis.",
        "commonTraps": "Position must be measured from the same origin for both particles; mixing coordinate systems leads to errors."
      },
      {
        "id": "m2",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 2 (m₂) — Mass of the second particle.",
        "commonTraps": "Mass must be positive; zero or negative mass is invalid."
      },
      {
        "id": "x2",
        "siUnit": "m",
        "altUnits": "",
        "description": "Position 2 (x₂) — Coordinate of the second particle.",
        "commonTraps": "Same origin requirement as x₁; sign errors can shift the center of mass incorrectly."
      }
    ],
    "solvingLogic": [
      "Confirm that both masses are positive and non‑zero.",
      "Measure the positions x₁ and x₂ from the same reference point.",
      "Plug the values into x_cm = (m₁·x₁ + m₂·x₂) / (m₁ + m₂).",
      "Perform the arithmetic, keeping track of units (typically meters).",
      "The resulting x_cm is the coordinate of the center of mass; it will lie between x₁ and x₂ if both masses are positive."
    ],
    "edgeCases": [
      "If m₁ + m₂ = 0 (both masses zero), the expression is undefined; at least one mass must be non‑zero.",
      "If one mass is much larger than the other, the center of mass will be close to the larger mass's position.",
      "If the positions are on opposite sides of the origin, the center of mass may lie outside the interval between them; verify the sign of each coordinate."
    ],
    "walkthroughExample": {
      "problem": "Two particles have masses 3 kg at x = 2 m and 7 kg at x = 12 m. Find the center of mass.",
      "solution": [
        "Compute numerator: (3 kg·2 m) + (7 kg·12 m) = 6 + 84 = 90 kg·m.",
        "Compute denominator: 3 kg + 7 kg = 10 kg.",
        "Divide: x_cm = 90 / 10 = 9 m.",
        "Thus the center of mass is located at x = 9 m."
      ],
      "answer": "x_cm = 9 m"
    }
  }
};
