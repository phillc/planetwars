exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -0.111060907275162,
      -1.57607801774726,
      0.152091412363936,
      0.011907123140958,
      -1.78743613032736,
      35.9133451837013
    ],
    "input_weights": [
      {
        "isNeutral": -0.00823018160065805,
        "planetVotes": -0.00017605311563955,
        "growth": 0.0423359440763955,
        "farthestEffDef": 7.26629630911888,
        "inMyUmbrella": -0.190733839420822
      },
      {
        "isNeutral": 20.8603412846164,
        "planetVotes": 1.90230247115858,
        "growth": 0.267252912019646,
        "farthestEffDef": 4.78647858520896,
        "inMyUmbrella": 1.72494696908296
      },
      {
        "isNeutral": 0.811960545038908,
        "planetVotes": 0.33135029561564,
        "growth": -2.34358272805814,
        "farthestEffDef": -0.239529476346305,
        "inMyUmbrella": 0.371034817420708
      },
      {
        "isNeutral": -0.0282045468965792,
        "planetVotes": 0.742125726571326,
        "growth": 0.385842382233102,
        "farthestEffDef": -0.271473818914408,
        "inMyUmbrella": 2.01232775928306
      },
      {
        "isNeutral": 102.048377934662,
        "planetVotes": -0.252390435411904,
        "growth": -13.2353169025037,
        "farthestEffDef": 0.060758523972372,
        "inMyUmbrella": 2.7482766523635
      },
      {
        "isNeutral": -16.0639593128538,
        "planetVotes": -0.305580164442856,
        "growth": 10.4374000656518,
        "farthestEffDef": 0.134430007114399,
        "inMyUmbrella": -0.91633065978086
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.1,
      -0.5125,
      -0.2125,
      -0.1
    ],
    "input_weights": [
      {
        "growth": -0.2,
        "distance": -0.2
      },
      {
        "growth": 0.03125,
        "distance": -11.2
      },
      {
        "growth": -0.125,
        "distance": -2.2
      },
      {
        "growth": -0.35,
        "distance": 0.6
      }
    ]
  },
  "created_on": "Sat Nov 06 12:27:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0033487280914185,
      19.9528985146702,
      0.92030985375888,
      -12.2000593885308
    ],
    "input_weights": [
      {
        "effDef": 0.16201229123754,
        "growth": -0.1,
        "distance": 0.059291074557533
      },
      {
        "effDef": -0.291900966994474,
        "growth": 0.1,
        "distance": 0.0191030185109275
      },
      {
        "effDef": -1.083820322426,
        "growth": 0.15,
        "distance": 0.203439628083068
      },
      {
        "effDef": 0.0704760083206415,
        "growth": 0.025,
        "distance": -0.0353883143539846
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      0.003125,
      1.375,
      -0.4,
      0.0
    ],
    "input_weights": [
      {
        "effDef": -0.0,
        "growth": -0.125,
        "distance": 0.55
      },
      {
        "effDef": -0.4,
        "growth": 0.25,
        "distance": 0.075
      },
      {
        "effDef": 0.25,
        "growth": 0.1,
        "distance": 0.0
      },
      {
        "effDef": -0.05,
        "growth": -0.0875,
        "distance": -0.05
      }
    ]
  }
}