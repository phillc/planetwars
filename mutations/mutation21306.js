exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -0.030530453637582,
      -0.297009752218408,
      0.304182824727872,
      0.081027940510658,
      -1.78743613032736,
      143.853380734805
    ],
    "input_weights": [
      {
        "isNeutral": 0.263365811221057,
        "planetVotes": 0.0028168498502328,
        "growth": -0.184671888152791,
        "farthestEffDef": 30.6651852364756,
        "inMyUmbrella": -0.481467678841644
      },
      {
        "isNeutral": -83.2413651384656,
        "planetVotes": 3.95460494231716,
        "growth": 0.0918132280049113,
        "farthestEffDef": -0.29915491157556,
        "inMyUmbrella": 0.282809185567685
      },
      {
        "isNeutral": -2.02392109007782,
        "planetVotes": -0.06864970438436,
        "growth": 4.28716545611628,
        "farthestEffDef": -0.75811790538522,
        "inMyUmbrella": 0.135517408710354
      },
      {
        "isNeutral": -0.351272750345268,
        "planetVotes": 0.185531431642831,
        "growth": 0.092921191116551,
        "farthestEffDef": 0.128526181085592,
        "inMyUmbrella": -0.628081939820765
      },
      {
        "isNeutral": 51.074188967331,
        "planetVotes": -0.40478087082381,
        "growth": -6.86765845125185,
        "farthestEffDef": -0.034810369006907,
        "inMyUmbrella": 1.23663832618175
      },
      {
        "isNeutral": -8.0819796564269,
        "planetVotes": -0.073604958889286,
        "growth": -10.4874000656518,
        "farthestEffDef": 0.084430007114399,
        "inMyUmbrella": -2.13266131956172
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      -0.05,
      -0.10625,
      -0.1875,
      0.05
    ],
    "input_weights": [
      {
        "growth": -0.05,
        "distance": 0.0
      },
      {
        "growth": 0.075,
        "distance": -2.8
      },
      {
        "growth": -11.3,
        "distance": -0.05
      },
      {
        "growth": 0.8,
        "distance": 0.0
      }
    ]
  },
  "created_on": "Sat Nov 06 12:27:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      -0.00669745618283725,
      2.36911231433378,
      0.28007746343972,
      -1.58125742356635
    ],
    "input_weights": [
      {
        "effDef": 0.23701229123754,
        "growth": -0.1,
        "distance": -0.018582149115066
      },
      {
        "effDef": 0.245950483497237,
        "growth": 4.0,
        "distance": 0.30564829617484
      },
      {
        "effDef": -34.582250317632,
        "growth": -0.15,
        "distance": 0.00171981404153387
      },
      {
        "effDef": 0.581904033282565,
        "growth": -0.025,
        "distance": 0.129223371292031
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.1875,
      0.04375,
      0.2,
      -0.3
    ],
    "input_weights": [
      {
        "effDef": -0.05,
        "growth": -0.25,
        "distance": 0.1125
      },
      {
        "effDef": 0.1,
        "growth": 0.2,
        "distance": 0.00546875
      },
      {
        "effDef": 0.04375,
        "growth": 0.7,
        "distance": -0.1
      },
      {
        "effDef": -0.2,
        "growth": -0.075,
        "distance": 0.1625
      }
    ]
  }
}