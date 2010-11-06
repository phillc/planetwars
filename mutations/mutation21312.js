exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -1.04424362910065,
      -0.050373780972699,
      -0.009505713272746,
      0.00118575371808388,
      -0.44685903258184,
      71.9266903674025
    ],
    "input_weights": [
      {
        "isNeutral": -0.084158547194736,
        "planetVotes": -0.105633699700466,
        "growth": -0.669343776305582,
        "farthestEffDef": -7.66629630911888,
        "inMyUmbrella": -0.090733839420822
      },
      {
        "isNeutral": 166.882730276931,
        "planetVotes": 1.90230247115858,
        "growth": 0.083186771995089,
        "farthestEffDef": 4.78647858520896,
        "inMyUmbrella": 0.108595407216158
      },
      {
        "isNeutral": 2.02392109007782,
        "planetVotes": -0.21567514780782,
        "growth": -8.97433091223256,
        "farthestEffDef": -4.46494324308176,
        "inMyUmbrella": 0.471034817420708
      },
      {
        "isNeutral": -1.00254550069054,
        "planetVotes": 0.542125726571324,
        "growth": 0.943369528932408,
        "farthestEffDef": -0.171473818914408,
        "inMyUmbrella": 0.95616387964153
      },
      {
        "isNeutral": 817.287023477296,
        "planetVotes": 0.036902391147024,
        "growth": -6.61765845125185,
        "farthestEffDef": -0.430379261986186,
        "inMyUmbrella": 21.386213218908
      },
      {
        "isNeutral": -128.51167450283,
        "planetVotes": -0.052790082221428,
        "growth": 84.6992005252144,
        "farthestEffDef": 0.5344300071144,
        "inMyUmbrella": -3.66532263912344
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.028125,
      -0.475,
      0.040625,
      0.2
    ],
    "input_weights": [
      {
        "growth": -0.2,
        "distance": 0.1
      },
      {
        "growth": 0.125,
        "distance": -2.9
      },
      {
        "growth": -11.0,
        "distance": 0.8
      },
      {
        "growth": -0.15,
        "distance": -0.2
      }
    ]
  },
  "created_on": "Sat Nov 06 12:27:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      0.0866050876343256,
      1.48455615716689,
      2.24061970751776,
      -97.8004751082464
    ],
    "input_weights": [
      {
        "effDef": 1.09804916495016,
        "growth": -0.0125,
        "distance": -0.034291074557533
      },
      {
        "effDef": 0.145950483497237,
        "growth": -0.225,
        "distance": -0.27641207404371
      },
      {
        "effDef": -17.741125158816,
        "growth": -0.1,
        "distance": 0.098280185958466
      },
      {
        "effDef": -0.844767733739472,
        "growth": -0.175,
        "distance": -0.070776628707969
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.11875,
      -0.05625,
      -0.6,
      0.05
    ],
    "input_weights": [
      {
        "effDef": -0.2,
        "growth": -0.475,
        "distance": 0.175
      },
      {
        "effDef": 0.0,
        "growth": -0.4,
        "distance": 0.1125
      },
      {
        "effDef": 0.153125,
        "growth": -1.0,
        "distance": 0.025
      },
      {
        "effDef": -0.2,
        "growth": -0.6,
        "distance": -0.325
      }
    ]
  }
}