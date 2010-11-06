exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -0.472121814550325,
      -0.298504876109204,
      -0.076045706181968,
      0.101185753718084,
      -3.67487226065472,
      144.053380734805
    ],
    "input_weights": [
      {
        "isNeutral": 0.0210396367986839,
        "planetVotes": 0.0235915750748836,
        "growth": -0.569343776305582,
        "farthestEffDef": 3.73314815455944,
        "inMyUmbrella": -0.0476834598552055
      },
      {
        "isNeutral": -83.4413651384655,
        "planetVotes": 2.10230247115858,
        "growth": 0.132747087980355,
        "farthestEffDef": 2.39323929260448,
        "inMyUmbrella": -0.0457022963919212
      },
      {
        "isNeutral": 0.505980272519454,
        "planetVotes": 0.08283757390391,
        "growth": 2.24358272805814,
        "farthestEffDef": 8.72988648616352,
        "inMyUmbrella": 0.185517408710354
      },
      {
        "isNeutral": -0.55127275034527,
        "planetVotes": 0.185531431642831,
        "growth": -0.135842382233102,
        "farthestEffDef": 0.157131545271398,
        "inMyUmbrella": -3.72465551856612
      },
      {
        "isNeutral": -204.396755869324,
        "planetVotes": 0.063097608852976,
        "growth": -52.9412676100148,
        "farthestEffDef": -0.330379261986186,
        "inMyUmbrella": 1.33663832618175
      },
      {
        "isNeutral": -128.61167450283,
        "planetVotes": 0.005580164442856,
        "growth": 10.5374000656518,
        "farthestEffDef": 0.0668037508893,
        "inMyUmbrella": -0.45816532989043
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.2125,
      1.9,
      0.08125,
      0.0
    ],
    "input_weights": [
      {
        "growth": 0.4,
        "distance": 0.2
      },
      {
        "growth": -0.5,
        "distance": 0.725
      },
      {
        "growth": -11.1,
        "distance": -1.6
      },
      {
        "growth": 0.4,
        "distance": -0.1
      }
    ]
  },
  "created_on": "Sat Nov 06 12:48:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0283487280914186,
      -1.28455615716689,
      0.58515492687944,
      49.0002375541232
    ],
    "input_weights": [
      {
        "effDef": -2.29609832990032,
        "growth": 0.1,
        "distance": -0.031417850884934
      },
      {
        "effDef": -0.172975241748619,
        "growth": 0.45,
        "distance": -0.138206037021855
      },
      {
        "effDef": 17.541125158816,
        "growth": -0.0125,
        "distance": 0.098280185958466
      },
      {
        "effDef": -0.572383866869736,
        "growth": 0.175,
        "distance": -0.241553257415938
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.075,
      -0.128125,
      -0.025,
      -0.05
    ],
    "input_weights": [
      {
        "effDef": -0.1,
        "growth": 0.003125,
        "distance": -0.7
      },
      {
        "effDef": -0.05,
        "growth": -0.2,
        "distance": -0.003125
      },
      {
        "effDef": 0.4125,
        "growth": -0.25,
        "distance": -0.0125
      },
      {
        "effDef": -0.1,
        "growth": -0.025,
        "distance": 0.090625
      }
    ]
  }
}