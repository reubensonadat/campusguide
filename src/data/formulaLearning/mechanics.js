export const mechanics = {
  "projectile-motion": {
    "intuition": "Projectile Motion models the trajectory of an object launched into the air, relating horizontal range, maximum height, flight time, initial speed, and launch angle. It enables solving for any unknown kinematic quantity when at least three of the five standard variables are known.",
    "variableBreakdown": [
      {
        "id": "R",
        "siUnit": "m",
        "altUnits": "",
        "description": "Range (R) — Horizontal distance traveled by the projectile.",
        "commonTraps": "Range depends on sin(2θ); using the wrong angle unit or mis‑applying the formula can give zero or infinite range; neglecting air resistance yields idealized results."
      },
      {
        "id": "H",
        "siUnit": "m",
        "altUnits": "",
        "description": "Max Height (H) — Greatest vertical position reached.",
        "commonTraps": "Height calculation involves sin²(θ); mixing up sinθ and sin²θ or using the wrong sign for velocity leads to incorrect maxima; unit errors in gravity."
      },
      {
        "id": "T",
        "siUnit": "s",
        "altUnits": "",
        "description": "Flight Time (T) — Total time the projectile stays airborne.",
        "commonTraps": "Flight time is derived from the vertical component; using the wrong sign for initial vertical velocity or ignoring the effect of angle can produce negative or unrealistic times."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity (v₀) — Speed at launch.",
        "commonTraps": "Velocity is a vector; sign conventions matter for direction; mixing speed with velocity can cause errors in solving for angle or time."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "",
        "description": "Launch Angle (θ) — Angle above the horizontal.",
        "commonTraps": "Trigonometric functions require radians; confusing θ with its supplement (180°−θ) yields the same range but different height; angle must be between 0° and 90° for typical projectile scenarios."
      }
    ],
    "solvingLogic": [
      "Identify which three of the five variables (R, H, T, v, θ) are known.",
      "Convert the launch angle from degrees to radians if necessary.",
      "Compute sinθ and sin(2θ) using the radian value.",
      "Select the appropriate equation(s) that relate the known variables to the unknown(s).",
      "Substitute the known values and perform algebraic manipulation to isolate the desired variable.",
      "Calculate the result, ensuring the numerical value is physically reasonable (e.g., non‑negative range, positive time).",
      "Verify units and significant figures."
    ],
    "edgeCases": [
      {
        "title": "Degenerate Launch Angle",
        "description": "At θ = 0° or 90°, sin(2θ) = 0 causing division by zero in the range formula; no horizontal range for a vertical launch."
      },
      {
        "title": "Unit Inconsistency",
        "description": "Mixing units (e.g., cm with m, or using g in different units) leads to orders‑of‑magnitude errors."
      },
      {
        "title": "Insufficient Data",
        "description": "Providing fewer than three independent variables makes the system under‑determined."
      },
      {
        "title": "Negative Initial Velocity",
        "description": "A negative speed is non‑physical; the calculator returns an error."
      },
      {
        "title": "Unreachable Range",
        "description": "When sin(2θ) > 1 due to rounding errors, the range formula yields no real solution."
      }
    ],
    "walkthroughExample": {
      "problem": "A projectile is launched with an initial speed of 25 m/s at an angle of 30°. Calculate its range, maximum height, and flight time.",
      "solution": [
        "Convert 30° to radians: θ = π/6 ≈ 0.5236 rad.",
        "Compute sinθ ≈ 0.5 and sin(2θ) = sin(π/3) ≈ 0.8660.",
        "Range R = v²·sin(2θ)/g = 25²·0.8660/9.81 ≈ 55.5 m.",
        "Maximum height H = v²·sin²θ/(2g) = 25²·0.5²/(2·9.81) ≈ 15.9 m.",
        "Flight time T = 2v·sinθ/g = 2·25·0.5/9.81 ≈ 2.55 s.",
        "Check that all results are positive and physically reasonable."
      ],
      "answer": "Range ≈ 55.5 m, Maximum height ≈ 15.9 m, Flight time ≈ 2.55 s."
    }
  },

  "relativistic-energy": {
    "intuition": "Relativistic Energy‑Momentum connects an object’s total energy, momentum, rest mass, and velocity in special relativity. It allows solving for any of these quantities when at least two of the four (E, p, m₀, v) are known.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "J",
        "altUnits": "",
        "description": "Total Energy (E) — Energy of the particle, including rest mass energy.",
        "commonTraps": "Energy must be positive; mixing up total energy with kinetic energy leads to sign errors; using incorrect units for momentum."
      },
      {
        "id": "p",
        "siUnit": "kg·m/s",
        "altUnits": "",
        "description": "Momentum (p) — Relativistic momentum, p = γmv.",
        "commonTraps": "Momentum direction matters; using non‑relativistic momentum formula yields wrong results at high speeds."
      },
      {
        "id": "m0",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Rest Mass (m₀) — Invariant mass of the particle.",
        "commonTraps": "Rest mass is constant; confusing it with relativistic mass can cause errors."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity (v) — Speed of the particle.",
        "commonTraps": "Velocity must be less than the speed of light; using v ≥ c triggers an error."
      }
    ],
    "solvingLogic": [
      "Identify which two of the four variables (E, p, m₀, v) are provided.",
      "Verify that the provided velocity is less than the speed of light (v < c).",
      "Compute the Lorentz factor γ = 1/√(1−v²/c²).",
      "Use the appropriate relation (e.g., E = γm₀c², p = γm₀v) to solve for the unknown.",
      "Substitute constants (c = 2.998×10⁸ m/s) and given values, ensuring consistent SI units.",
      "Perform arithmetic and present the result with proper units and scientific notation."
    ],
    "edgeCases": [
      {
        "title": "Division by Zero in γ",
        "description": "When v approaches c, the denominator → 0 causing γ → ∞; the calculator flags v ≥ c."
      },
      {
        "title": "Energy Less Than Rest Energy",
        "description": "If E < m₀c², the solution would require imaginary momentum; the calculator returns an error."
      },
      {
        "title": "Momentum Squared Negative",
        "description": "When solving for momentum from E and m₀, the expression p² = (E/c)² − (m₀c)² can become negative, indicating inconsistency."
      },
      {
        "title": "Velocity Sign",
        "description": "Velocity is treated as non‑negative; negative inputs are rejected."
      }
    ],
    "walkthroughExample": {
      "problem": "A particle with rest mass 1 kg moves at 0.8c. Compute its total energy and momentum.",
      "solution": [
        "Calculate γ = 1/√(1−0.8²) = 1/√(1−0.64) = 1/0.6 ≈ 1.6667.",
        "Total Energy E = γm₀c² = 1.6667·1·(2.998×10⁸)² ≈ 1.50×10¹⁷ J.",
        "Momentum p = γm₀v = 1.6667·1·0.8c ≈ 1.3333·c ≈ 3.998×10⁸ kg·m/s.",
        "Report results in scientific notation with appropriate units."
      ],
      "answer": "E ≈ 1.50×10¹⁷ J, p ≈ 3.998×10⁸ kg·m/s."
    }
  },

  "elastic-collision": {
    "intuition": "1D Elastic Collision describes the post‑collision velocities of two objects that conserve both momentum and kinetic energy. It can solve for unknown masses or velocities when the other three quantities are known.",
    "variableBreakdown": [
      {
        "id": "m1",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 1 (m₁) — Mass of the first object.",
        "commonTraps": "Masses must be positive; using zero or negative mass invalidates the formulas."
      },
      {
        "id": "m2",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 2 (m₂) — Mass of the second object.",
        "commonTraps": "Masses must be positive; using zero or negative mass invalidates the formulas."
      },
      {
        "id": "v1i",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity of 1 (v₁ᵢ) — Speed before collision.",
        "commonTraps": "Direction matters; sign conventions must be consistent."
      },
      {
        "id": "v2i",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity of 2 (v₂ᵢ) — Speed before collision.",
        "commonTraps": "Direction matters; sign conventions must be consistent."
      }
    ],
    "solvingLogic": [
      "Confirm that all four inputs (m₁, m₂, v₁ᵢ, v₂ᵢ) are provided.",
      "Verify that both masses are positive.",
      "Compute the total mass M = m₁ + m₂.",
      "Calculate the final velocities using the formulas:",
      " v₁f = ((m₁−m₂)v₁ᵢ + 2m₂v₂ᵢ) / M",
      " v₂f = ((m₂−m₁)v₂ᵢ + 2m₁v₁ᵢ) / M",
      "Optionally compute momentum and kinetic energy before and after to verify conservation.",
      "Present the results with appropriate units."
    ],
    "edgeCases": [
      {
        "title": "Zero or Negative Mass",
        "description": "If m₁ ≤ 0 or m₂ ≤ 0, the solution is invalid."
      },
      {
        "title": "Missing Inputs",
        "description": "If any of the four required values is missing, the calculation cannot proceed."
      },
      {
        "title": "Division by Zero",
        "description": "If total mass M = 0 (both masses zero), division fails."
      },
      {
        "title": "Large Velocity Values",
        "description": "Very high velocities may cause floating‑point overflow; the formula itself remains stable."
      }
    ],
    "walkthroughExample": {
      "problem": "Two carts collide elastically. Cart 1 (m₁ = 2 kg) moves at 3 m/s, cart 2 (m₂ = 3 kg) is initially at rest. Find their velocities after the collision.",
      "solution": [
        "Total mass M = 2 kg + 3 kg = 5 kg.",
        "v₁f = ((2−3)·3 + 2·3·0) / 5 = (−1·3) / 5 = −0.6 m/s.",
        "v₂f = ((3−2)·0 + 2·2·3) / 5 = (2·6) / 5 = 12/5 = 2.4 m/s.",
        "Interpret the negative sign for v₁f as motion in the opposite direction after impact."
      ],
      "answer": "v₁f = −0.6 m/s (reversed direction), v₂f = 2.4 m/s."
    }
  },

  "shm": {
    "intuition": "Simple Harmonic Motion models the periodic motion of objects like springs and pendulums, linking angular frequency, period, amplitude, and displacement. It enables solving for any of these quantities when sufficient others are known.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "m",
        "altUnits": "",
        "description": "Amplitude (A) — Maximum displacement from equilibrium.",
        "commonTraps": "Amplitude must be non‑negative; mixing up amplitude with peak velocity can cause errors."
      },
      {
        "id": "omega",
        "siUnit": "rad/s",
        "altUnits": "",
        "description": "Angular Frequency (ω) — Rate of oscillation in rad/s.",
        "commonTraps": "Angular frequency must be positive; using Hz instead can cause factor‑2π errors."
      },
      {
        "id": "T",
        "siUnit": "s",
        "altUnits": "",
        "description": "Period (T) — Time for one full cycle.",
        "commonTraps": "Period is the inverse of frequency; confusing T with angular frequency leads to incorrect results."
      },
      {
        "id": "f",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Frequency (f) — Number of cycles per second.",
        "commonTraps": "Frequency and period are reciprocals; mixing them up yields wrong cycles."
      },
      {
        "id": "k",
        "siUnit": "N/m",
        "altUnits": "",
        "description": "Spring Constant (k) — Stiffness of the spring.",
        "commonTraps": "Spring constant must be positive; using the wrong sign changes the nature of the motion."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass (m) — Inertial mass of the oscillator.",
        "commonTraps": "Mass must be positive; using negative mass invalidates ω."
      }
    ],
    "solvingLogic": [
      "Identify which two of the six variables (A, ω, T, f, k, m) are known.",
      "Convert between period and frequency if needed (f = 1/T, ω = 2πf).",
      "If ω is unknown, compute it from T or f: ω = 2π/T or ω = 2πf.",
      "If k or m is unknown, use ω = √(k/m) to solve for the missing variable.",
      "Substitute known values, ensuring consistent SI units.",
      "Compute the desired quantity and verify that the resulting ω is positive."
    ],
    "edgeCases": [
      {
        "title": "Zero or Negative Parameters",
        "description": "ω, k, or m equal to zero or negative cause undefined ω or non‑physical solutions."
      },
      {
        "title": "Insufficient Data",
        "description": "Fewer than two independent variables prevent solving."
      },
      {
        "title": "Division by Zero",
        "description": "When solving for k or m, division by zero can occur if ω is zero."
      },
      {
        "title": "Large Values",
        "description": "Very large k or small m can cause overflow; but within typical ranges it's stable."
      }
    ],
    "walkthroughExample": {
      "problem": "A mass‑spring system has a spring constant of 100 N/m and a mass of 0.5 kg. Determine the angular frequency, period, frequency, and maximum speed for an amplitude of 0.2 m.",
      "solution": [
        "Angular frequency ω = √(k/m) = √(100/0.5) = √200 ≈ 14.14 rad/s.",
        "Period T = 2π/ω ≈ 0.444 s.",
        "Frequency f = 1/T ≈ 2.25 Hz.",
        "Maximum speed v_max = A·ω = 0.2·14.14 ≈ 2.83 m/s.",
        "Report each quantity with appropriate units."
      ],
      "answer": "ω ≈ 14.14 rad/s, T ≈ 0.444 s, f ≈ 2.25 Hz, v_max ≈ 2.83 m/s."
    }
  },

  "newtons-second-law": {
    "intuition": "Newton's Second Law relates net force to mass and acceleration, allowing the calculation of any of these quantities when the other two are known.",
    "variableBreakdown": [
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Force (F) — Net force acting on the object.",
        "commonTraps": "Force direction matters; using net force incorrectly (e.g., forgetting friction) yields wrong results."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass (m) — Inertial mass of the object.",
        "commonTraps": "Mass must be positive; using weight instead of mass without conversion leads to errors."
      },
      {
        "id": "a",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Acceleration (a) — Rate of change of velocity.",
        "commonTraps": "Acceleration is a vector; sign errors in direction can invert results."
      }
    ],
    "solvingLogic": [
      "Identify which two of the three variables (F, m, a) are known.",
      "Ensure that mass is expressed in kilograms and force in newtons.",
      "Solve for the unknown using F = m·a, a = F/m, or m = F/a.",
      "Substitute values and compute, checking that the resulting quantity has the correct sign and magnitude.",
      "Verify units and reasonableness of the answer."
    ],
    "edgeCases": [
      {
        "title": "Zero Mass",
        "description": "If m = 0, division by zero occurs; the calculator returns an error."
      },
      {
        "title": "Zero Force with Non‑Zero Acceleration",
        "description": "If F = 0 but a ≠ 0, the relation cannot hold; error is raised."
      },
      {
        "title": "Division by Zero in Mass Calculation",
        "description": "If a = 0, solving for m = F/0 is undefined; error is raised."
      }
    ],
    "walkthroughExample": {
      "problem": "A 15 kg box is pushed with a net force of 45 N. What is its acceleration?",
      "solution": [
        "Acceleration a = F/m = 45 N / 15 kg = 3 m/s².",
        "The box accelerates in the direction of the applied force."
      ],
      "answer": "a = 3 m/s²."
    }
  },

  "work-energy": {
    "intuition": "Work‑Energy Theorem connects the net work done on an object to its change in kinetic energy, enabling solving for work, mass, or velocities when sufficient data are provided.",
    "variableBreakdown": [
      {
        "id": "W",
        "siUnit": "J",
        "altUnits": "",
        "description": "Net Work (W) — Work done by the net force.",
        "commonTraps": "Work is scalar; forgetting to include all forces can underestimate work."
      },
      {
        "id": "m",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass (m) — Object's mass.",
        "commonTraps": "Mass must be positive; using weight without conversion leads to errors."
      },
      {
        "id": "v1",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity (v₁) — Speed before work is done.",
        "commonTraps": "Sign of initial velocity matters for direction."
      },
      {
        "id": "v2",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Final Velocity (v₂) — Speed after work is done.",
        "commonTraps": "Sign of final velocity matters for direction."
      }
    ],
    "solvingLogic": [
      "Verify that at least three of the four quantities (W, m, v₁, v₂) are provided.",
      "Ensure mass is positive.",
      "Compute initial kinetic energy KE₁ = ½ m v₁² and final kinetic energy KE₂ = ½ m v₂².",
      "Net work W = KE₂ − KE₁.",
      "If solving for an unknown velocity, rearrange the equation accordingly.",
      "Substitute values, compute, and check that the resulting kinetic energies are non‑negative."
    ],
    "edgeCases": [
      {
        "title": "Zero or Negative Mass",
        "description": "Invalidates kinetic energy calculations."
      },
      {
        "title": "Insufficient Data",
        "description": "Fewer than three required values prevent solving."
      },
      {
        "title": "Negative Kinetic Energy",
        "description": "If computed KE₂ < 0, inputs are inconsistent; error is raised."
      },
      {
        "title": "Division by Zero",
        "description": "Not directly applicable but solving for mass may involve division."
      }
    ],
    "walkthroughExample": {
      "problem": "A 10 kg object speeds up from 2 m/s to 5 m/s. Calculate the net work done on the object.",
      "solution": [
        "Initial KE₁ = ½·10·2² = 20 J.",
        "Final KE₂ = ½·10·5² = 125 J.",
        "Net work W = KE₂ − KE₁ = 125 J − 20 J = 105 J.",
        "The object experiences 105 J of net work."
      ],
      "answer": "W = 105 J."
    }
  },

  "gravitation": {
    "intuition": "Universal Gravitation describes the attractive force between two masses, allowing solving for force, mass, or distance when sufficient other quantities are known.",
    "variableBreakdown": [
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Force (F) — Gravitational force between the masses.",
        "commonTraps": "Force is attractive; sign conventions often set force as positive magnitude."
      },
      {
        "id": "m1",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 1 (m₁) — First mass.",
        "commonTraps": "Mass must be positive; using zero or negative mass invalidates the formula."
      },
      {
        "id": "m2",
        "siUnit": "kg",
        "altUnits": "",
        "description": "Mass 2 (m₂) — Second mass.",
        "commonTraps": "Mass must be positive; using zero or negative mass invalidates the formula."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance (r) — Separation between the centers of the masses.",
        "commonTraps": "Distance must be positive; using zero leads to division by zero."
      }
    ],
    "solvingLogic": [
      "Identify which three of the four variables (F, m₁, m₂, r) are known.",
      "Ensure all masses are positive and distance is non‑zero.",
      "Compute the gravitational constant G = 6.674×10⁻¹¹ N·m²/kg².",
      "Apply F = G·m₁·m₂ / r².",
      "Substitute values, compute, and present the result with appropriate units.",
      "If solving for a mass or distance, rearrange the equation algebraically and verify that the solution yields a positive, physically meaningful value."
    ],
    "edgeCases": [
      {
        "title": "Division by Zero",
        "description": "If r = 0, the formula is undefined; error is raised."
      },
      {
        "title": "Zero or Negative Mass",
        "description": "If either m₁ ≤ 0 or m₂ ≤ 0, the calculation is invalid."
      },
      {
        "title": "Unrealistic Distances",
        "description": "Very small or large distances can cause overflow/underflow; the calculator may flag extreme values."
      },
      {
        "title": "Consistency Check",
        "description": "When solving for a mass, the derived mass must be positive; otherwise, the input data are inconsistent."
      }
    ],
    "walkthroughExample": {
      "problem": "Two objects with masses 50 kg and 200 kg are 2 m apart. Calculate the gravitational force between them.",
      "solution": [
        "G = 6.674×10⁻¹¹ N·m²/kg².",
        "F = G·m₁·m₂ / r² = 6.674×10⁻¹¹·50·200 / 2² = 6.674×10⁻¹¹·10000 / 4 = 6.674×10⁻¹¹·2500 ≈ 1.6685×10⁻⁷ N.",
        "The force is approximately 1.67×10⁻⁷ N."
      ],
      "answer": "F ≈ 1.67×10⁻⁷ N."
    }
  }
};
