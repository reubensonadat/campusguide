export const control_systems_signal_processing = {
  "laplace-transform": {
    "intuition": "The Laplace Transform is a mathematical wormhole. It takes impossible calculus problems in the 'Time Domain' (like predicting how a bouncy suspension system will settle over 10 seconds), and teleports them into the 'S-Domain'. In the S-Domain, calculus turns into basic algebra! You solve the algebra, then teleport the answer back to the Time Domain.",
    "variableBreakdown": [
      {
        "id": "a",
        "siUnit": "",
        "altUnits": "",
        "description": "Constant 'a'",
        "commonTraps": "For the basic transform of e^(at)."
      }
    ],
    "solvingLogic": [
      "1. For an exponential function f(t) = e^(at).",
      "2. The transform in the S-domain is 1 / (s - a)."
    ],
    "edgeCases": [
      {
        "title": "Poles and Stability",
        "description": "When you look at the denominator of the S-Domain answer (like s - a), the value that makes the denominator equal zero is called a 'Pole'. If ANY pole is a positive number, the real-world system is unstable and will eventually shake itself apart or explode."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the Laplace transform of f(t) = e^(3t).",
      "solution": [
        "a = 3.",
        "Transform = 1 / (s - 3)."
      ],
      "answer": "F(s) = 1 / (s - 3)"
    }
  },

  "transfer-function": {
    "intuition": "A Transfer Function is a mathematical 'black box'. You put an input signal in (like turning the steering wheel of a car), and the box tells you exactly how the output will react over time (how the car physically turns). It defines the personality of a machine.",
    "variableBreakdown": [
      {
        "id": "K",
        "siUnit": "",
        "altUnits": "",
        "description": "DC Gain (K)",
        "commonTraps": "How 'strong' the final output is compared to the input. A gain of 2 means the output settles at twice the input."
      },
      {
        "id": "tau",
        "siUnit": "s",
        "altUnits": "",
        "description": "Time Constant (τ)",
        "commonTraps": "How sluggish the system is. A high τ means it takes a long time to react."
      }
    ],
    "solvingLogic": [
      "1. For a standard First-Order system, the transfer function is H(s) = K / (τs + 1).",
      "2. The denominator creates a single pole at s = -1/τ."
    ],
    "edgeCases": [
      {
        "title": "The 63% Rule",
        "description": "If you turn a machine on, it doesn't hit full power instantly. Because of the math of a first-order transfer function, it takes exactly one 'τ' (Time Constant) for the machine to reach 63.2% of its final speed. It takes 5 Time Constants to reach 99%."
      }
    ],
    "walkthroughExample": {
      "problem": "A motor has a gain of 10 and a time constant of 2 seconds. Write the transfer function.",
      "solution": [
        "K = 10.",
        "τ = 2.",
        "H(s) = 10 / (2s + 1)."
      ],
      "answer": "H(s) = 10 / (2s + 1)"
    }
  },

  "fourier-series": {
    "intuition": "Fourier proved an insane mathematical truth: ANY repeating squiggly line in the universe (like the jagged soundwave of a guitar) can be perfectly drawn by just adding up dozens of perfectly smooth Sine and Cosine waves of different pitches. It is the ultimate audio equalizer.",
    "variableBreakdown": [
      {
        "id": "n",
        "siUnit": "",
        "altUnits": "",
        "description": "Harmonic Number (n)",
        "commonTraps": "Must be an integer (1, 2, 3). The higher the number, the higher the 'pitch' of that specific sine wave."
      }
    ],
    "solvingLogic": [
      "1. Find the base fundamental frequency (n=1).",
      "2. Calculate the 'coefficients' (a_n and b_n) which act as volume sliders for each specific harmonic pitch.",
      "3. Add up all the sine and cosine waves to perfectly recreate the original jagged signal."
    ],
    "edgeCases": [
      {
        "title": "Square Waves (Synthesizers)",
        "description": "If you try to build a jagged 'Square Wave' (like an 8-bit Nintendo sound), the Fourier math reveals something incredible: Square waves ONLY use the ODD harmonics (n=1, 3, 5, 7). All the even numbered sine waves have their 'volume sliders' permanently set to zero."
      }
    ],
    "walkthroughExample": {
      "problem": "If the fundamental frequency (n=1) is 100 Hz, what is the frequency of the 5th harmonic?",
      "solution": [
        "Frequency = n × Fundamental.",
        "Frequency = 5 × 100."
      ],
      "answer": "500 Hz"
    }
  },

  "pid-tuning": {
    "intuition": "A PID Controller is the brain of a robot or a cruise control system. 'P' (Proportional) pushes the gas pedal based on how far away you are. 'I' (Integral) pushes harder if you've been stuck below the speed limit for a long time. 'D' (Derivative) slams the brakes if you are approaching the target too fast.",
    "variableBreakdown": [
      {
        "id": "Ku",
        "siUnit": "",
        "altUnits": "",
        "description": "Ultimate Gain (Ku)",
        "commonTraps": "The exact setting on the 'P' knob that causes the robot to violently oscillate back and forth indefinitely."
      },
      {
        "id": "Tu",
        "siUnit": "s",
        "altUnits": "",
        "description": "Ultimate Period (Tu)",
        "commonTraps": "The time it takes for one full violent oscillation."
      }
    ],
    "solvingLogic": [
      "1. The Ziegler-Nichols tuning method uses Ku and Tu to find the perfect PID settings.",
      "2. P_gain = 0.6 × Ku.",
      "3. I_time = 0.5 × Tu.",
      "4. D_time = 0.125 × Tu."
    ],
    "edgeCases": [
      {
        "title": "Windup",
        "description": "If a drone gets physically stuck in a tree, the 'I' (Integral) math will sit there adding up error for 10 minutes, assuming it just needs more power. If you un-stick it, the drone will instantly shoot into the stratosphere at maximum throttle because of the massive built-up 'I' error. This is called Integral Windup."
      }
    ],
    "walkthroughExample": {
      "problem": "A robot arm oscillates wildly when P is set to 10 (Ku = 10). The swings take 2 seconds (Tu = 2). Find the recommended P-gain.",
      "solution": [
        "P_gain = 0.6 × Ku.",
        "0.6 × 10 = 6."
      ],
      "answer": "P_gain = 6.0"
    }
  }
};
