exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      0.522121814550325,
      -0.099626219027301,
      -0.038022853090984,
      -0.049407123140958,
      -1.58743613032736,
      72.0766903674025
    ],
    "input_weights": [
      {
        "isNeutral": -0.384158547194736,
        "planetVotes": 0.0471831501497672,
        "growth": 0.669343776305582,
        "farthestEffDef": -1.86657407727972,
        "inMyUmbrella": 0.095366919710411
      },
      {
        "isNeutral": 83.3913651384656,
        "planetVotes": 0.90115123557929,
        "growth": -0.665494175960712,
        "farthestEffDef": 1.14661964630224,
        "inMyUmbrella": 0.0271488518040395
      },
      {
        "isNeutral": 2.02392109007782,
        "planetVotes": 0.21567514780782,
        "growth": -2.24358272805814,
        "farthestEffDef": -8.82988648616352,
        "inMyUmbrella": -0.057241295644823
      },
      {
        "isNeutral": -2.10509100138108,
        "planetVotes": -0.0427657158214155,
        "growth": 1.14336952893241,
        "farthestEffDef": -0.085736909457204,
        "inMyUmbrella": 7.74931103713224
      },
      {
        "isNeutral": 816.987023477296,
        "planetVotes": -0.031548804426488,
        "growth": -6.81765845125184,
        "farthestEffDef": -0.530379261986186,
        "inMyUmbrella": 10.893106609454
      },
      {
        "isNeutral": -257.02334900566,
        "planetVotes": 0.047209917778572,
        "growth": 5.2937000328259,
        "farthestEffDef": 0.1336075017786,
        "inMyUmbrella": -1.73266131956172
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.04375,
      -0.375,
      -0.18125,
      0.2
    ],
    "input_weights": [
      {
        "growth": -0.15,
        "distance": -0.3
      },
      {
        "growth": 0.075,
        "distance": -1.45
      },
      {
        "growth": -5.4,
        "distance": -0.5
      },
      {
        "growth": 0.15,
        "distance": -0.1
      }
    ]
  },
  "created_on": "Sat Nov 06 13:08:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0216512719085814,
      -2.86911231433378,
      4.48123941503552,
      -24.6001187770616
    ],
    "input_weights": [
      {
        "effDef": -0.54902458247508,
        "growth": 0.05,
        "distance": -0.162835701769868
      },
      {
        "effDef": -0.391900966994474,
        "growth": 0.04375,
        "distance": -0.90564829617484
      },
      {
        "effDef": -8.470562579408,
        "growth": -0.0125,
        "distance": -0.0754299535103835
      },
      {
        "effDef": 0.272383866869736,
        "growth": -0.7,
        "distance": 0.783106514831876
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.675,
      -0.25625,
      -0.025,
      -0.0125
    ],
    "input_weights": [
      {
        "effDef": -0.7,
        "growth": -0.046875,
        "distance": 0.0875
      },
      {
        "effDef": 0.0,
        "growth": 0.6,
        "distance": 0.046875
      },
      {
        "effDef": 0.03828125,
        "growth": 0.15,
        "distance": 0.0
      },
      {
        "effDef": -0.0,
        "growth": -0.075,
        "distance": 0.18125
      }
    ]
  }
}