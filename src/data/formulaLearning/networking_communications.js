export const networking_communications = {
  "shannon-capacity": {
    "intuition": "This is a duplicate of the Shannon Capacity theorem from Information Theory, focusing on the hardware limitations of a network cable.",
    "variableBreakdown": [
      {
        "id": "C",
        "siUnit": "bps",
        "altUnits": "",
        "description": "Capacity",
        "commonTraps": ""
      },
      {
        "id": "B",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Bandwidth",
        "commonTraps": ""
      },
      {
        "id": "SNR",
        "siUnit": "",
        "altUnits": "",
        "description": "Signal to Noise Ratio",
        "commonTraps": "Linear ratio, not dB."
      }
    ],
    "solvingLogic": [
      "1. C = B × log₂(1 + SNR)."
    ],
    "edgeCases": [
      {
        "title": "Noisy Cables",
        "description": "If you run an Ethernet cable directly over a fluorescent light ballast, the electromagnetic noise drops the SNR dramatically, forcing the computers to slow down their transmission speed to prevent data corruption."
      }
    ],
    "walkthroughExample": {
      "problem": "B=1000, SNR=3. Find C.",
      "solution": [
        "1 + 3 = 4.",
        "log₂(4) = 2.",
        "1000 × 2 = 2000."
      ],
      "answer": "2000 bps"
    }
  },

  "nyquist-bitrate": {
    "intuition": "While Shannon calculates the limit for a noisy cable, Nyquist calculates the limit for a mathematically PERFECT, noise-free cable. It proves that you can squeeze more data through a wire by using different 'voltage levels' (like sending signals at 1V, 2V, 3V, and 4V instead of just on/off).",
    "variableBreakdown": [
      {
        "id": "R",
        "siUnit": "bps",
        "altUnits": "",
        "description": "Maximum Bitrate (R)",
        "commonTraps": ""
      },
      {
        "id": "B",
        "siUnit": "Hz",
        "altUnits": "",
        "description": "Bandwidth (B)",
        "commonTraps": ""
      },
      {
        "id": "L",
        "siUnit": "",
        "altUnits": "",
        "description": "Signal Levels (L)",
        "commonTraps": "Standard binary uses 2 levels (0V and 5V). QAM-256 (used in modern Wi-Fi) uses 256 different combinations!"
      }
    ],
    "solvingLogic": [
      "1. Take the Log Base 2 of the Signal Levels (L).",
      "2. Multiply by the Bandwidth (B).",
      "3. Multiply by exactly 2."
    ],
    "edgeCases": [
      {
        "title": "The Infinite Level Problem",
        "description": "If the cable is perfect, why don't we just use a billion signal levels and get infinite speed? Because in reality, cables have microscopic noise (Shannon). If you have a billion voltage levels, the gap between 1.000000001 Volts and 1.000000002 Volts is so tiny that thermal heat in the wire destroys the signal."
      }
    ],
    "walkthroughExample": {
      "problem": "A perfect 3000 Hz wire uses standard Binary (2 levels). Find max speed.",
      "solution": [
        "log₂(2) = 1.",
        "R = 2 × 3000 × 1 = 6000."
      ],
      "answer": "R = 6000 bps"
    }
  },

  "crc-check": {
    "intuition": "Cyclic Redundancy Check (CRC) is how your computer knows a downloaded zip file isn't corrupted. Before sending a file, the sender uses polynomial long-division to divide the file's binary data by a secret magic number. It takes the 'remainder' of that division, slaps it on the end of the file, and sends it. The receiver does the exact same math, and if the remainders don't match perfectly, the file is corrupted.",
    "variableBreakdown": [
      {
        "id": "data",
        "siUnit": "",
        "altUnits": "",
        "description": "Data Bits",
        "commonTraps": "The raw file being transmitted."
      },
      {
        "id": "divisor",
        "siUnit": "",
        "altUnits": "",
        "description": "Generator Polynomial",
        "commonTraps": "A pre-agreed upon binary sequence used as the divider (e.g. CRC-32 uses a massive 33-bit number)."
      }
    ],
    "solvingLogic": [
      "1. Pad the Data by adding zeroes to the end (one less than the length of the divisor).",
      "2. Perform binary XOR long-division using the Divisor.",
      "3. The Remainder of the division is the CRC checksum."
    ],
    "edgeCases": [
      {
        "title": "Hardware Acceleration",
        "description": "Because doing polynomial math in software for a 50 GB video game download would completely freeze your CPU, every modern network card has physical silicon chips dedicated solely to doing CRC XOR math instantly at the hardware level."
      }
    ],
    "walkthroughExample": {
      "problem": "Data: 1101, Divisor: 101. (Pad 2 zeroes). Find Remainder.",
      "solution": [
        "110100 divided by 101.",
        "XOR math yields a remainder of 01."
      ],
      "answer": "Remainder (Checksum) = 01"
    }
  }
};
