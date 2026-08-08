export const essential_conversions = {
  "temp-conversion": {
    "intuition": "Fahrenheit is scaled for humans (0 is freezing outside, 100 is your body temp). Celsius is scaled for water (0 is ice, 100 is steam). Kelvin is the absolute, immovable bedrock of the universe (0 means atoms literally stop vibrating entirely).",
    "variableBreakdown": [
      { "id": "C", "siUnit": "°C", "description": "Celsius" },
      { "id": "F", "siUnit": "°F", "description": "Fahrenheit" },
      { "id": "K", "siUnit": "K", "description": "Kelvin", "commonTraps": "Notice there is no 'degree' symbol. It is just 'Kelvin'." }
    ],
    "solvingLogic": [ "C to K: Add 273.15.", "C to F: Multiply by 1.8, then add 32." ],
    "edgeCases": [ { "title": "Minus 40", "description": "-40 is the exact point where the Fahrenheit and Celsius scales perfectly cross over. -40°C is exactly equal to -40°F." } ],
    "walkthroughExample": { "problem": "Convert 20°C to F.", "solution": ["20 × 1.8 = 36", "36 + 32 = 68"], "answer": "68°F (Room temp)" }
  },
  "speed-distance-time": {
    "intuition": "v = d/t",
    "variableBreakdown": [
      { "id": "v", "siUnit": "m/s" },
      { "id": "d", "siUnit": "m" },
      { "id": "t", "siUnit": "s" }
    ],
    "solvingLogic": ["Divide distance by time"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "100m in 10s", "solution": ["100/10"], "answer": "10 m/s" }
  },
  "photon-energy": {
    "intuition": "E = hf",
    "variableBreakdown": [
      { "id": "E", "siUnit": "J" },
      { "id": "f", "siUnit": "Hz" },
      { "id": "lambda", "siUnit": "m" }
    ],
    "solvingLogic": ["Multiply freq by Planck constant"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "f=2", "solution": ["2h"], "answer": "2h J" }
  },
  "mass-defect": {
    "intuition": "Nucleus weighs less than its parts.",
    "variableBreakdown": [
      { "id": "Z", "siUnit": "" },
      { "id": "N", "siUnit": "" },
      { "id": "M", "siUnit": "amu" }
    ],
    "solvingLogic": ["(Z*mp + N*mn) - M"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "Theoretical 10, Actual 9", "solution": ["10-9"], "answer": "1" }
  },
  "tip_split_calculator": {
    "intuition": "Dinner math.",
    "variableBreakdown": [
      { "id": "Each", "siUnit": "$" },
      { "id": "Bill", "siUnit": "$" },
      { "id": "TipPct", "siUnit": "%" },
      { "id": "People", "siUnit": "" }
    ],
    "solvingLogic": ["(Bill * Tip) / People"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "$100, 20% tip, 2 people", "solution": ["120 / 2"], "answer": "$60 each" }
  },
  "loan_amortization_monthly": {
    "intuition": "Monthly mortgage.",
    "variableBreakdown": [
      { "id": "M", "siUnit": "$" },
      { "id": "P", "siUnit": "$" },
      { "id": "r", "siUnit": "%" },
      { "id": "n", "siUnit": "months" }
    ],
    "solvingLogic": ["Complex compounding formula."],
    "edgeCases": [],
    "walkthroughExample": { "problem": "Test", "solution": ["Math"], "answer": "Result" }
  },
  "currency_conversion": {
    "intuition": "Forex math.",
    "variableBreakdown": [ { "id": "Conv", "siUnit": "$" }, { "id": "Amt", "siUnit": "$" }, { "id": "Rate", "siUnit": "" } ],
    "solvingLogic": ["Amt * Rate"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "$10 at 1.5 rate", "solution": ["10 * 1.5"], "answer": "15" }
  },
  "fuel_cost_calculator": {
    "intuition": "Gas math.",
    "variableBreakdown": [
      { "id": "Cost", "siUnit": "$" },
      { "id": "Dist", "siUnit": "mi" },
      { "id": "Eff", "siUnit": "mpg" },
      { "id": "Price", "siUnit": "$/gal" }
    ],
    "solvingLogic": ["(Dist / Eff) * Price"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "100mi, 25mpg, $3/gal", "solution": ["(100/25)*3"], "answer": "$12" }
  },
  "age_calculator": {
    "intuition": "Calculate age.",
    "variableBreakdown": [
      { "id": "Years", "siUnit": "" }, { "id": "BY", "siUnit": "" }, { "id": "BM", "siUnit": "" }, { "id": "BD", "siUnit": "" }
    ],
    "solvingLogic": ["Diff dates"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "2024 - 2000", "solution": ["24"], "answer": "24 years" }
  },
  "gpa_projection": {
    "intuition": "CGPA math.",
    "variableBreakdown": [
      { "id": "NewCGPA", "siUnit": "" }, { "id": "OldCGPA", "siUnit": "" }, { "id": "OldCr", "siUnit": "" }, { "id": "SemGPA", "siUnit": "" }, { "id": "SemCr", "siUnit": "" }
    ],
    "solvingLogic": ["Weighted avg"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "Test", "solution": ["Math"], "answer": "Result" }
  },
  "savings_goal": {
    "intuition": "Savings math.",
    "variableBreakdown": [ { "id": "Monthly", "siUnit": "$" }, { "id": "Goal", "siUnit": "$" }, { "id": "Months", "siUnit": "" } ],
    "solvingLogic": ["Goal / Months"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "$1000 in 10 months", "solution": ["1000/10"], "answer": "$100" }
  },
  "compound_growth": {
    "intuition": "Investment math.",
    "variableBreakdown": [
      { "id": "FV", "siUnit": "$" }, { "id": "PV", "siUnit": "$" }, { "id": "r", "siUnit": "%" }, { "id": "n", "siUnit": "years" }
    ],
    "solvingLogic": ["PV * (1+r)^n"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "Test", "solution": ["Math"], "answer": "Result" }
  },
  "unit_price_comparison": {
    "intuition": "Grocery math.",
    "variableBreakdown": [
      { "id": "UP1", "siUnit": "$" }, { "id": "P1", "siUnit": "$" }, { "id": "Q1", "siUnit": "" },
      { "id": "UP2", "siUnit": "$" }, { "id": "P2", "siUnit": "$" }, { "id": "Q2", "siUnit": "" }
    ],
    "solvingLogic": ["P / Q"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "Test", "solution": ["Math"], "answer": "Result" }
  },
  "salary_tax_estimator": {
    "intuition": "Tax math.",
    "variableBreakdown": [ { "id": "TakeHome", "siUnit": "$" }, { "id": "Salary", "siUnit": "$" }, { "id": "TaxRate", "siUnit": "%" } ],
    "solvingLogic": ["Salary * (1 - Rate)"],
    "edgeCases": [],
    "walkthroughExample": { "problem": "$100k, 20%", "solution": ["100k * 0.8"], "answer": "80k" }
  }
};
