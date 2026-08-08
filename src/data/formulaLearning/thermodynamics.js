export const thermodynamics = {
  "ideal-gas": {
    intuition: "The Ideal Gas Law relates pressure, volume, temperature, and moles of an ideal gas. It combines Boyle's, Charles's, and Avogadro's laws into a single equation of state.",
    variableBreakdown: [
      {
        id: "P",
        siUnit: "Pa",
        altUnits: "",
        description: "Pressure of the gas, measured in pascals (Pa).",
        commonTraps: "Ensure pressure is absolute, not gauge; convert from atm to Pa using 1 atm = 101325 Pa."
      },
      {
        id: "V",
        siUnit: "m³",
        altUnits: "",
        description: "Volume occupied by the gas, measured in cubic meters (m³).",
        commonTraps: "Convert from liters to m³ using 1 L = 0.001 m³; ensure volume is positive."
      },
      {
        id: "n",
        siUnit: "mol",
        altUnits: "",
        description: "Amount of substance, measured in moles (mol).",
        commonTraps: "Moles must be positive; do not confuse with mass (use molar mass to convert)."
      },
      {
        id: "T",
        siUnit: "K",
        altUnits: "",
        description: "Absolute temperature of the gas, measured in kelvin (K).",
        commonTraps: "Always use kelvin; convert from Celsius using T(K) = T(°C) + 273.15."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (P, V, n, or T).",
      "2. Write the Ideal Gas Law: PV = nRT, where R = 8.314 J/(mol·K).",
      "3. Ensure all inputs are in SI units: pressure in Pa, volume in m³, moles in mol, temperature in K.",
      "4. Rearrange the equation to isolate the target variable.",
      "5. Substitute the known values and compute the result.",
      "6. Verify the result is physically reasonable (e.g., positive pressure, volume)."
    ],
    edgeCases: [
      {
        title: "Zero Moles or Volume",
        description: "If n = 0 or V = 0, the product nV is zero, making temperature or pressure undefined unless the other variable is infinite."
      },
      {
        title: "Zero Temperature",
        description: "If T = 0 K, the ideal gas law predicts zero pressure or volume, which is unphysical as real gases condense before reaching absolute zero."
      },
      {
        title: "High Pressure Deviation",
        description: "At pressures above ~10 atm, real gases deviate from ideal behavior due to intermolecular forces; use van der Waals equation for accuracy."
      },
      {
        title: "Low Temperature Deviation",
        description: "Near condensation temperatures, real gases deviate as they liquefy; the ideal gas law overestimates volume."
      }
    ],
    walkthroughExample: {
      problem: "A gas occupies 0.02 m³ at 300 K and contains 0.5 moles. Calculate its pressure in pascals.",
      solution: [
        "Use P = nRT / V.",
        "Substitute: n = 0.5 mol, R = 8.314 J/(mol·K), T = 300 K, V = 0.02 m³.",
        "Compute numerator: 0.5 × 8.314 × 300 = 1247.1.",
        "Divide by volume: 1247.1 / 0.02 = 62355 Pa.",
        "The pressure is 62355 Pa (about 0.615 atm)."
      ],
      "answer": "P ≈ 6.24 × 10⁴ Pa"
    }
  },

  "heat-transfer": {
    intuition: "Heat transfer via specific heat quantifies the energy required to change the temperature of a substance, depending on its mass and specific heat capacity.",
    variableBreakdown: [
      {
        id: "Q",
        siUnit: "J",
        altUnits: "",
        description: "Heat energy transferred, measured in joules (J).",
        commonTraps: "Heat added is positive; heat removed is negative. Ensure consistent sign convention."
      },
      {
        id: "m",
        siUnit: "kg",
        altUnits: "",
        description: "Mass of the substance, measured in kilograms (kg).",
        commonTraps: "Mass must be positive; convert from grams to kg using 1 g = 0.001 kg."
      },
      {
        id: "c",
        siUnit: "J/(kg·K)",
        altUnits: "",
        description: "Specific heat capacity, the energy per unit mass per kelvin, measured in J/(kg·K).",
        commonTraps: "Specific heat is always positive; values vary by material (e.g., water ≈ 4184 J/(kg·K))."
      },
      {
        id: "dT",
        siUnit: "K",
        altUnits: "",
        description: "Temperature change, measured in kelvin (K). Note: ΔT in K equals ΔT in °C.",
        commonTraps: "Temperature change can be positive (heating) or negative (cooling); use absolute value for magnitude calculations."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (Q, m, c, or ΔT).",
      "2. Write the heat transfer formula: Q = m · c · ΔT.",
      "3. Ensure mass is in kg, specific heat in J/(kg·K), and temperature change in K (or °C, as the magnitude is the same).",
      "4. Rearrange the equation to solve for the desired variable.",
      "5. Substitute the known values, paying attention to signs.",
      "6. Compute the result and verify units are joules."
    ],
    edgeCases: [
      {
        title: "Zero Mass",
        description: "If mass m = 0, no heat is required to change temperature, regardless of specific heat or ΔT."
      },
      {
        title: "Zero Specific Heat",
        description: "If specific heat c = 0, the substance cannot store thermal energy; Q = 0 for any m and ΔT (unphysical for real materials)."
      },
      {
        title: "Zero Temperature Change",
        description: "If ΔT = 0, no heat is transferred (Q = 0) regardless of mass or specific heat."
      },
      {
        title: "Very Large Temperature Change",
        description: "Large ΔT may exceed the material's melting or boiling point, causing phase change; the formula only applies to sensible heat within a single phase."
      }
    ],
    walkthroughExample: {
      problem: "How much heat is required to raise the temperature of 2 kg of water from 20°C to 80°C? (Specific heat of water = 4184 J/(kg·K)).",
      solution: [
        "Compute temperature change: ΔT = 80°C - 20°C = 60 K.",
        "Use Q = m · c · ΔT = 2 kg × 4184 J/(kg·K) × 60 K.",
        "Calculate: 2 × 4184 = 8368; 8368 × 60 = 502080 J.",
        "The required heat is 502080 J (about 502 kJ)."
      ],
      "answer": "Q = 5.02 × 10⁵ J"
    }
  },

  "carnot": {
    intuition: "Carnot efficiency gives the maximum possible efficiency of a heat engine operating between two temperatures, based on the second law of thermodynamics.",
    variableBreakdown: [
      {
        id: "eta",
        siUnit: "",
        altUnits: "",
        description: "Efficiency of the Carnot engine, a dimensionless fraction (often expressed as a percentage).",
        commonTraps: "Efficiency must be between 0 and 1 (or 0% and 100%); eta = 1 - Tc/Th."
      },
      {
        id: "Tc",
        siUnit: "K",
        altUnits: "",
        description: "Absolute temperature of the cold reservoir, measured in kelvin (K).",
        commonTraps: "Cold temperature must be less than hot temperature (Tc < Th) and non-negative."
      },
      {
        id: "Th",
        siUnit: "K",
        altUnits: "",
        description: "Absolute temperature of the hot reservoir, measured in kelvin (K).",
        commonTraps: "Hot temperature must be positive and greater than the cold temperature (Th > Tc)."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (η, Tc, or Th).",
      "2. Write the Carnot efficiency formula: η = 1 - Tc/Th.",
      "3. Ensure both temperatures are in absolute units (kelvin).",
      "4. Rearrange the equation to isolate the target variable:",
      "   - For η: η = 1 - Tc/Th",
      "   - For Tc: Tc = Th(1 - η)",
      "   - For Th: Th = Tc / (1 - η)",
      "5. Substitute the known values and compute.",
      "6. Verify the efficiency is between 0 and 1 (or 0% and 100%)."
    ],
    edgeCases: [
      {
        title: "Equal Temperatures",
        description: "If Tc = Th, then η = 0; no work can be extracted because there is no temperature difference."
      },
      {
        title: "Zero Cold Temperature",
        description: "If Tc = 0 K, η = 1 (100% efficiency), which is theoretically possible only if absolute zero is reachable (unattainable in practice)."
      },
      {
        title: "Hot Temperature Approaching Infinity",
        description: "As Th → ∞, η → 1; however, infinite temperature is unphysical, and materials would break down before such extremes."
      },
      {
        title: "Efficiency Greater Than One",
        description: "If η ≥ 1, the formula gives Tc ≤ 0, which is impossible for a physical cold reservoir; indicates an error in input."
      }
    ],
    walkthroughExample: {
      problem: "A Carnot engine operates between a hot reservoir at 500 K and a cold reservoir at 300 K. Calculate its maximum efficiency.",
      solution: [
        "Use η = 1 - Tc/Th.",
        "Substitute Tc = 300 K, Th = 500 K.",
        "Compute Tc/Th = 300/500 = 0.6.",
        "Then η = 1 - 0.6 = 0.4.",
        "Convert to percentage: 0.4 × 100% = 40%."
      ],
      "answer": "η = 0.40 or 40%"
    }
  },

  "stefan-boltzmann": {
    intuition: "The Stefan-Boltzmann law states that the total energy radiated per unit surface area of a black body is proportional to the fourth power of its absolute temperature.",
    variableBreakdown: [
      {
        id: "P",
        siUnit: "W",
        altUnits: "",
        description: "Radiated power, measured in watts (W).",
        commonTraps: "Power is the total energy radiated per second; ensure surface area is in m² and temperature in K."
      },
      {
        id: "e",
        siUnit: "",
        altUnits: "",
        description: "Emissivity, a dimensionless factor between 0 and 1 indicating how well a surface radiates compared to a black body.",
        commonTraps: "Emissivity must be in [0,1]; a perfect black body has e = 1, a perfect reflector has e = 0."
      },
      {
        id: "A",
        siUnit: "m²",
        altUnits: "",
        description: "Surface area of the radiating object, measured in square meters (m²).",
        commonTraps: "Area must be positive; for complex shapes, use the total surface area emitting radiation."
      },
      {
        id: "T",
        siUnit: "K",
        altUnits: "",
        description: "Absolute temperature of the object, measured in kelvin (K).",
        commonTraps: "Temperature must be in kelvin; convert from Celsius using T(K) = T(°C) + 273.15. The law depends on T⁴, so small errors in T cause large errors in P."
      }
    ],
    solvingLogic: [
      "1. Identify the unknown variable (P, e, A, or T).",
      "2. Write the Stefan-Boltzmann law: P = e · σ · A · T⁴, where σ = 5.67 × 10⁻⁸ W/(m²·K⁴).",
      "3. Ensure emissivity is dimensionless, area in m², and temperature in K.",
      "4. Rearrange the equation to solve for the desired variable.",
      "5. Substitute the known values, computing T⁴ carefully.",
      "6. Compute the result and verify units are watts."
    ],
    edgeCases: [
      {
        title: "Zero Temperature",
        description: "If T = 0 K, the radiated power is zero regardless of emissivity or area (consistent with third law of thermodynamics)."
      },
      {
        title: "Zero Emissivity",
        description: "If e = 0, the object is a perfect reflector and radiates no power (P = 0) regardless of area or temperature."
      },
      {
        title: "Zero Area",
        description: "If A = 0, the object has no surface to radiate from, so P = 0 regardless of other parameters."
      },
      {
        title: "Very High Temperature",
        description: "Because P scales with T⁴, doubling the temperature increases power by a factor of 16; extreme temperatures can lead to enormous radiated power."
      }
    ],
    walkthroughExample: {
      problem: "A spherical black body of radius 0.1 m is at a temperature of 500 K. Calculate its total radiated power. (Emissivity e = 1 for a black body).",
      solution: [
        "Compute surface area of sphere: A = 4πr² = 4π(0.1)² = 4π × 0.01 = 0.12566 m².",
        "Use P = e · σ · A · T⁴ with e = 1, σ = 5.67e-8 W/(m²·K⁴), A = 0.12566 m², T = 500 K.",
        "Compute T⁴ = (500)⁴ = 6.25e10 K⁴.",
        "Then P = 1 × 5.67e-8 × 0.12566 × 6.25e10.",
        "First, 5.67e-8 × 6.25e10 = 3.54375e3.",
        "Then 3.54375e3 × 0.12566 ≈ 445.3 W.",
        "The radiated power is approximately 445 W."
      ],
      "answer": "P ≈ 4.45 × 10² W"
    }
  }
};
