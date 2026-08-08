export const algebra_pre_calculus = {
  "midpoint": {
    "intuition": "The midpoint formula calculates the exact center point between two points in a 2D coordinate system. It essentially takes the average of the x-coordinates and the average of the y-coordinates.",
    "variableBreakdown": [
      {
        "id": "mx",
        "siUnit": "",
        "altUnits": "",
        "description": "Midpoint X-Coordinate",
        "commonTraps": "Can be negative. It is exactly halfway between x1 and x2."
      },
      {
        "id": "my",
        "siUnit": "",
        "altUnits": "",
        "description": "Midpoint Y-Coordinate",
        "commonTraps": "Can be negative. Computed independently of the X-coordinate."
      },
      {
        "id": "x1",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 X-Coordinate",
        "commonTraps": "Make sure you don't swap x1 with y1."
      },
      {
        "id": "y1",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 Y-Coordinate",
        "commonTraps": "Ensure it corresponds to the same point as x1."
      },
      {
        "id": "x2",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 X-Coordinate",
        "commonTraps": "Make sure you don't swap x2 with y2."
      },
      {
        "id": "y2",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 Y-Coordinate",
        "commonTraps": "Ensure it corresponds to the same point as x2."
      }
    ],
    "solvingLogic": [
      "1. Identify the coordinates of the two points: (x1, y1) and (x2, y2).",
      "2. Add the x-coordinates and divide by 2: mx = (x1 + x2) / 2.",
      "3. Add the y-coordinates and divide by 2: my = (y1 + y2) / 2.",
      "4. The resulting pair (mx, my) is the midpoint."
    ],
    "edgeCases": [
      {
        "title": "Same Point",
        "description": "If (x1, y1) and (x2, y2) are the same point, the midpoint is just that point."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the midpoint between (2, 4) and (8, 10).",
      "solution": [
        "mx = (2 + 8) / 2 = 10 / 2 = 5.",
        "my = (4 + 10) / 2 = 14 / 2 = 7."
      ],
      "answer": "Midpoint = (5, 7)"
    }
  },

  "slope-line": {
    "intuition": "The slope of a line represents its steepness and direction. It is the ratio of the vertical change (rise) to the horizontal change (run) between any two points on the line.",
    "variableBreakdown": [
      {
        "id": "m",
        "siUnit": "",
        "altUnits": "",
        "description": "Slope (m)",
        "commonTraps": "Positive slope rises left to right, negative falls. Zero is horizontal."
      },
      {
        "id": "x1",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 X-Coordinate",
        "commonTraps": "Keep consistent order between points 1 and 2."
      },
      {
        "id": "y1",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 Y-Coordinate",
        "commonTraps": "Must be used in the same order as x1."
      },
      {
        "id": "x2",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 X-Coordinate",
        "commonTraps": "Ensure x2 != x1, otherwise slope is undefined."
      },
      {
        "id": "y2",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 Y-Coordinate",
        "commonTraps": "Must be used in the same order as x2."
      }
    ],
    "solvingLogic": [
      "1. Identify (x1, y1) and (x2, y2).",
      "2. Calculate the difference in y (rise): Δy = y2 - y1.",
      "3. Calculate the difference in x (run): Δx = x2 - x1.",
      "4. Divide rise by run: m = Δy / Δx."
    ],
    "edgeCases": [
      {
        "title": "Vertical Line",
        "description": "If x1 = x2, the run is 0, making the slope undefined (division by zero)."
      },
      {
        "title": "Horizontal Line",
        "description": "If y1 = y2, the rise is 0, making the slope exactly 0."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the slope between (1, 3) and (5, 11).",
      "solution": [
        "Δy = 11 - 3 = 8.",
        "Δx = 5 - 1 = 4.",
        "m = 8 / 4 = 2."
      ],
      "answer": "Slope m = 2"
    }
  },

  "arithmetic-sequence": {
    "intuition": "An arithmetic sequence is a list of numbers where the difference between consecutive terms is constant. The formula allows you to find any term in the sequence without writing them all out.",
    "variableBreakdown": [
      {
        "id": "an",
        "siUnit": "",
        "altUnits": "",
        "description": "nth Term (a_n)",
        "commonTraps": "The value of the term at position n."
      },
      {
        "id": "a1",
        "siUnit": "",
        "altUnits": "",
        "description": "First Term (a₁)",
        "commonTraps": "The starting value of the sequence."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Position Number (n)",
        "commonTraps": "Must be a positive integer (1, 2, 3...)."
      },
      {
        "id": "d",
        "siUnit": "",
        "altUnits": "",
        "description": "Common Difference (d)",
        "commonTraps": "Can be negative (for a decreasing sequence)."
      }
    ],
    "solvingLogic": [
      "1. Identify the first term a₁ and common difference d.",
      "2. Identify the target term position n.",
      "3. Subtract 1 from n to get (n - 1).",
      "4. Multiply by d, then add to a₁: a_n = a₁ + (n - 1)d."
    ],
    "edgeCases": [
      {
        "title": "First Term",
        "description": "If n = 1, (n - 1) is 0, and the formula simplifies correctly to a_n = a₁."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the 10th term of the sequence starting with 3 and increasing by 4 each time.",
      "solution": [
        "a₁ = 3, d = 4, n = 10.",
        "a_10 = 3 + (10 - 1) × 4.",
        "a_10 = 3 + (9 × 4) = 3 + 36 = 39."
      ],
      "answer": "a_10 = 39"
    }
  },

  "geometric-sequence": {
    "intuition": "A geometric sequence is a list of numbers where each term is multiplied by a constant ratio to get the next term. It models exponential growth or decay.",
    "variableBreakdown": [
      {
        "id": "an",
        "siUnit": "",
        "altUnits": "",
        "description": "nth Term (a_n)",
        "commonTraps": "Can grow very large (or very small) quickly due to exponentiation."
      },
      {
        "id": "a1",
        "siUnit": "",
        "altUnits": "",
        "description": "First Term (a₁)",
        "commonTraps": "The starting value of the sequence."
      },
      {
        "id": "r",
        "siUnit": "",
        "altUnits": "",
        "description": "Common Ratio (r)",
        "commonTraps": "If negative, the sequence will alternate signs. If |r| < 1, the sequence decays."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Position Number (n)",
        "commonTraps": "Must be a positive integer."
      }
    ],
    "solvingLogic": [
      "1. Identify the first term a₁ and common ratio r.",
      "2. Find the target position n.",
      "3. Calculate the exponent: n - 1.",
      "4. Raise r to the power of (n - 1) and multiply by a₁: a_n = a₁ × r^(n-1)."
    ],
    "edgeCases": [
      {
        "title": "Ratio of Zero or One",
        "description": "If r = 1, every term equals a₁. If r = 0, all terms after the first are 0."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the 5th term of a sequence starting at 2, with a common ratio of 3.",
      "solution": [
        "a₁ = 2, r = 3, n = 5.",
        "n - 1 = 4.",
        "a_5 = 2 × 3⁴ = 2 × 81 = 162."
      ],
      "answer": "a_5 = 162"
    }
  },

  "simple-interest": {
    "intuition": "Simple interest calculates the cost of borrowing money or the return on an investment based solely on the original principal amount over a specified period.",
    "variableBreakdown": [
      {
        "id": "I",
        "siUnit": "$",
        "altUnits": "",
        "description": "Total Interest (I)",
        "commonTraps": "This is only the interest earned/paid, not the final total amount."
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "",
        "description": "Principal (P)",
        "commonTraps": "The initial starting amount."
      },
      {
        "id": "r",
        "siUnit": "",
        "altUnits": "%",
        "description": "Interest Rate (r)",
        "commonTraps": "Must be expressed as a decimal (e.g., 5% = 0.05) in calculations."
      },
      {
        "id": "t",
        "siUnit": "years",
        "altUnits": "months",
        "description": "Time (t)",
        "commonTraps": "If rate is annual, time must be in years. Convert months to years by dividing by 12."
      }
    ],
    "solvingLogic": [
      "1. Convert percentage rate r to a decimal.",
      "2. Ensure time t matches the rate's time period (usually years).",
      "3. Multiply: I = P × r × t.",
      "4. For total amount, add I to P."
    ],
    "edgeCases": [
      {
        "title": "Partial Years",
        "description": "If time is in months, say 6 months, t = 6/12 = 0.5 years."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the simple interest on $1000 at 5% annual interest for 3 years.",
      "solution": [
        "P = 1000, r = 0.05, t = 3.",
        "I = 1000 × 0.05 × 3 = 50 × 3 = 150."
      ],
      "answer": "I = $150"
    }
  },

  "continuous-compound": {
    "intuition": "Continuous compounding calculates interest assuming it is compounded an infinite number of times per year. It represents the absolute maximum growth for a given interest rate.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "$",
        "altUnits": "",
        "description": "Final Amount (A)",
        "commonTraps": "This is the total amount (Principal + Interest), unlike the simple interest formula."
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "",
        "description": "Principal (P)",
        "commonTraps": "The initial starting amount."
      },
      {
        "id": "r",
        "siUnit": "",
        "altUnits": "%",
        "description": "Annual Interest Rate (r)",
        "commonTraps": "Must be expressed as a decimal (e.g., 6% = 0.06)."
      },
      {
        "id": "t",
        "siUnit": "years",
        "altUnits": "",
        "description": "Time (t)",
        "commonTraps": "Must be in years."
      }
    ],
    "solvingLogic": [
      "1. Convert rate r to a decimal.",
      "2. Multiply r × t for the exponent.",
      "3. Calculate e^(rt) using the mathematical constant e ≈ 2.718.",
      "4. Multiply by principal P: A = P × e^(rt)."
    ],
    "edgeCases": [
      {
        "title": "Negative Rate",
        "description": "If r is negative, it models continuous decay (e.g., radioactive decay or depreciation)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the final amount if $2000 is invested at 4% compounded continuously for 5 years.",
      "solution": [
        "P = 2000, r = 0.04, t = 5.",
        "rt = 0.04 × 5 = 0.20.",
        "A = 2000 × e^(0.2) ≈ 2000 × 1.2214 = 2442.81."
      ],
      "answer": "A ≈ $2442.81"
    }
  },

  "matrix-2x2": {
    "intuition": "The determinant of a 2x2 matrix provides important information about the matrix, such as whether it has an inverse (determinant ≠ 0) and the scaling factor of the linear transformation it represents.",
    "variableBreakdown": [
      {
        "id": "det",
        "siUnit": "",
        "altUnits": "",
        "description": "Determinant",
        "commonTraps": "Can be negative, zero, or positive."
      },
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Top-Left Element (a)",
        "commonTraps": "Top-left entry of the matrix."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "Top-Right Element (b)",
        "commonTraps": "Top-right entry."
      },
      {
        "id": "c",
        "siUnit": "",
        "altUnits": "",
        "description": "Bottom-Left Element (c)",
        "commonTraps": "Bottom-left entry."
      },
      {
        "id": "d",
        "siUnit": "",
        "altUnits": "",
        "description": "Bottom-Right Element (d)",
        "commonTraps": "Bottom-right entry."
      }
    ],
    "solvingLogic": [
      "1. Identify the elements: a (top-left), b (top-right), c (bottom-left), d (bottom-right).",
      "2. Multiply the main diagonal: a × d.",
      "3. Multiply the anti-diagonal: b × c.",
      "4. Subtract the two: det = ad - bc."
    ],
    "edgeCases": [
      {
        "title": "Zero Determinant",
        "description": "If ad = bc, the determinant is 0. The matrix is 'singular' and cannot be inverted."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the determinant of the matrix [[3, 4], [1, 2]].",
      "solution": [
        "a = 3, b = 4, c = 1, d = 2.",
        "Main diagonal: ad = 3 × 2 = 6.",
        "Anti-diagonal: bc = 4 × 1 = 4.",
        "det = 6 - 4 = 2."
      ],
      "answer": "det = 2"
    }
  },

  "vector-ops": {
    "intuition": "The dot product of two vectors is a scalar value that describes how much one vector points in the direction of another. It's heavily used in physics for calculating work and angles.",
    "variableBreakdown": [
      {
        "id": "dot",
        "siUnit": "",
        "altUnits": "",
        "description": "Dot Product",
        "commonTraps": "This is a scalar (a single number), not a vector."
      },
      {
        "id": "x1",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector 1 X-Component",
        "commonTraps": "Matches with x2."
      },
      {
        "id": "y1",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector 1 Y-Component",
        "commonTraps": "Matches with y2."
      },
      {
        "id": "x2",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector 2 X-Component",
        "commonTraps": "Matches with x1."
      },
      {
        "id": "y2",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector 2 Y-Component",
        "commonTraps": "Matches with y1."
      }
    ],
    "solvingLogic": [
      "1. Multiply the x-components together: x1 × x2.",
      "2. Multiply the y-components together: y1 × y2.",
      "3. Add the two results: dot = (x1 × x2) + (y1 × y2)."
    ],
    "edgeCases": [
      {
        "title": "Orthogonal Vectors",
        "description": "If the dot product is exactly 0, the two vectors are perpendicular (at a 90° angle)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the dot product of vectors <3, 4> and <-2, 5>.",
      "solution": [
        "x1 = 3, y1 = 4, x2 = -2, y2 = 5.",
        "x1·x2 = 3 × -2 = -6.",
        "y1·y2 = 4 × 5 = 20.",
        "Dot product = -6 + 20 = 14."
      ],
      "answer": "Dot product = 14"
    }
  },

  "exponential-growth": {
    "intuition": "Exponential growth describes populations, bacteria, or investments that grow by a constant factor in equal time intervals. The larger the quantity, the faster it grows.",
    "variableBreakdown": [
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Final Quantity (N)",
        "commonTraps": "Can become incredibly large for t > 0."
      },
      {
        "id": "N0",
        "siUnit": "",
        "altUnits": "",
        "description": "Initial Quantity (N₀)",
        "commonTraps": "The starting amount at time t=0."
      },
      {
        "id": "k",
        "siUnit": "",
        "altUnits": "",
        "description": "Growth Rate (k)",
        "commonTraps": "Must be a decimal. If negative, it represents exponential decay."
      },
      {
        "id": "t",
        "siUnit": "",
        "altUnits": "",
        "description": "Time (t)",
        "commonTraps": "Must match the time unit of the growth rate."
      }
    ],
    "solvingLogic": [
      "1. Ensure growth rate k is a decimal.",
      "2. Calculate the exponent k × t.",
      "3. Calculate e^(kt).",
      "4. Multiply by N₀: N = N₀ × e^(kt)."
    ],
    "edgeCases": [
      {
        "title": "Zero Growth",
        "description": "If k = 0, e^0 = 1, so the final amount simply equals the initial amount (N = N₀)."
      }
    ],
    "walkthroughExample": {
      "problem": "A population of 100 bacteria grows continuously at a rate of 15% per hour. How many are there after 10 hours?",
      "solution": [
        "N₀ = 100, k = 0.15, t = 10.",
        "kt = 1.5.",
        "N = 100 × e^(1.5) ≈ 100 × 4.4817 = 448.17."
      ],
      "answer": "N ≈ 448"
    }
  },

  "complex-numbers": {
    "intuition": "The modulus of a complex number is its absolute value, representing its distance from the origin (0,0) on the complex plane. It is found using the Pythagorean theorem.",
    "variableBreakdown": [
      {
        "id": "mod",
        "siUnit": "",
        "altUnits": "",
        "description": "Modulus (|z|)",
        "commonTraps": "Always a non-negative real number."
      },
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Real Part (a)",
        "commonTraps": "The part without the imaginary unit i."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "Imaginary Part (b)",
        "commonTraps": "Only the coefficient of i is used in the formula, not i itself!"
      }
    ],
    "solvingLogic": [
      "1. Identify real part a and imaginary part b.",
      "2. Square both parts: a² and b².",
      "3. Add them together: a² + b².",
      "4. Take the square root: |z| = √(a² + b²)."
    ],
    "edgeCases": [
      {
        "title": "Purely Real or Imaginary",
        "description": "If the number is just 'a' (b=0), modulus is |a|. If it's just 'bi' (a=0), modulus is |b|."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the modulus of the complex number z = 3 - 4i.",
      "solution": [
        "a = 3, b = -4.",
        "a² = 9, b² = (-4)² = 16.",
        "a² + b² = 9 + 16 = 25.",
        "|z| = √25 = 5."
      ],
      "answer": "|z| = 5"
    }
  }
};
