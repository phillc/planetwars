exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -0.99424362910065,
      0.198504876109204,
      0.079752856636373,
      0.025592876859042,
      -0.13592951629092,
      287.95676146961
    ],
    "input_weights": [
      {
        "isNeutral": -0.0158414528052643,
        "planetVotes": -0.0235915750748836,
        "growth": -0.0461679720381978,
        "farthestEffDef": 15.3325926182378,
        "inMyUmbrella": 0.154633080289589
      },
      {
        "isNeutral": 41.8206825692327,
        "planetVotes": -0.225287808894822,
        "growth": -0.0334066140024556,
        "farthestEffDef": 0.49830982315112,
        "inMyUmbrella": -0.0057127870489901
      },
      {
        "isNeutral": 0.352990136259727,
        "planetVotes": 0.23135029561564,
        "growth": 1.02179136402907,
        "farthestEffDef": -2.33247162154088,
        "inMyUmbrella": -0.685517408710356
      },
      {
        "isNeutral": -4.61018200276216,
        "planetVotes": -0.0072342841785845,
        "growth": -2.48673905786482,
        "farthestEffDef": 0.0142828863178495,
        "inMyUmbrella": 14.2986220742645
      },
      {
        "isNeutral": 204.496755869324,
        "planetVotes": 0.063097608852976,
        "growth": 52.5412676100148,
        "farthestEffDef": -0.0103243519370683,
        "inMyUmbrella": 5.496553304727
      },
      {
        "isNeutral": -4.11598982821345,
        "planetVotes": -0.002790082221428,
        "growth": 20.8748001313036,
        "farthestEffDef": 0.8344300071144,
        "inMyUmbrella": -1.93266131956172
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.1125,
      -0.85,
      -0.08125,
      0.4
    ],
    "input_weights": [
      {
        "growth": 0.025,
        "distance": 0.4
      },
      {
        "growth": 0.4,
        "distance": -5.8
      },
      {
        "growth": -2.8,
        "distance": -0.2
      },
      {
        "growth": 0.1,
        "distance": -0.8
      }
    ]
  },
  "created_on": "Sat Nov 06 12:38:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0216512719085814,
      -0.692278078583446,
      2.24061970751776,
      97.8004751082464
    ],
    "input_weights": [
      {
        "effDef": 4.59219665980064,
        "growth": -0.1,
        "distance": 0.117145537278767
      },
      {
        "effDef": 0.18648762087431,
        "growth": 1.7,
        "distance": -0.088206037021855
      },
      {
        "effDef": 8.670562579408,
        "growth": -0.1,
        "distance": 0.396560371916932
      },
      {
        "effDef": 0.118095966717434,
        "growth": 0.125,
        "distance": 0.0603883143539845
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      0.18125,
      0.14375,
      0.225,
      0.1
    ],
    "input_weights": [
      {
        "effDef": -0.25,
        "growth": 0.29375,
        "distance": 2.4
      },
      {
        "effDef": 0.15,
        "growth": 0.7,
        "distance": -0.203125
      },
      {
        "effDef": -0.0484375,
        "growth": -0.2,
        "distance": 0.103125
      },
      {
        "effDef": -0.2,
        "growth": -0.00625,
        "distance": 0.03125
      }
    ]
  }
}