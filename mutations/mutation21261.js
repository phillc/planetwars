exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      0.055530453637581,
      0.988039008873632,
      -0.152091412363936,
      -0.0119071231409581,
      -1.68743613032736,
      -17.9316725918506
    ],
    "input_weights": [
      {
        "isNeutral": 0.165841452805265,
        "planetVotes": -0.0014084249251164,
        "growth": -0.169343776305582,
        "farthestEffDef": -0.90828703863986,
        "inMyUmbrella": 0.190733839420822
      },
      {
        "isNeutral": -5.2150853211541,
        "planetVotes": 1.05115123557929,
        "growth": -0.267252912019646,
        "farthestEffDef": -1.09661964630224,
        "inMyUmbrella": -0.107809185567685
      },
      {
        "isNeutral": -0.505980272519454,
        "planetVotes": 0.66270059123128,
        "growth": -2.34358272805814,
        "farthestEffDef": -0.139529476346305,
        "inMyUmbrella": -0.235517408710354
      },
      {
        "isNeutral": -0.0564090937931585,
        "planetVotes": 1.48425145314265,
        "growth": -0.007078808883449,
        "farthestEffDef": -0.033934227364301,
        "inMyUmbrella": 0.85616387964153
      },
      {
        "isNeutral": 204.496755869324,
        "planetVotes": 0.176195217705953,
        "growth": -6.61765845125185,
        "farthestEffDef": -0.039241476027628,
        "inMyUmbrella": 10.993106609454
      },
      {
        "isNeutral": -15.8639593128538,
        "planetVotes": -0.013197520555357,
        "growth": -21.0748001313036,
        "farthestEffDef": 0.875440056915192,
        "inMyUmbrella": -0.91633065978086
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.125,
      0.15625,
      -0.028125,
      0.1
    ],
    "input_weights": [
      {
        "growth": -0.1,
        "distance": -0.0
      },
      {
        "growth": -0.125,
        "distance": 2.7
      },
      {
        "growth": -0.7,
        "distance": -2.0
      },
      {
        "growth": -0.25,
        "distance": 0.8
      }
    ]
  },
  "created_on": "Sat Nov 06 11:59:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.00669745618283725,
      9.9764492573351,
      0.46015492687944,
      -24.5001187770616
    ],
    "input_weights": [
      {
        "effDef": -0.26201229123754,
        "growth": 0.025,
        "distance": 0.068582149115066
      },
      {
        "effDef": 0.245950483497237,
        "growth": 0.05,
        "distance": 0.0191030185109275
      },
      {
        "effDef": 1.083820322426,
        "growth": 0.3,
        "distance": 0.00171981404153387
      },
      {
        "effDef": -0.0352380041603208,
        "growth": -0.25,
        "distance": 0.0353883143539846
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      0.0125,
      0.6875,
      -0.3,
      0.0
    ],
    "input_weights": [
      {
        "effDef": 0.0,
        "growth": -0.05,
        "distance": 0.1375
      },
      {
        "effDef": -0.1,
        "growth": -0.6,
        "distance": 0.0875
      },
      {
        "effDef": 0.15,
        "growth": -0.8,
        "distance": 0.2
      },
      {
        "effDef": 0.05,
        "growth": -0.175,
        "distance": -0.25
      }
    ]
  }
}