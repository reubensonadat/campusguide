export const differential_equations = {
  "separable-ode": {
    "intuition": "A Separable Ordinary Differential Equation (ODE) is the easiest type of differential equation. It's essentially algebra mixed with calculus. You just physically push all the 'y' variables to the left side of the equals sign, push all the 'x' variables to the right side, and then integrate both sides separately.",
    "variableBreakdown": [
      {
        "id": "f",
        "siUnit": "",
        "altUnits": "",
        "description": "Function of y",
        "commonTraps": "Must only contain 'y', no 'x's allowed!"
      },
      {
        "id": "g",
        "siUnit": "",
        "altUnits": "",
        "description": "Function of x",
        "commonTraps": "Must only contain 'x'."
      }
    ],
    "solvingLogic": [
      "1. Multiply both sides by dx to move it to the right.",
      "2. Divide by f(y) to move all y's to the left.",
      "3. Integrate the left side with respect to y.",
      "4. Integrate the right side with respect to x.",
      "5. Add a single '+ C' constant to the right side."
    ],
    "edgeCases": [
      {
        "title": "Lost Solutions",
        "description": "When you divide by a function of y (say, dividing by y) to move it to the left side, you are assuming y is NOT zero. If y=0 was a valid flat-line solution to the original problem, you just accidentally deleted it from existence. Always check if the thing you divided by equals zero!"
      }
    ],
    "walkthroughExample": {
      "problem": "Solve dy/dx = 2x * y.",
      "solution": [
        "Divide by y: (1/y) dy = 2x dx.",
        "Integrate left: ln|y|.",
        "Integrate right: x² + C.",
        "ln|y| = x² + C."
      ],
      "answer": "y = e^(x² + C)"
    }
  },

  "linear-1st-order": {
    "intuition": "When an equation is stubbornly 'tangled' and cannot be separated (e.g. dy/dx + P(x)y = Q(x)), you use an Integrating Factor. You multiply the entire equation by a magic function that artificially 'forces' the left side to perfectly collapse into the Product Rule from Calculus 1.",
    "variableBreakdown": [
      {
        "id": "P",
        "siUnit": "",
        "altUnits": "",
        "description": "Function P(x)",
        "commonTraps": "The thing attached to the 'y'. Make sure the 'dy/dx' part is completely by itself first!"
      },
      {
        "id": "Q",
        "siUnit": "",
        "altUnits": "",
        "description": "Function Q(x)",
        "commonTraps": "The lone function on the right side."
      }
    ],
    "solvingLogic": [
      "1. Ensure the equation is in Standard Form: dy/dx + P(x)y = Q(x).",
      "2. Integrate P(x).",
      "3. Raise 'e' to that integral to create the Integrating Factor (I).",
      "4. The left side instantly collapses to the derivative of [y * I].",
      "5. Integrate the right side: integral of [Q(x) * I]."
    ],
    "edgeCases": [
      {
        "title": "Standard Form Trap",
        "description": "If your equation looks like x²(dy/dx) + 3xy = 5, you CANNOT use P(x) = 3x! You MUST divide the entire equation by x² first so that dy/dx is completely naked. If you forget this step, the magic factor won't work."
      }
    ],
    "walkthroughExample": {
      "problem": "dy/dx + 2y = 4. Find the Integrating Factor.",
      "solution": [
        "P(x) = 2.",
        "Integral of 2 dx = 2x.",
        "Raise e to the power of 2x."
      ],
      "answer": "Integrating Factor = e^(2x)"
    }
  },

  "euler-method": {
    "intuition": "Euler's Method is a brute-force computer algorithm to solve impossible differential equations. Instead of trying to find the perfect algebraic curve, it just starts at a point, calculates the slope, takes a tiny step forward in a straight line, calculates the new slope, and repeats. It traces out a jagged, pixelated version of the true curve.",
    "variableBreakdown": [
      {
        "id": "y0",
        "siUnit": "",
        "altUnits": "",
        "description": "Initial Value (y₀)",
        "commonTraps": "The exact starting point."
      },
      {
        "id": "h",
        "siUnit": "",
        "altUnits": "",
        "description": "Step Size (h)",
        "commonTraps": "A tiny h (like 0.001) is very accurate but takes millions of calculations. A large h (like 1.0) is fast but wildly inaccurate."
      },
      {
        "id": "steps",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Steps",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Calculate the slope at the current (x, y) point.",
      "2. Multiply the slope by the step size (h) to find the 'rise'.",
      "3. Add the 'rise' to the current y to get the new y.",
      "4. Add 'h' to the current x to get the new x.",
      "5. Repeat."
    ],
    "edgeCases": [
      {
        "title": "Overshooting the Curve",
        "description": "Because Euler's method takes straight-line steps, if the true mathematical curve turns sharply, Euler's method will fly straight off the cliff. This causes the error to compound endlessly. Modern computers use 'Runge-Kutta' methods instead, which 'peek ahead' to curve the steps."
      }
    ],
    "walkthroughExample": {
      "problem": "dy/dx = y. Start at (0, 1). Step size h = 0.1. Find y after one step.",
      "solution": [
        "Current y = 1.",
        "Slope (which is y) = 1.",
        "Rise = 1 × 0.1 = 0.1.",
        "New y = 1 + 0.1 = 1.1."
      ],
      "answer": "y₁ = 1.1"
    }
  },

  "char-eqn-2nd-order": {
    "intuition": "For a 2nd-Order Linear Homogeneous equation (ay'' + by' + cy = 0), you pretend that the solution is an exponential function (e^(rx)). When you plug that guess into the equation, all the calculus magically vanishes, leaving behind a simple middle-school quadratic equation: ar² + br + c = 0.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient a",
        "commonTraps": "Attached to the second derivative (y'')."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient b",
        "commonTraps": "Attached to the first derivative (y')."
      },
      {
        "id": "c",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient c",
        "commonTraps": "Attached to plain 'y'."
      }
    ],
    "solvingLogic": [
      "1. Write the characteristic equation: ar² + br + c = 0.",
      "2. Solve for 'r' using the quadratic formula or factoring.",
      "3. If 2 real roots (r1, r2): Solution is y = C₁e^(r₁x) + C₂e^(r₂x).",
      "4. If 1 repeated root (r): Solution is y = C₁e^(rx) + C₂xe^(rx)."
    ],
    "edgeCases": [
      {
        "title": "Imaginary Roots (Oscillation)",
        "description": "If the quadratic formula gives you an imaginary number (like ±3i), it means the system physically oscillates. Instead of exponential growth, Euler's formula kicks in, and the solution turns into Sine and Cosine waves (like a bouncing spring)."
      }
    ],
    "walkthroughExample": {
      "problem": "Solve y'' - 3y' + 2y = 0.",
      "solution": [
        "Equation: r² - 3r + 2 = 0.",
        "Factor: (r-1)(r-2) = 0.",
        "Roots: r=1, r=2."
      ],
      "answer": "y = C₁e^x + C₂e^(2x)"
    }
  }
};
