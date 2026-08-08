export const linear_algebra = {
  "matrix-multiply": {
    "intuition": "Matrix multiplication is not just multiplying grids of numbers—it physically represents combining two separate transformations (like a rotation followed by a stretch) into a single master move. You match the rows of the first matrix against the columns of the second in a 'dot product' sweeping motion.",
    "variableBreakdown": [
      {
        "id": "a11",
        "siUnit": "",
        "altUnits": "",
        "description": "Row 1, Col 1 (Matrix A)",
        "commonTraps": ""
      },
      {
        "id": "a21",
        "siUnit": "",
        "altUnits": "",
        "description": "Row 2, Col 1 (Matrix A)",
        "commonTraps": ""
      },
      {
        "id": "b11",
        "siUnit": "",
        "altUnits": "",
        "description": "Row 1, Col 1 (Matrix B)",
        "commonTraps": ""
      },
      {
        "id": "b21",
        "siUnit": "",
        "altUnits": "",
        "description": "Row 2, Col 1 (Matrix B)",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Check dimensions! A (m × n) can only multiply B (n × p) if the inner numbers match. The result will be (m × p).",
      "2. For the top-left slot of the new matrix, multiply Row 1 of A by Column 1 of B: (a11 × b11) + (a12 × b21).",
      "3. Repeat for all slots."
    ],
    "edgeCases": [
      {
        "title": "Non-Commutative",
        "description": "Unlike normal numbers (3 × 4 = 4 × 3), matrix multiplication is strictly non-commutative (AB does not equal BA). In reality, rotating a book 90 degrees and then flipping it upside down results in a completely different final position than flipping it upside down and THEN rotating it."
      }
    ],
    "walkthroughExample": {
      "problem": "Matrix A is [1, 2]. Matrix B is [3; 4] (a column). Multiply AB.",
      "solution": [
        "A is 1x2. B is 2x1. Result is 1x1.",
        "(1 × 3) + (2 × 4) = 3 + 8 = 11."
      ],
      "answer": "[11]"
    }
  },

  "det-2x2": {
    "intuition": "The determinant measures the physical 'scaling factor' of a matrix. If a 2x2 matrix represents stretching 2D space, the determinant tells you exactly how much the AREA of a square will grow after the stretch. A determinant of 2 means everything doubles in size.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Top Left",
        "commonTraps": ""
      },
      {
        "id": "c",
        "siUnit": "",
        "altUnits": "",
        "description": "Bottom Left",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Multiply the main diagonal (top-left 'a' times bottom-right 'd').",
      "2. Multiply the anti-diagonal (top-right 'b' times bottom-left 'c').",
      "3. Subtract the anti-diagonal from the main diagonal: (ad - bc)."
    ],
    "edgeCases": [
      {
        "title": "Determinant Zero",
        "description": "If the determinant is exactly 0, it means the matrix physically flattens 2D space down into a 1D line (or a 0D point). The entire universe gets crushed, all area becomes 0, and the transformation can NEVER be reversed (it has no inverse)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the determinant of [3, 4; 1, 2].",
      "solution": [
        "Main diagonal: 3 × 2 = 6.",
        "Anti-diagonal: 4 × 1 = 4.",
        "6 - 4 = 2."
      ],
      "answer": "Det = 2"
    }
  },

  "inv-2x2": {
    "intuition": "The Inverse of a matrix is the 'Undo' button. If Matrix A scrambles a vector, multiplying by the Inverse of A perfectly unscrambles it. To build the inverse for a 2x2, you swap the main diagonal, negate the anti-diagonal, and shrink everything by the determinant.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Top Left",
        "commonTraps": ""
      },
      {
        "id": "c",
        "siUnit": "",
        "altUnits": "",
        "description": "Bottom Left",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Calculate the determinant (ad - bc).",
      "2. Swap 'a' and 'd'.",
      "3. Make 'b' and 'c' negative.",
      "4. Divide all four numbers by the determinant."
    ],
    "edgeCases": [
      {
        "title": "Division by Zero",
        "description": "If the determinant is 0, the first step of this formula literally requires dividing by zero, which crashes the math. This perfectly reflects reality: you cannot 'un-flatten' a pancake back into a sphere. The information is permanently destroyed."
      }
    ],
    "walkthroughExample": {
      "problem": "Invert the matrix [4, 7; 2, 6].",
      "solution": [
        "Det: (4×6) - (7×2) = 24 - 14 = 10.",
        "Swap a/d: [6, 7; 2, 4].",
        "Negate b/c: [6, -7; -2, 4].",
        "Divide by 10: [0.6, -0.7; -0.2, 0.4]."
      ],
      "answer": "[0.6, -0.7; -0.2, 0.4]"
    }
  },

  "eigenvalues-2x2": {
    "intuition": "When a matrix warps 2D space, almost every vector gets knocked off its original path. 'Eigenvectors' are the special, stubborn vectors that stay perfectly on their original straight line. 'Eigenvalues' (λ) are just the numbers that measure how much those stubborn vectors got stretched or squished.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Top Left",
        "commonTraps": ""
      },
      {
        "id": "c",
        "siUnit": "",
        "altUnits": "",
        "description": "Bottom Left",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Subtract λ from the main diagonal elements ('a' and 'd').",
      "2. Calculate the determinant of this new matrix.",
      "3. Set the determinant equal to 0. This creates the 'characteristic equation' (λ² - Trace(λ) + Det = 0).",
      "4. Solve the quadratic equation for λ."
    ],
    "edgeCases": [
      {
        "title": "Rotations have Imaginary Eigenvalues",
        "description": "If the matrix represents a perfect 90-degree rotation of space, NO vector stays on its original line (everything spins). If you run this math, the eigenvalues will come out as imaginary numbers (±i), proving that no real physical vectors survived the spin."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the eigenvalues of [2, 0; 0, 3].",
      "solution": [
        "(2-λ)(3-λ) - (0×0) = 0.",
        "(2-λ)(3-λ) = 0.",
        "λ = 2, λ = 3."
      ],
      "answer": "λ = 2, 3 (It stretches the X-axis by 2, and the Y-axis by 3)"
    }
  },

  "dot-product": {
    "intuition": "The Dot Product asks: 'How much are these two vectors working together?' If they point the exact same way, it's maximum. If they are perfectly perpendicular, they completely ignore each other (Dot Product = 0). It's incredibly useful for calculating physics work or lighting in 3D video games.",
    "variableBreakdown": [
      {
        "id": "a1",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector A, Component 1",
        "commonTraps": ""
      },
      {
        "id": "b1",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector B, Component 1",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Multiply the X components together.",
      "2. Multiply the Y components together.",
      "3. Add them up into a single, flat scalar number."
    ],
    "edgeCases": [
      {
        "title": "Cosines in Disguise",
        "description": "The alternative formula for Dot Product is: Length(A) × Length(B) × cos(θ). If the dot product is negative, it means the vectors are pointing in generally opposite directions (an angle greater than 90 degrees)."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the dot product of A [2, 3] and B [4, -1].",
      "solution": [
        "X: 2 × 4 = 8.",
        "Y: 3 × (-1) = -3.",
        "8 + (-3) = 5."
      ],
      "answer": "Dot Product = 5"
    }
  },

  "cross-product": {
    "intuition": "The Cross Product takes two flat 2D vectors and mathematically forces out a completely new 3rd vector that points straight up into the Z-axis, perfectly perpendicular to both of them. It is heavily used to calculate Torque (spinning force) in physics.",
    "variableBreakdown": [
      {
        "id": "a1",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector A, X Component",
        "commonTraps": ""
      },
      {
        "id": "b1",
        "siUnit": "",
        "altUnits": "",
        "description": "Vector B, X Component",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. For 2D vectors [a1, a2] and [b1, b2], the cross product's magnitude is exactly the 2x2 determinant: (a1*b2) - (a2*b1).",
      "2. For full 3D vectors, you must use the 3x3 determinant i, j, k method."
    ],
    "edgeCases": [
      {
        "title": "Anti-Commutative",
        "description": "A × B is NOT equal to B × A. If you cross them in the reverse order, the resulting vector flips completely upside down (A × B = -B × A). This follows the 'Right Hand Rule' in physics."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the cross product of [3, 0] and [0, 4].",
      "solution": [
        "(3 × 4) - (0 × 0) = 12."
      ],
      "answer": "Vector of length 12 pointing straight out of the page."
    }
  }
};
