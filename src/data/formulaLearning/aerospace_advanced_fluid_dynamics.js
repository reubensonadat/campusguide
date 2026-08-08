export const aerospace_advanced_fluid_dynamics = {
  "mach": {
    "intuition": "The Mach number is how fast you are flying compared to the speed of sound in the air around you. It's not a fixed speed—sound travels slower in cold, thin air at 40,000 feet than it does at sea level, meaning it's actually 'easier' for a jet to break the sound barrier high up in the atmosphere.",
    "variableBreakdown": [
      {
        "id": "M",
        "siUnit": "",
        "altUnits": "",
        "description": "Mach Number",
        "commonTraps": "M > 1 is supersonic. M < 1 is subsonic."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "True Airspeed (v)",
        "commonTraps": "How fast the plane is physically moving."
      },
      {
        "id": "c",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Speed of Sound (c)",
        "commonTraps": "Changes based on temperature and altitude (usually ~343 m/s at sea level)."
      }
    ],
    "solvingLogic": [
      "1. Divide the airspeed (v) by the local speed of sound (c)."
    ],
    "edgeCases": [
      {
        "title": "The Transonic Drag Spike",
        "description": "Right exactly at Mach 1.0, the air cannot get out of the way of the plane fast enough. It piles up into a literal wall of compressed air (a shockwave). Early aviators thought this 'sound barrier' was an impenetrable physical wall because the drag shoots up exponentially right before Mach 1."
      }
    ],
    "walkthroughExample": {
      "problem": "A jet flies at 600 m/s at an altitude where sound travels at 300 m/s. Find Mach number.",
      "solution": [
        "M = 600 / 300 = 2.0."
      ],
      "answer": "Mach 2.0 (Supersonic)"
    }
  },

  "dyn-pressure": {
    "intuition": "Dynamic Pressure (represented by 'q') is the raw physical force of the wind smashing into the nose of an airplane. It is the fuel for aerodynamic lift, but also the main cause of drag and structural stress.",
    "variableBreakdown": [
      {
        "id": "q",
        "siUnit": "Pa",
        "altUnits": "",
        "description": "Dynamic Pressure (q)",
        "commonTraps": "Often measured in Pascals or pounds per square foot (psf)."
      },
      {
        "id": "rho",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Air Density (ρ)",
        "commonTraps": "Density drops rapidly as you climb higher into the atmosphere."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity (v)",
        "commonTraps": "The speed is SQUARED in the formula, meaning speed is vastly more important than density."
      }
    ],
    "solvingLogic": [
      "1. Square the velocity (v²).",
      "2. Multiply by the air density (ρ).",
      "3. Multiply by exactly 0.5 (one half)."
    ],
    "edgeCases": [
      {
        "title": "Max Q (Max Dynamic Pressure)",
        "description": "When a rocket launches, it accelerates rapidly (increasing 'v') while flying into thinner air (decreasing 'ρ'). The mathematical sweet spot where these two curves multiply to create the absolute highest pressure on the rocket hull is called 'Max Q'. This is the most dangerous moment of the launch."
      }
    ],
    "walkthroughExample": {
      "problem": "Air density is 1.0 kg/m³. A plane flies at 100 m/s. Find dynamic pressure.",
      "solution": [
        "v² = 100² = 10,000.",
        "0.5 × 1.0 × 10,000 = 5,000."
      ],
      "answer": "q = 5,000 Pa"
    }
  },

  "lift-eq": {
    "intuition": "The Lift Equation mathematically calculates exactly how many pounds of airplane you can lift off the runway. It relies entirely on the Dynamic Pressure (the 'q' from the previous formula) acting across the physical area of the wings.",
    "variableBreakdown": [
      {
        "id": "L",
        "siUnit": "N",
        "altUnits": "lbs",
        "description": "Total Lift Force (L)",
        "commonTraps": "Must be greater than the plane's weight to climb."
      },
      {
        "id": "rho",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Air Density (ρ)",
        "commonTraps": ""
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Velocity (v)",
        "commonTraps": ""
      },
      {
        "id": "S",
        "siUnit": "m²",
        "altUnits": "",
        "description": "Wing Area (S)",
        "commonTraps": "The total surface area of the wings looking straight down."
      },
      {
        "id": "CL",
        "siUnit": "",
        "altUnits": "",
        "description": "Coefficient of Lift (CL)",
        "commonTraps": "A unitless number based on the shape of the wing and its 'Angle of Attack' (how far back you are pulling the stick)."
      }
    ],
    "solvingLogic": [
      "1. Calculate dynamic pressure (0.5 × ρ × v²).",
      "2. Multiply by the Wing Area (S).",
      "3. Multiply by the Lift Coefficient (CL)."
    ],
    "edgeCases": [
      {
        "title": "Aerodynamic Stall",
        "description": "Pilots try to increase lift by pulling the nose up (increasing CL). But if they pull the nose past ~15 degrees, the air physically detaches from the wing. The CL instantly drops to near-zero, all lift vanishes, and the plane falls like a rock. This is a 'stall'."
      }
    ],
    "walkthroughExample": {
      "problem": "Dynamic pressure is 5000 Pa. Wing area is 20 m². CL is 1.5. Find total lift.",
      "solution": [
        "L = 5000 × 20 × 1.5.",
        "5000 × 20 = 100,000.",
        "100,000 × 1.5 = 150,000."
      ],
      "answer": "L = 150,000 N"
    }
  },

  "froude": {
    "intuition": "The Froude number determines if a flowing river is 'peaceful' or 'violent'. It compares the speed of the water flowing forward against the speed of a wave trying to ripple backward up the stream.",
    "variableBreakdown": [
      {
        "id": "Fr",
        "siUnit": "",
        "altUnits": "",
        "description": "Froude Number",
        "commonTraps": "If Fr < 1, the river is slow/deep (Subcritical). If Fr > 1, the river is fast/shallow (Supercritical)."
      },
      {
        "id": "v",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Flow Velocity",
        "commonTraps": "How fast the water is moving downstream."
      },
      {
        "id": "g",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Gravity (g)",
        "commonTraps": "9.81 m/s²."
      },
      {
        "id": "L",
        "siUnit": "m",
        "altUnits": "",
        "description": "Characteristic Length",
        "commonTraps": "Usually the physical depth of the river."
      }
    ],
    "solvingLogic": [
      "1. Multiply gravity (g) by depth (L).",
      "2. Take the square root of that result.",
      "3. Divide the velocity (v) by that square root."
    ],
    "edgeCases": [
      {
        "title": "Hydraulic Jumps",
        "description": "When water shoots down a dam spillway (supercritical, Fr > 1) and crashes into a slow, deep river below (subcritical, Fr < 1), physics breaks. The water violently explodes upward into a turbulent wall of foam called a 'Hydraulic Jump' to rapidly bleed off the excess energy."
      }
    ],
    "walkthroughExample": {
      "problem": "Water flows at 10 m/s in a channel 2.5 m deep. (Use g=10 for simplicity). Find Fr.",
      "solution": [
        "g × L = 10 × 2.5 = 25.",
        "Square root of 25 = 5.",
        "v / 5 = 10 / 5 = 2.0."
      ],
      "answer": "Fr = 2.0 (Supercritical Flow)"
    }
  },

  "capillary-rise": {
    "intuition": "If you put a tiny glass tube into a glass of water, the water magically sucks itself UP the tube against gravity! This is Capillary Action. The water molecules love the glass (adhesion) more than they love each other, so they physically climb the walls until gravity gets too heavy to pull any higher.",
    "variableBreakdown": [
      {
        "id": "h",
        "siUnit": "m",
        "altUnits": "mm",
        "description": "Height of Rise (h)",
        "commonTraps": ""
      },
      {
        "id": "gamma",
        "siUnit": "N/m",
        "altUnits": "",
        "description": "Surface Tension (γ)",
        "commonTraps": "The strength of the 'skin' of the water."
      },
      {
        "id": "theta",
        "siUnit": "°",
        "altUnits": "rad",
        "description": "Contact Angle (θ)",
        "commonTraps": "For pure water on clean glass, this angle is exactly 0° (meaning cos(0) = 1)."
      },
      {
        "id": "rho",
        "siUnit": "kg/m³",
        "altUnits": "",
        "description": "Liquid Density (ρ)",
        "commonTraps": "1000 for water."
      },
      {
        "id": "r",
        "siUnit": "m",
        "altUnits": "",
        "description": "Tube Radius (r)",
        "commonTraps": "Because 'r' is in the denominator, the SKINNIER the tube, the HIGHER the water climbs!"
      }
    ],
    "solvingLogic": [
      "1. Multiply 2 × surface tension (γ) × cos(θ).",
      "2. Divide by (density × gravity × radius)."
    ],
    "edgeCases": [
      {
        "title": "Trees drinking water",
        "description": "This exact formula is how giant Redwood trees survive. The 'tubes' (xylem) in the tree are so microscopically skinny (tiny 'r') that capillary action literally sucks the water hundreds of feet straight up into the sky without a heart or a pump."
      }
    ],
    "walkthroughExample": {
      "problem": "Find the height water will rise in a tube. 2γ = 0.14. Density=1000. g=10. r=0.001m. Assume angle is 0°.",
      "solution": [
        "Numerator: 0.14 × cos(0) = 0.14.",
        "Denominator: 1000 × 10 × 0.001 = 10.",
        "h = 0.14 / 10 = 0.014 m."
      ],
      "answer": "h = 1.4 cm"
    }
  },

  "specific-impulse": {
    "intuition": "Specific Impulse (Isp) is the ultimate MPG (miles per gallon) rating for rocket engines. It measures exactly how many seconds a rocket engine can push with 1 pound of thrust while burning 1 pound of fuel. A higher Isp means an insanely efficient rocket.",
    "variableBreakdown": [
      {
        "id": "Isp",
        "siUnit": "s",
        "altUnits": "",
        "description": "Specific Impulse",
        "commonTraps": "It is measured in SECONDS. A standard chemical rocket is around 350s. Ion thrusters can hit 3,000s!"
      },
      {
        "id": "ve",
        "siUnit": "m/s",
        "altUnits": "",
        "description": "Exhaust Velocity",
        "commonTraps": "How fast the fire physically shoots out the back of the nozzle."
      },
      {
        "id": "g",
        "siUnit": "m/s²",
        "altUnits": "",
        "description": "Earth Gravity (g)",
        "commonTraps": "ALWAYS 9.81 m/s², even if the rocket is in deep space! It is just a conversion constant to make American and Metric scientists agree on the math."
      }
    ],
    "solvingLogic": [
      "1. Simply divide the exhaust velocity (ve) by Earth's gravity (9.81)."
    ],
    "edgeCases": [
      {
        "title": "Ion Thrusters",
        "description": "Chemical rockets shoot out a massive amount of fire at a medium speed (high thrust, low Isp). Ion thrusters shoot out single atoms of Xenon gas, but shoot them at a staggering 40,000 m/s (zero thrust, extreme Isp). Ion thrusters couldn't lift a paperclip off a desk, but in deep space, they can accelerate a satellite to unbelievable speeds over months of continuous firing."
      }
    ],
    "walkthroughExample": {
      "problem": "A rocket engine shoots exhaust gas at 3,000 m/s. (Use g=10). Find Isp.",
      "solution": [
        "Isp = 3000 / 10 = 300."
      ],
      "answer": "Isp = 300 Seconds"
    }
  }
};
