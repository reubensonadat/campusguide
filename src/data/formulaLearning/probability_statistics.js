export const probability_statistics = {
  "z-score": {
    "intuition": "A Z-score tells you exactly how many standard deviations a specific data point is away from the average. It acts as a universal translator, allowing you to compare entirely different things (like SAT scores vs ACT scores) on a single standardized scale.",
    "variableBreakdown": [
      {
        "id": "z",
        "siUnit": "",
        "altUnits": "",
        "description": "Z-Score",
        "commonTraps": "A positive Z-score means the value is above average. A negative Z-score means it's below average."
      },
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "Raw Value (x)",
        "commonTraps": "The specific data point you are analyzing."
      },
      {
        "id": "mu",
        "siUnit": "",
        "altUnits": "",
        "description": "Population Mean (μ)",
        "commonTraps": "The overall average of the entire dataset."
      },
      {
        "id": "sigma",
        "siUnit": "",
        "altUnits": "",
        "description": "Standard Deviation (σ)",
        "commonTraps": "Measures how spread out the data is. Must be positive."
      }
    ],
    "solvingLogic": [
      "1. Subtract the mean from your raw value: (x - μ).",
      "2. Divide that difference by the standard deviation (σ).",
      "3. The result is your Z-score."
    ],
    "edgeCases": [
      {
        "title": "Z-score of 0",
        "description": "If x perfectly equals the mean (μ), the Z-score is exactly 0. You are dead average!"
      }
    ],
    "walkthroughExample": {
      "problem": "If the average test score is 70 with a standard deviation of 10, what is the Z-score of an 85?",
      "solution": [
        "x - μ = 85 - 70 = 15.",
        "Divide by σ: 15 / 10 = 1.5."
      ],
      "answer": "z = 1.5 (You scored 1.5 standard deviations above the average)"
    }
  },

  "binomial-prob": {
    "intuition": "The Binomial Probability formula calculates the exact odds of getting a specific number of 'successes' in a set number of Yes/No trials (like flipping a coin 10 times and getting exactly 3 heads).",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Trials (n)",
        "commonTraps": "Must be a whole integer. You can't flip a coin 2.5 times."
      },
      {
        "id": "k",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Successes (k)",
        "commonTraps": "Must be less than or equal to n."
      },
      {
        "id": "p",
        "siUnit": "",
        "altUnits": "%",
        "description": "Probability of Success (p)",
        "commonTraps": "Must be a decimal between 0 and 1. (e.g. 50% = 0.5)."
      }
    ],
    "solvingLogic": [
      "1. Calculate the 'Combinations' (n choose k), which is n! / [k!(n-k)!]. This counts how many different ways you could get k successes.",
      "2. Multiply by p^k (the probability of those successes happening).",
      "3. Multiply by (1-p)^(n-k) (the probability of the remaining trials failing)."
    ],
    "edgeCases": [
      {
        "title": "Zero Successes",
        "description": "If k=0, 'n choose 0' is 1, and p^0 is 1. The entire formula simplifies to just (1-p)^n, which makes perfect logical sense: it's just the probability of failing every single time."
      }
    ],
    "walkthroughExample": {
      "problem": "What are the odds of getting exactly 2 heads in 3 coin flips? (n=3, k=2, p=0.5)",
      "solution": [
        "Combinations: 3! / (2! × 1!) = 6 / 2 = 3 ways.",
        "p^k = 0.5² = 0.25.",
        "(1-p)^(n-k) = 0.5¹ = 0.5.",
        "Probability = 3 × 0.25 × 0.5 = 0.375."
      ],
      "answer": "37.5% chance"
    }
  },

  "bayes-theorem": {
    "intuition": "Bayes' Theorem lets you update your beliefs based on new evidence. It calculates the probability that a theory is true given new evidence, by comparing how likely the evidence is if the theory were true vs if the theory were false.",
    "variableBreakdown": [
      {
        "id": "PAgB",
        "siUnit": "",
        "altUnits": "",
        "description": "P(A|B)",
        "commonTraps": "The 'posterior'. The probability of A being true, given that B has happened."
      },
      {
        "id": "PBgA",
        "siUnit": "",
        "altUnits": "",
        "description": "P(B|A)",
        "commonTraps": "The 'likelihood'. The probability of seeing evidence B, if A is true."
      },
      {
        "id": "PA",
        "siUnit": "",
        "altUnits": "",
        "description": "P(A)",
        "commonTraps": "The 'prior'. Your base belief that A is true before seeing any evidence."
      },
      {
        "id": "PB",
        "siUnit": "",
        "altUnits": "",
        "description": "P(B)",
        "commonTraps": "The total probability of seeing evidence B under all possible circumstances."
      }
    ],
    "solvingLogic": [
      "1. Multiply the likelihood P(B|A) by your prior belief P(A).",
      "2. Divide that result by the total probability of the evidence P(B).",
      "3. The result is your updated belief P(A|B)."
    ],
    "edgeCases": [
      {
        "title": "False Positives in Medical Tests",
        "description": "A test might have a 99% accuracy rate P(B|A), but if a disease is incredibly rare P(A)=0.0001, a positive test still means you probably DON'T have it because the sheer number of false positives drowns out the real ones."
      }
    ],
    "walkthroughExample": {
      "problem": "P(Fire) = 0.01. P(Smoke | Fire) = 0.9. P(Smoke) = 0.1. What is P(Fire | Smoke)?",
      "solution": [
        "P(Fire|Smoke) = [ P(Smoke|Fire) × P(Fire) ] / P(Smoke).",
        "Numerator = 0.9 × 0.01 = 0.009.",
        "Divide by 0.1: 0.009 / 0.1 = 0.09."
      ],
      "answer": "P(Fire | Smoke) = 0.09 (9% chance)"
    }
  },

  "confidence-interval": {
    "intuition": "When you survey a small sample (like 100 people), you can never be 100% sure their average perfectly matches the whole world. A confidence interval gives you a 'margin of error' buffer zone where the true average is highly likely to fall.",
    "variableBreakdown": [
      {
        "id": "xbar",
        "siUnit": "",
        "altUnits": "",
        "description": "Sample Mean (x̄)",
        "commonTraps": "The average you calculated from your small sample."
      },
      {
        "id": "sigma",
        "siUnit": "",
        "altUnits": "",
        "description": "Standard Deviation (σ or s)",
        "commonTraps": "The spread of the data."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Sample Size (n)",
        "commonTraps": "How many people/items you tested. A larger 'n' shrinks the margin of error!"
      },
      {
        "id": "z",
        "siUnit": "",
        "altUnits": "",
        "description": "Z-Score (Confidence Level)",
        "commonTraps": "Determines how confident you want to be. 1.96 is standard for 95% confidence. 2.58 is for 99% confidence."
      }
    ],
    "solvingLogic": [
      "1. Find the Standard Error: Divide σ by the square root of n (√n).",
      "2. Multiply the Standard Error by your Z-score to get the Margin of Error.",
      "3. Your confidence interval is [x̄ - Margin] to [x̄ + Margin]."
    ],
    "edgeCases": [
      {
        "title": "Small Sample Sizes",
        "description": "If your sample size (n) is less than 30, you technically shouldn't use Z-scores. You should use the wider, more forgiving 'T-distribution' instead to account for the extra uncertainty."
      }
    ],
    "walkthroughExample": {
      "problem": "Sample average = 50, standard deviation = 10, sample size = 100. Find the 95% margin of error (z=1.96).",
      "solution": [
        "√100 = 10.",
        "Standard Error = 10 / 10 = 1.",
        "Margin of Error = 1.96 × 1 = 1.96."
      ],
      "answer": "Interval is 50 ± 1.96 (48.04 to 51.96)"
    }
  },

  "poisson": {
    "intuition": "The Poisson distribution calculates the probability of a certain number of random events happening in a fixed time frame (e.g., how many meteors will hit Earth this year), given that you know the average rate.",
    "variableBreakdown": [
      {
        "id": "lambda",
        "siUnit": "",
        "altUnits": "",
        "description": "Average Rate (λ)",
        "commonTraps": "The average number of events that usually happen in this time frame. Must be > 0."
      },
      {
        "id": "k",
        "siUnit": "",
        "altUnits": "",
        "description": "Target Number of Events (k)",
        "commonTraps": "The exact number of events you want to find the probability for. Must be a positive integer (0, 1, 2...)."
      }
    ],
    "solvingLogic": [
      "1. Raise the constant 'e' (2.718) to the power of negative λ.",
      "2. Raise λ to the power of k.",
      "3. Divide by k factorial (k!).",
      "4. Probability = (e^-λ × λ^k) / k!"
    ],
    "edgeCases": [
      {
        "title": "Probability of ZERO events",
        "description": "If k = 0, then λ^0 is 1, and 0! is 1. The formula elegantly simplifies down to just e^-λ."
      }
    ],
    "walkthroughExample": {
      "problem": "A hospital receives an average of 3 emergency calls per hour (λ=3). What is the probability of exactly 2 calls (k=2) in the next hour?",
      "solution": [
        "e^-3 ≈ 0.0498.",
        "λ^k = 3² = 9.",
        "k! = 2! = 2.",
        "Prob = (0.0498 × 9) / 2 = 0.4482 / 2 = 0.2241."
      ],
      "answer": "22.4% chance"
    }
  }
};
