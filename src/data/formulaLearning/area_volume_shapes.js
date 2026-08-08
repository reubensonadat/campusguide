export const area_volume_shapes = {
  "triangle-bh": {
    "intuition": "Every triangle is exactly half of a rectangle (or parallelogram) with the same base and height. If you draw a box around a triangle, the triangle will take up exactly 50% of the space inside the box.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Area (A)",
        "commonTraps": "Will be wrong if you forget to divide by 2."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "",
        "description": "Base (b)",
        "commonTraps": "Any side can be the base, as long as the height is drawn perpendicular to it."
      },
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "",
        "description": "Height (h)",
        "commonTraps": "Must be perpendicular (at a 90° angle) to the chosen base."
      }
    ],
    "solvingLogic": [
      "1. Multiply base × height.",
      "2. Divide by 2 (or multiply by 0.5)."
    ],
    "edgeCases": [
      {
        "title": "Obtuse Triangles",
        "description": "If a triangle leans very far over, its 'height' line might actually fall outside the triangle itself. You still use that perpendicular height."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the area of a triangle with a base of 10 m and a height of 5 m.",
      "solution": [
        "Multiply b × h: 10 × 5 = 50.",
        "Divide by 2: 50 / 2 = 25 m²."
      ],
      "answer": "A = 25 m²"
    }
  },

  "trapezoid": {
    "intuition": "A trapezoid's area is just the average of its two parallel bases multiplied by its height. You're effectively turning it into a rectangle by 'evening out' the slanted sides.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Area (A)",
        "commonTraps": "Result is in squared units."
      },
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "",
        "description": "Top Base (a)",
        "commonTraps": "Must be parallel to the bottom base."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "",
        "description": "Bottom Base (b)",
        "commonTraps": "Must be parallel to the top base."
      },
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "",
        "description": "Height (h)",
        "commonTraps": "The perpendicular distance between the two bases, NOT the slanted side."
      }
    ],
    "solvingLogic": [
      "1. Add the two parallel bases together: (a + b).",
      "2. Divide by 2 to find the average base length.",
      "3. Multiply by the height (h)."
    ],
    "edgeCases": [
      {
        "title": "Rectangle Disguise",
        "description": "If the top base equals the bottom base (a = b), the average is just 'a', and the formula correctly becomes the area of a rectangle (a × h)!"
      }
    ],
    "walkthroughExample": {
      "problem": "Find the area of a trapezoid with top base 4 m, bottom base 6 m, and height 3 m.",
      "solution": [
        "Add bases: 4 + 6 = 10.",
        "Average them: 10 / 2 = 5.",
        "Multiply by height: 5 × 3 = 15 m²."
      ],
      "answer": "A = 15 m²"
    }
  },

  "rect-prism": {
    "intuition": "The volume of a rectangular prism (a standard box) is just finding the area of its base, and then 'stacking' that area upwards through the height.",
    "variableBreakdown": [
      {
        "id": "l",
        "siUnit": "m",
        "altUnits": "",
        "description": "Length (l)",
        "commonTraps": "Make sure l, w, and h are all in the exact same units."
      },
      {
        "id": "w",
        "siUnit": "m",
        "altUnits": "",
        "description": "Width (w)",
        "commonTraps": "Make sure it is perpendicular to the length."
      },
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "",
        "description": "Height (h)",
        "commonTraps": "Make sure it is perpendicular to both length and width."
      }
    ],
    "solvingLogic": [
      "1. Multiply Length × Width to find the floor area.",
      "2. Multiply by Height."
    ],
    "edgeCases": [
      {
        "title": "A Perfect Cube",
        "description": "If length, width, and height are exactly the same, this is a cube, and the formula simplifies to V = s³."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the volume of a box that is 2 m long, 3 m wide, and 4 m high.",
      "solution": [
        "V = l × w × h",
        "V = 2 × 3 × 4 = 24 m³."
      ],
      "answer": "V = 24 m³"
    }
  },

  "pyramid": {
    "intuition": "Just like a cone, a pyramid occupies exactly one-third of the volume of a prism (box) that shares its base and height. The math holds true whether the base is a square, a triangle, or a hexagon.",
    "variableBreakdown": [
      {
        "id": "V",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Volume (V)",
        "commonTraps": "Do not forget the 1/3 at the start."
      },
      {
        "id": "B",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Base Area (B)",
        "commonTraps": "This is already an AREA (m²). If you are given side lengths of a square base, you must calculate B = s² first."
      },
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "",
        "description": "Height (h)",
        "commonTraps": "Must be the vertical height from the center of the base straight up to the tip, NOT the slanted edge."
      }
    ],
    "solvingLogic": [
      "1. Calculate the Base Area (B) if not provided directly.",
      "2. Multiply B × h.",
      "3. Divide by 3."
    ],
    "edgeCases": [
      {
        "title": "Asymmetric Pyramids",
        "description": "Even if the tip of the pyramid is pushed way off to the side (an oblique pyramid) instead of being dead center, the volume formula remains exactly the same!"
      }
    ],
    "walkthroughExample": {
      "problem": "Find the volume of a pyramid with a square base of area 16 m² and a height of 6 m.",
      "solution": [
        "Multiply B × h: 16 × 6 = 96.",
        "Divide by 3: 96 / 3 = 32."
      ],
      "answer": "V = 32 m³"
    }
  },

  "hemisphere": {
    "intuition": "A hemisphere is exactly half of a sphere. Since a full sphere's volume is (4/3)πr³, a hemisphere's volume is (2/3)πr³.",
    "variableBreakdown": [
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Radius (r)",
        "commonTraps": "Must be cubed (r³) for volume, unlike area which is squared."
      }
    ],
    "solvingLogic": [
      "1. Cube the radius (r × r × r).",
      "2. Multiply by π.",
      "3. Multiply by 2, then divide by 3 (or multiply by 2/3)."
    ],
    "edgeCases": [
      {
        "title": "Surface Area Trap",
        "description": "If calculating surface area instead of volume, remember a hemisphere has the curved dome (2πr²) PLUS the flat circular bottom (πr²), totaling 3πr²."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the volume of a hemisphere bowl with a radius of 3 m.",
      "solution": [
        "r³ = 3 × 3 × 3 = 27.",
        "Multiply by 2/3: 27 × (2/3) = 18.",
        "Multiply by π: 18π ≈ 56.55."
      ],
      "answer": "V ≈ 56.55 m³"
    }
  },

  "ellipse": {
    "intuition": "An ellipse is a stretched circle. Instead of one radius (r), it has two: a long one (a) and a short one (b). To find its area, you just multiply π by both 'radii' instead of squaring one.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Area (A)",
        "commonTraps": "Result is in squared units."
      },
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "",
        "description": "Semi-Major Axis (a)",
        "commonTraps": "Half of the longest diameter across the ellipse."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "",
        "description": "Semi-Minor Axis (b)",
        "commonTraps": "Half of the shortest diameter."
      }
    ],
    "solvingLogic": [
      "1. Ensure 'a' and 'b' are halves of the total width/height, not the full width.",
      "2. Multiply a × b.",
      "3. Multiply by π."
    ],
    "edgeCases": [
      {
        "title": "A Perfect Circle",
        "description": "If a = b, the ellipse is a perfect circle, and the formula gracefully becomes π × a × a = πr², proving that a circle is just a special case of an ellipse."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the area of an ellipse that is 10m wide (total) and 6m tall (total).",
      "solution": [
        "a is half the width: a = 5.",
        "b is half the height: b = 3.",
        "Area = π × 5 × 3 = 15π ≈ 47.1."
      ],
      "answer": "A ≈ 47.1 m²"
    }
  },

  "parallelogram": {
    "intuition": "If you chop off the leaning triangle on one side of a parallelogram and attach it to the other side, it forms a perfect rectangle. Because of this, the area is simply base × height.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Area (A)",
        "commonTraps": "Result is in squared units."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "",
        "description": "Base (b)",
        "commonTraps": "The length of one of the flat sides."
      },
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "",
        "description": "Height (h)",
        "commonTraps": "The straight vertical distance between the bases. Do NOT use the slanted side length!"
      }
    ],
    "solvingLogic": [
      "1. Multiply the base by the perpendicular height.",
      "2. Done! A = b × h."
    ],
    "edgeCases": [
      {
        "title": "Slanted Side Given",
        "description": "If a test question gives you the slanted side length 'x' and the interior angle 'θ', you must calculate height first using trig: h = x·sin(θ)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the area of a parallelogram with a base of 8 m and a vertical height of 4 m.",
      "solution": [
        "A = b × h",
        "A = 8 × 4 = 32."
      ],
      "answer": "A = 32 m²"
    }
  }
};
