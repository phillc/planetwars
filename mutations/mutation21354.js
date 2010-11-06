exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -1.9884872582013,
      -0.099252438054602,
      -0.019011426545492,
      0.00059287685904194,
      -3.57487226065472,
      143.953380734805
    ],
    "input_weights": [
      {
        "isNeutral": -0.168317094389471,
        "planetVotes": 0.0471831501497672,
        "growth": -0.669343776305582,
        "farthestEffDef": -1.91657407727972,
        "inMyUmbrella": -0.095366919710411
      },
      {
        "isNeutral": 83.3913651384655,
        "planetVotes": 1.90230247115858,
        "growth": -0.083186771995089,
        "farthestEffDef": 1.19661964630224,
        "inMyUmbrella": 0.0457022963919212
      },
      {
        "isNeutral": 2.02392109007782,
        "planetVotes": 0.21567514780782,
        "growth": 4.38716545611628,
        "farthestEffDef": -4.36494324308176,
        "inMyUmbrella": 0.385517408710354
      },
      {
        "isNeutral": -2.20509100138108,
        "planetVotes": -0.135531431642831,
        "growth": -0.235842382233102,
        "farthestEffDef": -0.021434227364301,
        "inMyUmbrella": 3.82465551856612
      },
      {
        "isNeutral": 817.187023477296,
        "planetVotes": 0.073804782294048,
        "growth": -6.51765845125185,
        "farthestEffDef": -0.065189630993093,
        "inMyUmbrella": 10.793106609454
      },
      {
        "isNeutral": -128.61167450283,
        "planetVotes": -0.105580164442856,
        "growth": -21.1748001313036,
        "farthestEffDef": 0.5344300071144,
        "inMyUmbrella": -1.01633065978086
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.05625,
      -0.2375,
      0.08125,
      0.4
    ],
    "input_weights": [
      {
        "growth": -0.4,
        "distance": 0.3
      },
      {
        "growth": 0.5,
        "distance": -2.8
      },
      {
        "growth": -5.55,
        "distance": -1.7
      },
      {
        "growth": 0.15,
        "distance": -0.1
      }
    ]
  },
  "created_on": "Sat Nov 06 12:58:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0216512719085814,
      1.38455615716689,
      4.48123941503552,
      -97.8004751082464
    ],
    "input_weights": [
      {
        "effDef": 0.54902458247508,
        "growth": 0.05,
        "distance": 0.034291074557533
      },
      {
        "effDef": 0.245950483497237,
        "growth": -0.1125,
        "distance": -0.45282414808742
      },
      {
        "effDef": -17.541125158816,
        "growth": -0.0125,
        "distance": -0.098280185958466
      },
      {
        "effDef": 0.472383866869736,
        "growth": 0.25,
        "distance": -0.683106514831876
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.059375,
      -0.05625,
      -0.25,
      0.1
    ],
    "input_weights": [
      {
        "effDef": -0.2,
        "growth": -0.2875,
        "distance": 0.175
      },
      {
        "effDef": -0.0,
        "growth": 0.2,
        "distance": -0.09375
      },
      {
        "effDef": 0.10625,
        "growth": 0.6,
        "distance": -0.1
      },
      {
        "effDef": -0.0,
        "growth": -0.3,
        "distance": -0.1625
      }
    ]
  }
}