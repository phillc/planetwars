exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -0.130530453637582,
      0.297009752218408,
      0.152091412363936,
      -0.018972059489342,
      -1.68743613032736,
      287.70676146961
    ],
    "input_weights": [
      {
        "isNeutral": 0.163365811221057,
        "planetVotes": 0.0056336997004656,
        "growth": -0.0923359440763955,
        "farthestEffDef": -30.6651852364756,
        "inMyUmbrella": -0.381467678841644
      },
      {
        "isNeutral": -41.6206825692328,
        "planetVotes": -3.95460494231716,
        "growth": 0.0918132280049113,
        "farthestEffDef": -0.29915491157556,
        "inMyUmbrella": 0.282809185567685
      },
      {
        "isNeutral": -1.01196054503891,
        "planetVotes": 0.03135029561564,
        "growth": 2.14358272805814,
        "farthestEffDef": -0.65811790538522,
        "inMyUmbrella": 0.135517408710354
      },
      {
        "isNeutral": -0.702545500690536,
        "planetVotes": 0.371062863285662,
        "growth": -0.092921191116551,
        "farthestEffDef": 0.028526181085592,
        "inMyUmbrella": -1.25616387964153
      },
      {
        "isNeutral": 51.074188967331,
        "planetVotes": 0.40478087082381,
        "growth": -13.7353169025037,
        "farthestEffDef": -0.034810369006907,
        "inMyUmbrella": 1.23663832618175
      },
      {
        "isNeutral": -16.1639593128538,
        "planetVotes": -0.147209917778572,
        "growth": -20.9748001313036,
        "farthestEffDef": 0.184430007114399,
        "inMyUmbrella": -2.13266131956172
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.05,
      -0.00625,
      -0.1875,
      0.1
    ],
    "input_weights": [
      {
        "growth": -0.1,
        "distance": 0.0
      },
      {
        "growth": 0.15,
        "distance": -1.4
      },
      {
        "growth": -11.2,
        "distance": -0.1
      },
      {
        "growth": 0.8,
        "distance": 0.0
      }
    ]
  },
  "created_on": "Sat Nov 06 10:37:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      -0.0133949123656745,
      2.46911231433378,
      0.14003873171986,
      -3.1625148471327
    ],
    "input_weights": [
      {
        "effDef": 0.47402458247508,
        "growth": 0.1,
        "distance": -0.118582149115066
      },
      {
        "effDef": 0.491900966994474,
        "growth": 2.0,
        "distance": 0.15282414808742
      },
      {
        "effDef": -69.164500635264,
        "growth": -0.15,
        "distance": 0.00343962808306774
      },
      {
        "effDef": 1.16380806656513,
        "growth": 0.075,
        "distance": 0.129223371292031
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      0.1875,
      -0.05625,
      0.1,
      -0.3
    ],
    "input_weights": [
      {
        "effDef": -0.1,
        "growth": -0.35,
        "distance": 0.05625
      },
      {
        "effDef": 0.0,
        "growth": 0.1,
        "distance": -0.00546875
      },
      {
        "effDef": 0.04375,
        "growth": 0.8,
        "distance": -0.1
      },
      {
        "effDef": -0.1,
        "growth": -0.15,
        "distance": 0.0625
      }
    ]
  }
}