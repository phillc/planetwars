exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      0.497121814550325,
      0.049626219027301,
      0.079752856636373,
      -0.051185753718084,
      -0.47185903258184,
      144.028380734805
    ],
    "input_weights": [
      {
        "isNeutral": -0.0158414528052643,
        "planetVotes": -0.0117957875374418,
        "growth": -0.0230839860190989,
        "farthestEffDef": 15.3325926182378,
        "inMyUmbrella": 0.409266160579178
      },
      {
        "isNeutral": 41.7206825692327,
        "planetVotes": 0.450575617789645,
        "growth": 0.0668132280049112,
        "farthestEffDef": 1.99323929260448,
        "inMyUmbrella": -0.0057127870489901
      },
      {
        "isNeutral": 0.126495068129863,
        "planetVotes": 0.36270059123128,
        "growth": 1.02179136402907,
        "farthestEffDef": -4.46494324308176,
        "inMyUmbrella": 0.342758704355178
      },
      {
        "isNeutral": 2.30509100138108,
        "planetVotes": 0.014468568357169,
        "growth": -1.14336952893241,
        "farthestEffDef": -0.028565772635699,
        "inMyUmbrella": -7.14931103713224
      },
      {
        "isNeutral": 408.793511738648,
        "planetVotes": 0.063097608852976,
        "growth": 52.5412676100148,
        "farthestEffDef": -0.0103243519370683,
        "inMyUmbrella": 5.296553304727
      },
      {
        "isNeutral": -2.00799491410673,
        "planetVotes": -0.002790082221428,
        "growth": 20.8748001313036,
        "farthestEffDef": -0.7344300071144,
        "inMyUmbrella": 1.93266131956172
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      -0.2125,
      -0.475,
      -0.01875,
      -0.4
    ],
    "input_weights": [
      {
        "growth": 0.05,
        "distance": 0.2
      },
      {
        "growth": 0.5,
        "distance": -5.8
      },
      {
        "growth": -5.6,
        "distance": 0.2
      },
      {
        "growth": -0.0,
        "distance": -0.2
      }
    ]
  },
  "created_on": "Sat Nov 06 12:58:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.00541281797714535,
      -0.173069519645862,
      2.24061970751776,
      -97.8004751082464
    ],
    "input_weights": [
      {
        "effDef": 2.24609832990032,
        "growth": -0.1,
        "distance": 0.00857276863938325
      },
      {
        "effDef": -0.18648762087431,
        "growth": 3.6,
        "distance": -0.07641207404371
      },
      {
        "effDef": 4.335281289704,
        "growth": -0.3,
        "distance": 1.58624148766773
      },
      {
        "effDef": -0.236191933434868,
        "growth": 0.125,
        "distance": 0.0603883143539845
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.28125,
      0.2875,
      0.1125,
      0.1
    ],
    "input_weights": [
      {
        "effDef": -0.225,
        "growth": 0.096875,
        "distance": 0.6
      },
      {
        "effDef": 0.1,
        "growth": 0.7,
        "distance": 0.1015625
      },
      {
        "effDef": 0.02578125,
        "growth": -0.8,
        "distance": 0.0015625
      },
      {
        "effDef": -0.2,
        "growth": -0.0125,
        "distance": 0.03125
      }
    ]
  }
}