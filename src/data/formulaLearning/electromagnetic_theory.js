export const electromagnetic_theory = {
  "magnetic-force-charge": {
    "intuition": "A magnetic field exerts a force on a moving electric charge. Interestingly, this force is always perpendicular to both the charge's velocity and the magnetic field, meaning a magnetic field can never speed up a particle, only curve its path.",
    "variableBreakdown": [
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Magnetic Force (F)",
        "commonTraps": "Found using the Right-Hand Rule (for positive charges). Use your left hand for electrons."
      },
      {
        "id": "q",
        "siUnit": "C",
        "altUnits": "e",
        "description": "Electric Charge (q)",
        "commonTraps": "Make sure to include the sign, though often we just calculate magnitude and find direction separately."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity (v)",
        "commonTraps": "If the charge is perfectly stationary (v=0), it feels ZERO magnetic force."
      },
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "G",
        "description": "Magnetic Field Strength (B)",
        "commonTraps": "Usually in Teslas. 1 Tesla = 10,000 Gauss."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle (θ)",
        "commonTraps": "The angle between the velocity vector and the magnetic field vector."
      }
    ],
    "solvingLogic": [
      "1. Calculate sin(θ).",
      "2. Multiply q × v × B × sin(θ) to find F."
    ],
    "edgeCases": [
      {
        "title": "Parallel Motion",
        "description": "If the charge moves exactly parallel or anti-parallel to the magnetic field lines (θ = 0° or 180°), sin(θ) = 0, so it feels absolutely no magnetic force."
      }
    ],
    "walkthroughExample": {
      "problem": "A 2 C charge moves at 3 m/s perpendicular (90°) to a 4 T magnetic field. Find the force.",
      "solution": [
        "sin(90°) = 1.",
        "F = 2 × 3 × 4 × 1 = 24 N."
      ],
      "answer": "F = 24 N"
    }
  },

  "amperes-law": {
    "intuition": "Ampère's Law describes how an electric current creates a magnetic field wrapping around it. For a long, tightly wound coil (a solenoid), this field is incredibly uniform and strong inside the coil.",
    "variableBreakdown": [
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "",
        "description": "Magnetic Field (B)",
        "commonTraps": "This equation specifically finds the field exactly in the middle of an ideal, infinitely long solenoid."
      },
      {
        "id": "n",
        "siUnit": "turns/m",
        "altUnits": "",
        "description": "Turn Density (n)",
        "commonTraps": "This is NOT total turns (N). It is turns per unit length (N / L)."
      },
      {
        "id": "I",
        "siUnit": "A",
        "altUnits": "mA",
        "description": "Current (I)",
        "commonTraps": "Must be in standard Amperes."
      }
    ],
    "solvingLogic": [
      "1. Ensure you have 'n' (turns per meter), not just total turns.",
      "2. Multiply the permeability of free space (μ₀ = 4π × 10⁻⁷).",
      "3. B = μ₀ × n × I."
    ],
    "edgeCases": [
      {
        "title": "Outside the Solenoid",
        "description": "For an ideal, infinitely long solenoid, the magnetic field outside is exactly zero. Real solenoids leak some field at the ends."
      }
    ],
    "walkthroughExample": {
      "problem": "A solenoid with 1000 turns/meter carries a 5 A current. Find B in its center.",
      "solution": [
        "μ₀ = 4π × 10⁻⁷ ≈ 1.2566 × 10⁻⁶.",
        "B = (1.2566 × 10⁻⁶) × 1000 × 5",
        "B ≈ 0.00628 T."
      ],
      "answer": "B ≈ 0.00628 T (6.28 mT)"
    }
  },

  "faraday-law": {
    "intuition": "Faraday's Law of Induction is the principle behind all power plants. A changing magnetic environment creates an electromotive force (voltage). In a generator, this is achieved by rotating a coil in a magnetic field.",
    "variableBreakdown": [
      {
        "id": "emf",
        "siUnit": "V",
        "altUnits": "",
        "description": "Electromotive Force (ε)",
        "commonTraps": "Despite the word 'force', it is measured in Volts."
      },
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Turns (N)",
        "commonTraps": "More loops of wire = more voltage."
      },
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "",
        "description": "Magnetic Field (B)",
        "commonTraps": "Strength of the permanent magnets."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Area of Loop (A)",
        "commonTraps": "Make sure you use meters squared, not cm²."
      },
      {
        "id": "omega",
        "siUnit": "rad/s",
        "altUnits": "RPM",
        "description": "Angular Velocity (ω)",
        "commonTraps": "Must be converted from RPM to rad/s."
      },
      {
        "id": "t",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time (t)",
        "commonTraps": "Used to find the exact voltage at a specific millisecond in the AC cycle."
      }
    ],
    "solvingLogic": [
      "1. Calculate sin(ωt) using radians on your calculator.",
      "2. Multiply N × B × A × ω × sin(ωt) to find the instantaneous voltage."
    ],
    "edgeCases": [
      {
        "title": "Peak Voltage",
        "description": "To find the maximum possible voltage, just ignore the sine term entirely (assume sin(ωt) = 1). Max voltage = NBAω."
      }
    ],
    "walkthroughExample": {
      "problem": "A 10-turn coil of area 0.1 m² rotates at 100 rad/s in a 2 T field. What is the peak voltage?",
      "solution": [
        "Since we want peak, sin(ωt) = 1.",
        "Peak EMF = N × B × A × ω",
        "EMF = 10 × 2 × 0.1 × 100 = 200 V."
      ],
      "answer": "EMF = 200 V"
    }
  },

  "hall-effect": {
    "intuition": "When a current flows through a wire in a magnetic field, the moving electrons are pushed to one side of the wire by the magnetic force. This creates a tiny measurable voltage across the wire, acting like a traffic jam on one side of a road.",
    "variableBreakdown": [
      {
        "id": "VH",
        "siUnit": "V",
        "altUnits": "mV",
        "description": "Hall Voltage (V_H)",
        "commonTraps": "Usually very small (microvolts or millivolts)."
      },
      {
        "id": "I",
        "siUnit": "A",
        "altUnits": "",
        "description": "Current (I)",
        "commonTraps": "The total current flowing through the conductor."
      },
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "",
        "description": "Magnetic Field (B)",
        "commonTraps": "Must be perpendicular to the current and the face being measured."
      },
      {
        "id": "n",
        "siUnit": "m⁻³",
        "altUnits": "",
        "description": "Charge Carrier Density (n)",
        "commonTraps": "Number of electrons per cubic meter. This is huge for metals (e.g. 10²⁸), but much smaller for semiconductors."
      },
      {
        "id": "d",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Thickness (d)",
        "commonTraps": "The thickness of the slab in the direction of the magnetic field."
      }
    ],
    "solvingLogic": [
      "1. Multiply I × B for the numerator.",
      "2. Multiply n × e × d for the denominator (e is the elementary charge, 1.6×10⁻¹⁹ C).",
      "3. Divide numerator by denominator."
    ],
    "edgeCases": [
      {
        "title": "Positive Charge Carriers",
        "description": "In p-type semiconductors, the current is carried by positive 'holes' rather than electrons. This actually reverses the polarity (sign) of the Hall Voltage!"
      }
    ],
    "walkthroughExample": {
      "problem": "Find V_H for I=10A, B=1.5T, d=0.001m in copper (n = 8.5×10²⁸ m⁻³).",
      "solution": [
        "Numerator: 10 × 1.5 = 15.",
        "Denominator: (8.5×10²⁸) × (1.6×10⁻¹⁹) × 0.001 = 13.6 × 10⁶.",
        "V_H = 15 / (13.6 × 10⁶) ≈ 1.1 × 10⁻⁶ V."
      ],
      "answer": "V_H ≈ 1.1 μV"
    }
  },

  "lc-resonance": {
    "intuition": "An inductor and a capacitor connected together will pass energy back and forth forever like a frictionless pendulum. The frequency at which they naturally 'ring' is the resonant frequency, the foundational concept behind tuning a radio to a specific station.",
    "variableBreakdown": [
      {
        "id": "f",
        "siUnit": "Hz",
        "altUnits": "kHz",
        "description": "Resonant Frequency (f)",
        "commonTraps": "Don't confuse frequency (Hz) with angular frequency (rad/s, ω). f = ω / 2π."
      },
      {
        "id": "L",
        "siUnit": "H",
        "altUnits": "mH",
        "description": "Inductance (L)",
        "commonTraps": "Must be in standard Henrys, not millihenrys or microhenrys."
      },
      {
        "id": "C",
        "siUnit": "F",
        "altUnits": "μF",
        "description": "Capacitance (C)",
        "commonTraps": "Must be in standard Farads. Microfarads (μF) are 10⁻⁶."
      }
    ],
    "solvingLogic": [
      "1. Multiply L and C.",
      "2. Take the square root: √(LC).",
      "3. Multiply by 2π.",
      "4. The resonant frequency is 1 divided by the result: f = 1 / (2π√(LC))."
    ],
    "edgeCases": [
      {
        "title": "Zero Resistance",
        "description": "This formula assumes an ideal circuit with absolutely no resistance. Real circuits have resistance, which slightly alters the frequency and causes the oscillations to slowly die out (damped harmonic motion)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the resonant frequency of an LC circuit with L = 0.01 H and C = 0.0001 F.",
      "solution": [
        "L × C = 0.01 × 0.0001 = 10⁻⁶.",
        "√(10⁻⁶) = 0.001.",
        "Denominator = 2π × 0.001 ≈ 0.00628.",
        "f = 1 / 0.00628 ≈ 159.15 Hz."
      ],
      "answer": "f ≈ 159 Hz"
    }
  },

  "magnetic-force-wire": {
    "intuition": "Since a magnetic field pushes on moving charges, a wire full of moving charges (a current) gets pushed as a whole. This is the underlying principle behind all electric motors.",
    "variableBreakdown": [
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Magnetic Force (F)",
        "commonTraps": "Force is exerted perpendicular to both the wire and the magnetic field."
      },
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "",
        "description": "Magnetic Field (B)",
        "commonTraps": "Strength of the external magnetic field."
      },
      {
        "id": "I",
        "siUnit": "A",
        "altUnits": "",
        "description": "Current (I)",
        "commonTraps": "Must be in Amperes."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Length of Wire (L)",
        "commonTraps": "Only the length of the wire actually sitting inside the magnetic field counts."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle (θ)",
        "commonTraps": "Angle between the wire and the magnetic field lines."
      }
    ],
    "solvingLogic": [
      "1. Calculate sin(θ).",
      "2. Multiply I × L × B × sin(θ) to find the force."
    ],
    "edgeCases": [
      {
        "title": "Wire Aligned with Field",
        "description": "If the wire runs parallel to the magnetic field (θ = 0), sin(0)=0, meaning the wire feels zero force, no matter how much current is flowing."
      }
    ],
    "walkthroughExample": {
      "problem": "A 2m wire carries 5A perpendicular (90°) to a 0.5T magnetic field. What is the force on the wire?",
      "solution": [
        "sin(90°) = 1.",
        "F = I × L × B × 1",
        "F = 5 × 2 × 0.5 × 1 = 5 N."
      ],
      "answer": "F = 5 N"
    }
  },

  "wheatstone-bridge": {
    "intuition": "A Wheatstone bridge is a diamond-shaped circuit used to measure an unknown electrical resistance with extreme accuracy by balancing two 'legs' of a bridge circuit.",
    "variableBreakdown": [
      {
        "id": "Vs",
        "siUnit": "V",
        "altUnits": "",
        "description": "Voltage Output (Vg)",
        "commonTraps": "The voltage difference across the middle of the bridge. If the bridge is 'balanced', Vg = 0."
      },
      {
        "id": "R1",
        "siUnit": "Ω",
        "altUnits": "kΩ",
        "description": "Resistor 1 (R₁)",
        "commonTraps": "Make sure all resistors are in the same units (all Ohms or all kOhms)."
      },
      {
        "id": "R2",
        "siUnit": "Ω",
        "altUnits": "kΩ",
        "description": "Resistor 2 (R₂)",
        "commonTraps": "Usually the adjustable resistor used to balance the bridge."
      },
      {
        "id": "R3",
        "siUnit": "Ω",
        "altUnits": "kΩ",
        "description": "Resistor 3 (R₃)",
        "commonTraps": "Make sure all resistors are in the same units."
      },
      {
        "id": "R4",
        "siUnit": "Ω",
        "altUnits": "kΩ",
        "description": "Resistor 4 (Rx)",
        "commonTraps": "Typically the unknown resistor you are trying to measure."
      }
    ],
    "solvingLogic": [
      "1. Calculate the ratio R₁ / R₂.",
      "2. Calculate the ratio R₃ / R₄.",
      "3. The bridge is balanced (0V output) ONLY if R₁/R₂ = R₃/R₄."
    ],
    "edgeCases": [
      {
        "title": "Strain Gauges",
        "description": "Wheatstone bridges are often used to measure tiny changes in resistance in sensors like strain gauges, where even a 0.01 ohm change will cause the bridge to become slightly unbalanced and generate a small voltage."
      }
    ],
    "walkthroughExample": {
      "problem": "R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 300 Ω. What must R₄ be for the bridge to be perfectly balanced?",
      "solution": [
        "For a balanced bridge, R₁/R₂ = R₃/R₄.",
        "100 / 200 = 0.5.",
        "So 300 / R₄ must equal 0.5.",
        "R₄ = 300 / 0.5 = 600 Ω."
      ],
      "answer": "R₄ = 600 Ω"
    }
  },

  "kirchhoff-junction": {
    "intuition": "Kirchhoff's Junction Rule (Current Law) is simply the conservation of charge. It says that water can't pile up inside a pipe junction; the amount of water flowing in MUST exactly equal the amount of water flowing out.",
    "variableBreakdown": [
      {
        "id": "I1",
        "siUnit": "A",
        "altUnits": "mA",
        "description": "Current Path 1",
        "commonTraps": "Pay strict attention to the direction (in vs out)."
      },
      {
        "id": "I2",
        "siUnit": "A",
        "altUnits": "mA",
        "description": "Current Path 2",
        "commonTraps": "Pay strict attention to the direction (in vs out)."
      },
      {
        "id": "I3",
        "siUnit": "A",
        "altUnits": "mA",
        "description": "Current Path 3",
        "commonTraps": "Pay strict attention to the direction (in vs out)."
      }
    ],
    "solvingLogic": [
      "1. Identify all currents entering the junction.",
      "2. Identify all currents leaving the junction.",
      "3. Sum(In) = Sum(Out). Solve for the missing variable algebraically."
    ],
    "edgeCases": [
      {
        "title": "Negative Current Output",
        "description": "If you guess the direction of an unknown current and your mathematical answer is negative, it simply means the current is actually flowing the opposite way of your guess."
      }
    ],
    "walkthroughExample": {
      "problem": "3 Amps enter a junction from the left. 1 Amp leaves from the top. How much leaves from the bottom?",
      "solution": [
        "Sum(In) = 3.",
        "Sum(Out) = 1 + I_bottom.",
        "3 = 1 + I_bottom.",
        "I_bottom = 2 A."
      ],
      "answer": "2 A leaves the bottom."
    }
  },

  "inductor-energy": {
    "intuition": "Just as a capacitor stores energy in an electric field, an inductor stores energy in a magnetic field. It takes energy to establish a magnetic field, and that energy is returned to the circuit when the field collapses.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "J",
        "altUnits": "mJ",
        "description": "Energy (U)",
        "commonTraps": "Must be in Joules."
      },
      {
        "id": "L",
        "siUnit": "H",
        "altUnits": "mH",
        "description": "Inductance (L)",
        "commonTraps": "Make sure to convert mH (10⁻³) to H."
      },
      {
        "id": "I",
        "siUnit": "A",
        "altUnits": "mA",
        "description": "Current (I)",
        "commonTraps": "Because current is squared, doubling the current quadruples the stored energy!"
      }
    ],
    "solvingLogic": [
      "1. Square the current (I²).",
      "2. Multiply ½ × L × I² to find the energy in Joules."
    ],
    "edgeCases": [
      {
        "title": "Breaking the Circuit",
        "description": "If you suddenly break a circuit containing a large inductor (forcing I to drop to 0 instantly), it must release all its stored energy instantly. This causes massive voltage spikes and sparks (arcing) across the switch."
      }
    ],
    "walkthroughExample": {
      "problem": "How much energy is stored in a 0.5 H inductor carrying 4 A of current?",
      "solution": [
        "I² = 4² = 16.",
        "E = 0.5 × 0.5 × 16",
        "E = 0.25 × 16 = 4 J."
      ],
      "answer": "E = 4 Joules"
    }
  },

  "magnetic-flux": {
    "intuition": "Magnetic flux is the total 'amount' of magnetic field passing through a specific surface area. Think of it like trying to catch rain in a bucket: it depends on how heavy the rain is (B), how big the bucket is (A), and the angle you hold the bucket (θ).",
    "variableBreakdown": [
      {
        "id": "phi",
        "siUnit": "Wb",
        "altUnits": "",
        "description": "Magnetic Flux (Φ)",
        "commonTraps": "Measured in Webers (Wb), which is equivalent to Tesla × meters squared (T·m²)."
      },
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "",
        "description": "Magnetic Field Strength (B)",
        "commonTraps": "Strength of the uniform magnetic field."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "cm²",
        "description": "Area (A)",
        "commonTraps": "Must be converted to m² before calculating."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle (θ)",
        "commonTraps": "Extremely tricky! This is the angle between the magnetic field and the NORMAL vector (a line sticking straight out of the surface), NOT the surface itself."
      }
    ],
    "solvingLogic": [
      "1. Calculate cos(θ). Remember that θ is the angle from the surface normal.",
      "2. Multiply B × A × cos(θ)."
    ],
    "edgeCases": [
      {
        "title": "Parallel to Surface",
        "description": "If the magnetic field skims perfectly across the surface, the angle to the normal is 90°. cos(90°) = 0, so exactly zero magnetic flux passes through the loop."
      }
    ],
    "walkthroughExample": {
      "problem": "A 2 m² loop is placed perpendicular to a 5 T magnetic field. Find the flux.",
      "solution": [
        "If it is perpendicular to the field, its NORMAL vector is perfectly aligned with the field, so θ = 0°.",
        "cos(0°) = 1.",
        "Φ = 5 × 2 × 1 = 10 Wb."
      ],
      "answer": "Φ = 10 Wb"
    }
  }
};
