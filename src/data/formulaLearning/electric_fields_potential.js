export const electric_fields_potential = {
  "electric-field": {
    "intuition": "The Electric Field of a point charge describes the force field it creates in the space around it. The field strength is directly proportional to the charge and decreases with the square of the distance.",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "N/C",
        "altUnits": "V/m",
        "description": "Electric Field Magnitude (E)",
        "commonTraps": "The field is a vector; this formula only gives magnitude."
      },
      {
        "id": "Q",
        "siUnit": "C",
        "altUnits": "",
        "description": "Charge (Q)",
        "commonTraps": "Use the source charge Q, not a test charge."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance (r)",
        "commonTraps": "Forgetting to square the distance in the denominator."
      }
    ],
    "solvingLogic": [
      "1. Identify the known variables.",
      "2. Ensure Q is in Coulombs and r is in meters.",
      "3. Use k ≈ 8.988 × 10⁹ N·m²/C².",
      "4. To solve for E, use E = k|Q| / r²."
    ],
    "edgeCases": [
      {
        "title": "Distance is Zero",
        "description": "At r = 0, the electric field approaches infinity."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the electric field at 2 m from a 4 μC charge.",
      "solution": [
        "Q = 4 × 10⁻⁶ C, r = 2 m.",
        "E = kQ / r² = (8.988 × 10⁹)(4 × 10⁻⁶) / 4 = 8988 N/C."
      ],
      "answer": "E ≈ 8988 N/C"
    }
  },

  "electric-potential": {
    "intuition": "Electric Potential (voltage) from a point charge describes the potential energy per unit charge at a specific location. It scales inversely with distance.",
    "variableBreakdown": [
      {
        "id": "V",
        "siUnit": "V",
        "altUnits": "J/C",
        "description": "Electric Potential (V)",
        "commonTraps": "Potential is a scalar; it can be negative depending on the charge."
      },
      {
        "id": "Q",
        "siUnit": "C",
        "altUnits": "",
        "description": "Charge (Q)",
        "commonTraps": "The sign of Q determines the sign of V."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Distance (r)",
        "commonTraps": "Do not square the distance."
      }
    ],
    "solvingLogic": [
      "1. Identify knowns and verify units.",
      "2. Use k ≈ 8.988 × 10⁹ N·m²/C².",
      "3. To solve for V, use V = kQ / r."
    ],
    "edgeCases": [
      {
        "title": "Negative Charge",
        "description": "If Q is negative, V is negative."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the electric potential 0.5 m away from a -2 μC charge.",
      "solution": [
        "Q = -2 × 10⁻⁶ C, r = 0.5 m.",
        "V = (8.988 × 10⁹)(-2 × 10⁻⁶) / 0.5 = -35952 V."
      ],
      "answer": "V ≈ -35952 V"
    }
  },

  "parallel-plate-cap": {
    "intuition": "The Parallel Plate Capacitor formula determines capacitance based purely on the physical geometry of the plates and the material between them.",
    "variableBreakdown": [
      {
        "id": "C",
        "siUnit": "F",
        "altUnits": "",
        "description": "Capacitance (C)",
        "commonTraps": "Typically very small (microfarads or picofarads)."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Plate Area (A)",
        "commonTraps": "Convert cm² to m² (divide by 10,000)."
      },
      {
        "id": "d",
        "siUnit": "m",
        "altUnits": "",
        "description": "Plate Separation (d)",
        "commonTraps": "Convert mm to m."
      }
    ],
    "solvingLogic": [
      "1. Identify the knowns (C, A, or d).",
      "2. Use ε₀ ≈ 8.854 × 10⁻¹² F/m.",
      "3. To solve for C, use C = ε₀A / d."
    ],
    "edgeCases": [
      {
        "title": "Zero Separation",
        "description": "If d = 0, plates touch and short out."
      }
    ],
    "walkthroughExample": {
      "problem": "Find C for 0.05 m² plates separated by 2 mm.",
      "solution": [
        "A = 0.05, d = 0.002.",
        "C = ε₀(0.05)/0.002 = 2.21 × 10⁻¹⁰ F."
      ],
      "answer": "C ≈ 221 pF"
    }
  },

  "resistivity": {
    "intuition": "Resistivity connects the material property (ρ) to the actual physical resistance of a wire, depending on its length and cross-sectional area.",
    "variableBreakdown": [
      {
        "id": "R",
        "siUnit": "Ω",
        "altUnits": "",
        "description": "Resistance (R)",
        "commonTraps": "Make sure to measure the entire length of the conductor."
      },
      {
        "id": "rho",
        "siUnit": "Ω·m",
        "altUnits": "",
        "description": "Resistivity (ρ)",
        "commonTraps": "Intrinsic to the material, often temperature dependent."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Length (L)",
        "commonTraps": "Ensure it is in meters."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Cross-sectional Area (A)",
        "commonTraps": "Area must be in m². For a circular wire, A = πr²."
      }
    ],
    "solvingLogic": [
      "1. Identify knowns.",
      "2. Make sure A is in m².",
      "3. R = ρL / A."
    ],
    "edgeCases": [
      {
        "title": "Thick Wire",
        "description": "Very large area makes resistance negligible."
      }
    ],
    "walkthroughExample": {
      "problem": "Find R for a copper wire (ρ=1.68×10⁻⁸) 10m long with A=2×10⁻⁶ m².",
      "solution": [
        "R = (1.68×10⁻⁸)(10) / (2×10⁻⁶) = 0.084 Ω."
      ],
      "answer": "R = 0.084 Ω"
    }
  },

  "series-parallel-cap": {
    "intuition": "Capacitors in parallel add up directly, while capacitors in series add up inversely.",
    "variableBreakdown": [
      {
        "id": "type",
        "siUnit": "",
        "altUnits": "",
        "description": "0=Series, 1=Parallel",
        "commonTraps": "Ensure you select the right configuration."
      },
      {
        "id": "c1",
        "siUnit": "F",
        "altUnits": "",
        "description": "Capacitor 1",
        "commonTraps": "Must be in the same units."
      },
      {
        "id": "c2",
        "siUnit": "F",
        "altUnits": "",
        "description": "Capacitor 2",
        "commonTraps": "Must be in the same units."
      },
      {
        "id": "c3",
        "siUnit": "F",
        "altUnits": "",
        "description": "Capacitor 3",
        "commonTraps": "Must be in the same units."
      }
    ],
    "solvingLogic": [
      "1. Check the type.",
      "2. For Parallel: C_eq = C1 + C2 + C3.",
      "3. For Series: 1/C_eq = 1/C1 + 1/C2 + 1/C3."
    ],
    "edgeCases": [
      {
        "title": "One Zero Capacitor",
        "description": "In series, a zero capacitance breaks the circuit."
      }
    ],
    "walkthroughExample": {
      "problem": "Find equivalent capacitance of 2F and 3F in parallel.",
      "solution": [
        "Type = 1 (Parallel).",
        "C_eq = 2 + 3 = 5 F."
      ],
      "answer": "C_eq = 5 F"
    }
  },

  "motional-emf": {
    "intuition": "Motional EMF describes the voltage generated across a conductor moving through a magnetic field.",
    "variableBreakdown": [
      {
        "id": "emf",
        "siUnit": "V",
        "altUnits": "",
        "description": "Induced EMF",
        "commonTraps": "The EMF is generated only if velocity is perpendicular to the B-field."
      },
      {
        "id": "B",
        "siUnit": "T",
        "altUnits": "",
        "description": "Magnetic Field",
        "commonTraps": "Ensure it is in Tesla."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Conductor Length",
        "commonTraps": "Must be the length inside the magnetic field."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity",
        "commonTraps": "Ensure it is in m/s."
      }
    ],
    "solvingLogic": [
      "1. Identify known variables.",
      "2. Check units.",
      "3. Use formula: EMF = B · L · v."
    ],
    "edgeCases": [
      {
        "title": "Parallel Motion",
        "description": "If velocity is parallel to B-field, no EMF is induced."
      }
    ],
    "walkthroughExample": {
      "problem": "Find EMF of a 2m rod moving at 5m/s in a 0.1T field.",
      "solution": [
        "EMF = B·L·v = (0.1)(2)(5) = 1 V."
      ],
      "answer": "EMF = 1 V"
    }
  }
};
