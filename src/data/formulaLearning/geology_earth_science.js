export const geology_earth_science = {
  "richter-scale": {
    "intuition": "The Richter scale is logarithmic. A magnitude 6 earthquake isn't just '1 step worse' than a magnitude 5—it physically shakes the ground 10 TIMES harder, and releases 32 TIMES more energy! A magnitude 9 earthquake doesn't knock over a building; it physically moves the entire coastline of Japan by 8 feet.",
    "variableBreakdown": [
      {
        "id": "M",
        "siUnit": "",
        "altUnits": "",
        "description": "Richter Magnitude (M)",
        "commonTraps": "Has no units."
      },
      {
        "id": "A",
        "siUnit": "mm",
        "altUnits": "μm",
        "description": "Measured Amplitude (A)",
        "commonTraps": "The maximum physical height of the wave drawn by the seismograph needle."
      },
      {
        "id": "A0",
        "siUnit": "mm",
        "altUnits": "μm",
        "description": "Standard Amplitude (A₀)",
        "commonTraps": "A baseline reference value for a 'zero magnitude' earthquake at the same distance."
      }
    ],
    "solvingLogic": [
      "1. Divide the measured amplitude (A) by the standard baseline amplitude (A₀).",
      "2. Take the Log (base 10) of that ratio."
    ],
    "edgeCases": [
      {
        "title": "Negative Magnitude",
        "description": "Can an earthquake have a magnitude of -1.0? Yes! Because the scale is logarithmic, an earthquake with an amplitude 10 times smaller than the A₀ baseline will mathematically output a magnitude of -1.0. These microquakes happen millions of times a day."
      }
    ],
    "walkthroughExample": {
      "problem": "A seismograph records an amplitude (A) that is 10,000 times larger than the baseline (A₀). Find the magnitude.",
      "solution": [
        "Ratio (A/A₀) = 10,000.",
        "Log10(10000) = 4."
      ],
      "answer": "Magnitude = 4.0"
    }
  },

  "darcys-law": {
    "intuition": "Darcy's Law governs groundwater. It explains exactly how fast water will flow through an underground aquifer. Flow rate depends on how porous the dirt is, how thick the pipe is, and how steeply the water table is sloping underground.",
    "variableBreakdown": [
      {
        "id": "Q",
        "siUnit": "m³/s",
        "altUnits": "",
        "description": "Discharge Rate (Q)",
        "commonTraps": "The total volume of water flowing per second."
      },
      {
        "id": "K",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Hydraulic Conductivity (K)",
        "commonTraps": "How easily water moves through the material. Gravel has a massive K. Solid clay has a K near zero."
      },
      {
        "id": "A",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Cross-Sectional Area",
        "commonTraps": "The total 'window' size the water is flowing through."
      },
      {
        "id": "dh",
        "siUnit": "m",
        "altUnits": "",
        "description": "Change in Head (Δh)",
        "commonTraps": "The drop in water elevation (pressure difference)."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Length of Flow (L)",
        "commonTraps": "How far the water has to travel through the dirt."
      }
    ],
    "solvingLogic": [
      "1. Divide Δh by L to find the 'Hydraulic Gradient' (the steepness of the underground hill).",
      "2. Multiply the gradient by the Area (A).",
      "3. Multiply by Conductivity (K).",
      "4. The formula technically has a negative sign because water flows downhill (from high head to low head), but usually we just care about the absolute flow rate."
    ],
    "edgeCases": [
      {
        "title": "Artesian Wells",
        "description": "If water is trapped between two solid layers of clay (K = 0) and flows down a mountain, immense pressure builds up. If you drill a hole into this aquifer, the 'Change in Head' is so extreme that water will explode out of the ground straight up into the air without a pump!"
      }
    ],
    "walkthroughExample": {
      "problem": "An aquifer has K = 0.01 m/s. Area is 50 m². It drops 2m in elevation over a distance of 10m. Find flow rate.",
      "solution": [
        "Gradient (Δh/L) = 2 / 10 = 0.2.",
        "Q = (0.01) × (50) × (0.2) = 0.1."
      ],
      "answer": "Q = 0.1 m³/s"
    }
  }
};
