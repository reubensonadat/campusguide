export const economics_finance = {
  "price-elasticity": {
    "intuition": "Price Elasticity of Demand measures how sensitive customers are to a price change. If a product is 'Elastic' (like luxury watches), a small price hike causes a massive drop in sales. If it is 'Inelastic' (like insulin), people will keep buying it no matter how high the price goes.",
    "variableBreakdown": [
      {
        "id": "Ed",
        "siUnit": "",
        "altUnits": "",
        "description": "Elasticity of Demand (E_d)",
        "commonTraps": "We always take the absolute value! Even though raising prices always lowers demand (negative correlation), elasticity is reported as a positive number. >1 is Elastic. <1 is Inelastic."
      },
      {
        "id": "pctQ",
        "siUnit": "%",
        "altUnits": "",
        "description": "Percentage Change in Quantity",
        "commonTraps": "Must be calculated as (New - Old) / Old."
      },
      {
        "id": "pctP",
        "siUnit": "%",
        "altUnits": "",
        "description": "Percentage Change in Price",
        "commonTraps": "Calculated as (New - Old) / Old."
      }
    ],
    "solvingLogic": [
      "1. Calculate the % change in Quantity Demanded.",
      "2. Calculate the % change in Price.",
      "3. Divide % change in Quantity by the % change in Price.",
      "4. Take the absolute value."
    ],
    "edgeCases": [
      {
        "title": "Perfectly Inelastic",
        "description": "If E_d is exactly 0, demand is perfectly inelastic. This means a 100% price increase causes exactly 0% drop in sales. This is a monopolist's dream, but usually only happens with life-saving drugs."
      }
    ],
    "walkthroughExample": {
      "problem": "A 10% price increase causes a 25% drop in sales. Find the elasticity.",
      "solution": [
        "Quantity change = -25%.",
        "Price change = 10%.",
        "E_d = |-25 / 10| = |-2.5| = 2.5."
      ],
      "answer": "E_d = 2.5 (Highly Elastic)"
    }
  },

  "compound-growth": {
    "intuition": "The Compound Annual Growth Rate (CAGR) smooths out a bumpy investment ride into a steady, flat yearly interest rate. It tells you exactly what fixed bank rate you would have needed to get the same exact end result.",
    "variableBreakdown": [
      {
        "id": "CAGR",
        "siUnit": "%",
        "altUnits": "",
        "description": "Compound Annual Growth Rate",
        "commonTraps": "Usually converted to a percentage by multiplying the decimal by 100."
      },
      {
        "id": "FV",
        "siUnit": "$",
        "altUnits": "",
        "description": "Future Value (Ending Balance)",
        "commonTraps": "The final amount of money in the account."
      },
      {
        "id": "PV",
        "siUnit": "$",
        "altUnits": "",
        "description": "Present Value (Starting Balance)",
        "commonTraps": "The initial investment."
      },
      {
        "id": "t",
        "siUnit": "years",
        "altUnits": "",
        "description": "Time in Years",
        "commonTraps": "If the investment was held for 18 months, t must be 1.5."
      }
    ],
    "solvingLogic": [
      "1. Divide Future Value (FV) by Present Value (PV).",
      "2. Raise that ratio to the power of (1 / t).",
      "3. Subtract 1 from the result."
    ],
    "edgeCases": [
      {
        "title": "The Average Trap",
        "description": "If your portfolio grows 50% year 1, and drops 50% year 2, the 'average' growth is 0%. BUT if you do the math ($100 → $150 → $75), you actually LOST money. CAGR correctly calculates your real return as -13.4%, ignoring misleading averages!"
      }
    ],
    "walkthroughExample": {
      "problem": "An investment grows from $10,000 to $15,000 over 5 years. Find the CAGR.",
      "solution": [
        "Ratio: 15000 / 10000 = 1.5.",
        "Power: 1 / 5 = 0.2.",
        "1.5 ^ 0.2 ≈ 1.0844.",
        "Subtract 1: 0.0844."
      ],
      "answer": "CAGR ≈ 8.44%"
    }
  },

  "gini-coeff": {
    "intuition": "The Gini Coefficient measures wealth inequality in a country. A score of 0 means perfect communism (everyone has the exact same amount of money). A score of 1 means a single dictator owns 100% of the country's wealth, and everyone else has $0.",
    "variableBreakdown": [
      {
        "id": "G",
        "siUnit": "",
        "altUnits": "",
        "description": "Gini Coefficient",
        "commonTraps": "Often multiplied by 100 and called the 'Gini Index' (e.g. a coefficient of 0.45 is a Gini Index of 45)."
      },
      {
        "id": "popShare",
        "siUnit": "%",
        "altUnits": "",
        "description": "Cumulative Population Share",
        "commonTraps": "Plotted on the X-axis of a Lorenz Curve."
      },
      {
        "id": "incShare",
        "siUnit": "%",
        "altUnits": "",
        "description": "Cumulative Income Share",
        "commonTraps": "Plotted on the Y-axis."
      }
    ],
    "solvingLogic": [
      "1. Calculate the area between the 'Line of Perfect Equality' (a 45-degree angle) and the actual 'Lorenz Curve' of the country.",
      "2. Divide that area by the total area under the Line of Perfect Equality (which is always 0.5).",
      "3. Alternatively, Area A / (Area A + Area B)."
    ],
    "edgeCases": [
      {
        "title": "Negative Wealth",
        "description": "In reality, the Gini coefficient can technically exceed 1 if a large portion of the population has negative wealth (massive debt). However, standard economic models usually clamp the scale between 0 and 1."
      }
    ],
    "walkthroughExample": {
      "problem": "The area between the perfect equality line and the Lorenz curve is 0.15. Find Gini.",
      "solution": [
        "Total area under equality line is always 0.5.",
        "Gini = 0.15 / 0.5 = 0.3."
      ],
      "answer": "Gini = 0.3 (Relatively equal society)"
    }
  }
};
