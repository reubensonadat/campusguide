export const data_science_machine_learning = {
  "euclidean-distance": {
    "intuition": "Euclidean distance is the straight-line distance between two points in a dataset. In machine learning, it is the most common way to measure how 'similar' two items are (e.g., used in K-Means clustering or K-Nearest Neighbors).",
    "variableBreakdown": [
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 1 Coordinates",
        "commonTraps": "A list of numbers representing the features of item 1 (e.g., [height, weight, age])."
      },
      {
        "id": "y",
        "siUnit": "",
        "altUnits": "",
        "description": "Point 2 Coordinates",
        "commonTraps": "Must have the exact same number of dimensions (features) as Point 1."
      }
    ],
    "solvingLogic": [
      "1. For each feature, subtract Point 1's value from Point 2's value.",
      "2. Square that difference.",
      "3. Add up all those squared differences.",
      "4. Take the square root of the total sum."
    ],
    "edgeCases": [
      {
        "title": "Curse of Dimensionality",
        "description": "If your dataset has thousands of features (dimensions), Euclidean distance breaks down. Everything becomes roughly the same distance apart, making algorithms like K-Nearest Neighbors useless. You must use cosine similarity or reduce dimensionality (PCA) instead."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the distance between Point X (1, 3) and Point Y (4, 7).",
      "solution": [
        "Difference in first dimension: 4 - 1 = 3. Squared = 9.",
        "Difference in second dimension: 7 - 3 = 4. Squared = 16.",
        "Sum of squares: 9 + 16 = 25.",
        "Square root of 25 = 5."
      ],
      "answer": "Distance = 5"
    }
  },

  "pearson-correlation": {
    "intuition": "Pearson correlation (r) measures how perfectly a dataset forms a straight line on a scatter plot. A score of 1 means as X goes up, Y goes up in a perfect line. A score of -1 means as X goes up, Y goes down perfectly. A score of 0 means pure random noise.",
    "variableBreakdown": [
      {
        "id": "x",
        "siUnit": "",
        "altUnits": "",
        "description": "Feature X Data",
        "commonTraps": "The list of inputs for the first variable."
      },
      {
        "id": "y",
        "siUnit": "",
        "altUnits": "",
        "description": "Feature Y Data",
        "commonTraps": "The list of inputs for the second variable. Must be exactly the same length as X."
      }
    ],
    "solvingLogic": [
      "1. Calculate the covariance of X and Y.",
      "2. Calculate the standard deviation of X and the standard deviation of Y.",
      "3. Divide the covariance by the product of the two standard deviations."
    ],
    "edgeCases": [
      {
        "title": "Non-Linear Relationships",
        "description": "Pearson only checks for straight lines. If your data forms a perfect U-shape (like y = x²), the Pearson correlation will be exactly 0, completely missing the perfect relationship! You would need Spearman rank correlation instead."
      }
    ],
    "walkthroughExample": {
      "problem": "Calculate the correlation for X=[1,2,3] and Y=[2,4,6].",
      "solution": [
        "Since Y is exactly 2 times X, they form a perfect, straight upward-sloping line.",
        "No math required if you spot the perfect linear relationship."
      ],
      "answer": "r = 1.0"
    }
  },

  "bayes-theorem": {
    "intuition": "In Machine Learning, Bayes' Theorem powers Naive Bayes classifiers (like email spam filters). It calculates the probability of a label (like 'Spam') given the features (like the word 'Free'), by looking at how often the word 'Free' appears in known spam emails.",
    "variableBreakdown": [
      {
        "id": "PAgB",
        "siUnit": "",
        "altUnits": "",
        "description": "P(Class | Features)",
        "commonTraps": "The output of the model: the probability this item belongs to the class."
      },
      {
        "id": "PBgA",
        "siUnit": "",
        "altUnits": "",
        "description": "P(Features | Class)",
        "commonTraps": "How likely are these features to appear IF the item actually is in this class."
      },
      {
        "id": "PA",
        "siUnit": "",
        "altUnits": "",
        "description": "P(Class)",
        "commonTraps": "The overall frequency of the class in the whole dataset."
      },
      {
        "id": "PB",
        "siUnit": "",
        "altUnits": "",
        "description": "P(Features)",
        "commonTraps": "The overall probability of seeing these exact features."
      }
    ],
    "solvingLogic": [
      "1. Multiply the feature likelihood P(B|A) by the class prior P(A).",
      "2. Divide by the total evidence probability P(B)."
    ],
    "edgeCases": [
      {
        "title": "The Zero-Frequency Problem",
        "description": "In Naive Bayes, if a word (feature) was NEVER seen in the training data for the 'Spam' class, P(B|A) becomes 0. Because it multiplies, it wipes out the entire probability to 0%. To fix this, ML engineers use 'Laplace Smoothing' (adding a tiny fake count of 1 to everything)."
      }
    ],
    "walkthroughExample": {
      "problem": "P(Spam) = 0.2. P('Viagra' | Spam) = 0.5. P('Viagra') = 0.11. Is an email with 'Viagra' spam?",
      "solution": [
        "P(Spam | 'Viagra') = ( 0.5 × 0.2 ) / 0.11",
        "0.10 / 0.11 ≈ 0.909."
      ],
      "answer": "P = 0.909 (90.9% chance it is spam)"
    }
  },

  "silhouette-score": {
    "intuition": "Silhouette score evaluates how good a clustering algorithm (like K-Means) performed. It measures how close an object is to its own cluster compared to how close it is to the neighboring clusters. +1 is perfect, 0 is overlapping, and -1 means it was assigned to the wrong cluster.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Intra-cluster Distance (a)",
        "commonTraps": "Mean distance between the point and all other points in its OWN cluster. You want this to be small."
      },
      {
        "id": "b",
        "siUnit": "",
        "altUnits": "",
        "description": "Nearest-cluster Distance (b)",
        "commonTraps": "Mean distance between the point and all points in the NEXT CLOSEST cluster. You want this to be large."
      },
      {
        "id": "s",
        "siUnit": "",
        "altUnits": "",
        "description": "Silhouette Score (s)",
        "commonTraps": "Ranges strictly from -1 to 1."
      }
    ],
    "solvingLogic": [
      "1. Subtract the intra-cluster distance (a) from the nearest-cluster distance (b): b - a.",
      "2. Divide by the maximum of either 'a' or 'b' (usually 'b' if the clustering is good).",
      "3. Formula: (b - a) / max(a, b)."
    ],
    "edgeCases": [
      {
        "title": "Single Point Clusters",
        "description": "If a cluster only has a single data point in it, 'a' cannot be calculated. By convention, the silhouette score for that point is forced to 0."
      }
    ],
    "walkthroughExample": {
      "problem": "A point has an average distance of 2 to its own cluster (a=2), and an average distance of 8 to the next closest cluster (b=8). Find its score.",
      "solution": [
        "b - a = 8 - 2 = 6.",
        "max(a, b) = 8.",
        "s = 6 / 8 = 0.75."
      ],
      "answer": "s = 0.75 (Very good clustering)"
    }
  },

  "gini-impurity": {
    "intuition": "Gini Impurity is used by Decision Trees to figure out the best way to split data. It measures the probability of incorrectly classifying a randomly chosen element if it were randomly labeled according to the distribution of labels in the set. You want this number to be as close to 0 (pure) as possible.",
    "variableBreakdown": [
      {
        "id": "p1",
        "siUnit": "",
        "altUnits": "%",
        "description": "Probability of Class 1",
        "commonTraps": "The fraction of items that belong to the first class in this node."
      },
      {
        "id": "p2",
        "siUnit": "",
        "altUnits": "%",
        "description": "Probability of Class 2",
        "commonTraps": "The fraction of items that belong to the second class."
      }
    ],
    "solvingLogic": [
      "1. Square the probability of Class 1: p1².",
      "2. Square the probability of Class 2: p2².",
      "3. Subtract both from 1: Gini = 1 - (p1² + p2²)."
    ],
    "edgeCases": [
      {
        "title": "Maximum Impurity",
        "description": "If a node is split perfectly 50/50 between two classes, p1 = 0.5 and p2 = 0.5. The Gini impurity is 1 - (0.25 + 0.25) = 0.5. This is the absolute worst-case scenario (maximum impurity) for a binary classification."
      }
    ],
    "walkthroughExample": {
      "problem": "A leaf in a decision tree has 9 'Cats' and 1 'Dog'. Find the Gini impurity.",
      "solution": [
        "p1 (Cat) = 9/10 = 0.9.",
        "p2 (Dog) = 1/10 = 0.1.",
        "Gini = 1 - (0.9² + 0.1²) = 1 - (0.81 + 0.01) = 1 - 0.82 = 0.18."
      ],
      "answer": "Gini = 0.18 (Quite pure)"
    }
  }
};
