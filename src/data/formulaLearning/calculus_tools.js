export const calculus_tools = {
  "derivative-rules": {
    "intuition": "The power rule is a quick shortcut for taking derivatives of polynomials. A derivative tells you the instantaneous slope (rate of change) of a function at any given point.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient (a)",
        "commonTraps": "The constant multiplier in front of the variable (e.g., the '3' in 3x²)."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Exponent (n)",
        "commonTraps": "The power the variable is raised to."
      },
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "Value to Evaluate (x)",
        "commonTraps": "The specific point on the graph where you want to know the slope."
      }
    ],
    "solvingLogic": [
      "1. To find the derivative formula for axⁿ, pull the exponent 'n' down and multiply it by 'a'.",
      "2. Subtract 1 from the exponent. The new formula is (a×n)xⁿ⁻¹.",
      "3. Plug your specific 'x' value into this new formula to find the numerical slope at that point."
    ],
    "edgeCases": [
      {
        "title": "Constants (n = 0)",
        "description": "The derivative of a plain number (like 5) is always 0, because a horizontal line has no slope."
      },
      {
        "title": "Linear Terms (n = 1)",
        "description": "The derivative of 5x is just 5. Since x¹ becomes x⁰ (which is 1), the variable vanishes."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the slope of f(x) = 4x³ exactly at x = 2.",
      "solution": [
        "Find derivative: n=3 comes down. 4×3 = 12.",
        "New exponent: 3 - 1 = 2. Derivative is 12x².",
        "Evaluate at x=2: 12 × (2)² = 12 × 4 = 48."
      ],
      "answer": "Slope = 48"
    }
  },

  "riemann-sum": {
    "intuition": "A Riemann sum estimates the area under a curve by slicing it into a bunch of vertical rectangles. The more rectangles you use, the skinnier they get, and the closer your estimate gets to the true exact area (the integral).",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Start Point (a)",
        "commonTraps": "The left boundary of the area you are calculating."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "End Point (b)",
        "commonTraps": "The right boundary. Ensure b is greater than a."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Rectangles (n)",
        "commonTraps": "More rectangles = higher accuracy, but takes longer to compute by hand."
      }
    ],
    "solvingLogic": [
      "1. Find the width of each rectangle (Δx): (b - a) / n.",
      "2. Determine the x-values for each rectangle (e.g., using the left edge, right edge, or midpoint).",
      "3. Plug each x-value into the function to find the rectangle's height.",
      "4. Multiply each height by Δx to get the area of each rectangle, then add them all up."
    ],
    "edgeCases": [
      {
        "title": "Negative Areas",
        "description": "If the curve dips below the x-axis, the function's height becomes negative. This means Riemann sums will subtract that 'negative area' from the total!"
      }
    ],
    "walkthroughExample": {
      "problem": "Estimate the area under f(x) = 2x from x=0 to x=4 using 2 rectangles (Right Riemann Sum).",
      "solution": [
        "Δx = (4 - 0) / 2 = 2. So rectangle widths are 2.",
        "Rect 1 is from x=0 to 2. Right edge is 2. Height = f(2) = 4. Area = 2 × 4 = 8.",
        "Rect 2 is from x=2 to 4. Right edge is 4. Height = f(4) = 8. Area = 2 × 8 = 16.",
        "Total Area = 8 + 16 = 24."
      ],
      "answer": "Estimated Area = 24"
    }
  },

  "taylor-series": {
    "intuition": "A Taylor series allows you to mimic perfectly any crazy, complicated curve (like sine, cosine, or e^x) using just basic polynomials (x + x² + x³). It's how calculators actually compute sin(45°) without a lookup table!",
    "variableBreakdown": [
      {
        "id": "func",
        "siUnit": "",
        "altUnits": "",
        "description": "Function",
        "commonTraps": "The complex function you are trying to approximate (e.g., e^x)."
      },
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "Evaluation Point (x)",
        "commonTraps": "The specific value you are trying to compute."
      },
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Terms (N)",
        "commonTraps": "Adding more terms to the polynomial makes the approximation more accurate."
      }
    ],
    "solvingLogic": [
      "1. (For Maclaurin series of e^x): The formula is 1 + x + x²/2! + x³/3! + ...",
      "2. Calculate each term up to N.",
      "3. Add all the terms together."
    ],
    "edgeCases": [
      {
        "title": "Radius of Convergence",
        "description": "Some Taylor Series only work if 'x' is small (between -1 and 1). If you plug in a huge number, the approximation will explode into infinity instead of converging on the right answer."
      }
    ],
    "walkthroughExample": {
      "problem": "Estimate e¹ (which is ~2.718) using the first 4 terms of its Taylor series.",
      "solution": [
        "Term 1: 1",
        "Term 2: x = 1",
        "Term 3: x²/2! = 1² / (2×1) = 0.5",
        "Term 4: x³/3! = 1³ / (3×2×1) = 1/6 ≈ 0.166",
        "Total = 1 + 1 + 0.5 + 0.166 = 2.666."
      ],
      "answer": "Estimate ≈ 2.666 (Pretty close to 2.718!)"
    }
  },

  "newton-method": {
    "intuition": "Newton's Method is a fast trick to find where a function crosses the zero line (its roots). You guess an answer, find the slope at your guess, ride the slope line down to the x-axis, and use that as your new, much better guess.",
    "variableBreakdown": [
      {
        "id": "c",
        "siUnit": "",
        "altUnits": "",
        "description": "Target Value (c)",
        "commonTraps": "Often used to find square roots! Finding the square root of 'c' is the same as finding the root of the equation f(x) = x² - c = 0."
      },
      {
        "id": "x0",
        "siUnit": "",
        "altUnits": "",
        "description": "Initial Guess (x₀)",
        "commonTraps": "The closer your guess is to the true answer, the faster the method works."
      },
      {
        "id": "iters",
        "siUnit": "",
        "altUnits": "",
        "description": "Iterations",
        "commonTraps": "How many times you repeat the process. Usually, 4 or 5 iterations gets you microscopic accuracy."
      }
    ],
    "solvingLogic": [
      "1. Find the function f(x) and its derivative f'(x).",
      "2. The formula for the next guess is: x_new = x_old - [ f(x_old) / f'(x_old) ].",
      "3. Plug the new guess back into the formula.",
      "4. Repeat for 'iters' times."
    ],
    "edgeCases": [
      {
        "title": "Zero Slope",
        "description": "If your guess happens to land exactly on a flat spot on the curve (a local min or max), the derivative f'(x) is 0. The formula tries to divide by zero and instantly crashes."
      }
    ],
    "walkthroughExample": {
      "problem": "Estimate √10 (which solves x² - 10 = 0) with a starting guess of x₀ = 3 for 1 iteration.",
      "solution": [
        "f(x) = x² - 10. Derivative f'(x) = 2x.",
        "f(3) = 3² - 10 = -1.",
        "f'(3) = 2(3) = 6.",
        "x_new = 3 - (-1 / 6) = 3 + 0.166 = 3.166."
      ],
      "answer": "Estimate ≈ 3.166 (Actual is 3.162)"
    }
  }
};
