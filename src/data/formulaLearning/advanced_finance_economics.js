export const advanced_finance_economics = {
  "pv-annuity": {
    "intuition": "Present Value of an Annuity tells you exactly how much a guaranteed stream of future payments (like a winning lottery ticket paid out over 20 years) is worth TODAY in one lump sum, factoring in that money today is worth more than money tomorrow due to interest.",
    "variableBreakdown": [
      {
        "id": "PV",
        "siUnit": "$",
        "altUnits": "",
        "description": "Present Value",
        "commonTraps": "The total lump sum value today."
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "",
        "description": "Payment Amount (P)",
        "commonTraps": "The repeating payment (e.g. $1000 every year)."
      },
      {
        "id": "r",
        "siUnit": "%",
        "altUnits": "",
        "description": "Interest Rate per Period (r)",
        "commonTraps": "Must be a decimal. If the annual rate is 12%, but payments are monthly, you MUST divide the rate by 12 (0.12 / 12 = 0.01)."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Number of Payments (n)",
        "commonTraps": "If paying monthly for 5 years, n is 60, not 5!"
      }
    ],
    "solvingLogic": [
      "1. Calculate (1 + r)^n.",
      "2. Divide 1 by that result.",
      "3. Subtract that from 1: [1 - (1 / (1+r)^n)].",
      "4. Divide by the interest rate 'r'.",
      "5. Multiply by the Payment (P)."
    ],
    "edgeCases": [
      {
        "title": "Perpetuities",
        "description": "If the payments never stop (n = infinity), the complex bracket simply becomes 1/r. The formula gracefully collapses to PV = P / r. If you get $100 a year forever at 5% interest, the present value is just 100 / 0.05 = $2000!"
      }
    ],
    "walkthroughExample": {
      "problem": "What is the present value of receiving $100 a year for 3 years at 10% interest?",
      "solution": [
        "1 + 0.1 = 1.1.",
        "1.1³ = 1.331.",
        "1 / 1.331 = 0.7513.",
        "1 - 0.7513 = 0.2487.",
        "0.2487 / 0.1 = 2.487.",
        "Multiply by 100: 248.70."
      ],
      "answer": "PV = $248.70 (Not $300!)"
    }
  },

  "fv-annuity": {
    "intuition": "Future Value of an Annuity calculates how much a steady stream of investments (like putting $100 in a 401k every month) will be worth in the future when you retire, thanks to the magic of compounding interest.",
    "variableBreakdown": [
      {
        "id": "FV",
        "siUnit": "$",
        "altUnits": "",
        "description": "Future Value",
        "commonTraps": "The massive pile of cash you'll have at the end."
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "",
        "description": "Payment Amount (P)",
        "commonTraps": "The repeating deposit."
      },
      {
        "id": "r",
        "siUnit": "%",
        "altUnits": "",
        "description": "Interest Rate per Period (r)",
        "commonTraps": "Must be matched to the payment period (e.g. monthly rate for monthly payments)."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Number of Payments (n)",
        "commonTraps": "Total months or years you make the deposit."
      }
    ],
    "solvingLogic": [
      "1. Calculate (1 + r)^n.",
      "2. Subtract 1: [ (1+r)^n - 1 ].",
      "3. Divide by the interest rate 'r'.",
      "4. Multiply by the Payment (P)."
    ],
    "edgeCases": [
      {
        "title": "Annuity Due",
        "description": "If you make payments at the BEGINNING of the month (like rent) instead of the END of the month, your money compounds for one extra month. You must multiply the final answer by an extra (1 + r)."
      }
    ],
    "walkthroughExample": {
      "problem": "Invest $1,000 a year for 40 years at 7% annual interest. Find FV.",
      "solution": [
        "1.07⁴⁰ ≈ 14.974.",
        "14.974 - 1 = 13.974.",
        "13.974 / 0.07 = 199.63.",
        "199.63 × 1000 = 199,630."
      ],
      "answer": "FV ≈ $199,630"
    }
  },

  "mortgage-amort": {
    "intuition": "This formula calculates your exact fixed monthly mortgage payment. In the early years, almost all of this payment goes to the bank as interest, while in the later years, the same exact payment mostly pays off the house itself.",
    "variableBreakdown": [
      {
        "id": "M",
        "siUnit": "$",
        "altUnits": "",
        "description": "Monthly Payment (M)",
        "commonTraps": "This is just principal and interest. It does NOT include property taxes or insurance."
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "",
        "description": "Principal Loan Amount (P)",
        "commonTraps": "The amount you borrowed, NOT the purchase price of the house (subtract your down payment!)."
      },
      {
        "id": "r",
        "siUnit": "%",
        "altUnits": "",
        "description": "Monthly Interest Rate (r)",
        "commonTraps": "Take the annual rate and divide by 12."
      },
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Number of Months (n)",
        "commonTraps": "A 30-year mortgage is 360 months."
      }
    ],
    "solvingLogic": [
      "1. Calculate (1 + r)^n.",
      "2. Multiply that by 'r' to get the numerator: r(1+r)^n.",
      "3. Subtract 1 from (1+r)^n to get the denominator: (1+r)^n - 1.",
      "4. Divide numerator by denominator.",
      "5. Multiply by the Principal (P)."
    ],
    "edgeCases": [
      {
        "title": "Extra Payments",
        "description": "If you pay just $100 extra a month, this formula breaks (in a good way!). Because the extra $100 goes purely to principal, 'P' drops faster, which lowers next month's interest, knocking years off a 30-year loan."
      }
    ],
    "walkthroughExample": {
      "problem": "Borrow $200,000 for 30 years (360 months) at 6% annual interest (0.5% monthly).",
      "solution": [
        "r = 0.005. n = 360.",
        "(1.005)³⁶⁰ ≈ 6.022.",
        "Numerator: 0.005 × 6.022 = 0.03011.",
        "Denominator: 6.022 - 1 = 5.022.",
        "0.03011 / 5.022 = 0.005996.",
        "0.005996 × 200,000 = 1199."
      ],
      "answer": "M ≈ $1,199 per month"
    }
  },

  "capm": {
    "intuition": "The Capital Asset Pricing Model (CAPM) tells investors how much profit they SHOULD demand from a stock to justify its risk. If a stock is highly volatile, you demand a massive expected return. If it's safe, you accept a lower return.",
    "variableBreakdown": [
      {
        "id": "ER",
        "siUnit": "%",
        "altUnits": "",
        "description": "Expected Return (ER)",
        "commonTraps": "The final percentage profit required."
      },
      {
        "id": "Rf",
        "siUnit": "%",
        "altUnits": "",
        "description": "Risk-Free Rate (Rf)",
        "commonTraps": "Usually the yield on a 10-year US Treasury bond. What you get for taking zero risk."
      },
      {
        "id": "Beta",
        "siUnit": "",
        "altUnits": "",
        "description": "Beta (β)",
        "commonTraps": "A measure of stock volatility compared to the market. Beta > 1 means it swings wilder than the market. Beta < 1 means it's steadier."
      },
      {
        "id": "ERm",
        "siUnit": "%",
        "altUnits": "",
        "description": "Expected Market Return",
        "commonTraps": "The average return of the whole stock market (often estimated around 8-10%)."
      }
    ],
    "solvingLogic": [
      "1. Calculate the 'Market Risk Premium' by subtracting the Risk-Free Rate from the Market Return: (ERm - Rf).",
      "2. Multiply the Premium by the stock's Beta.",
      "3. Add the Risk-Free Rate back in."
    ],
    "edgeCases": [
      {
        "title": "Negative Beta",
        "description": "If a stock has a negative Beta (it goes UP when the market crashes, like gold miners), the CAPM formula will actually output an expected return LOWER than the risk-free rate, because you are paying a premium for its 'insurance' properties."
      }
    ],
    "walkthroughExample": {
      "problem": "Risk-free rate is 3%. Market return is 10%. A tech stock has a Beta of 1.5. Find ER.",
      "solution": [
        "Premium: 10% - 3% = 7%.",
        "Multiply by Beta: 7% × 1.5 = 10.5%.",
        "Add Risk Free: 10.5% + 3% = 13.5%."
      ],
      "answer": "ER = 13.5%"
    }
  },

  "elasticity": {
    "intuition": "Price Elasticity calculates if raising your prices will actually make you more money. (It is the exact same concept as 'price-elasticity' in Economics, but shown with the midpoint formula used in business).",
    "variableBreakdown": [
      {
        "id": "E",
        "siUnit": "",
        "altUnits": "",
        "description": "Elasticity (E)",
        "commonTraps": "Absolute value."
      },
      {
        "id": "Q1",
        "siUnit": "",
        "altUnits": "",
        "description": "Old Quantity",
        "commonTraps": ""
      },
      {
        "id": "Q2",
        "siUnit": "",
        "altUnits": "",
        "description": "New Quantity",
        "commonTraps": ""
      },
      {
        "id": "P1",
        "siUnit": "$",
        "altUnits": "",
        "description": "Old Price",
        "commonTraps": ""
      },
      {
        "id": "P2",
        "siUnit": "$",
        "altUnits": "",
        "description": "New Price",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Find the change in Quantity (Q2 - Q1).",
      "2. Find the average Quantity (Q1 + Q2) / 2.",
      "3. Divide step 1 by step 2 to get the Midpoint % change in Quantity.",
      "4. Repeat steps 1-3 for Price.",
      "5. Divide the Quantity % by the Price %."
    ],
    "edgeCases": [
      {
        "title": "Why the Midpoint?",
        "description": "If you raise a price from $10 to $15, that's a 50% increase. If you drop it from $15 back to $10, that's a 33% decrease. This asymmetry breaks math models! The Midpoint formula solves this by using the average ($12.50) as the base, so the percentage change is identical in both directions."
      }
    ],
    "walkthroughExample": {
      "problem": "Price rises from $4 to $6. Quantity drops from 120 to 80.",
      "solution": [
        "Q Change: 80 - 120 = -40. Q Avg: 100. Q % = -40/100 = -40%.",
        "P Change: 6 - 4 = 2. P Avg: 5. P % = 2/5 = 40%.",
        "Elasticity = |-40% / 40%| = 1."
      ],
      "answer": "E = 1 (Unit Elastic)"
    }
  },

  "roi": {
    "intuition": "Return on Investment (ROI) is the ultimate metric for any business decision. It simply asks: 'For every dollar I spent, how many percentage points of profit did I make?'",
    "variableBreakdown": [
      {
        "id": "ROI",
        "siUnit": "%",
        "altUnits": "",
        "description": "Return on Investment",
        "commonTraps": "A negative ROI means you lost money."
      },
      {
        "id": "G",
        "siUnit": "$",
        "altUnits": "",
        "description": "Gain from Investment",
        "commonTraps": "The total revenue or final value."
      },
      {
        "id": "C",
        "siUnit": "$",
        "altUnits": "",
        "description": "Cost of Investment",
        "commonTraps": "The initial amount spent."
      }
    ],
    "solvingLogic": [
      "1. Subtract the Cost from the Gain to find the Net Profit: (G - C).",
      "2. Divide the Net Profit by the Cost.",
      "3. Multiply by 100 to get a percentage."
    ],
    "edgeCases": [
      {
        "title": "Time Blindness",
        "description": "ROI has no concept of time! A 10% ROI looks great, until you realize it took 20 years to achieve. Always pair ROI with an annualized metric (like CAGR) for real-world decisions."
      }
    ],
    "walkthroughExample": {
      "problem": "You buy a vintage guitar for $500 (Cost) and sell it for $700 (Gain).",
      "solution": [
        "Net Profit: 700 - 500 = 200.",
        "Divide by Cost: 200 / 500 = 0.4.",
        "Multiply by 100: 40%."
      ],
      "answer": "ROI = 40%"
    }
  },

  "wacc": {
    "intuition": "Weighted Average Cost of Capital (WACC) is the average interest rate a company pays to finance its business. Companies use a mix of Debt (bank loans) and Equity (selling stock). WACC blends the cost of both together based on how much of each they use.",
    "variableBreakdown": [
      {
        "id": "WACC",
        "siUnit": "%",
        "altUnits": "",
        "description": "Weighted Avg Cost of Capital",
        "commonTraps": "This is the 'hurdle rate'. If a new project doesn't generate a return higher than the WACC, the company loses money by doing it."
      },
      {
        "id": "E",
        "siUnit": "$",
        "altUnits": "",
        "description": "Market Value of Equity",
        "commonTraps": "Total value of all outstanding shares."
      },
      {
        "id": "D",
        "siUnit": "$",
        "altUnits": "",
        "description": "Market Value of Debt",
        "commonTraps": "Total value of the company's loans."
      },
      {
        "id": "Re",
        "siUnit": "%",
        "altUnits": "",
        "description": "Cost of Equity",
        "commonTraps": "What return shareholders demand (often found using CAPM)."
      },
      {
        "id": "Rd",
        "siUnit": "%",
        "altUnits": "",
        "description": "Cost of Debt",
        "commonTraps": "The interest rate on the loans."
      },
      {
        "id": "Tc",
        "siUnit": "%",
        "altUnits": "",
        "description": "Corporate Tax Rate",
        "commonTraps": "Debt gets a special discount because interest payments are tax-deductible!"
      }
    ],
    "solvingLogic": [
      "1. Find Total Value (V = E + D).",
      "2. Calculate Equity weight (E/V) and multiply by Cost of Equity (Re).",
      "3. Calculate Debt weight (D/V) and multiply by Cost of Debt (Rd).",
      "4. Multiply the Debt portion by (1 - Tc) to apply the tax shield.",
      "5. Add the Equity portion and Debt portion together."
    ],
    "edgeCases": [
      {
        "title": "The Tax Shield Magic",
        "description": "Because interest payments are tax-deductible, adding more debt actually LOWERS a company's WACC... up to a point. If they take on too much debt, bankruptcy risk spikes, causing the Cost of Debt (Rd) to skyrocket and overriding the tax benefit."
      }
    ],
    "walkthroughExample": {
      "problem": "Equity=60%, Re=10%. Debt=40%, Rd=5%, Tax=20%. Find WACC.",
      "solution": [
        "Equity Portion: 0.60 × 0.10 = 0.06.",
        "Debt Portion: 0.40 × 0.05 = 0.02.",
        "Apply Tax Shield to Debt: 0.02 × (1 - 0.20) = 0.016.",
        "Total WACC: 0.06 + 0.016 = 0.076."
      ],
      "answer": "WACC = 7.6%"
    }
  },

  "bep": {
    "intuition": "The Break-Even Point tells you exactly how many units of a product you must sell to perfectly cover your rent and machinery costs (Fixed Costs). Every single unit sold AFTER the break-even point is pure profit.",
    "variableBreakdown": [
      {
        "id": "Q",
        "siUnit": "units",
        "altUnits": "",
        "description": "Break-Even Quantity",
        "commonTraps": "Must be rounded UP to the nearest whole unit (you can't sell half a laptop)."
      },
      {
        "id": "FC",
        "siUnit": "$",
        "altUnits": "",
        "description": "Fixed Costs",
        "commonTraps": "Costs that never change no matter how many you make (e.g. factory rent)."
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "",
        "description": "Price per Unit",
        "commonTraps": "What the customer pays."
      },
      {
        "id": "VC",
        "siUnit": "$",
        "altUnits": "",
        "description": "Variable Cost per Unit",
        "commonTraps": "Costs that rise with every unit made (e.g. raw materials, packaging)."
      }
    ],
    "solvingLogic": [
      "1. Subtract the Variable Cost from the Price: (P - VC). This is your 'Contribution Margin'.",
      "2. Divide the Fixed Costs by the Contribution Margin."
    ],
    "edgeCases": [
      {
        "title": "Negative Contribution",
        "description": "If Variable Costs are higher than the Price (VC > P), the denominator becomes negative. This means you lose money on every single unit you make. You will NEVER break even, you'll just dig a deeper hole faster!"
      }
    ],
    "walkthroughExample": {
      "problem": "Factory rent is $1000. It costs $2 in plastic to make a toy. You sell the toy for $7. Find BEP.",
      "solution": [
        "Contribution Margin: 7 - 2 = $5 per toy.",
        "Divide Fixed Costs: 1000 / 5 = 200."
      ],
      "answer": "Q = 200 toys"
    }
  },

  "straight_line_depreciation": {
    "intuition": "Straight-line depreciation spreads the cost of a massive asset (like a delivery truck) evenly over the number of years it will be used. This prevents a company from looking like they went bankrupt in the year they bought the truck, and falsely rich in the years they just use it.",
    "variableBreakdown": [
      {
        "id": "D",
        "siUnit": "$",
        "altUnits": "",
        "description": "Annual Depreciation Expense",
        "commonTraps": "The amount deducted from profits every single year."
      },
      {
        "id": "C",
        "siUnit": "$",
        "altUnits": "",
        "description": "Cost of Asset",
        "commonTraps": "Total initial purchase price (including shipping and installation)."
      },
      {
        "id": "S",
        "siUnit": "$",
        "altUnits": "",
        "description": "Salvage Value",
        "commonTraps": "What the asset can be sold for at the junkyard when its life is over."
      },
      {
        "id": "N",
        "siUnit": "years",
        "altUnits": "",
        "description": "Useful Life",
        "commonTraps": "How many years the asset will be used."
      }
    ],
    "solvingLogic": [
      "1. Subtract the Salvage Value from the Cost to find the 'Depreciable Base': (C - S).",
      "2. Divide by the Useful Life (N)."
    ],
    "edgeCases": [
      {
        "title": "Fully Depreciated",
        "description": "Once the asset's 'Book Value' (Cost minus accumulated depreciation) hits the Salvage Value, you MUST stop depreciating it, even if you keep using the truck for 5 more years."
      }
    ],
    "walkthroughExample": {
      "problem": "Buy a machine for $12,000. It will last 5 years, then be sold for $2,000 as scrap. Find Annual Depreciation.",
      "solution": [
        "Depreciable base: 12000 - 2000 = 10000.",
        "Divide by 5 years: 10000 / 5 = 2000."
      ],
      "answer": "D = $2,000 per year"
    }
  },

  "declining_balance_depreciation": {
    "intuition": "Declining Balance is an 'accelerated' depreciation method. It recognizes that things like computers or cars lose massive amounts of value in their first year, and very little value in their final years. It takes a huge tax deduction upfront.",
    "variableBreakdown": [
      {
        "id": "D",
        "siUnit": "$",
        "altUnits": "",
        "description": "Depreciation Expense for Current Year",
        "commonTraps": "Unlike straight-line, this number changes (drops) every single year."
      },
      {
        "id": "R",
        "siUnit": "%",
        "altUnits": "",
        "description": "Depreciation Rate",
        "commonTraps": "For 'Double Declining Balance', this is (1 / Useful Life) × 2."
      },
      {
        "id": "BV",
        "siUnit": "$",
        "altUnits": "",
        "description": "Book Value at Beginning of Year",
        "commonTraps": "Initial Cost MINUS all the depreciation taken in previous years. Notice that Salvage Value is completely IGNORED in the formula!"
      }
    ],
    "solvingLogic": [
      "1. Determine the Book Value (BV) at the start of the year.",
      "2. Multiply BV by the constant depreciation rate (R)."
    ],
    "edgeCases": [
      {
        "title": "The Salvage Value Wall",
        "description": "Even though Salvage Value isn't in the formula, it acts as a hard brick wall. In the final years, the formula might try to depreciate the asset BELOW its salvage value. You are legally required to manually reduce that final year's depreciation to stop exactly AT the salvage value."
      }
    ],
    "walkthroughExample": {
      "problem": "Year 1 Book Value is $10,000. Double Declining Rate is 40% (0.4). Find Year 1 and Year 2 depreciation.",
      "solution": [
        "Year 1: 10000 × 0.4 = $4,000.",
        "Year 2 Book Value: 10000 - 4000 = $6,000.",
        "Year 2: 6000 × 0.4 = $2,400."
      ],
      "answer": "Year 1: $4,000. Year 2: $2,400."
    }
  },

  "net_present_value": {
    "intuition": "Net Present Value (NPV) takes all the future cash a project will generate, shrinks it down to its 'Present Value' today (accounting for inflation/interest), and subtracts the initial cost. If NPV is positive, the project makes real money. If negative, kill the project.",
    "variableBreakdown": [
      {
        "id": "NPV",
        "siUnit": "$",
        "altUnits": "",
        "description": "Net Present Value",
        "commonTraps": "> 0 means Accept. < 0 means Reject."
      },
      {
        "id": "CF",
        "siUnit": "$",
        "altUnits": "",
        "description": "Cash Flow Array",
        "commonTraps": "The cash generated each year: CF1, CF2, CF3..."
      },
      {
        "id": "C0",
        "siUnit": "$",
        "altUnits": "",
        "description": "Initial Investment",
        "commonTraps": "The upfront cost at Year 0. This is subtracted!"
      }
    ],
    "solvingLogic": [
      "1. Discount Year 1 Cash Flow: CF1 / (1+r)¹.",
      "2. Discount Year 2 Cash Flow: CF2 / (1+r)².",
      "3. Continue for all years and sum them up.",
      "4. Subtract the Initial Investment (C0)."
    ],
    "edgeCases": [
      {
        "title": "The Discount Rate 'r'",
        "description": "The rate 'r' is incredibly subjective. It's usually the company's WACC. If a CEO wants to kill a project, they just artificially raise 'r' to 20%, which mathematically shrinks all future cash to pennies, driving the NPV negative."
      }
    ],
    "walkthroughExample": {
      "problem": "Cost is $100. Year 1 returns $110. Discount rate is 10%. Find NPV.",
      "solution": [
        "Discount Year 1: 110 / (1 + 0.1)¹ = 110 / 1.1 = 100.",
        "NPV = Present Value of Inflows - Cost.",
        "NPV = 100 - 100 = 0."
      ],
      "answer": "NPV = $0 (You exactly broke even with the 10% hurdle rate)"
    }
  },

  "payback_period": {
    "intuition": "Payback Period is the simplest financial metric: 'How many years until I get my money back?' It completely ignores the time value of money, but it's universally loved by managers for its sheer simplicity.",
    "variableBreakdown": [
      {
        "id": "PP",
        "siUnit": "years",
        "altUnits": "",
        "description": "Payback Period",
        "commonTraps": "Lower is always better."
      },
      {
        "id": "C0",
        "siUnit": "$",
        "altUnits": "",
        "description": "Initial Investment",
        "commonTraps": "What you paid upfront."
      },
      {
        "id": "CF",
        "siUnit": "$",
        "altUnits": "",
        "description": "Annual Cash Flow",
        "commonTraps": "Assuming cash flows are even every year."
      }
    ],
    "solvingLogic": [
      "1. Divide Initial Investment (C0) by Annual Cash Flow (CF)."
    ],
    "edgeCases": [
      {
        "title": "Ignoring the Future",
        "description": "Project A costs $100 and pays $100 in Year 1, then $0 forever. Project B costs $100 and pays $50 in Year 1, and $1,000,000 in Year 2. Payback Period says Project A is better (1 year vs 2 years). This is why Payback Period should NEVER be used alone!"
      }
    ],
    "walkthroughExample": {
      "problem": "A machine costs $5,000 and generates $2,000 a year. What is the payback period?",
      "solution": [
        "5000 / 2000 = 2.5."
      ],
      "answer": "PP = 2.5 years"
    }
  },

  "contribution_margin": {
    "intuition": "Contribution Margin tells you exactly how much money each product sale 'contributes' toward paying off your fixed factory rent. Once rent is paid, every dollar of contribution margin becomes pure profit.",
    "variableBreakdown": [
      {
        "id": "CM",
        "siUnit": "$",
        "altUnits": "",
        "description": "Contribution Margin per Unit",
        "commonTraps": "Do not confuse with Gross Margin!"
      },
      {
        "id": "P",
        "siUnit": "$",
        "altUnits": "",
        "description": "Price per Unit",
        "commonTraps": "What the customer pays."
      },
      {
        "id": "VC",
        "siUnit": "$",
        "altUnits": "",
        "description": "Variable Cost per Unit",
        "commonTraps": "Costs directly tied to making that specific unit (materials, hourly labor)."
      }
    ],
    "solvingLogic": [
      "1. Subtract Variable Costs from Price (P - VC)."
    ],
    "edgeCases": [
      {
        "title": "Software Economics",
        "description": "For digital software (like an app), the Variable Cost is $0 (it costs nothing to duplicate code). Therefore, the Contribution Margin perfectly equals the Price. Software scales infinitely better than physical goods."
      }
    ],
    "walkthroughExample": {
      "problem": "You sell a shirt for $20. The cotton and thread cost $8. Find the CM.",
      "solution": [
        "20 - 8 = 12."
      ],
      "answer": "CM = $12"
    }
  },

  "breakeven_units": {
    "intuition": "Duplicates BEP logic but specifically isolated. Divide your massive fixed costs by the small contribution margin of each unit to see how many units you have to sell just to survive.",
    "variableBreakdown": [
      {
        "id": "BEP",
        "siUnit": "units",
        "altUnits": "",
        "description": "Break-Even Point",
        "commonTraps": "Round up to nearest whole number."
      },
      {
        "id": "FC",
        "siUnit": "$",
        "altUnits": "",
        "description": "Total Fixed Costs",
        "commonTraps": ""
      },
      {
        "id": "CM",
        "siUnit": "$",
        "altUnits": "",
        "description": "Contribution Margin per Unit",
        "commonTraps": "(Price - Variable Cost)"
      }
    ],
    "solvingLogic": [
      "1. Divide FC by CM."
    ],
    "edgeCases": [
      {
        "title": "Sunk Costs",
        "description": "Do NOT include sunk costs (like a $1M marketing campaign from last year) in Fixed Costs when calculating future break-evens. Sunk costs are gone forever and shouldn't impact future pricing math."
      }
    ],
    "walkthroughExample": {
      "problem": "Rent is $50,000. CM per unit is $25. Find BEP.",
      "solution": [
        "50000 / 25 = 2000."
      ],
      "answer": "2,000 units"
    }
  },

  "current_ratio": {
    "intuition": "The Current Ratio tests a company's short-term survival. Can they pay off all the debts due THIS YEAR (Current Liabilities) using the cash and inventory they have THIS YEAR (Current Assets)?",
    "variableBreakdown": [
      {
        "id": "CR",
        "siUnit": "",
        "altUnits": "",
        "description": "Current Ratio",
        "commonTraps": "Usually expressed as a decimal (e.g. 1.5). A ratio under 1.0 means the company is facing an immediate liquidity crisis."
      },
      {
        "id": "CA",
        "siUnit": "$",
        "altUnits": "",
        "description": "Current Assets",
        "commonTraps": "Cash, Accounts Receivable, and Inventory."
      },
      {
        "id": "CL",
        "siUnit": "$",
        "altUnits": "",
        "description": "Current Liabilities",
        "commonTraps": "Bills and debt payments due within 12 months."
      }
    ],
    "solvingLogic": [
      "1. Divide Current Assets by Current Liabilities (CA / CL)."
    ],
    "edgeCases": [
      {
        "title": "Too High is Bad",
        "description": "A ratio of 1.5 is healthy. A ratio of 5.0 is actually terrible management! It means the company is hoarding piles of cash in a bank account doing absolutely nothing, instead of investing it to grow the business."
      }
    ],
    "walkthroughExample": {
      "problem": "Company has $150,000 in Current Assets and $100,000 in Current Liabilities.",
      "solution": [
        "150000 / 100000 = 1.5."
      ],
      "answer": "Current Ratio = 1.5"
    }
  },

  "acid_test_ratio": {
    "intuition": "Also known as the Quick Ratio, this is the brutal, worst-case-scenario survival test. It asks: 'If the economy crashes today and you can't sell ANY of your inventory, can you still pay your bills using just your raw cash?'",
    "variableBreakdown": [
      {
        "id": "QR",
        "siUnit": "",
        "altUnits": "",
        "description": "Quick Ratio (Acid Test)",
        "commonTraps": "Always smaller than the Current Ratio."
      },
      {
        "id": "CA",
        "siUnit": "$",
        "altUnits": "",
        "description": "Current Assets",
        "commonTraps": ""
      },
      {
        "id": "Inv",
        "siUnit": "$",
        "altUnits": "",
        "description": "Inventory",
        "commonTraps": "The value of unsold products sitting in the warehouse."
      },
      {
        "id": "CL",
        "siUnit": "$",
        "altUnits": "",
        "description": "Current Liabilities",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Subtract Inventory from Current Assets to find 'Quick Assets'.",
      "2. Divide Quick Assets by Current Liabilities."
    ],
    "edgeCases": [
      {
        "title": "Grocery Stores",
        "description": "Supermarkets naturally have terrible Acid Test ratios (often 0.2) because their entire business model is holding massive perishable inventory. For them, a low ratio is completely normal."
      }
    ],
    "walkthroughExample": {
      "problem": "Current Assets = $200k, Inventory = $120k, Current Liabilities = $100k.",
      "solution": [
        "Quick Assets: 200 - 120 = 80.",
        "80 / 100 = 0.8."
      ],
      "answer": "Quick Ratio = 0.8"
    }
  },

  "debt_to_equity": {
    "intuition": "Debt-to-Equity reveals who actually 'owns' the company: the bank or the shareholders. A high ratio means the company is heavily leveraged and risky, surviving on borrowed money.",
    "variableBreakdown": [
      {
        "id": "DE",
        "siUnit": "",
        "altUnits": "",
        "description": "Debt-to-Equity Ratio",
        "commonTraps": "A ratio of 2.0 means for every $1 the shareholders put in, the bank put in $2."
      },
      {
        "id": "TL",
        "siUnit": "$",
        "altUnits": "",
        "description": "Total Liabilities",
        "commonTraps": "All debts, short and long term."
      },
      {
        "id": "SE",
        "siUnit": "$",
        "altUnits": "",
        "description": "Shareholders' Equity",
        "commonTraps": "Total Assets MINUS Total Liabilities."
      }
    ],
    "solvingLogic": [
      "1. Divide Total Liabilities by Shareholders' Equity."
    ],
    "edgeCases": [
      {
        "title": "Banks vs Tech",
        "description": "A tech company like Apple might have a D/E of 1.5. A major bank (like JPMorgan) operates fundamentally differently—using customer deposits (debt) to make loans—so their D/E ratio is often a staggering 10.0!"
      }
    ],
    "walkthroughExample": {
      "problem": "Company has $500,000 in debt and $250,000 in equity.",
      "solution": [
        "500,000 / 250,000 = 2.0."
      ],
      "answer": "D/E = 2.0"
    }
  },

  "margin_of_safety": {
    "intuition": "The Margin of Safety tells a manager exactly how much sales can drop before the company starts losing money. It is the 'cushion' between current operations and the terrifying Break-Even point.",
    "variableBreakdown": [
      {
        "id": "MoS",
        "siUnit": "%",
        "altUnits": "",
        "description": "Margin of Safety (%)",
        "commonTraps": "Higher is better. A 40% margin means you can lose 40% of your customers and still not go bankrupt."
      },
      {
        "id": "Actual",
        "siUnit": "$",
        "altUnits": "units",
        "description": "Actual (or Expected) Sales",
        "commonTraps": "Can be measured in dollars or units, as long as you are consistent."
      },
      {
        "id": "BEP",
        "siUnit": "$",
        "altUnits": "units",
        "description": "Break-Even Sales",
        "commonTraps": "The absolute minimum required to not lose money."
      }
    ],
    "solvingLogic": [
      "1. Subtract Break-Even Sales from Actual Sales.",
      "2. Divide that result by Actual Sales.",
      "3. Multiply by 100 to get a percentage."
    ],
    "edgeCases": [
      {
        "title": "Negative Margin",
        "description": "If your actual sales are currently BELOW the break-even point, your margin of safety is negative. There is no cushion—you are currently bleeding out."
      }
    ],
    "walkthroughExample": {
      "problem": "You expect to sell 1000 units. Your break-even is 600 units.",
      "solution": [
        "Cushion: 1000 - 600 = 400 units.",
        "Percentage: 400 / 1000 = 0.4.",
        "Multiply by 100: 40%."
      ],
      "answer": "Margin of Safety = 40%"
    }
  },

  "gdp_nominal": {
    "intuition": "Gross Domestic Product (GDP) is the total receipt for everything bought in a country in a year. The formula adds up four massive buckets: Consumer spending, Business investment, Government spending, and Net Exports (stuff sold overseas minus stuff bought overseas).",
    "variableBreakdown": [
      {
        "id": "GDP",
        "siUnit": "$",
        "altUnits": "",
        "description": "Nominal GDP",
        "commonTraps": "Does not account for inflation!"
      },
      {
        "id": "C",
        "siUnit": "$",
        "altUnits": "",
        "description": "Consumption",
        "commonTraps": "People buying groceries, haircuts, cars."
      },
      {
        "id": "I",
        "siUnit": "$",
        "altUnits": "",
        "description": "Investment",
        "commonTraps": "Businesses buying factories or robots. (It does NOT mean buying stocks!)"
      },
      {
        "id": "G",
        "siUnit": "$",
        "altUnits": "",
        "description": "Government Spending",
        "commonTraps": "Building roads, military. (Does NOT include welfare or social security transfers)."
      },
      {
        "id": "NX",
        "siUnit": "$",
        "altUnits": "",
        "description": "Net Exports",
        "commonTraps": "Exports minus Imports."
      }
    ],
    "solvingLogic": [
      "1. GDP = C + I + G + NX."
    ],
    "edgeCases": [
      {
        "title": "The Import Trap",
        "description": "If you buy a $50,000 car from Germany, 'Consumption (C)' goes UP by 50k. But 'Net Exports (NX)' goes DOWN by 50k. They perfectly cancel out! Importing a foreign good adds exactly $0 to domestic GDP."
      }
    ],
    "walkthroughExample": {
      "problem": "C=10T, I=3T, G=4T, Exports=2T, Imports=3T. Find GDP.",
      "solution": [
        "NX = Exports - Imports = 2 - 3 = -1T.",
        "GDP = 10 + 3 + 4 + (-1) = 16T."
      ],
      "answer": "GDP = 16 Trillion"
    }
  },

  "cpi_inflation": {
    "intuition": "Inflation measures how fast money is losing its value. It tracks the Consumer Price Index (CPI), which is literally just a giant imaginary shopping cart filled with milk, gas, and rent, checking how much more that exact same cart costs this year compared to last year.",
    "variableBreakdown": [
      {
        "id": "Inf",
        "siUnit": "%",
        "altUnits": "",
        "description": "Inflation Rate",
        "commonTraps": "Positive means prices went up. Negative (Deflation) means prices dropped."
      },
      {
        "id": "CPI2",
        "siUnit": "",
        "altUnits": "",
        "description": "CPI Current Year",
        "commonTraps": "The price of the basket today."
      },
      {
        "id": "CPI1",
        "siUnit": "",
        "altUnits": "",
        "description": "CPI Previous Year",
        "commonTraps": "The price of the basket last year."
      }
    ],
    "solvingLogic": [
      "1. Subtract last year's CPI from this year's CPI (CPI2 - CPI1).",
      "2. Divide by last year's CPI (CPI1).",
      "3. Multiply by 100."
    ],
    "edgeCases": [
      {
        "title": "Substitution Bias",
        "description": "CPI is often slightly inaccurate because if the price of beef skyrockets, consumers secretly switch to chicken. The CPI basket assumes they kept buying expensive beef, slightly overstating true inflation."
      }
    ],
    "walkthroughExample": {
      "problem": "CPI was 250 last year. It is 260 this year. Find inflation.",
      "solution": [
        "Change: 260 - 250 = 10.",
        "Divide by base: 10 / 250 = 0.04.",
        "Multiply by 100: 4%."
      ],
      "answer": "Inflation = 4%"
    }
  },

  "unemployment_rate": {
    "intuition": "The official Unemployment Rate does NOT count everyone without a job. It strictly calculates the percentage of people who actively WANT a job and are actively LOOKING for one, but can't find one.",
    "variableBreakdown": [
      {
        "id": "UR",
        "siUnit": "%",
        "altUnits": "",
        "description": "Unemployment Rate",
        "commonTraps": ""
      },
      {
        "id": "U",
        "siUnit": "people",
        "altUnits": "",
        "description": "Number of Unemployed",
        "commonTraps": "Must be actively seeking work."
      },
      {
        "id": "LF",
        "siUnit": "people",
        "altUnits": "",
        "description": "Labor Force",
        "commonTraps": "Employed people PLUS Unemployed people. Does NOT include retirees, students, or stay-at-home parents."
      }
    ],
    "solvingLogic": [
      "1. Divide the number of Unemployed by the Total Labor Force.",
      "2. Multiply by 100."
    ],
    "edgeCases": [
      {
        "title": "Discouraged Workers",
        "description": "If a recession is so bad that unemployed people just give up and stop looking for work, they are mathematically erased from the 'Labor Force' (the denominator drops). Ironically, this makes the official Unemployment Rate LOOK like it improved!"
      }
    ],
    "walkthroughExample": {
      "problem": "150 million employed. 10 million unemployed looking for work. Find the rate.",
      "solution": [
        "Labor Force = 150 + 10 = 160 million.",
        "Rate = 10 / 160 = 0.0625.",
        "Multiply by 100: 6.25%."
      ],
      "answer": "Unemployment Rate = 6.25%"
    }
  },

  "multiplier_effect": {
    "intuition": "The Keynesian Multiplier shows how one dollar spent ripples through the economy. If the government gives you $100, you spend $80 at a restaurant, the waitress spends $64 on shoes... that initial $100 magically creates hundreds of dollars of total economic activity.",
    "variableBreakdown": [
      {
        "id": "k",
        "siUnit": "",
        "altUnits": "",
        "description": "Spending Multiplier",
        "commonTraps": "Shows how much total GDP is generated by $1 of initial spending."
      },
      {
        "id": "MPC",
        "siUnit": "",
        "altUnits": "",
        "description": "Marginal Propensity to Consume",
        "commonTraps": "The percentage of a new dollar that a person will immediately spend rather than save (e.g. 0.8 means they spend 80 cents)."
      }
    ],
    "solvingLogic": [
      "1. Subtract MPC from 1: (1 - MPC). This is the 'leakage' or money saved.",
      "2. Divide 1 by that leakage: 1 / (1 - MPC)."
    ],
    "edgeCases": [
      {
        "title": "The Tax Multiplier",
        "description": "If the government cuts taxes by $100 instead of spending $100 directly, the multiplier is weaker! Why? Because people immediately save a chunk of that tax cut before it even enters the economy."
      }
    ],
    "walkthroughExample": {
      "problem": "People spend 75% of new money (MPC = 0.75). Find the multiplier.",
      "solution": [
        "Leakage: 1 - 0.75 = 0.25 (meaning they save 25%).",
        "Multiplier = 1 / 0.25 = 4."
      ],
      "answer": "Multiplier = 4 (Every $1 spent creates $4 of GDP)"
    }
  },

  "mps_from_mpc": {
    "intuition": "Marginal Propensity to Save (MPS) is simply the evil twin of the Marginal Propensity to Consume (MPC). Every new dollar you earn must be either spent or saved. There is no third option.",
    "variableBreakdown": [
      {
        "id": "MPS",
        "siUnit": "",
        "altUnits": "",
        "description": "Marginal Propensity to Save",
        "commonTraps": "Fraction of a new dollar that is saved."
      },
      {
        "id": "MPC",
        "siUnit": "",
        "altUnits": "",
        "description": "Marginal Propensity to Consume",
        "commonTraps": "Fraction of a new dollar that is spent."
      }
    ],
    "solvingLogic": [
      "1. MPS = 1 - MPC."
    ],
    "edgeCases": [
      {
        "title": "Wealth Inequality",
        "description": "Rich people have a very high MPS (if a billionaire gets $1000, they save 99% of it). Poor people have a high MPC (if they get $1000, they spend it immediately on rent). This is why stimulus checks to the poor boost the economy faster than tax cuts to the rich."
      }
    ],
    "walkthroughExample": {
      "problem": "If people spend 80% of new income (MPC = 0.8), find the MPS.",
      "solution": [
        "MPS = 1 - 0.8 = 0.2."
      ],
      "answer": "MPS = 0.2"
    }
  },

  "cross_price_elasticity": {
    "intuition": "Cross-Price Elasticity measures how two completely different products are related. It answers the question: 'If the price of Pepsi skyrockets, what happens to the sales of Coke?'",
    "variableBreakdown": [
      {
        "id": "XED",
        "siUnit": "",
        "altUnits": "",
        "description": "Cross-Price Elasticity",
        "commonTraps": "Unlike normal elasticity, the POSITIVE or NEGATIVE sign is incredibly important here!"
      },
      {
        "id": "dQ",
        "siUnit": "%",
        "altUnits": "",
        "description": "% Change in Quantity of Good A",
        "commonTraps": "The effect."
      },
      {
        "id": "dP",
        "siUnit": "%",
        "altUnits": "",
        "description": "% Change in Price of Good B",
        "commonTraps": "The cause."
      }
    ],
    "solvingLogic": [
      "1. Divide the % change in Quantity of Good A by the % change in Price of Good B."
    ],
    "edgeCases": [
      {
        "title": "Substitutes vs Complements",
        "description": "If XED is Positive, they are Substitutes (Pepsi price goes up, Coke sales go up). If XED is Negative, they are Complements (Hotdog price goes up, Hotdog Bun sales go down!)."
      }
    ],
    "walkthroughExample": {
      "problem": "The price of peanut butter rises 10%, causing jelly sales to drop 15%. Find XED.",
      "solution": [
        "Quantity (Jelly) = -15%.",
        "Price (PB) = 10%.",
        "XED = -15 / 10 = -1.5."
      ],
      "answer": "XED = -1.5 (Strong Complements)"
    }
  },

  "income_elasticity": {
    "intuition": "Income Elasticity measures what happens to sales of a product when the customers get a raise at work. Do they buy more of it (Normal goods) or do they instantly abandon it for something better (Inferior goods)?",
    "variableBreakdown": [
      {
        "id": "YED",
        "siUnit": "",
        "altUnits": "",
        "description": "Income Elasticity of Demand",
        "commonTraps": "Again, the POSITIVE/NEGATIVE sign dictates the entire meaning."
      },
      {
        "id": "dQ",
        "siUnit": "%",
        "altUnits": "",
        "description": "% Change in Quantity Demanded",
        "commonTraps": "How much sales changed."
      },
      {
        "id": "dY",
        "siUnit": "%",
        "altUnits": "",
        "description": "% Change in Income (Y)",
        "commonTraps": "How much consumer wealth changed."
      }
    ],
    "solvingLogic": [
      "1. Divide % change in Quantity by % change in Income."
    ],
    "edgeCases": [
      {
        "title": "Inferior Goods (Negative YED)",
        "description": "Ramen noodles and used cars are 'Inferior Goods'. When people get rich, sales for these products actually DROP (Negative YED) because consumers upgrade to steak and new cars."
      }
    ],
    "walkthroughExample": {
      "problem": "Wages increase by 5%. Sales of Rolex watches skyrocket by 15%.",
      "solution": [
        "Quantity = 15%. Income = 5%.",
        "YED = 15 / 5 = 3."
      ],
      "answer": "YED = 3 (Normal Good / Luxury)"
    }
  },

  "cobb_douglas": {
    "intuition": "The Cobb-Douglas Production Function mathematically proves that an economy's total output is a delicate recipe combining Capital (factories/machines), Labor (human workers), and Technology (innovation).",
    "variableBreakdown": [
      {
        "id": "Y",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Production (GDP)",
        "commonTraps": "The total economic output."
      },
      {
        "id": "A",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Factor Productivity (A)",
        "commonTraps": "The magic multiplier! Represents technology, education, and innovation."
      },
      {
        "id": "L",
        "siUnit": "",
        "altUnits": "",
        "description": "Labor",
        "commonTraps": "Total hours worked by humans."
      },
      {
        "id": "alpha",
        "siUnit": "",
        "altUnits": "",
        "description": "Labor Elasticity (α)",
        "commonTraps": "The share of income that goes to workers (historically around 0.7 or 70%)."
      },
      {
        "id": "K",
        "siUnit": "",
        "altUnits": "",
        "description": "Capital",
        "commonTraps": "Number of machines, buildings, and computers."
      },
      {
        "id": "beta",
        "siUnit": "",
        "altUnits": "",
        "description": "Capital Elasticity (β)",
        "commonTraps": "Usually exactly (1 - α). So if α is 0.7, β is 0.3."
      }
    ],
    "solvingLogic": [
      "1. Raise Labor (L) to the power of α.",
      "2. Raise Capital (K) to the power of β.",
      "3. Multiply them together.",
      "4. Multiply the whole thing by Technology (A)."
    ],
    "edgeCases": [
      {
        "title": "Diminishing Returns",
        "description": "Because α and β are decimals less than 1, simply doubling your factories (K) will NOT double your output. The only way to infinitely grow an economy without diminishing returns is to upgrade Technology (A)."
      }
    ],
    "walkthroughExample": {
      "problem": "A=2. L=100, α=0.5. K=100, β=0.5. Find Output (Y).",
      "solution": [
        "100^0.5 (square root) = 10.",
        "Y = A × (L^0.5) × (K^0.5)",
        "Y = 2 × 10 × 10 = 200."
      ],
      "answer": "Y = 200"
    }
  },

  "phillips_curve": {
    "intuition": "The Phillips Curve illustrates a brutal trade-off for governments: You can artificially lower unemployment by printing money, but you will pay for it with rampant Inflation. If you try to crush inflation, millions will lose their jobs.",
    "variableBreakdown": [
      {
        "id": "pi",
        "siUnit": "%",
        "altUnits": "",
        "description": "Actual Inflation (π)",
        "commonTraps": "The current inflation rate."
      },
      {
        "id": "pie",
        "siUnit": "%",
        "altUnits": "",
        "description": "Expected Inflation (π^e)",
        "commonTraps": "What consumers and businesses THINK inflation will be next year."
      },
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Sensitivity Parameter (a)",
        "commonTraps": "A constant multiplier."
      },
      {
        "id": "U",
        "siUnit": "%",
        "altUnits": "",
        "description": "Actual Unemployment (U)",
        "commonTraps": ""
      },
      {
        "id": "Un",
        "siUnit": "%",
        "altUnits": "",
        "description": "Natural Unemployment (U_n)",
        "commonTraps": "The 'baseline' unemployment rate when the economy is perfectly healthy (usually ~4-5%)."
      }
    ],
    "solvingLogic": [
      "1. Subtract Natural Unemployment from Actual Unemployment (U - Un).",
      "2. Multiply by the sensitivity parameter (a).",
      "3. Subtract that from Expected Inflation (π^e)."
    ],
    "edgeCases": [
      {
        "title": "Stagflation (The 1970s Crisis)",
        "description": "In the 1970s, the Phillips curve broke completely. An oil crisis caused BOTH massive inflation and massive unemployment at the same time (Stagflation). This forced economists to add 'Expected Inflation (π^e)' into the equation to fix the model."
      }
    ],
    "walkthroughExample": {
      "problem": "Expected Inflation=3%. Un=5%. Actual U drops to 3% (economy is hot!). Let a=1. Find Inflation.",
      "solution": [
        "U - Un = 3 - 5 = -2.",
        "Multiply by 'a' (1) = -2.",
        "Inflation = 3% - (-2%).",
        "Inflation = 3 + 2 = 5%."
      ],
      "answer": "Inflation shoots up to 5%!"
    }
  },

  "real_gdp_growth": {
    "intuition": "Real GDP Growth tracks whether a country is actually producing more real stuff, or if they just printed a bunch of money and caused inflation. It strips the illusion of price hikes out of the GDP calculation.",
    "variableBreakdown": [
      {
        "id": "Growth",
        "siUnit": "%",
        "altUnits": "",
        "description": "Economic Growth Rate",
        "commonTraps": "Usually reported quarterly or annually."
      },
      {
        "id": "RGDP2",
        "siUnit": "$",
        "altUnits": "",
        "description": "Real GDP This Year",
        "commonTraps": "Nominal GDP strictly adjusted down by the 'GDP Deflator' to remove inflation."
      },
      {
        "id": "RGDP1",
        "siUnit": "$",
        "altUnits": "",
        "description": "Real GDP Last Year",
        "commonTraps": "The baseline."
      }
    ],
    "solvingLogic": [
      "1. Subtract last year's Real GDP from this year's (RGDP2 - RGDP1).",
      "2. Divide by last year's Real GDP (RGDP1).",
      "3. Multiply by 100 to get a percentage."
    ],
    "edgeCases": [
      {
        "title": "Two Quarters of Negative Growth",
        "description": "If this formula outputs a negative number for two consecutive quarters (6 straight months of the economy shrinking instead of growing), it triggers the official, terrifying definition of an Economic Recession."
      }
    ],
    "walkthroughExample": {
      "problem": "Last year Real GDP was $20 Trillion. This year it is $21 Trillion.",
      "solution": [
        "Change: 21 - 20 = 1.",
        "Divide by baseline: 1 / 20 = 0.05.",
        "Multiply by 100: 5%."
      ],
      "answer": "Real Growth = 5%"
    }
  }
};
