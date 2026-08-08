export const complex_analysis = {
  "cauchy-riemann": {
    "intuition": "The Cauchy-Riemann equations are the ultimate test for a complex function. A normal 1D function just needs to be smooth to be 'differentiable'. But a 2D complex function is incredibly strict: it must slope exactly the same way no matter which direction you approach it from. If these equations pass, the function is 'Holomorphic' (perfectly differentiable everywhere).",
    "variableBreakdown": [
      {
        "id": "ux",
        "siUnit": "",
        "altUnits": "",
        "description": "Partial of u w.r.t x (u_x)",
        "commonTraps": "The real part derived by x."
      },
      {
        "id": "vy",
        "siUnit": "",
        "altUnits": "",
        "description": "Partial of v w.r.t y (v_y)",
        "commonTraps": "The imaginary part derived by y. Must perfectly equal u_x."
      },
      {
        "id": "uy",
        "siUnit": "",
        "altUnits": "",
        "description": "Partial of u w.r.t y (u_y)",
        "commonTraps": "The real part derived by y."
      },
      {
        "id": "vx",
        "siUnit": "",
        "altUnits": "",
        "description": "Partial of v w.r.t x (v_x)",
        "commonTraps": "Must be perfectly equal to the NEGATIVE of u_y."
      }
    ],
    "solvingLogic": [
      "1. Check if u_x = v_y.",
      "2. Check if u_y = -v_x.",
      "3. If both are true, the function is complex differentiable."
    ],
    "edgeCases": [
      {
        "title": "Conjugate Function",
        "description": "The function f(z) = z is holomorphic. But its evil twin, the complex conjugate f(z) = z* (where you just flip the sign of the imaginary part), completely fails the Cauchy-Riemann test. It is not differentiable ANYWHERE, even though it looks like a simple straight line."
      }
    ],
    "walkthroughExample": {
      "problem": "For f(z) = z², u=x²-y² and v=2xy. Are the Cauchy-Riemann equations satisfied?",
      "solution": [
        "u_x = 2x. v_y = 2x. (They match!)",
        "u_y = -2y. v_x = 2y. (u_y = -v_x matches!)"
      ],
      "answer": "Yes, they are satisfied."
    }
  },

  "euler-formula": {
    "intuition": "Euler's Formula (e^(iθ) = cos θ + i sin θ) is the bridge between algebra and geometry. It proves that exponential growth raised to an imaginary power doesn't grow towards infinity, it actually spins in a perfect circle around the complex plane.",
    "variableBreakdown": [
      {
        "id": "theta",
        "siUnit": "rad",
        "altUnits": "°",
        "description": "Angle (θ)",
        "commonTraps": "Must be in RADIANS for the calculus to work properly."
      }
    ],
    "solvingLogic": [
      "1. The real part of the circle is cos(θ).",
      "2. The imaginary part (the Y axis) is sin(θ)."
    ],
    "edgeCases": [
      {
        "title": "Euler's Identity",
        "description": "If you plug in exactly π (180 degrees), cos(π) is -1 and sin(π) is 0. This collapses the formula to e^(iπ) + 1 = 0. This is considered the most beautiful equation in all of mathematics because it unites the 5 most fundamental constants (e, i, π, 1, 0) into a single perfect zero."
      }
    ],
    "walkthroughExample": {
      "problem": "Evaluate e^(iπ/2).",
      "solution": [
        "cos(π/2) = 0.",
        "sin(π/2) = 1.",
        "0 + i(1) = i."
      ],
      "answer": "e^(iπ/2) = i (A perfect 90 degree turn)"
    }
  },

  "demoivre": {
    "intuition": "De Moivre's Theorem is a massive shortcut for multiplying complex numbers. Instead of painstakingly FOIL-ing out (a+bi) to the 10th power, you just convert it to an angle (θ), and instantly multiply the angle by 10.",
    "variableBreakdown": [
      {
        "id": "theta",
        "siUnit": "rad",
        "altUnits": "°",
        "description": "Angle (θ)",
        "commonTraps": ""
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Power (n)",
        "commonTraps": "Must be an integer."
      }
    ],
    "solvingLogic": [
      "1. Multiply the angle θ directly by the power n.",
      "2. The result is cos(nθ) + i sin(nθ)."
    ],
    "edgeCases": [
      {
        "title": "Roots of Unity",
        "description": "You can also use this formula in reverse (making 'n' a fraction like 1/3) to find the cube roots of 1. You will discover there are exactly three answers spaced perfectly 120 degrees apart on a circle, revealing hidden symmetry in basic numbers."
      }
    ],
    "walkthroughExample": {
      "problem": "Evaluate (cos(π/4) + i sin(π/4))².",
      "solution": [
        "n = 2.",
        "Multiply angle: 2 × (π/4) = π/2.",
        "Result: cos(π/2) + i sin(π/2) = i."
      ],
      "answer": "i"
    }
  }
};
