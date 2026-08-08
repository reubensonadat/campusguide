export const mathematics = {
  "quadratic": {
    "intuition": "The Quadratic Formula solves ax² + bx + c = 0 for x. The discriminant (b² − 4ac) reveals the nature of the roots: positive → two distinct real roots, zero → one repeated real root, negative → a complex conjugate pair. This formula is the universal key to any quadratic equation.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient of x² (must be ≠ 0, otherwise the equation is linear).",
        "commonTraps": "If a = 0 the equation reduces to bx + c = 0; use the linear solver instead."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient of x.",
        "commonTraps": "Sign matters: b = −3 means the term is −3x, not +3x."
      },
      {
        "id": "c",
        "siUnit": "",
        "altUnits": "",
        "description": "Constant term.",
        "commonTraps": "Forgetting to include c when it is zero (e.g., x² − 4x = 0 has c = 0)."
      }
    ],
    "solvingLogic": [
      "Identify coefficients a, b, c from the equation ax² + bx + c = 0.",
      "Compute the discriminant Δ = b² − 4ac.",
      "If Δ > 0: two real roots x = (−b ± √Δ) / (2a).",
      "If Δ = 0: one repeated real root x = −b / (2a).",
      "If Δ < 0: two complex roots x = (−b ± i√|Δ|) / (2a).",
      "Simplify fractions and radicals; report roots to appropriate precision."
    ],
    "edgeCases": [
      {
        "title": "a = 0 (Degenerate Quadratic)",
        "description": "The equation becomes linear (bx + c = 0). The quadratic formula divides by 2a, so it fails. Handle separately."
      },
      {
        "title": "Discriminant Near Zero",
        "description": "Floating-point rounding can make a tiny positive Δ appear negative or vice versa. Use a tolerance (e.g., |Δ| < 1e-12) to treat as zero."
      },
      {
        "title": "Large Coefficients",
        "description": "Very large |a|, |b|, |c| can cause overflow in b² or 4ac. Scale the equation (divide by a common factor) before computing."
      },
      {
        "title": "Complex Roots",
        "description": "When Δ < 0, the roots are complex conjugates. Ensure the calling context expects complex output; otherwise flag as 'no real solution'."
      }
    ],
    "walkthroughExample": {
      "problem": "Solve 2x² − 5x − 3 = 0 for x.",
      "solution": [
        "Identify a = 2, b = −5, c = −3.",
        "Compute discriminant: Δ = (−5)² − 4(2)(−3) = 25 + 24 = 49.",
        "Since Δ > 0, there are two distinct real roots.",
        "Apply formula: x = (5 ± √49) / (2·2) = (5 ± 7) / 4.",
        "Root 1: x₁ = (5 + 7) / 4 = 12 / 4 = 3.",
        "Root 2: x₂ = (5 − 7) / 4 = −2 / 4 = −0.5."
      ],
      "answer": "x = 3 or x = −0.5"
    }
  },

  "pythagorean": {
    "intuition": "The Pythagorean Theorem (a² + b² = c²) relates the legs (a, b) and hypotenuse (c) of a right triangle. It is the foundation of Euclidean distance and appears in physics, engineering, and computer graphics. Knowing any two sides lets you find the third.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "cm, ft, in",
        "description": "Length of one leg (side adjacent to the right angle).",
        "commonTraps": "Must be non-negative; a² is used so sign is irrelevant, but length cannot be negative."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "cm, ft, in",
        "description": "Length of the other leg.",
        "commonTraps": "Same as a; ensure consistent units with a and c."
      },
      {
        "id": "c",
        "siUnit": "m",
        "altUnits": "cm, ft, in",
        "description": "Length of the hypotenuse (side opposite the right angle). Always the longest side.",
        "commonTraps": "c must be > a and > b; if given c ≤ a or c ≤ b, the triangle is impossible."
      }
    ],
    "solvingLogic": [
      "Identify which two sides are known and which is unknown.",
      "If finding c (hypotenuse): c = √(a² + b²).",
      "If finding a leg (a or b): leg = √(c² − other_leg²).",
      "Verify the radicand is non-negative; if negative, the given sides cannot form a right triangle.",
      "Take the positive square root (lengths are non-negative).",
      "Round to appropriate significant figures."
    ],
    "edgeCases": [
      {
        "title": "Hypotenuse Not Longest",
        "description": "If c ≤ a or c ≤ b, no real right triangle exists. The radicand c² − a² (or c² − b²) becomes negative."
      },
      {
        "title": "Zero-Length Leg",
        "description": "A leg of length zero degenerates the triangle to a line segment; c equals the other leg. Mathematically valid but geometrically degenerate."
      },
      {
        "title": "Unit Mismatch",
        "description": "Mixing meters and centimeters without conversion yields incorrect results. Convert all lengths to the same unit before squaring."
      },
      {
        "title": "Floating-Point Precision",
        "description": "For very large sides, a² + b² may overflow or lose precision. Use scaled computation or arbitrary-precision libraries if needed."
      }
    ],
    "walkthroughExample": {
      "problem": "A right triangle has legs a = 6 cm and b = 8 cm. Find the hypotenuse c.",
      "solution": [
        "Identify known: a = 6 cm, b = 8 cm. Target: c.",
        "Apply formula: c = √(a² + b²) = √(6² + 8²).",
        "Compute squares: 6² = 36, 8² = 64.",
        "Sum: 36 + 64 = 100.",
        "Square root: √100 = 10.",
        "Result: c = 10 cm."
      ],
      "answer": "c = 10 cm"
    }
  },

  "distance-2d": {
    "intuition": "The 2D Distance Formula d = √((x₂−x₁)² + (y₂−y₁)²) is a direct application of the Pythagorean Theorem in a coordinate plane. It gives the straight-line distance between two points (x₁, y₁) and (x₂, y₂). It can also be rearranged to solve for a missing coordinate when the distance and the other three coordinates are known.",
    "variableBreakdown": [
      {
        "id": "d",
        "siUnit": "m",
        "altUnits": "cm, km, ft, mi",
        "description": "Straight-line distance between the two points. Always non-negative.",
        "commonTraps": "Distance is a scalar; it has no direction. Do not confuse with displacement vector."
      },
      {
        "id": "x1",
        "siUnit": "m",
        "altUnits": "cm, km, ft, mi",
        "description": "x-coordinate of the first point.",
        "commonTraps": "Sign matters: x₁ = −3 is left of the origin."
      },
      {
        "id": "y1",
        "siUnit": "m",
        "altUnits": "cm, km, ft, mi",
        "description": "y-coordinate of the first point.",
        "commonTraps": "Same sign convention as x₁."
      },
      {
        "id": "x2",
        "siUnit": "m",
        "altUnits": "cm, km, ft, mi",
        "description": "x-coordinate of the second point.",
        "commonTraps": "Ensure consistent units with x₁, y₁, y₂."
      },
      {
        "id": "y2",
        "siUnit": "m",
        "altUnits": "cm, km, ft, mi",
        "description": "y-coordinate of the second point.",
        "commonTraps": "Same as x₂."
      }
    ],
    "solvingLogic": [
      "Identify which variable is unknown (d, x₁, y₁, x₂, or y₂).",
      "If d is unknown: compute d = √((x₂−x₁)² + (y₂−y₁)²).",
      "If a coordinate is unknown (e.g., x₂): rearrange to (x₂−x₁)² = d² − (y₂−y₁)², then x₂ = x₁ ± √(d² − (y₂−y₁)²).",
      "Check that the radicand is ≥ 0; if negative, the given distance is too short for the known coordinate difference.",
      "When a coordinate is solved, there are usually two possible values (±). Choose the one that fits the problem context.",
      "Report the result with correct units."
    ],
    "edgeCases": [
      {
        "title": "Distance Too Short",
        "description": "If d² < (x₂−x₁)² (or (y₂−y₁)²), the radicand becomes negative → no real solution for the missing coordinate."
      },
      {
        "title": "Coincident Points",
        "description": "If (x₁, y₁) = (x₂, y₂), then d = 0. The formula works but the two points are identical."
      },
      {
        "title": "Unit Inconsistency",
        "description": "Mixing units (e.g., x in meters, y in centimeters) produces meaningless results. Convert all coordinates to the same unit first."
      },
      {
        "title": "Sign Ambiguity",
        "description": "Solving for a coordinate yields two possible values (±). Without additional context (e.g., quadrant), both are mathematically valid."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the distance between point A(3, 4) and point B(−1, 2).",
      "solution": [
        "Identify coordinates: x₁ = 3, y₁ = 4, x₂ = −1, y₂ = 2.",
        "Compute differences: Δx = x₂ − x₁ = −1 − 3 = −4. Δy = y₂ − y₁ = 2 − 4 = −2.",
        "Square differences: Δx² = 16, Δy² = 4.",
        "Sum: 16 + 4 = 20.",
        "Square root: d = √20 = 2√5 ≈ 4.4721.",
        "Result: distance ≈ 4.47 units (same units as coordinates)."
      ],
      "answer": "d ≈ 4.47 units"
    }
  },

  "law-of-cosines": {
    "intuition": "The Law of Cosines generalizes the Pythagorean Theorem to any triangle: c² = a² + b² − 2ab·cos(C). It relates the three sides (a, b, c) and one included angle (C). When C = 90°, cos(C) = 0 and it reduces to a² + b² = c². It solves triangles given SAS (two sides and included angle) or SSS (three sides).",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "m",
        "altUnits": "cm, ft, in",
        "description": "Length of side a.",
        "commonTraps": "Must be > 0. Side lengths are always positive."
      },
      {
        "id": "b",
        "siUnit": "m",
        "altUnits": "cm, ft, in",
        "description": "Length of side b.",
        "commonTraps": "Must be > 0."
      },
      {
        "id": "c",
        "siUnit": "m",
        "altUnits": "cm, ft, in",
        "description": "Length of side c (opposite angle C).",
        "commonTraps": "Must be > 0. In a valid triangle, c < a + b (triangle inequality)."
      },
      {
        "id": "C",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Angle C (in degrees) between sides a and b. Range: 0° < C < 180°.",
        "commonTraps": "Ensure angle is in degrees (or convert from radians). cos(C) must be in [−1, 1]; if computed |cos(C)| > 1, the triangle is impossible."
      }
    ],
    "solvingLogic": [
      "Identify knowns: either (a, b, C) → find c, or (a, b, c) → find C.",
      "If finding side c: c = √(a² + b² − 2ab·cos(C)). Convert C to radians for cos() if needed.",
      "If finding angle C: cos(C) = (a² + b² − c²) / (2ab). Check |cos(C)| ≤ 1. Then C = arccos(cos(C)) in degrees.",
      "Verify triangle inequality: each side < sum of other two.",
      "For SAS, the computed side must be positive. For SSS, the computed angle must be in (0°, 180°).",
      "Round results appropriately."
    ],
    "edgeCases": [
      {
        "title": "Degenerate Triangle (C = 0° or 180°)",
        "description": "C = 0° → c = |a − b| (collinear, same direction). C = 180° → c = a + b (collinear, opposite directions). Area = 0."
      },
      {
        "title": "Impossible Triangle (|cos(C)| > 1)",
        "description": "If (a² + b² − c²) / (2ab) is outside [−1, 1], no such triangle exists. Usually violates triangle inequality."
      },
      {
        "title": "Obtuse Angle (C > 90°)",
        "description": "cos(C) is negative, so −2ab·cos(C) adds to a² + b², making c² larger than in a right triangle. This is correct."
      },
      {
        "title": "Unit Mismatch for Angle",
        "description": "Passing degrees to Math.cos (which expects radians) gives wrong results. Always convert: rad = deg × π/180."
      }
    ],
    "walkthroughExample": {
      "problem": "Triangle has sides a = 7 cm, b = 10 cm, and included angle C = 60°. Find side c.",
      "solution": [
        "Known: a = 7, b = 10, C = 60°. Target: c.",
        "Convert angle to radians: 60° × π/180 = π/3 rad. cos(60°) = 0.5.",
        "Apply Law of Cosines: c² = a² + b² − 2ab·cos(C).",
        "Compute: a² = 49, b² = 100, 2ab·cos(C) = 2·7·10·0.5 = 70.",
        "c² = 49 + 100 − 70 = 79.",
        "c = √79 ≈ 8.888 cm."
      ],
      "answer": "c ≈ 8.89 cm"
    }
  },

  "compound-interest": {
    "intuition": "Compound Interest models exponential growth of an investment: A = P(1 + r/n)^(nt). The principal P earns interest at annual rate r, compounded n times per year, for t years. The more frequent the compounding (larger n), the greater the final amount A. It can be rearranged to solve for any variable (P, r, n, t) given the other four.",
    "variableBreakdown": [
      {
        "id": "A",
        "siUnit": "$",
        "altUnits": "€, £, ¥",
        "description": "Final amount (principal + interest).",
        "commonTraps": "Must be > P (for positive rate). Currency symbol is cosmetic; use consistent units."
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "€, £, ¥",
        "description": "Principal (initial investment).",
        "commonTraps": "Must be > 0. Do not confuse with power (W) or pressure (Pa)."
      },
      {
        "id": "r",
        "siUnit": "%",
        "altUnits": "decimal (e.g., 0.05 for 5%)",
        "description": "Annual nominal interest rate as a percentage (e.g., 5 for 5%).",
        "commonTraps": "The formula uses r/100. Entering 0.05 instead of 5 will give a 0.05% rate. Also, r can be negative for depreciation."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of compounding periods per year (e.g., 12 for monthly, 365 for daily).",
        "commonTraps": "Must be a positive integer. Continuous compounding uses the limit n → ∞ (A = Pe^(rt)), not this formula."
      },
      {
        "id": "t",
        "siUnit": "years",
        "altUnits": "months, days (convert to years)",
        "description": "Time in years.",
        "commonTraps": "If time is given in months, divide by 12; if in days, divide by 365 (or 360 for banking). Ensure t matches the period of r."
      }
    ],
    "solvingLogic": [
      "Identify which variable is unknown (A, P, r, n, or t).",
      "Convert r from percentage to decimal: rate = r / 100.",
      "If solving for A: A = P × (1 + rate/n)^(n×t).",
      "If solving for P: P = A / (1 + rate/n)^(n×t).",
      "If solving for r: (1 + rate/n)^(n×t) = A/P → rate = n × ((A/P)^(1/(n×t)) − 1) → r = rate × 100.",
      "If solving for t: t = ln(A/P) / (n × ln(1 + rate/n)). Requires A/P > 0 and rate > 0.",
      "If solving for n: This requires numerical methods (no closed form). Use iteration or solver.",
      "Check that all inputs are positive where required (P > 0, A > 0, n > 0, 1+rate/n > 0)."
    ],
    "edgeCases": [
      {
        "title": "Zero Interest Rate (r = 0)",
        "description": "A = P regardless of n or t. The formula reduces to A = P. Solving for t or r involves division by ln(1) = 0 → undefined."
      },
      {
        "title": "Continuous Compounding Limit",
        "description": "As n → ∞, (1 + r/n)^(nt) → e^(rt). For very large n, use A = P·e^(rt) to avoid floating-point errors."
      },
      {
        "title": "Negative Rate (Depreciation)",
        "description": "r < 0 is valid (e.g., asset depreciation). Ensure 1 + rate/n > 0, otherwise the base becomes negative and non-integer powers are undefined in reals."
      },
      {
        "title": "Fractional Compounding Periods",
        "description": "n must be an integer (periods per year). If given 'compounded every 6 months', n = 2, not 0.5."
      }
    ],
    "walkthroughExample": {
      "problem": "Invest $1,000 at 6% annual rate, compounded monthly, for 5 years. Find the final amount A.",
      "solution": [
        "Identify: P = 1000, r = 6, n = 12, t = 5. Target: A.",
        "Convert rate: rate = 6 / 100 = 0.06.",
        "Compute periodic rate: rate/n = 0.06 / 12 = 0.005.",
        "Compute total periods: n×t = 12 × 5 = 60.",
        "Apply formula: A = 1000 × (1 + 0.005)^60.",
        "Calculate: (1.005)^60 ≈ 1.34885. A = 1000 × 1.34885 = 1348.85.",
        "Interest earned = A − P = 348.85."
      ],
      "answer": "A = $1,348.85 (Interest = $348.85)"
    }
  },

  "logarithmic": {
    "intuition": "The logarithmic equation y = log_b(x) is the inverse of exponentiation: b^y = x. It answers 'to what power must base b be raised to obtain x?' Common bases: 10 (common log), e (natural log, ln), 2 (binary log). The formula solves for any of the three variables given the other two. Domain restrictions: b > 0, b ≠ 1, x > 0.",
    "variableBreakdown": [
      {
        "id": "y",
        "siUnit": "",
        "altUnits": "",
        "description": "Exponent (the logarithm result). Can be any real number (positive, negative, or zero).",
        "commonTraps": "y = log_b(x) means b^y = x. Negative y gives x < 1 (but x > 0)."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "Base of the logarithm. Must be > 0 and ≠ 1.",
        "commonTraps": "b = 1 is invalid (1^y = 1 for all y). b ≤ 0 is invalid for real logarithms. Common bases: 10, e ≈ 2.718, 2."
      },
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "Argument of the logarithm. Must be > 0.",
        "commonTraps": "log_b(0) is undefined (−∞). log_b(negative) is undefined in reals. Ensure x > 0 before computing."
      }
    ],
    "solvingLogic": [
      "Identify which variable is unknown (y, b, or x).",
      "If solving for y (logarithm): y = log_b(x) = ln(x) / ln(b). Use natural log (or log10) for computation.",
      "If solving for x (antilogarithm): x = b^y. Use exponentiation.",
      "If solving for b (base): b = x^(1/y) = e^(ln(x)/y). Requires y ≠ 0 and x > 0.",
      "Check domain: b > 0, b ≠ 1, x > 0. If violated, return error.",
      "For y: any real result is valid. For x: result > 0. For b: result > 0 and ≠ 1.",
      "Round to appropriate precision."
    ],
    "edgeCases": [
      {
        "title": "Base b = 1",
        "description": "log_1(x) is undefined (1^y = 1 always). The formula divides by ln(1) = 0. Must be caught explicitly."
      },
      {
        "title": "Argument x ≤ 0",
        "description": "Logarithm of zero or negative is undefined in real numbers. Return error before computing ln(x)."
      },
      {
        "title": "Exponent y = 0 when solving for b",
        "description": "b = x^(1/0) is undefined. If y = 0, then x = b^0 = 1 for any b ≠ 1. Base cannot be determined uniquely."
      },
      {
        "title": "Base b ≤ 0",
        "description": "Negative or zero base leads to complex results for non-integer y. Restrict to b > 0 for real-valued logs."
      }
    ],
    "walkthroughExample": {
      "problem": "Solve for x: log_2(x) = 5.",
      "solution": [
        "Identify: b = 2, y = 5. Target: x.",
        "Rewrite in exponential form: x = b^y = 2^5.",
        "Compute: 2^5 = 2 × 2 × 2 × 2 × 2 = 32.",
        "Verify: log_2(32) = 5 because 2^5 = 32."
      ],
      "answer": "x = 32"
    }
  }
};
