export const electricity_magnetism = {
  "rc-circuit": {
    "intuition": "The RC Circuit formula models how a capacitor charges or discharges over time through a resistor. It shows that voltage changes exponentially, governed by the time constant τ = RC.",
    "variableBreakdown": [
      {
        "id": "Vt",
        "siUnit": "V",
        "altUnits": "",
        "description": "Voltage at t (V(t)) — The potential difference across the capacitor at a specific time.",
        "commonTraps": "Mixing up the charging and discharging equations; this formula specifically models the charging phase."
      },
      {
        "id": "V0",
        "siUnit": "V",
        "altUnits": "",
        "description": "Source Voltage (V₀) — The maximum voltage supplied by the power source.",
        "commonTraps": "Assuming the capacitor instantly reaches source voltage; it asymptotically approaches V₀."
      },
      {
        "id": "R",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistance (R) — The resistance in the circuit slowing down the charge flow.",
        "commonTraps": "Forgetting to convert kilo-ohms (kΩ) to ohms (Ω) before multiplying with capacitance."
      },
      {
        "id": "C",
        "siUnit": "F",
        "altUnits": "",
        "description": "Capacitance (C) — The charge-storing capacity of the capacitor.",
        "commonTraps": "Using microfarads (μF) or picofarads (pF) directly without converting to farads (F) (e.g., 1 μF = 10⁻⁶ F)."
      },
      {
        "id": "t",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time (t) — Elapsed time since the switch was closed.",
        "commonTraps": "Confusing elapsed time with the time constant (τ)."
      }
    ],
    "solvingLogic": [
      "1. Identify the known variables (e.g., source voltage, resistance, capacitance, time).",
      "2. Convert all units to standard SI units (Ohms, Farads, Seconds, Volts).",
      "3. Calculate the time constant τ = R × C.",
      "4. To find voltage at time t, substitute into V(t) = V₀(1 − e^(−t/τ)).",
      "5. Calculate the exponent −t/τ, then find e^(−t/τ).",
      "6. Subtract the result from 1, and multiply by V₀."
    ],
    "edgeCases": [
      {
        "title": "Time is Zero",
        "description": "At t = 0, e^0 = 1, making V(t) = 0. An uncharged capacitor acts like a short circuit initially."
      },
      {
        "title": "Infinite Time",
        "description": "As t → ∞, e^(−∞) → 0, making V(t) = V₀. The fully charged capacitor acts like an open circuit."
      },
      {
        "title": "Negative Time",
        "description": "Time must be ≥ 0. The equation does not apply before the circuit is connected."
      }
    ],
    "walkthroughExample": {
      "problem": "A 10 V battery is connected to a circuit with a 2000 Ω resistor and a 500 μF capacitor. What is the voltage across the capacitor after 2 seconds?",
      "solution": [
        "Identify knowns: V₀ = 10 V, R = 2000 Ω, C = 500 × 10⁻⁶ F, t = 2 s.",
        "Calculate the time constant τ = R × C = 2000 × 0.0005 = 1 s.",
        "Use the formula: V(t) = V₀(1 − e^(−t/τ)).",
        "Substitute values: V(2) = 10(1 − e^(−2/1)).",
        "Calculate e⁻² ≈ 0.1353.",
        "Compute: V(2) = 10(1 − 0.1353) = 10(0.8647) = 8.647 V."
      ],
      "answer": "V(2) ≈ 8.65 V"
    }
  },

  "rlc-impedance": {
    "intuition": "RLC Series Impedance determines the total opposition to alternating current in a circuit containing a resistor, inductor, and capacitor. It combines the resistance and the frequency-dependent reactances.",
    "variableBreakdown": [
      {
        "id": "R",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistance (R) — The opposition to current from the resistor.",
        "commonTraps": "Resistance does not change with frequency, unlike inductive and capacitive reactance."
      },
      {
        "id": "L",
        "siUnit": "H",
        "altUnits": "",
        "description": "Inductance (L) — Opposes changes in current.",
        "commonTraps": "Failing to convert millihenries (mH) to henries (H)."
      },
      {
        "id": "C",
        "siUnit": "F",
        "altUnits": "",
        "description": "Capacitance (C) — Opposes changes in voltage.",
        "commonTraps": "Failing to convert microfarads (μF) or nanofarads (nF) to farads (F)."
      },
      {
        "id": "f",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Frequency (f) — The frequency of the AC source.",
        "commonTraps": "Mixing up frequency (f in Hz) with angular frequency (ω in rad/s, where ω = 2πf)."
      },
      {
        "id": "Z",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Impedance (Z) — The total effective resistance of the circuit.",
        "commonTraps": "Simply adding R, XL, and XC together algebraically instead of using the phasor sum Z = √(R² + (XL − XC)²)."
      }
    ],
    "solvingLogic": [
      "1. Verify all inputs are in standard SI units (Ohms, Henries, Farads, Hertz).",
      "2. Calculate angular frequency ω = 2πf.",
      "3. Calculate inductive reactance XL = ωL.",
      "4. Calculate capacitive reactance XC = 1 / (ωC).",
      "5. Find the net reactance X = XL − XC.",
      "6. Calculate total impedance Z = √(R² + X²)."
    ],
    "edgeCases": [
      {
        "title": "Resonance",
        "description": "When XL = XC, the net reactance is zero, making Z = R. This occurs at the resonant frequency f₀ = 1 / (2π√(LC))."
      },
      {
        "title": "DC Source (f = 0)",
        "description": "If frequency is zero, XC approaches infinity, acting as an open circuit (no steady DC flows through a capacitor)."
      },
      {
        "title": "High Frequency",
        "description": "As frequency approaches infinity, XL dominates and the circuit behaves purely inductively."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the impedance of a series RLC circuit with R = 50 Ω, L = 0.2 H, and C = 10 μF connected to a 60 Hz AC source.",
      "solution": [
        "Identify knowns: R = 50 Ω, L = 0.2 H, C = 10 × 10⁻⁶ F, f = 60 Hz.",
        "Calculate angular frequency ω = 2π(60) ≈ 377 rad/s.",
        "Calculate XL = ωL = 377 × 0.2 = 75.4 Ω.",
        "Calculate XC = 1 / (ωC) = 1 / (377 × 10 × 10⁻⁶) ≈ 265.3 Ω.",
        "Find net reactance: XL − XC = 75.4 − 265.3 = -189.9 Ω.",
        "Calculate Z = √(50² + (-189.9)²) = √(2500 + 36062) = √38562 ≈ 196.4 Ω."
      ],
      "answer": "Z ≈ 196.4 Ω"
    }
  },

  "ohms-law": {
    "intuition": "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to the resistance.",
    "variableBreakdown": [
      {
        "id": "V",
        "siUnit": "V",
        "altUnits": "",
        "description": "Voltage (V) — The potential difference pushing charges through the circuit.",
        "commonTraps": "Confusing the voltage across a specific component with the total supply voltage in a complex circuit."
      },
      {
        "id": "I",
        "siUnit": "A",
        "altUnits": "",
        "description": "Current (I) — The rate of flow of electric charge.",
        "commonTraps": "Not converting milliamperes (mA) to amperes (A) before calculation."
      },
      {
        "id": "R",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistance (R) — The opposition to the flow of current.",
        "commonTraps": "Assuming resistance changes with voltage or current in ohmic materials; it remains constant."
      }
    ],
    "solvingLogic": [
      "1. Identify the two known variables from V, I, and R.",
      "2. Select the correct form of the equation: V = I × R, I = V / R, or R = V / I.",
      "3. Convert any prefixed units (like mA or kΩ) to base units (A or Ω).",
      "4. Perform the multiplication or division to find the unknown.",
      "5. Ensure the result makes physical sense (e.g., extremely high current for a low resistance)."
    ],
    "edgeCases": [
      {
        "title": "Short Circuit",
        "description": "If R approaches 0, current I approaches infinity. In reality, internal resistance limits this, but it represents a hazardous condition."
      },
      {
        "title": "Open Circuit",
        "description": "If I = 0, it implies R is essentially infinite (broken connection), regardless of the applied voltage."
      },
      {
        "title": "Non-Ohmic Devices",
        "description": "Ohm's law does not apply to non-ohmic devices like diodes or lightbulbs where R changes with V or I."
      }
    ],
    "walkthroughExample": {
      "problem": "A 9 V battery is connected to a 450 Ω resistor. What is the current flowing through the resistor?",
      "solution": [
        "Identify knowns: V = 9 V, R = 450 Ω.",
        "Choose the form of Ohm's Law solving for current: I = V / R.",
        "Substitute values: I = 9 / 450.",
        "Calculate: I = 0.02 A (or 20 mA)."
      ],
      "answer": "I = 0.02 A"
    }
  },

  "coulombs-law": {
    "intuition": "Coulomb's Law quantifies the electrostatic force between two stationary point charges, showing that force increases with charge magnitude and decreases rapidly as they move apart.",
    "variableBreakdown": [
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "",
        "description": "Force (F) — The electrostatic force acting on the charges.",
        "commonTraps": "Forgetting that force is a vector; Coulomb's Law gives the magnitude, but direction depends on the charge signs (like repels, opposite attracts)."
      },
      {
        "id": "q1",
        "siUnit": "C",
        "altUnits": "",
        "description": "Charge 1 (q₁) — The magnitude of the first charge.",
        "commonTraps": "Failing to convert microcoulombs (μC) or nanocoulombs (nC) to coulombs (C)."
      },
      {
        "id": "q2",
        "siUnit": "C",
        "altUnits": "",
        "description": "Charge 2 (q₂) — The magnitude of the second charge.",
        "commonTraps": "Including the signs of the charges in the calculation of magnitude, which can lead to confusing negative forces."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance (r) — The straight-line separation between the centers of the two charges.",
        "commonTraps": "Forgetting to square the distance in the denominator (r²), or leaving distance in centimeters (cm)."
      }
    ],
    "solvingLogic": [
      "1. Identify the knowns and the variable to solve for.",
      "2. Ensure all units are SI: coulombs for charge, meters for distance.",
      "3. Note the Coulomb constant k ≈ 8.99 × 10⁹ N·m²/C².",
      "4. If solving for Force, use F = k × |q₁| × |q₂| / r².",
      "5. Calculate the numerator: multiply the constant by both charges.",
      "6. Divide by the square of the distance."
    ],
    "edgeCases": [
      {
        "title": "Zero Distance",
        "description": "If r = 0, the force approaches infinity. Point charges cannot occupy the exact same physical space."
      },
      {
        "title": "Neutral Object",
        "description": "If either charge is 0, the electrostatic force is exactly 0. (Though polarization can still cause attraction in reality)."
      },
      {
        "title": "Macroscopic Distances",
        "description": "At very large distances, the force becomes negligible, approaching zero."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the magnitude of the electrostatic force between a 3 μC charge and a 5 μC charge separated by 10 cm.",
      "solution": [
        "Convert units: q₁ = 3 × 10⁻⁶ C, q₂ = 5 × 10⁻⁶ C, r = 0.1 m.",
        "Identify constant: k = 8.988 × 10⁹ N·m²/C².",
        "Apply formula: F = k × q₁ × q₂ / r².",
        "Numerator: (8.988 × 10⁹) × (3 × 10⁻⁶) × (5 × 10⁻⁶) ≈ 0.1348 N·m².",
        "Denominator: (0.1)² = 0.01 m².",
        "Divide: F = 0.1348 / 0.01 = 13.48 N."
      ],
      "answer": "F ≈ 13.48 N"
    }
  },

  "capacitor-energy": {
    "intuition": "Capacitor Energy relates the energy stored in a capacitor's electric field to its capacitance and the voltage across it, or its charge.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "J",
        "altUnits": "",
        "description": "Energy (E) — The total potential energy stored in the capacitor.",
        "commonTraps": "Confusing energy (Joules) with charge (Coulombs)."
      },
      {
        "id": "C",
        "siUnit": "F",
        "altUnits": "",
        "description": "Capacitance (C) — The capacitor's ability to store charge per unit voltage.",
        "commonTraps": "Forgetting to convert practical units like μF to Farads."
      },
      {
        "id": "V",
        "siUnit": "V",
        "altUnits": "",
        "description": "Voltage (V) — The potential difference across the capacitor plates.",
        "commonTraps": "Using the circuit's total voltage instead of the voltage specifically across the capacitor."
      },
      {
        "id": "Q",
        "siUnit": "C",
        "altUnits": "",
        "description": "Charge (Q) — The total electric charge stored on one plate.",
        "commonTraps": "Failing to convert units or confusing it with capacitance."
      }
    ],
    "solvingLogic": [
      "1. Determine which two variables out of C, V, and Q are given.",
      "2. Select the appropriate formula: E = ½CV², E = ½QV, or E = Q²/(2C).",
      "3. Convert all inputs to standard SI units (Farads, Volts, Coulombs).",
      "4. Calculate the result, remembering to square V or Q if required.",
      "5. Ensure the energy result is non-negative and in Joules."
    ],
    "edgeCases": [
      {
        "title": "Zero Voltage",
        "description": "If a capacitor has no voltage across it, it stores zero energy, regardless of its capacitance."
      },
      {
        "title": "Zero Capacitance",
        "description": "A theoretical capacitor with 0 F cannot store any charge or energy, leading to undefined states in some equation forms."
      },
      {
        "title": "Extremely High Voltage",
        "description": "While the equation allows for any V, in reality, exceeding the dielectric breakdown voltage destroys the capacitor."
      }
    ],
    "walkthroughExample": {
      "problem": "How much energy is stored in a 2200 μF capacitor charged to 50 V?",
      "solution": [
        "Identify knowns: C = 2200 × 10⁻⁶ F, V = 50 V.",
        "Choose formula: E = ½CV².",
        "Square the voltage: 50² = 2500 V².",
        "Multiply: E = 0.5 × (2200 × 10⁻⁶) × 2500.",
        "Calculate: E = 0.5 × 0.0022 × 2500 = 2.75 Joules."
      ],
      "answer": "E = 2.75 J"
    }
  },

  "biot-savart": {
    "intuition": "The Magnetic Field of a Long Wire formula (derived from Biot-Savart) calculates the magnetic field strength generated by a steady current in a straight, infinite wire at a specific distance.",
    "variableBreakdown": [
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "",
        "description": "Magnetic Field (B) — The strength of the magnetic field.",
        "commonTraps": "Confusing Tesla (T) with Gauss (G); 1 T = 10,000 G. This formula requires SI units (Tesla)."
      },
      {
        "id": "I",
        "siUnit": "A",
        "altUnits": "",
        "description": "Current (I) — The electric current flowing through the wire.",
        "commonTraps": "Assuming current direction affects magnitude; direction determines field orientation via the right-hand rule, but not magnitude."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance (r) — The perpendicular radial distance from the wire to the measurement point.",
        "commonTraps": "Using distance in cm or mm instead of meters, or confusing it with the radius of a circular loop."
      }
    ],
    "solvingLogic": [
      "1. Identify the knowns and the variable to be found.",
      "2. Ensure current is in Amperes and distance is in meters.",
      "3. Use the permeability of free space constant μ₀ = 4π × 10⁻⁷ T·m/A.",
      "4. To find B, multiply μ₀ by I, then divide by (2πr).",
      "5. Note that μ₀ / (2π) simplifies nicely to exactly 2 × 10⁻⁷ T·m/A.",
      "6. Complete the calculation and express the field in Tesla."
    ],
    "edgeCases": [
      {
        "title": "Zero Distance",
        "description": "If r = 0, the equation approaches infinity. Realistically, you cannot measure the field exactly at the infinitesimally thin center of the wire."
      },
      {
        "title": "Zero Current",
        "description": "If no current is flowing (I = 0), no magnetic field is generated by the wire."
      },
      {
        "title": "Finite Wire Length",
        "description": "This specific simplified formula assumes an infinitely long wire. For short wires, edge effects make the field weaker than this predicts."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the magnetic field 5 cm away from a long straight wire carrying a current of 15 A.",
      "solution": [
        "Convert units: r = 0.05 m, I = 15 A.",
        "Identify constant simplification: (μ₀ / 2π) = 2 × 10⁻⁷ T·m/A.",
        "Apply formula: B = (μ₀I) / (2πr) = (μ₀ / 2π) × (I / r).",
        "Substitute: B = (2 × 10⁻⁷) × (15 / 0.05).",
        "Calculate I/r: 15 / 0.05 = 300.",
        "Multiply: B = (2 × 10⁻⁷) × 300 = 600 × 10⁻⁷ = 6.0 × 10⁻⁵ Tesla."
      ],
      "answer": "B = 6.0 × 10⁻⁵ T"
    }
  }
};
