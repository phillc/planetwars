exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -2.0884872582013,
      -0.0251868904863495,
      -0.109505713272746,
      0.00059287685904194,
      -0.34685903258184,
      72.0266903674025
    ],
    "input_weights": [
      {
        "isNeutral": 0.015841452805264,
        "planetVotes": -0.211267399400932,
        "growth": -0.334671888152791,
        "farthestEffDef": -3.83314815455944,
        "inMyUmbrella": 0.090733839420822
      },
      {
        "isNeutral": -166.882730276931,
        "planetVotes": 1.80230247115858,
        "growth": 0.183186771995089,
        "farthestEffDef": 9.57295717041792,
        "inMyUmbrella": 0.054297703608079
      },
      {
        "isNeutral": 4.04784218015564,
        "planetVotes": -0.10783757390391,
        "growth": -17.9486618244651,
        "farthestEffDef": 4.46494324308176,
        "inMyUmbrella": 0.942069634841416
      },
      {
        "isNeutral": -0.50127275034527,
        "planetVotes": 0.442125726571324,
        "growth": 0.843369528932408,
        "farthestEffDef": -0.071473818914408,
        "inMyUmbrella": 0.478081939820765
      },
      {
        "isNeutral": -817.287023477296,
        "planetVotes": 0.036902391147024,
        "growth": -3.30882922562592,
        "farthestEffDef": -0.860758523972372,
        "inMyUmbrella": 21.386213218908
      },
      {
        "isNeutral": -64.255837251415,
        "planetVotes": 0.047209917778572,
        "growth": 84.6992005252144,
        "farthestEffDef": 0.2672150035572,
        "inMyUmbrella": -3.76532263912344
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.0140625,
      -0.575,
      0.08125,
      0.1
    ],
    "input_weights": [
      {
        "growth": -0.1,
        "distance": 0.2
      },
      {
        "growth": 0.25,
        "distance": -5.8
      },
      {
        "growth": -22.0,
        "distance": 1.6
      },
      {
        "growth": -0.3,
        "distance": -0.4
      }
    ]
  },
  "created_on": "Sat Nov 06 13:08:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.186605087634326,
      -1.48455615716689,
      2.34061970751776,
      -97.9004751082464
    ],
    "input_weights": [
      {
        "effDef": 0.54902458247508,
        "growth": 0.0125,
        "distance": -0.034291074557533
      },
      {
        "effDef": 0.045950483497237,
        "growth": -0.325,
        "distance": -0.55282414808742
      },
      {
        "effDef": -17.841125158816,
        "growth": 0.0,
        "distance": 0.098280185958466
      },
      {
        "effDef": -0.944767733739472,
        "growth": 0.175,
        "distance": -0.070776628707969
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.059375,
      -0.05625,
      -0.3,
      0.1
    ],
    "input_weights": [
      {
        "effDef": 0.2,
        "growth": 0.475,
        "distance": 0.175
      },
      {
        "effDef": 0.0,
        "growth": -0.2,
        "distance": 0.05625
      },
      {
        "effDef": 0.0765625,
        "growth": -1.1,
        "distance": 0.0125
      },
      {
        "effDef": -0.1,
        "growth": -0.7,
        "distance": -0.325
      }
    ]
  }
}