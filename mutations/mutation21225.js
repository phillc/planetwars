exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -2.0884872582013,
      0.099252438054602,
      -0.009505713272746,
      0.00118575371808388,
      -1.78743613032736,
      144.053380734805
    ],
    "input_weights": [
      {
        "isNeutral": -0.0841585471947357,
        "planetVotes": 0.0471831501497672,
        "growth": -0.669343776305582,
        "farthestEffDef": -1.91657407727972,
        "inMyUmbrella": -0.095366919710411
      },
      {
        "isNeutral": 166.782730276931,
        "planetVotes": 1.90230247115858,
        "growth": -0.166373543990178,
        "farthestEffDef": 1.19661964630224,
        "inMyUmbrella": -0.0457022963919212
      },
      {
        "isNeutral": 1.01196054503891,
        "planetVotes": 0.43135029561564,
        "growth": 4.48716545611628,
        "farthestEffDef": -4.46494324308176,
        "inMyUmbrella": 0.285517408710354
      },
      {
        "isNeutral": -1.10254550069054,
        "planetVotes": -0.271062863285662,
        "growth": -0.471684764466204,
        "farthestEffDef": -0.042868454728602,
        "inMyUmbrella": 1.91232775928306
      },
      {
        "isNeutral": 408.593511738648,
        "planetVotes": 0.036902391147024,
        "growth": -6.61765845125185,
        "farthestEffDef": -0.165189630993093,
        "inMyUmbrella": 10.693106609454
      },
      {
        "isNeutral": -128.51167450283,
        "planetVotes": -0.052790082221428,
        "growth": 21.1748001313036,
        "farthestEffDef": 0.2672150035572,
        "inMyUmbrella": -0.91633065978086
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.1125,
      -0.475,
      0.1625,
      0.2
    ],
    "input_weights": [
      {
        "growth": -0.2,
        "distance": 0.4
      },
      {
        "growth": 0.5,
        "distance": -2.9
      },
      {
        "growth": -11.1,
        "distance": -1.6
      },
      {
        "growth": 0.3,
        "distance": -0.05
      }
    ]
  },
  "created_on": "Sat Nov 06 11:38:02 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0433025438171628,
      1.38455615716689,
      2.24061970751776,
      -48.9002375541232
    ],
    "input_weights": [
      {
        "effDef": 1.09804916495016,
        "growth": -0.05,
        "distance": 0.068582149115066
      },
      {
        "effDef": 0.245950483497237,
        "growth": -0.225,
        "distance": -0.35282414808742
      },
      {
        "effDef": -8.770562579408,
        "growth": -0.025,
        "distance": 0.098280185958466
      },
      {
        "effDef": -0.472383866869736,
        "growth": -0.25,
        "distance": -0.341553257415938
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.11875,
      -0.05625,
      -0.15,
      0.05
    ],
    "input_weights": [
      {
        "effDef": -0.2,
        "growth": -0.1875,
        "distance": 0.35
      },
      {
        "effDef": -0.0,
        "growth": 0.3,
        "distance": 0.00625
      },
      {
        "effDef": 0.053125,
        "growth": -0.6,
        "distance": -0.05
      },
      {
        "effDef": 0.0,
        "growth": -0.15,
        "distance": 0.1625
      }
    ]
  }
}