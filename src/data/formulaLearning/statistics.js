export const statistics = {
  "mean-std": {
    "intuition": "Mean is the exact balancing point of all your data (the center of gravity). Standard deviation tells you how 'fat' or 'skinny' your data is—a low deviation means everything is clumped tightly around the average, while a high deviation means the data is wildly scattered.",
    "variableBreakdown": [
      {
        "id": "data",
        "siUnit": "",
        "altUnits": "",
        "description": "Dataset",
        "commonTraps": "A list of numbers (e.g., [2, 4, 4, 4, 5, 5, 7, 9])."
      }
    ],
    "solvingLogic": [
      "1. Calculate the Mean: Add all numbers together and divide by how many numbers there are.",
      "2. For each number, subtract the mean and square the result (this prevents negatives from canceling out positives).",
      "3. Find the average of those squared differences (this is the Variance).",
      "4. Take the square root of the Variance to get the Standard Deviation."
    ],
    "edgeCases": [
      {
        "title": "Sample vs Population",
        "description": "If your data is just a small sample of a larger population, you must divide by (n-1) instead of (n) when finding the variance. This 'Bessel Correction' makes your estimate slightly larger to account for uncertainty."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the mean and population standard deviation of the dataset: [2, 4, 4, 4, 5, 5, 7, 9].",
      "solution": [
        "Sum = 40. Count = 8. Mean = 40 / 8 = 5.",
        "Subtract mean and square: (-3)²=9, (-1)²=1, (-1)²=1, (-1)²=1, (0)²=0, (0)²=0, (2)²=4, (4)²=16.",
        "Sum of squares = 32.",
        "Variance = 32 / 8 = 4.",
        "Standard Deviation = √4 = 2."
      ],
      "answer": "Mean = 5, Std Dev = 2"
    }
  },

  "linear-regression": {
    "intuition": "Linear regression finds the ultimate 'line of best fit' through a messy cloud of data points on a graph. It works by tilting and shifting the line until the total distance between the line and every single data point is minimized as much as mathematically possible.",
    "variableBreakdown": [
      {
        "id": "xdata",
        "siUnit": "",
        "altUnits": "",
        "description": "Independent Variables (X)",
        "commonTraps": "The 'cause' or the input data."
      },
      {
        "id": "ydata",
        "siUnit": "",
        "altUnits": "",
        "description": "Dependent Variables (Y)",
        "commonTraps": "The 'effect' or the output data you are trying to predict."
      }
    ],
    "solvingLogic": [
      "1. Calculate the mean of X and the mean of Y.",
      "2. Calculate the slope (m) using the covariance of X and Y divided by the variance of X.",
      "3. Calculate the Y-intercept (b) using: b = mean(Y) - m × mean(X).",
      "4. The final equation is Y = mx + b."
    ],
    "edgeCases": [
      {
        "title": "Outliers",
        "description": "Because linear regression relies on squaring the distances (Least Squares Method), a single massive outlier will pull the line of best fit violently towards it, ruining the prediction for everything else."
      }
    ],
    "walkthroughExample": {
      "problem": "Given X=[1, 2, 3] and Y=[2, 4, 5], find the line of best fit.",
      "solution": [
        "Mean X = 2. Mean Y = 3.66.",
        "Slope (m) ≈ 1.5.",
        "Intercept (b) = 3.66 - 1.5(2) = 0.66.",
        "Equation: Y = 1.5X + 0.66"
      ],
      "answer": "Y = 1.5X + 0.66"
    }
  },

  "permutation-combination": {
    "intuition": "Combinations count how many groups you can make when order DOES NOT matter (like picking a 3-person committee). Permutations count how many groups you can make when order DOES matter (like picking a President, VP, and Secretary).",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Pool Size (n)",
        "commonTraps": "The total number of items you are choosing FROM."
      },
      {
        "id": "r",
        "siUnit": "",
        "altUnits": "",
        "description": "Number Chosen (r)",
        "commonTraps": "How many items you are picking. Must be ≤ n."
      }
    ],
    "solvingLogic": [
      "1. For Permutations (Order Matters): n! / (n-r)!. This gives you a BIGGER number.",
      "2. For Combinations (Order Doesn't Matter): n! / [r!(n-r)!]. You divide by an extra r! to erase duplicate groups that just have different orders."
    ],
    "edgeCases": [
      {
        "title": "Choosing Zero",
        "description": "If you choose r = 0 items from a pool of n, the formula evaluates to 1. There is exactly 1 way to choose absolutely nothing!"
      }
    ],
    "walkthroughExample": {
      "problem": "How many ways can you pick a 3-person team from 5 people? (Order does not matter, so use Combinations).",
      "solution": [
        "n = 5, r = 3.",
        "Numerator: 5! = 120.",
        "Denominator: 3! × (5-3)! = 6 × 2 = 12.",
        "120 / 12 = 10."
      ],
      "answer": "10 ways"
    }
  }
};
