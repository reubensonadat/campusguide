export const civil_structural_engineering = {
  "stress": {
    "intuition": "Stress measures how much a material feels a force internally. A large force over a large area might be harmless, but the same force concentrated on a tiny area (high stress) could cause it to break.",
    "variableBreakdown": [
      {
        "id": "sigma",
        "siUnit": "Pa",
        "altUnits": "MPa",
        "description": "Stress (σ)",
        "commonTraps": "A Pascal is 1 N/m². Civil engineering often uses MegaPascals (MPa = 10⁶ Pa)."
      },
      {
        "id": "F",
        "siUnit": "N",
        "altUnits": "kN",
        "description": "Force (F)",
        "commonTraps": "Must be the internal force acting perpendicular to the cross-section."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "mm²",
        "description": "Cross-Sectional Area (A)",
        "commonTraps": "Watch out for mm². 1 mm² = 10⁻⁶ m²."
      }
    ],
    "solvingLogic": [
      "1. Ensure Force is in Newtons and Area is in m².",
      "2. Calculate σ = F / A.",
      "3. The result is in Pascals."
    ],
    "edgeCases": [
      {
        "title": "Tension vs Compression",
        "description": "By convention, tensile stress (pulling apart) is positive, and compressive stress (pushing together) is negative."
      }
    ],
    "walkthroughExample": {
      "problem": "A 50,000 N force pulls on a steel rod with area 0.005 m². Find the stress.",
      "solution": [
        "σ = F / A",
        "σ = 50000 / 0.005 = 10,000,000 Pa."
      ],
      "answer": "σ = 10 MPa"
    }
  },

  "strain": {
    "intuition": "Strain is the physical deformation or stretching of a material in response to stress. It is a ratio of how much it stretched compared to its original length.",
    "variableBreakdown": [
      {
        "id": "epsilon",
        "siUnit": "",
        "altUnits": "%",
        "description": "Strain (ε)",
        "commonTraps": "Unitless because it is length divided by length. Often expressed as a percentage or in microstrain (μɛ)."
      },
      {
        "id": "dL",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Change in Length (ΔL)",
        "commonTraps": "Final length minus initial length."
      },
      {
        "id": "L0",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Original Length (L₀)",
        "commonTraps": "Must be the exact same units as ΔL."
      }
    ],
    "solvingLogic": [
      "1. Ensure ΔL and L₀ are in the same units.",
      "2. Calculate ε = ΔL / L₀."
    ],
    "edgeCases": [
      {
        "title": "Negative Strain",
        "description": "If the material is compressed, ΔL is negative, resulting in a negative strain."
      }
    ],
    "walkthroughExample": {
      "problem": "A 2 m long bar stretches by 0.01 m. Find the strain.",
      "solution": [
        "ε = 0.01 / 2 = 0.005."
      ],
      "answer": "ε = 0.005 (or 0.5%)"
    }
  },

  "euler-buckling": {
    "intuition": "Euler's critical load is the maximum compressive load a long, slender column can take before it suddenly bows outward (buckles) and collapses.",
    "variableBreakdown": [
      {
        "id": "Pcr",
        "siUnit": "N",
        "altUnits": "kN",
        "description": "Critical Buckling Load (Pcr)",
        "commonTraps": "If applied load exceeds this, the column fails by buckling."
      },
      {
        "id": "E",
        "siUnit": "Pa",
        "altUnits": "GPa",
        "description": "Young's Modulus (E)",
        "commonTraps": "Material stiffness. Steel is ~200 GPa."
      },
      {
        "id": "I",
        "siUnit": "m⁴",
        "altUnits": "mm⁴",
        "description": "Area Moment of Inertia (I)",
        "commonTraps": "Columns buckle along their weakest axis (the minimum I value)."
      },
      {
        "id": "K",
        "siUnit": "",
        "altUnits": "",
        "description": "Effective Length Factor (K)",
        "commonTraps": "Depends on support conditions (e.g., pinned-pinned K=1, fixed-free K=2)."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Actual Length (L)",
        "commonTraps": "Must be in meters."
      }
    ],
    "solvingLogic": [
      "1. Calculate the effective length (KL) and square it: (KL)².",
      "2. Multiply π² × E × I.",
      "3. Divide by (KL)² to find Pcr."
    ],
    "edgeCases": [
      {
        "title": "Short Columns",
        "description": "Euler's formula only works for long, slender columns. Short columns will crush (material failure) before they buckle."
      }
    ],
    "walkthroughExample": {
      "problem": "Find Pcr for a pinned-pinned (K=1) column. E = 200×10⁹ Pa, I = 5×10⁻⁶ m⁴, L = 10 m.",
      "solution": [
        "Numerator: π² × (200×10⁹) × (5×10⁻⁶) ≈ 9,869,600.",
        "Denominator: (1 × 10)² = 100.",
        "Pcr = 9,869,600 / 100 = 98,696 N."
      ],
      "answer": "Pcr ≈ 98.7 kN"
    }
  },

  "soil-porosity": {
    "intuition": "Porosity is the fraction of a soil's total volume that is made up of empty space (voids) which can hold water or air.",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "%",
        "description": "Porosity (n)",
        "commonTraps": "Always a decimal between 0 and 1, often presented as a percentage."
      },
      {
        "id": "Vv",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Volume of Voids (Vv)",
        "commonTraps": "Space taken up by air and water combined."
      },
      {
        "id": "Vt",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Total Volume (Vt)",
        "commonTraps": "Total volume of the soil sample (Voids + Solids)."
      }
    ],
    "solvingLogic": [
      "1. Ensure Vv and Vt have the same units.",
      "2. Calculate n = Vv / Vt."
    ],
    "edgeCases": [
      {
        "title": "Theoretical Limits",
        "description": "Porosity cannot be greater than 1 (100% voids means no soil exists) and cannot be less than 0."
      }
    ],
    "walkthroughExample": {
      "problem": "A soil sample has a total volume of 100 cm³ and contains 30 cm³ of empty space. Find n.",
      "solution": [
        "n = 30 / 100 = 0.3."
      ],
      "answer": "n = 0.3 (or 30%)"
    }
  },

  "soil-void-ratio": {
    "intuition": "Void ratio compares the volume of empty space directly to the volume of the solid soil particles. Unlike porosity, void ratio can be greater than 1.",
    "variableBreakdown": [
      {
        "id": "e",
        "siUnit": "",
        "altUnits": "",
        "description": "Void Ratio (e)",
        "commonTraps": "Unitless. Commonly used in settlement and consolidation calculations."
      },
      {
        "id": "Vv",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Volume of Voids (Vv)",
        "commonTraps": "Volume of air + water."
      },
      {
        "id": "Vs",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Volume of Solids (Vs)",
        "commonTraps": "Volume of just the solid soil grains (Vt - Vv)."
      }
    ],
    "solvingLogic": [
      "1. Calculate e = Vv / Vs.",
      "2. Relationship to porosity: e = n / (1 - n)."
    ],
    "edgeCases": [
      {
        "title": "Highly Organic Soils",
        "description": "Peat and highly organic soils can have void ratios of 5 or more, meaning they are mostly water and air!"
      }
    ],
    "walkthroughExample": {
      "problem": "A sample has 40 cm³ of voids and 60 cm³ of solids. Find void ratio e.",
      "solution": [
        "e = 40 / 60 = 0.667."
      ],
      "answer": "e = 0.667"
    }
  },

  "bending-stress": {
    "intuition": "When a beam bends under a load, the top compresses and the bottom stretches (or vice versa). Bending stress calculates exactly how much stress exists at a specific distance from the beam's neutral center.",
    "variableBreakdown": [
      {
        "id": "sigma",
        "siUnit": "Pa",
        "altUnits": "MPa",
        "description": "Bending Stress (σ)",
        "commonTraps": "Maximum stress occurs at the extreme top or bottom edge of the beam."
      },
      {
        "id": "M",
        "siUnit": "N·m",
        "altUnits": "",
        "description": "Bending Moment (M)",
        "commonTraps": "The internal moment at the specific cross-section you are analyzing."
      },
      {
        "id": "y",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Distance to Neutral Axis (y)",
        "commonTraps": "Distance from the center (neutral axis) to the point where you want to know the stress."
      },
      {
        "id": "I",
        "siUnit": "m⁴",
        "altUnits": "mm⁴",
        "description": "Area Moment of Inertia (I)",
        "commonTraps": "Geometric property of the beam's shape."
      }
    ],
    "solvingLogic": [
      "1. Ensure M is in N·m, y is in meters, and I is in m⁴.",
      "2. Calculate σ = (M × y) / I."
    ],
    "edgeCases": [
      {
        "title": "Neutral Axis",
        "description": "At the exact center of a symmetric bending beam (y = 0), the bending stress is zero!"
      }
    ],
    "walkthroughExample": {
      "problem": "Find the maximum stress (y = 0.1m) on a beam with M = 5000 N·m and I = 0.0002 m⁴.",
      "solution": [
        "σ = (5000 × 0.1) / 0.0002",
        "σ = 500 / 0.0002 = 2,500,000 Pa."
      ],
      "answer": "σ = 2.5 MPa"
    }
  },

  "deflection-beam": {
    "intuition": "Calculates how much a simply supported beam will sag exactly in the middle when a point load is placed directly on its center.",
    "variableBreakdown": [
      {
        "id": "delta",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Max Deflection (δ)",
        "commonTraps": "Usually a very small number, often converted to mm for readability."
      },
      {
        "id": "P",
        "siUnit": "N",
        "altUnits": "",
        "description": "Point Load (P)",
        "commonTraps": "The weight pressing down on the middle."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Beam Length (L)",
        "commonTraps": "Must be cubed in the formula (L³)."
      },
      {
        "id": "E",
        "siUnit": "Pa",
        "altUnits": "GPa",
        "description": "Young's Modulus (E)",
        "commonTraps": "Must be in Pascals."
      },
      {
        "id": "I",
        "siUnit": "m⁴",
        "altUnits": "",
        "description": "Area Moment of Inertia (I)",
        "commonTraps": "Geometric stiffness of the beam shape."
      }
    ],
    "solvingLogic": [
      "1. Ensure units are standard (N, m, Pa, m⁴).",
      "2. Calculate numerator: P × L³.",
      "3. Calculate denominator: 48 × E × I.",
      "4. δ = Numerator / Denominator."
    ],
    "edgeCases": [
      {
        "title": "Uniformly Distributed Load",
        "description": "If the weight is spread evenly across the beam instead of a single point, the formula changes completely to δ = (5wL⁴) / (384EI)."
      }
    ],
    "walkthroughExample": {
      "problem": "P = 1000 N, L = 4 m, E = 200×10⁹ Pa, I = 0.0001 m⁴. Find deflection.",
      "solution": [
        "Numerator: 1000 × (4³) = 64,000.",
        "Denominator: 48 × 200×10⁹ × 0.0001 = 960,000,000.",
        "δ = 64,000 / 960,000,000 ≈ 0.0000667 m (0.067 mm)."
      ],
      "answer": "δ ≈ 0.067 mm"
    }
  },

  "young-modulus": {
    "intuition": "Young's Modulus (E) is the stiffness of a solid material. It tells you how much a material will stretch (strain) when subjected to a certain force (stress). High E means stiff (steel), low E means stretchy (rubber).",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "Pa",
        "altUnits": "GPa",
        "description": "Young's Modulus (E)",
        "commonTraps": "Often huge (GigaPascals). Only valid in the linear elastic region."
      },
      {
        "id": "sigma",
        "siUnit": "Pa",
        "altUnits": "",
        "description": "Stress (σ)",
        "commonTraps": "Force / Area."
      },
      {
        "id": "eps",
        "siUnit": "",
        "altUnits": "",
        "description": "Strain (ε)",
        "commonTraps": "Unitless. (ΔL / L₀)."
      }
    ],
    "solvingLogic": [
      "1. Calculate Stress (σ) if not given.",
      "2. Calculate Strain (ε) if not given.",
      "3. E = σ / ε."
    ],
    "edgeCases": [
      {
        "title": "Yield Point",
        "description": "If the stress goes past the material's 'yield point', the material stretches permanently (plastic deformation), and Young's Modulus no longer applies."
      }
    ],
    "walkthroughExample": {
      "problem": "A material undergoes 1,000,000 Pa of stress and exhibits 0.001 strain. Find E.",
      "solution": [
        "E = 1,000,000 / 0.001 = 1,000,000,000 Pa (1 GPa)."
      ],
      "answer": "E = 1 GPa"
    }
  },

  "safety-factor": {
    "intuition": "Factor of Safety (FoS) is a multiplier used to design structures stronger than they strictly need to be to account for unexpected loads, material flaws, or wear over time.",
    "variableBreakdown": [
      {
        "id": "FoS",
        "siUnit": "",
        "altUnits": "",
        "description": "Factor of Safety (FoS)",
        "commonTraps": "Must be > 1.0 for a design to be considered safe."
      },
      {
        "id": "sU",
        "siUnit": "Pa",
        "altUnits": "MPa",
        "description": "Ultimate Stress / Strength",
        "commonTraps": "The maximum stress the material can take before breaking or failing."
      },
      {
        "id": "sA",
        "siUnit": "Pa",
        "altUnits": "MPa",
        "description": "Allowable / Applied Stress",
        "commonTraps": "The actual stress the design is expected to experience in the real world."
      }
    ],
    "solvingLogic": [
      "1. Ensure sU and sA are in the same units.",
      "2. FoS = sU / sA."
    ],
    "edgeCases": [
      {
        "title": "Aerospace vs Civil",
        "description": "Buildings typically use a FoS of 2 to 3. Airplanes use a much lower FoS (around 1.5) to save weight, relying on intense material testing instead."
      }
    ],
    "walkthroughExample": {
      "problem": "A steel cable breaks at 500 MPa. It is used in an elevator where it will experience 100 MPa. Find the FoS.",
      "solution": [
        "FoS = 500 / 100 = 5."
      ],
      "answer": "FoS = 5"
    }
  }
};
