export const geometry = {
  "circle": {
    "intuition": "A circle's area and circumference define its 2D spatial properties. Area is the flat space inside the boundary, and circumference is the perimeter or distance around the edge.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "cm²",
        "description": "Area (A)",
        "commonTraps": "Use squared units. Don't confuse it with circumference."
      },
      {
        "id": "C",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Circumference (C)",
        "commonTraps": "Use linear units. Ensure you don't use the area formula (πr²) by mistake."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Radius (r)",
        "commonTraps": "If diameter is given, divide it by 2 first."
      }
    ],
    "solvingLogic": [
      "1. Identify whether you have radius or diameter. If diameter, r = d/2.",
      "2. To find Area: Square the radius (r²), then multiply by π (A = πr²).",
      "3. To find Circumference: Multiply radius by 2, then by π (C = 2πr)."
    ],
    "edgeCases": [
      {
        "title": "Zero Radius",
        "description": "A radius of zero means it is a single point with 0 area and 0 circumference."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the area of a circle with a diameter of 10 m.",
      "solution": [
        "Diameter = 10, so r = 5.",
        "A = π × r² = π × 5² = 25π ≈ 78.54."
      ],
      "answer": "A ≈ 78.54 m²"
    }
  },
  
  "sphere": {
    "intuition": "A sphere is a perfectly round 3D object. Its volume indicates how much 3D space it holds, while its surface area measures the total area covering its outside.",
    "variableBreakdown": [
      {
        "id": "V",
        "siUnit": "m³",
        "altUnits": "cm³, L",
        "description": "Volume (V)",
        "commonTraps": "Always use cubed units."
      },
      {
        "id": "SA",
        "siUnit": "m²",
        "altUnits": "cm²",
        "description": "Surface Area (SA)",
        "commonTraps": "Always use squared units. It is exactly 4 times the area of a circle with the same radius."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "cm",
        "description": "Radius (r)",
        "commonTraps": "Ensure it is the distance from the center to the surface."
      }
    ],
    "solvingLogic": [
      "1. Find the radius r.",
      "2. To find Volume: Cube the radius (r³), multiply by π, and multiply by 4/3 (V = 4/3 πr³).",
      "3. To find Surface Area: Square the radius (r²), multiply by π, and multiply by 4 (SA = 4πr²)."
    ],
    "edgeCases": [
      {
        "title": "Hemisphere",
        "description": "For a half-sphere (hemisphere), volume is halved, but surface area must include the flat circular base: SA = 3πr²."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the volume of a sphere with radius 3 m.",
      "solution": [
        "r = 3, so r³ = 27.",
        "V = (4/3) × π × 27 = 36π ≈ 113.1."
      ],
      "answer": "V ≈ 113.1 m³"
    }
  },

  "cylinder": {
    "intuition": "A cylinder is essentially a circle stretched through a height. Its volume is the area of its circular base times its height.",
    "variableBreakdown": [
      {
        "id": "V",
        "siUnit": "m³",
        "altUnits": "",
        "description": "Volume (V)",
        "commonTraps": "Cubic units."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Base Radius (r)",
        "commonTraps": "If diameter is given, divide by 2."
      },
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "",
        "description": "Height (h)",
        "commonTraps": "Must be in the same units as the radius."
      }
    ],
    "solvingLogic": [
      "1. Identify radius and height.",
      "2. Calculate base area A = πr².",
      "3. Multiply base area by height to get volume: V = πr²h."
    ],
    "edgeCases": [
      {
        "title": "Hollow Cylinder",
        "description": "If finding the volume of material of a pipe, subtract the inner volume from the outer volume."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the volume of a cylinder with radius 2 m and height 5 m.",
      "solution": [
        "Base Area = π × 2² = 4π.",
        "V = Base Area × 5 = 4π × 5 = 20π ≈ 62.83."
      ],
      "answer": "V ≈ 62.83 m³"
    }
  },

  "triangle-area": {
    "intuition": "Heron's Formula allows you to calculate the area of any triangle given only its three side lengths, without needing to know the height or any angles.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "",
        "description": "Side length a",
        "commonTraps": "Must be positive."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "",
        "description": "Side length b",
        "commonTraps": "Must be positive."
      },
      {
        "id": "c",
        "siUnit": "m",
        "altUnits": "",
        "description": "Side length c",
        "commonTraps": "Must be positive."
      }
    ],
    "solvingLogic": [
      "1. Check the triangle inequality: a+b > c, a+c > b, and b+c > a.",
      "2. Calculate the semi-perimeter s = (a + b + c) / 2.",
      "3. Subtract each side from s: (s-a), (s-b), and (s-c).",
      "4. Multiply them all together: s(s-a)(s-b)(s-c).",
      "5. Take the square root of the result."
    ],
    "edgeCases": [
      {
        "title": "Invalid Triangle",
        "description": "If any one side is longer than the sum of the other two, the shape cannot form a closed triangle, and you'll get a negative under the square root."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the area of a triangle with sides 3, 4, and 5.",
      "solution": [
        "s = (3 + 4 + 5) / 2 = 6.",
        "s - a = 6 - 3 = 3.",
        "s - b = 6 - 4 = 2.",
        "s - c = 6 - 5 = 1.",
        "Area = √(6 × 3 × 2 × 1) = √36 = 6."
      ],
      "answer": "Area = 6"
    }
  },

  "trig-ratios": {
    "intuition": "SOH CAH TOA is a mnemonic for the basic trigonometric ratios in a right-angled triangle. They relate the angles to the lengths of the sides.",
    "variableBreakdown": [
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle (θ)",
        "commonTraps": "Must be an acute angle in the right triangle. Check if your calculator is in Degrees or Radians."
      },
      {
        "id": "O",
        "siUnit": "",
        "altUnits": "",
        "description": "Opposite Side",
        "commonTraps": "The side across from the angle θ."
      },
      {
        "id": "A",
        "siUnit": "",
        "altUnits": "",
        "description": "Adjacent Side",
        "commonTraps": "The side next to the angle θ that is not the hypotenuse."
      },
      {
        "id": "H",
        "siUnit": "",
        "altUnits": "",
        "description": "Hypotenuse",
        "commonTraps": "The longest side, always directly opposite the 90° right angle."
      }
    ],
    "solvingLogic": [
      "1. Identify the given angle and sides relative to it (Opposite, Adjacent, Hypotenuse).",
      "2. Choose the correct ratio: Sine = O/H, Cosine = A/H, Tangent = O/A.",
      "3. Use inverse trig functions (arcsin, arccos, arctan) to find angles if sides are known."
    ],
    "edgeCases": [
      {
        "title": "Non-Right Triangles",
        "description": "SOH CAH TOA only applies to right-angled triangles. For other triangles, use the Law of Sines or Law of Cosines."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the Opposite side if Hypotenuse = 10 and Angle = 30°.",
      "solution": [
        "We know H and Angle, and want O. Use Sine: sin(θ) = O / H.",
        "sin(30°) = O / 10.",
        "0.5 = O / 10.",
        "O = 5."
      ],
      "answer": "Opposite side = 5"
    }
  }
};
