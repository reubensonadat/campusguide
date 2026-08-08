export const fluid_mechanics = {
  "bernoulli": {
    "intuition": "Bernoulli's equation is essentially the conservation of energy for flowing fluids. It states that an increase in a fluid's speed occurs simultaneously with a decrease in pressure or a decrease in the fluid's potential energy.",
    "variableBreakdown": [
      {
        "id": "P1",
        "siUnit": "Pa",
        "altUnits": "atm",
        "description": "Initial Pressure (P₁)",
        "commonTraps": "Must be in Pascals (N/m²) to work correctly with density in kg/m³."
      },
      {
        "id": "v1",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity (v₁)",
        "commonTraps": "Square this value in the formula!"
      },
      {
        "id": "h1",
        "siUnit": "m",
        "altUnits": "",
        "description": "Initial Height (h₁)",
        "commonTraps": "Measured from a consistent reference point."
      },
      {
        "id": "P2",
        "siUnit": "Pa",
        "altUnits": "atm",
        "description": "Final Pressure (P₂)",
        "commonTraps": "Must match units of P₁."
      },
      {
        "id": "v2",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Final Velocity (v₂)",
        "commonTraps": "Square this value in the formula!"
      },
      {
        "id": "h2",
        "siUnit": "m",
        "altUnits": "",
        "description": "Final Height (h₂)",
        "commonTraps": "Must match units of h₁."
      }
    ],
    "solvingLogic": [
      "1. Identify the two points in the fluid flow.",
      "2. The equation is: P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂.",
      "3. Assume density (ρ) and gravity (g = 9.81 m/s²) are constants.",
      "4. Eliminate any terms that are zero (e.g., if height is constant, ρgh terms cancel out).",
      "5. Solve algebraically for the unknown."
    ],
    "edgeCases": [
      {
        "title": "Static Fluid",
        "description": "If the fluid is not moving (v₁ = v₂ = 0), the equation simplifies to the hydrostatic pressure formula: P₁ - P₂ = ρg(h₂ - h₁)."
      }
    ],
    "walkthroughExample": {
      "problem": "Water (ρ=1000 kg/m³) flows horizontally. At point 1, P₁=101300 Pa and v₁=2 m/s. At point 2, v₂=5 m/s. Find P₂.",
      "solution": [
        "Since flow is horizontal, h₁ = h₂, so the ρgh terms cancel.",
        "P₁ + ½ρv₁² = P₂ + ½ρv₂².",
        "101300 + 0.5(1000)(2²) = P₂ + 0.5(1000)(5²).",
        "101300 + 2000 = P₂ + 12500.",
        "103300 = P₂ + 12500 -> P₂ = 90800 Pa."
      ],
      "answer": "P₂ = 90800 Pa"
    }
  },

  "archimedes": {
    "intuition": "Archimedes' Principle states that the upward buoyant force exerted on a body immersed in a fluid is equal to the weight of the fluid that the body displaces. This is why boats float!",
    "variableBreakdown": [
      {
        "id": "Fb",
        "siUnit": "N",
        "altUnits": "",
        "description": "Buoyant Force (Fb)",
        "commonTraps": "Always points straight up, opposing gravity."
      },
      {
        "id": "rho",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Fluid Density (ρ)",
        "commonTraps": "Use the density of the FLUID, not the object!"
      },
      {
        "id": "V",
        "siUnit": "m³",
        "altUnits": "L",
        "description": "Displaced Volume (V)",
        "commonTraps": "The volume of the fluid displaced, which equals the submerged volume of the object."
      }
    ],
    "solvingLogic": [
      "1. Identify the density of the fluid (ρ) and the volume of the object that is submerged (V).",
      "2. Use gravity g = 9.81 m/s².",
      "3. Calculate the buoyant force: Fb = ρ × V × g."
    ],
    "edgeCases": [
      {
        "title": "Floating vs Sinking",
        "description": "If Fb is greater than the object's weight (mg), it floats. If Fb is less, it sinks. If Fb equals the weight, it is neutrally buoyant."
      }
    ],
    "walkthroughExample": {
      "problem": "A 0.5 m³ block is fully submerged in water (ρ = 1000 kg/m³). Find the buoyant force.",
      "solution": [
        "ρ = 1000, V = 0.5, g = 9.81.",
        "Fb = 1000 × 0.5 × 9.81.",
        "Fb = 500 × 9.81 = 4905 N."
      ],
      "answer": "Fb = 4905 N"
    }
  },

  "continuity": {
    "intuition": "The Equation of Continuity states that for an incompressible fluid, the mass flow rate must remain constant. If a pipe gets narrower, the fluid MUST speed up to get the same amount of fluid through in the same time.",
    "variableBreakdown": [
      {
        "id": "A1",
        "siUnit": "m²",
        "altUnits": "cm²",
        "description": "Initial Cross-sectional Area (A₁)",
        "commonTraps": "If given a radius or diameter, you must calculate the area first (A = πr²)."
      },
      {
        "id": "v1",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Initial Velocity (v₁)",
        "commonTraps": "Match units with v₂."
      },
      {
        "id": "A2",
        "siUnit": "m²",
        "altUnits": "cm²",
        "description": "Final Cross-sectional Area (A₂)",
        "commonTraps": "Match units with A₁."
      },
      {
        "id": "v2",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Final Velocity (v₂)",
        "commonTraps": "Match units with v₁."
      }
    ],
    "solvingLogic": [
      "1. Check that A₁ and A₂ have the same units.",
      "2. Use A₁ × v₁ = A₂ × v₂.",
      "3. Rearrange to isolate the unknown variable."
    ],
    "edgeCases": [
      {
        "title": "Compressible Gases",
        "description": "This simple equation A₁v₁ = A₂v₂ only holds true for incompressible fluids (liquids). For gases undergoing significant pressure changes, density must be included: ρ₁A₁v₁ = ρ₂A₂v₂."
      }
    ],
    "walkthroughExample": {
      "problem": "Water flows through a 0.2 m² pipe at 3 m/s. It enters a narrower pipe of 0.05 m². Find the new velocity.",
      "solution": [
        "A₁ = 0.2, v₁ = 3, A₂ = 0.05.",
        "0.2 × 3 = 0.05 × v₂.",
        "0.6 = 0.05 × v₂.",
        "v₂ = 0.6 / 0.05 = 12 m/s."
      ],
      "answer": "v₂ = 12 m/s"
    }
  },

  "poiseuille": {
    "intuition": "Poiseuille's Law describes the smooth (laminar) flow of a viscous fluid through a pipe. Flow rate is extremely sensitive to the pipe's radius (it depends on radius to the 4th power!).",
    "variableBreakdown": [
      {
        "id": "Q",
        "siUnit": "m³/s",
        "altUnits": "L/s",
        "description": "Volumetric Flow Rate (Q)",
        "commonTraps": "Volume over time."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "cm, mm",
        "description": "Radius of the Pipe (r)",
        "commonTraps": "Must be raised to the 4th power! If you double the radius, flow increases by 16x."
      },
      {
        "id": "dP",
        "siUnit": "Pa",
        "altUnits": "",
        "description": "Pressure Difference (ΔP)",
        "commonTraps": "The driving force pushing the fluid (P_start - P_end)."
      },
      {
        "id": "eta",
        "siUnit": "Pa·s",
        "altUnits": "",
        "description": "Dynamic Viscosity (η)",
        "commonTraps": "How 'thick' the fluid is. Honey has a high viscosity; water has a low viscosity."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Length of the Pipe (L)",
        "commonTraps": "Longer pipes resist flow more, meaning less flow rate."
      }
    ],
    "solvingLogic": [
      "1. Identify all variables and ensure they are in standard SI units (m, Pa, Pa·s).",
      "2. Calculate the numerator: π × r⁴ × ΔP.",
      "3. Calculate the denominator: 8 × η × L.",
      "4. Divide the numerator by the denominator to find Q."
    ],
    "edgeCases": [
      {
        "title": "Turbulent Flow",
        "description": "Poiseuille's Law only applies to slow, smooth (laminar) flow. If the flow is too fast, it becomes turbulent and this equation is no longer accurate."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate Q given r = 0.1 m, ΔP = 1000 Pa, η = 0.001 Pa·s (water), and L = 10 m.",
      "solution": [
        "Numerator: π × (0.1)⁴ × 1000 = π × 0.0001 × 1000 = 0.1π ≈ 0.314.",
        "Denominator: 8 × 0.001 × 10 = 0.08.",
        "Q = 0.314 / 0.08 ≈ 3.925 m³/s."
      ],
      "answer": "Q ≈ 3.925 m³/s"
    }
  }
};
