exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -0.497121814550325,
      0.099252438054602,
      0.159505713272746,
      -0.025592876859042,
      -0.23592951629092,
      288.05676146961
    ],
    "input_weights": [
      {
        "isNeutral": -0.00792072640263215,
        "planetVotes": -0.0117957875374418,
        "growth": -0.0461679720381978,
        "farthestEffDef": -15.3325926182378,
        "inMyUmbrella": 0.309266160579178
      },
      {
        "isNeutral": 41.7206825692327,
        "planetVotes": -0.450575617789645,
        "growth": -0.0668132280049112,
        "farthestEffDef": 0.99661964630224,
        "inMyUmbrella": -0.0114255740979802
      },
      {
        "isNeutral": 0.252990136259727,
        "planetVotes": 0.46270059123128,
        "growth": 2.04358272805814,
        "farthestEffDef": -2.23247162154088,
        "inMyUmbrella": -0.342758704355178
      },
      {
        "isNeutral": -2.30509100138108,
        "planetVotes": 0.0072342841785845,
        "growth": -1.24336952893241,
        "farthestEffDef": 0.028565772635699,
        "inMyUmbrella": 7.14931103713224
      },
      {
        "isNeutral": 204.396755869324,
        "planetVotes": 0.126195217705952,
        "growth": 26.2706338050074,
        "farthestEffDef": -0.0206487038741366,
        "inMyUmbrella": 5.396553304727
      },
      {
        "isNeutral": -4.01598982821345,
        "planetVotes": -0.002790082221428,
        "growth": 10.4374000656518,
        "farthestEffDef": 0.7344300071144,
        "inMyUmbrella": -1.93266131956172
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.2125,
      -0.95,
      0.01875,
      0.4
    ],
    "input_weights": [
      {
        "growth": 0.05,
        "distance": 0.2
      },
      {
        "growth": 0.4,
        "distance": -2.9
      },
      {
        "growth": -5.6,
        "distance": 0.2
      },
      {
        "growth": -0.0,
        "distance": -0.4
      }
    ]
  },
  "created_on": "Sat Nov 06 11:38:02 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0108256359542907,
      -0.346139039291723,
      2.24061970751776,
      -97.8004751082464
    ],
    "input_weights": [
      {
        "effDef": 4.49219665980064,
        "growth": -0.2,
        "distance": 0.0171455372787665
      },
      {
        "effDef": -0.18648762087431,
        "growth": 1.8,
        "distance": -0.17641207404371
      },
      {
        "effDef": 4.335281289704,
        "growth": -0.2,
        "distance": 0.793120743833864
      },
      {
        "effDef": -0.118095966717434,
        "growth": 0.0625,
        "distance": 0.120776628707969
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      0.28125,
      0.14375,
      0.225,
      0.1
    ],
    "input_weights": [
      {
        "effDef": -0.125,
        "growth": 0.19375,
        "distance": 1.2
      },
      {
        "effDef": 0.05,
        "growth": 0.8,
        "distance": -0.1015625
      },
      {
        "effDef": 0.0515625,
        "growth": -0.4,
        "distance": 0.003125
      },
      {
        "effDef": -0.1,
        "growth": -0.00625,
        "distance": 0.0625
      }
    ]
  }
}