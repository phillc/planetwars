exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -1.04424362910065,
      -0.099252438054602,
      -0.009505713272746,
      -0.0988142462819161,
      -0.89371806516368,
      143.953380734805
    ],
    "input_weights": [
      {
        "isNeutral": -0.184158547194736,
        "planetVotes": 0.0943663002995344,
        "growth": -0.334671888152791,
        "farthestEffDef": -3.83314815455944,
        "inMyUmbrella": 0.095366919710411
      },
      {
        "isNeutral": 83.3913651384655,
        "planetVotes": 2.00230247115858,
        "growth": -0.332747087980356,
        "farthestEffDef": 2.39323929260448,
        "inMyUmbrella": -0.145702296391921
      },
      {
        "isNeutral": 0.505980272519455,
        "planetVotes": 0.86270059123128,
        "growth": -4.48716545611628,
        "farthestEffDef": -4.46494324308176,
        "inMyUmbrella": 0.142758704355177
      },
      {
        "isNeutral": -1.00254550069054,
        "planetVotes": -0.171062863285662,
        "growth": 0.471684764466204,
        "farthestEffDef": 0.042868454728602,
        "inMyUmbrella": 3.82465551856612
      },
      {
        "isNeutral": 408.493511738648,
        "planetVotes": -0.063097608852976,
        "growth": -3.30882922562592,
        "farthestEffDef": -0.330379261986186,
        "inMyUmbrella": 10.793106609454
      },
      {
        "isNeutral": -257.02334900566,
        "planetVotes": -0.105580164442856,
        "growth": 10.5874000656518,
        "farthestEffDef": 0.1336075017786,
        "inMyUmbrella": -1.83266131956172
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.05625,
      -0.375,
      -0.1625,
      0.2
    ],
    "input_weights": [
      {
        "growth": -0.1,
        "distance": 0.4
      },
      {
        "growth": 0.25,
        "distance": -1.45
      },
      {
        "growth": -11.0,
        "distance": -0.8
      },
      {
        "growth": 0.15,
        "distance": -0.1
      }
    ]
  },
  "created_on": "Sat Nov 06 12:17:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      -0.0566974561828372,
      2.76911231433378,
      4.48123941503552,
      -49.0002375541232
    ],
    "input_weights": [
      {
        "effDef": 1.09804916495016,
        "growth": 0.05,
        "distance": -0.031417850884934
      },
      {
        "effDef": -0.245950483497237,
        "growth": -0.1125,
        "distance": -0.70564829617484
      },
      {
        "effDef": -8.670562579408,
        "growth": 0.025,
        "distance": 0.049140092979233
      },
      {
        "effDef": -0.372383866869736,
        "growth": -0.5,
        "distance": -0.683106514831876
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.2375,
      -0.028125,
      -0.05,
      -0.05
    ],
    "input_weights": [
      {
        "effDef": -0.4,
        "growth": -0.09375,
        "distance": 0.35
      },
      {
        "effDef": 0.0,
        "growth": 0.6,
        "distance": -0.09375
      },
      {
        "effDef": 0.153125,
        "growth": -0.3,
        "distance": -0.1
      },
      {
        "effDef": 0.0,
        "growth": 0.15,
        "distance": 0.08125
      }
    ]
  }
}