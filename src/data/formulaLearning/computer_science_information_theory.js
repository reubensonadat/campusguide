export const computer_science_information_theory = {
  "shannon-capacity": {
    "intuition": "Shannon's theorem is the absolute physical speed limit of the internet. It proves exactly how much data you can blast down a wire (like a fiber optic cable or 5G wave) before the random static 'noise' of the universe irreparably corrupts the 1s and 0s.",
    "variableBreakdown": [
      {
        "id": "C",
        "siUnit": "bits/s",
        "altUnits": "",
        "description": "Channel Capacity (C)",
        "commonTraps": "The maximum error-free data rate possible."
      },
      {
        "id": "B",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Bandwidth (B)",
        "commonTraps": "The 'width of the pipe' you purchased from the FCC."
      },
      {
        "id": "SNR",
        "siUnit": "",
        "altUnits": "",
        "description": "Signal-to-Noise Ratio",
        "commonTraps": "Must be the linear ratio, NOT the decibel (dB) value! If given in dB, you must convert it first."
      }
    ],
    "solvingLogic": [
      "1. Add 1 to the Signal-to-Noise Ratio (1 + SNR).",
      "2. Take the Log Base 2 of that result.",
      "3. Multiply by the Bandwidth (B)."
    ],
    "edgeCases": [
      {
        "title": "Infinite Power?",
        "description": "If you want faster internet, you can just blast the signal with more power (increasing SNR). But because SNR is trapped inside a logarithm, increasing your transmitter power by 10,000x only gives a tiny bump in speed. Buying more Bandwidth (B) scales perfectly linearly, which is why 5G uses much wider frequency bands."
      }
    ],
    "walkthroughExample": {
      "problem": "Bandwidth is 3000 Hz (a standard telephone line). SNR is 1023. Find Capacity.",
      "solution": [
        "1 + SNR = 1024.",
        "log₂(1024) = 10.",
        "C = 3000 × 10 = 30,000."
      ],
      "answer": "C = 30,000 bits/s (approx 30 kbps dial-up speed!)"
    }
  },

  "amdahls-law": {
    "intuition": "Amdahl's Law crushes the dream of infinite processors. If a program takes 10 hours to run, but 1 hour of it is strictly sequential (must be done in order), you can buy a million processors to instantly finish the parallel parts, but you still have to wait that 1 hour. Your maximum possible speedup is hard-capped.",
    "variableBreakdown": [
      {
        "id": "S",
        "siUnit": "",
        "altUnits": "",
        "description": "Total Speedup",
        "commonTraps": "A multiplier (e.g. 5x faster)."
      },
      {
        "id": "p",
        "siUnit": "",
        "altUnits": "",
        "description": "Parallel Portion (p)",
        "commonTraps": "The decimal percentage of the code that CAN be split up (e.g. 0.90)."
      },
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Processors",
        "commonTraps": "The number of CPU cores."
      }
    ],
    "solvingLogic": [
      "1. Find the sequential portion (1 - p).",
      "2. Divide the parallel portion by the number of cores (p / N).",
      "3. Add those two together (forming the denominator).",
      "4. Divide 1 by the denominator."
    ],
    "edgeCases": [
      {
        "title": "The Infinite Core Limit",
        "description": "If N = Infinity, the (p/N) term drops to zero. The formula collapses to just 1 / (1 - p). Meaning if a program is 95% parallel (p=0.95), the sequential part is 0.05. Even with infinite CPUs, the absolute fastest the program can ever run is 1 / 0.05 = 20x faster."
      }
    ],
    "walkthroughExample": {
      "problem": "A task is 50% parallel (p=0.5). You buy 2 processors (N=2). Find speedup.",
      "solution": [
        "Seq = 1 - 0.5 = 0.5.",
        "Par = 0.5 / 2 = 0.25.",
        "Denominator = 0.5 + 0.25 = 0.75.",
        "Speedup = 1 / 0.75 ≈ 1.33."
      ],
      "answer": "S = 1.33x Faster"
    }
  },

  "gustafson": {
    "intuition": "Gustafson's Law is the optimistic response to Amdahl. It states that when scientists buy massive supercomputers, they don't run the exact same tiny problem faster (Amdahl). Instead, they run vastly larger, more complex problems in the same amount of time. Because the 'parallel' data scales up immensely while the 'sequential' setup time stays flat, the efficiency actually increases!",
    "variableBreakdown": [
      {
        "id": "S",
        "siUnit": "",
        "altUnits": "",
        "description": "Scaled Speedup",
        "commonTraps": ""
      },
      {
        "id": "s",
        "siUnit": "",
        "altUnits": "",
        "description": "Sequential Portion (s)",
        "commonTraps": "The decimal percentage of time spent on the sequential part on the ENLARGED problem."
      },
      {
        "id": "N",
        "siUnit": "",
        "altUnits": "",
        "description": "Number of Processors",
        "commonTraps": ""
      }
    ],
    "solvingLogic": [
      "1. Find the parallel portion (1 - s).",
      "2. Multiply the parallel portion by the number of cores (N).",
      "3. Add the sequential portion (s)."
    ],
    "edgeCases": [
      {
        "title": "Machine Learning",
        "description": "This law explains the AI revolution. Training an AI has a fixed sequential setup cost (s). But if you buy 10,000 GPUs (N), you just feed in 10,000x more parallel training data. The speedup scales almost perfectly linearly with N, completely ignoring Amdahl's gloomy limits."
      }
    ],
    "walkthroughExample": {
      "problem": "On a new super problem, sequential time (s) is 0.1. Cores (N) = 100. Find speedup.",
      "solution": [
        "Parallel (1-s) = 0.9.",
        "N × 0.9 = 100 × 0.9 = 90.",
        "Add sequential: 90 + 0.1 = 90.1."
      ],
      "answer": "S = 90.1x Speedup"
    }
  },

  "littles-law": {
    "intuition": "Little's Law is a shockingly simple queueing theorem. If you want to know how many people are physically standing inside a Starbucks right now, you just multiply how fast people walk in the front door, by how long the average person spends waiting for their coffee.",
    "variableBreakdown": [
      {
        "id": "L",
        "siUnit": "",
        "altUnits": "",
        "description": "Average Items in System (L)",
        "commonTraps": "The total count of items queued or being processed."
      },
      {
        "id": "lambda",
        "siUnit": "1/s",
        "altUnits": "",
        "description": "Arrival Rate (λ)",
        "commonTraps": "How fast new things enter (e.g. 5 customers per minute)."
      },
      {
        "id": "W",
        "siUnit": "s",
        "altUnits": "",
        "description": "Average Time in System (W)",
        "commonTraps": "How long one item takes from start to finish."
      }
    ],
    "solvingLogic": [
      "1. Multiply the Arrival Rate (λ) by the Wait Time (W)."
    ],
    "edgeCases": [
      {
        "title": "Network Buffers",
        "description": "In internet routers, if the arrival rate of data packets (λ) spikes higher than the router's transmit speed, the wait time (W) starts growing. Little's Law proves that the number of packets inside the router (L) will explode, instantly overflowing the router's memory and dropping your internet packets into the void."
      }
    ],
    "walkthroughExample": {
      "problem": "A web server gets 100 requests per second (λ). Each request takes 0.5 seconds to process (W). How many active requests are currently in memory?",
      "solution": [
        "L = 100 × 0.5 = 50."
      ],
      "answer": "L = 50 Active Requests"
    }
  },

  "network-transfer": {
    "intuition": "Simple file transfer math. How long does it take to download a movie?",
    "variableBreakdown": [
      {
        "id": "T",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time (T)",
        "commonTraps": ""
      },
      {
        "id": "S",
        "siUnit": "Bits",
        "altUnits": "Bytes",
        "description": "File Size",
        "commonTraps": "Internet speeds are sold in 'bits', but files are measured in 'Bytes'. You must multiply Bytes by 8 to get bits before doing the math!"
      },
      {
        "id": "B",
        "siUnit": "bps",
        "altUnits": "",
        "description": "Bandwidth",
        "commonTraps": "Usually given in Mbps (Megabits per sec). Multiply by 1,000,000."
      }
    ],
    "solvingLogic": [
      "1. Ensure both Size and Bandwidth are in the exact same unit (Bits).",
      "2. Divide Size by Bandwidth."
    ],
    "edgeCases": [
      {
        "title": "Overhead",
        "description": "A 10 Megabit file will never download in exactly 1 second on a 10 Mbps connection. Real internet packets require 'headers' (address labels) wrapped around the data. You usually lose about 10% of your speed to these unseen labels."
      }
    ],
    "walkthroughExample": {
      "problem": "Download a 1 Megabyte (MB) file on an 8 Megabit (Mbps) connection.",
      "solution": [
        "Convert Size to bits: 1 MB = 8 Megabits.",
        "T = 8 Mb / 8 Mbps = 1."
      ],
      "answer": "T = 1 Second"
    }
  }
};
