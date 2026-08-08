export const geometry_trigonometry = {
  "circle-sector": {
    "intuition": "A sector is just a slice of a pie. Its area is a fraction of the whole circle's area, and its arc length is a fraction of the whole circumference. Using radians makes the math incredibly simple compared to degrees.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Area of Sector (A)",
        "commonTraps": "Will be wrong if the angle is entered in degrees without converting."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Arc Length (L)",
        "commonTraps": "The curved distance along the edge of the slice."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Radius (r)",
        "commonTraps": "Distance from the center to the edge."
      },
      {
        "id": "theta",
        "siUnit": "rad",
        "altUnits": "°",
        "description": "Central Angle (θ)",
        "commonTraps": "Must be in radians for the simple formulas A = ½r²θ and L = rθ."
      }
    ],
    "solvingLogic": [
      "1. Ensure the angle is in radians (multiply degrees by π/180).",
      "2. For Arc Length: Multiply r × θ.",
      "3. For Area: Multiply ½ × r² × θ."
    ],
    "edgeCases": [
      {
        "title": "Full Circle",
        "description": "If θ = 2π (360°), the area formula becomes ½r²(2π) = πr², perfectly matching the area of a full circle!"
      }
    ],
    "walkthroughExample": {
      "problem": "Find the arc length of a sector with radius 5 m and angle 2 radians.",
      "solution": [
        "L = r × θ",
        "L = 5 × 2 = 10 m."
      ],
      "answer": "L = 10 m"
    }
  },

  "cone": {
    "intuition": "A cone is exactly one-third the volume of a cylinder with the same radius and height. This surprising '1/3' rule applies to all pyramids and cones, regardless of their base shape.",
    "variableBreakdown": [
      {
        "id": "V",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Volume (V)",
        "commonTraps": "Don't forget the 1/3 at the start of the formula!"
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Base Radius (r)",
        "commonTraps": "If you are given the diameter, make sure to divide by 2."
      },
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "",
        "description": "Height (h)",
        "commonTraps": "Must be the vertical height perfectly straight down the center, NOT the 'slant height' down the side."
      }
    ],
    "solvingLogic": [
      "1. Square the radius (r²).",
      "2. Multiply by π to get the area of the circular base.",
      "3. Multiply by the height (h).",
      "4. Divide by 3 (or multiply by 1/3)."
    ],
    "edgeCases": [
      {
        "title": "Slant Height Given",
        "description": "If a problem gives you the slanted side length (l) instead of height (h), you must use the Pythagorean theorem first: h = √(l² - r²)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the volume of a cone with radius 3 m and height 4 m.",
      "solution": [
        "Base Area = π × 3² = 9π.",
        "Multiply by height: 9π × 4 = 36π.",
        "Divide by 3: 36π / 3 = 12π.",
        "V = 12 × 3.14159 ≈ 37.7."
      ],
      "answer": "V ≈ 37.7 m³"
    }
  },

  "law-of-sines": {
    "intuition": "The Law of Sines reveals a perfect ratio built into every triangle (not just right triangles!): the ratio of any side's length to the sine of its opposite angle is exactly the same for all three sides.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "",
        "description": "Side 'a' Length",
        "commonTraps": "Must be the side directly opposite to Angle A."
      },
      {
        "id": "A",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle 'A'",
        "commonTraps": "Make sure your calculator is in the correct degree/radian mode."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "",
        "description": "Side 'b' Length",
        "commonTraps": "Must be the side directly opposite to Angle B."
      },
      {
        "id": "B",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle 'B'",
        "commonTraps": "Must be opposite side b."
      }
    ],
    "solvingLogic": [
      "1. Set up the ratio: a / sin(A) = b / sin(B).",
      "2. To find a missing side (e.g. a): a = b × [sin(A) / sin(B)].",
      "3. To find a missing angle (e.g. A): sin(A) = a × [sin(B) / b], then use inverse sine (arcsin)."
    ],
    "edgeCases": [
      {
        "title": "The Ambiguous Case (SSA)",
        "description": "If you are given two sides and an angle that is NOT between them (Side-Side-Angle), the inverse sine calculation might have TWO valid answers, meaning two different triangles could be drawn with those dimensions."
      }
    ],
    "walkthroughExample": {
      "problem": "Find side 'a' if Angle A is 30°, Angle B is 45°, and side 'b' is 10 m.",
      "solution": [
        "a / sin(30°) = 10 / sin(45°).",
        "a / 0.5 = 10 / 0.7071.",
        "a = 0.5 × (14.14) = 7.07."
      ],
      "answer": "a ≈ 7.07 m"
    }
  },

  "double-angle": {
    "intuition": "Double-angle identities allow you to break down the trigonometric function of a large angle (2θ) into functions of a smaller angle (θ). This is incredibly useful in calculus for simplifying complex integrals.",
    "variableBreakdown": [
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle (θ)",
        "commonTraps": "The formulas are: sin(2θ) = 2sin(θ)cos(θ) and cos(2θ) = cos²(θ) - sin²(θ)."
      }
    ],
    "solvingLogic": [
      "1. Identify the given angle (2θ or θ).",
      "2. Choose the appropriate identity based on what you need to solve.",
      "3. Substitute the values and evaluate."
    ],
    "edgeCases": [
      {
        "title": "Cosine's Multiple Forms",
        "description": "Because sin²(θ) + cos²(θ) = 1, the cosine double angle formula can be rewritten in three different ways: cos²(θ)-sin²(θ), 2cos²(θ)-1, or 1-2sin²(θ). Pick the one that makes your algebra easiest!"
      }
    ],
    "walkthroughExample": {
      "problem": "If sin(θ) = 0.6 and cos(θ) = 0.8, what is sin(2θ)?",
      "solution": [
        "sin(2θ) = 2 × sin(θ) × cos(θ)",
        "sin(2θ) = 2 × 0.6 × 0.8 = 0.96."
      ],
      "answer": "sin(2θ) = 0.96"
    }
  },

  "point-line-distance": {
    "intuition": "Calculates the shortest possible distance (a perpendicular straight line) from a specific point on a graph to an infinitely long line.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient A",
        "commonTraps": "From the line equation Ax + By + C = 0. It is NOT the slope 'm'."
      },
      {
        "id": "B",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient B",
        "commonTraps": "The multiplier for 'y'."
      },
      {
        "id": "C",
        "siUnit": "",
        "altUnits": "",
        "description": "Constant C",
        "commonTraps": "The constant term."
      },
      {
        "id": "x0",
        "siUnit": "",
        "altUnits": "",
        "description": "Point X (x₀)",
        "commonTraps": "The x-coordinate of the standalone point."
      },
      {
        "id": "y0",
        "siUnit": "",
        "altUnits": "",
        "description": "Point Y (y₀)",
        "commonTraps": "The y-coordinate of the standalone point."
      }
    ],
    "solvingLogic": [
      "1. Ensure the line is in standard form: Ax + By + C = 0.",
      "2. Plug x₀ and y₀ into the left side of the equation: Ax₀ + By₀ + C.",
      "3. Take the absolute value of that result (distance can't be negative).",
      "4. Divide by √(A² + B²)."
    ],
    "edgeCases": [
      {
        "title": "Distance is Zero",
        "description": "If the calculated distance is exactly zero, it means the point (x₀, y₀) lies perfectly on the line."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the distance from point (3, 4) to the line 3x + 4y - 10 = 0.",
      "solution": [
        "Numerator: |3(3) + 4(4) - 10| = |9 + 16 - 10| = |15| = 15.",
        "Denominator: √(3² + 4²) = √(9 + 16) = √25 = 5.",
        "Distance = 15 / 5 = 3."
      ],
      "answer": "Distance = 3"
    }
  }
};
