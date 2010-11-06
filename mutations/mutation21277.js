exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -0.005530453637581,
      0.394019504436816,
      -0.152091412363936,
      0.111907123140958,
      -0.74371806516368,
      35.8633451837013
    ],
    "input_weights": [
      {
        "isNeutral": -0.0829207264026325,
        "planetVotes": -0.0014084249251164,
        "growth": -0.184671888152791,
        "farthestEffDef": 1.91657407727972,
        "inMyUmbrella": 0.0976834598552055
      },
      {
        "isNeutral": -5.4150853211541,
        "planetVotes": 2.00230247115858,
        "growth": 0.267252912019646,
        "farthestEffDef": -0.54830982315112,
        "inMyUmbrella": -0.107809185567685
      },
      {
        "isNeutral": -2.02392109007782,
        "planetVotes": 0.66270059123128,
        "growth": 1.17179136402907,
        "farthestEffDef": -0.039529476346305,
        "inMyUmbrella": 0.135517408710354
      },
      {
        "isNeutral": -0.225636375172634,
        "planetVotes": -0.742125726571325,
        "growth": -0.171684764466204,
        "farthestEffDef": 0.032131545271398,
        "inMyUmbrella": 2.01232775928306
      },
      {
        "isNeutral": 204.396755869324,
        "planetVotes": 0.226195217705952,
        "growth": -13.4353169025037,
        "farthestEffDef": -0.039241476027628,
        "inMyUmbrella": 2.7232766523635
      },
      {
        "isNeutral": -16.0639593128538,
        "planetVotes": -0.105580164442856,
        "growth": -20.9748001313036,
        "farthestEffDef": 0.337720028457596,
        "inMyUmbrella": 3.66532263912344
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      -0.1,
      -1.025,
      -0.15625,
      -0.2
    ],
    "input_weights": [
      {
        "growth": 0.05,
        "distance": 0.1
      },
      {
        "growth": 0.03125,
        "distance": 2.8
      },
      {
        "growth": 1.4,
        "distance": -0.25
      },
      {
        "growth": -0.7,
        "distance": 0.8
      }
    ]
  },
  "created_on": "Sat Nov 06 12:08:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.00167436404570931,
      9.97644925733512,
      3.68123941503552,
      -24.4001187770616
    ],
    "input_weights": [
      {
        "effDef": 0.065503072809385,
        "growth": -0.1,
        "distance": 0.037164298230132
      },
      {
        "effDef": -0.245950483497237,
        "growth": -0.075,
        "distance": 0.15282414808742
      },
      {
        "effDef": -4.235281289704,
        "growth": 0.3,
        "distance": 0.00343962808306774
      },
      {
        "effDef": 0.0704760083206415,
        "growth": -0.0625,
        "distance": 0.0176941571769923
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.0875,
      -0.54375,
      -0.3,
      -0.0
    ],
    "input_weights": [
      {
        "effDef": -0.1,
        "growth": 0.0,
        "distance": 0.275
      },
      {
        "effDef": -0.9,
        "growth": -0.5,
        "distance": 0.0875
      },
      {
        "effDef": 0.6,
        "growth": 0.8,
        "distance": 0.2
      },
      {
        "effDef": 0.025,
        "growth": -0.7,
        "distance": -0.15
      }
    ]
  }
}