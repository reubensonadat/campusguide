export const computer_science_algorithms = {
  "big-o-complexity": {
    "intuition": "Big-O Notation calculates how terribly an algorithm breaks down as you feed it more data. If you have 10 items, everything is fast. But if you have 1 billion items, an O(N²) sorting algorithm will literally run until the sun burns out. Big-O doesn't measure seconds, it measures scalability.",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Input Size (n)",
        "commonTraps": "The total number of items to process."
      },
      {
        "id": "ops",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Operations",
        "commonTraps": "The worst-case scenario calculation steps."
      }
    ],
    "solvingLogic": [
      "1. For O(1), ops = 1 (Instant lookup).",
      "2. For O(n), ops = n (Check every item once).",
      "3. For O(n²), ops = n * n (Nested loops checking every pair)."
    ],
    "edgeCases": [
      {
        "title": "Drop the Constants",
        "description": "If an algorithm takes 5N + 1000 steps, in Big-O, you completely delete the 5 and the 1000. At an infinite scale (n = infinity), the 1000 is microscopic dust, and the '5' doesn't change the fundamental shape of the curve. It is simply O(N)."
      }
    ],
    "walkthroughExample": {
      "problem": "An array has 1000 items. A nested loop checks every pair against each other. How many operations?",
      "solution": [
        "Nested loop means O(N²).",
        "ops = 1000 × 1000 = 1,000,000."
      ],
      "answer": "1,000,000 Operations"
    }
  },

  "hamming-distance": {
    "intuition": "Hamming distance just counts how many physical 'typos' exist between two words of the same length. It compares them letter by letter and scores +1 every time they don't match. It is the mathematical foundation for autocorrect and DNA mutation tracking.",
    "variableBreakdown": [
      {
        "id": "s1",
        "siUnit": "",
        "altUnits": "",
        "description": "String 1",
        "commonTraps": ""
      },
      {
        "id": "s2",
        "siUnit": "",
        "altUnits": "",
        "description": "String 2",
        "commonTraps": "Must be the exact same length as String 1."
      }
    ],
    "solvingLogic": [
      "1. Look at the first letter of both strings.",
      "2. If they are different, add 1 to the score.",
      "3. Move to the next letter and repeat."
    ],
    "edgeCases": [
      {
        "title": "Different Lengths",
        "description": "Hamming distance strictly requires the strings to be the same length. If you are comparing 'cat' to 'cats', Hamming distance crashes. You must upgrade to the 'Levenshtein Distance', which allows for inserting and deleting letters."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the Hamming distance between 'karolin' and 'kathrin'.",
      "solution": [
        "k-k (Match)",
        "a-a (Match)",
        "r-t (Diff +1)",
        "o-h (Diff +1)",
        "l-r (Diff +1)",
        "i-i (Match)",
        "n-n (Match)"
      ],
      "answer": "Distance = 3"
    }
  },

  "binary-search": {
    "intuition": "Binary search is the 'Guess Who' algorithm. If you want to find a word in a 1000-page dictionary, you don't read page 1, 2, 3... (O(N) time). You flip exactly to the middle. If the word is earlier, you rip the book in half, throw away the back half, and flip to the new middle. You destroy 50% of the remaining work every single step.",
    "variableBreakdown": [
      {
        "id": "C",
        "siUnit": "",
        "altUnits": "",
        "description": "Maximum Comparisons",
        "commonTraps": "The worst-case scenario before finding the item (or proving it's missing)."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Array Size",
        "commonTraps": "The array MUST be pre-sorted (alphabetical or numerical) for this to work."
      }
    ],
    "solvingLogic": [
      "1. Take the Log (Base 2) of the array size (n).",
      "2. Round up to the next whole number."
    ],
    "edgeCases": [
      {
        "title": "Cosmic Scales",
        "description": "Because log₂(n) is so incredibly powerful, if you had a sorted list containing literally every single atom in the observable universe (10⁸⁰ items), a binary search could find a specific atom in a maximum of just 266 guesses."
      }
    ],
    "walkthroughExample": {
      "problem": "You have a sorted array of 100 items. What is the worst-case number of guesses?",
      "solution": [
        "log₂(100) ≈ 6.64.",
        "Round up to 7."
      ],
      "answer": "7 Guesses"
    }
  },

  "entropy-shannon": {
    "intuition": "Shannon Entropy measures SURPRISE. If a coin has heads on both sides, flipping it gives you zero surprise (Entropy = 0). If a coin is perfectly fair, you have maximum uncertainty, meaning the coin flip transmits exactly 1 'Bit' of new, surprising information into the universe.",
    "variableBreakdown": [
      {
        "id": "p1",
        "siUnit": "",
        "altUnits": "",
        "description": "Probability of Event 1",
        "commonTraps": "A decimal from 0.0 to 1.0."
      },
      {
        "id": "p2",
        "siUnit": "",
        "altUnits": "",
        "description": "Probability of Event 2",
        "commonTraps": "Usually just (1 - p1)."
      }
    ],
    "solvingLogic": [
      "1. For each event, multiply its probability by the Log Base 2 of its probability: p * log₂(p).",
      "2. Add them all together.",
      "3. Put a negative sign in front of the final total."
    ],
    "edgeCases": [
      {
        "title": "The Zero Trap",
        "description": "If an event has a 0% chance of happening, the formula demands you calculate log₂(0), which mathematically crashes into negative infinity. In Information Theory, we just cleanly define 0 * log₂(0) to be exactly 0, preventing the crash."
      }
    ],
    "walkthroughExample": {
      "problem": "A loaded die has a 99% chance of rolling a 6, and a 1% chance of anything else. Find Entropy.",
      "solution": [
        "-( (0.99 × log₂0.99) + (0.01 × log₂0.01) )",
        "-( (0.99 × -0.014) + (0.01 × -6.64) )",
        "-( -0.014 - 0.066 ) = 0.08"
      ],
      "answer": "H = 0.08 Bits (Very little surprise)"
    }
  }
};
