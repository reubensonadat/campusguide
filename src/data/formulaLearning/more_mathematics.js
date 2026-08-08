export const more_mathematics = {
  "distance-3d": {
    "intuition": "The 3D distance formula is just the Pythagorean Theorem (a² + b² = c²) applied twice! It calculates the absolute straight-line diagonal distance between any two floating points in 3D space.",
    "variableBreakdown": [
      {
        "id": "d",
        "siUnit": "",
        "altUnits": "",
        "description": "Distance",
        "commonTraps": "Always a positive number."
      },
      {
        "id": "x1",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 X-coordinate",
        "commonTraps": ""
      },
      {
        "id": "y1",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 Y-coordinate",
        "commonTraps": ""
      },
      {
        "id": "z1",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 Z-coordinate",
        "commonTraps": ""
      },
      {
        "id": "x2",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 X-coordinate",
        "commonTraps": ""
      },
      {
        "id": "y2",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 Y-coordinate",
        "commonTraps": ""
      },
      {
        "id": "z2",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 Z-coordinate",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Find the difference for each axis (x2-x1), (y2-y1), (z2-z1).",
      "2. Square all three differences to make them all positive.",
      "3. Add all three squared numbers together.",
      "4. Take the square root of the grand total."
    ],
    "edgeCases": [
      {
        "title": "Euclidean Space",
        "description": "This formula only works in 'flat' Euclidean space. If you are calculating the distance between two airplanes flying over the curvature of the Earth, the 3D formula fails. You must use the Haversine formula (spherical trigonometry) instead."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the distance from the origin (0,0,0) to point (2, 3, 6).",
      "solution": [
        "Differences are just 2, 3, 6.",
        "Square them: 4 + 9 + 36 = 49.",
        "Square root of 49 = 7."
      ],
      "answer": "Distance = 7"
    }
  },

  "change-of-base": {
    "intuition": "Calculators physically only have buttons for Log (Base 10) and Ln (Base e). If a teacher asks you to find Log Base 7 of 50, you literally can't type it in. The Change-of-Base formula is a clever algebraic hack that lets you convert any weird Log base into standard Base 10 so you can push it through a calculator.",
    "variableBreakdown": [
      {
        "id": "result",
        "siUnit": "",
        "altUnits": "",
        "description": "Result",
        "commonTraps": ""
      },
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "The Argument (x)",
        "commonTraps": "The big number inside the Log."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "The Old Base (b)",
        "commonTraps": "The tiny subscript number on the original Log."
      }
    ],
    "solvingLogic": [
      "1. Take the standard Log10 of the Argument (x).",
      "2. Take the standard Log10 of the old Base (b).",
      "3. Divide the first number by the second number."
    ],
    "edgeCases": [
      {
        "title": "Natural Log Trick",
        "description": "You don't HAVE to use Base 10 (Log). You can also use Base e (Ln). Doing ln(50)/ln(7) will output the exact same mathematically flawless answer as log(50)/log(7)."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate Log₂(8).",
      "solution": [
        "Take Log10 of 8: ~0.903.",
        "Take Log10 of 2: ~0.301.",
        "Divide: 0.903 / 0.301 = 3."
      ],
      "answer": "3 (Because 2³ = 8)"
    }
  },

  "slope-intercept": {
    "intuition": "y = mx + b is the blueprint for every straight line in existence. 'b' is where the line is anchored to the Y-axis wall. 'm' is the steepness (rise over run) dictating exactly how it angles out from that anchor point.",
    "variableBreakdown": [
      {
        "id": "m",
        "siUnit": "",
        "altUnits": "",
        "description": "Slope (m)",
        "commonTraps": "Rise / Run."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "Y-Intercept (b)",
        "commonTraps": "The exact height where the line crosses x=0."
      },
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "X Coordinate",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Multiply the Slope (m) by your chosen X coordinate.",
      "2. Add the Y-Intercept (b)."
    ],
    "edgeCases": [
      {
        "title": "Vertical Lines",
        "description": "This formula breaks completely for a perfectly vertical line! A vertical line has an 'infinite' slope (rise = infinity, run = 0) and never touches the Y-axis (no 'b'). Vertical lines must be written simply as 'x = 5', abandoning y=mx+b completely."
      }
    ],
    "walkthroughExample": {
      "problem": "A line has slope 2 and crosses the Y-axis at 5. Find y when x=3.",
      "solution": [
        "m = 2, b = 5.",
        "y = (2 × 3) + 5.",
        "y = 6 + 5 = 11."
      ],
      "answer": "y = 11"
    }
  },

  "matrix-3x3": {
    "intuition": "The determinant of a 3x3 matrix measures the exact physical VOLUME of a 3D parallelepiped (a slanted 3D box). A 3x3 determinant is calculated by breaking it down into three smaller 2x2 determinants.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Top Left (Row 1, Col 1)",
        "commonTraps": ""
      },
      {
        "id": "d",
        "siUnit": "",
        "altUnits": "",
        "description": "Row 2, Col 1",
        "commonTraps": ""
      },
      {
        "id": "g",
        "siUnit": "",
        "altUnits": "",
        "description": "Row 3, Col 1",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Pick the top-left element (a). Cross out its row and column. Take the determinant of the remaining 2x2, and multiply by 'a'.",
      "2. Pick the top-middle element (b). Cross out its row and column. Take the 2x2 determinant, multiply by 'b', and SUBTRACT it.",
      "3. Pick the top-right element (c). Take the 2x2 determinant, multiply by 'c', and ADD it."
    ],
    "edgeCases": [
      {
        "title": "Coplanar Vectors",
        "description": "If the 3x3 determinant comes out to exactly ZERO, it means all three vectors are flatly resting on the exact same 2D plane (like three arrows lying flat on a table). Because they are completely flat, they form a 3D box with 0 height, and therefore 0 volume."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the determinant of the Identity Matrix (1s on the diagonal, 0s everywhere else).",
      "solution": [
        "a = 1. The remaining 2x2 is [1, 0; 0, 1]. Its determinant is 1.",
        "1 × 1 = 1.",
        "b = 0. The middle calculation drops to 0.",
        "c = 0. The last calculation drops to 0."
      ],
      "answer": "Det = 1 (A perfect 1x1x1 cube has a volume of 1)"
    }
  }
};
