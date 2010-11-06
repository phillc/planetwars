exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -1.0884872582013,
      -0.050373780972699,
      -0.504182824727872,
      -0.481027940510658,
      -0.94371806516368,
      -288.30676146961
    ],
    "input_weights": [
      {
        "isNeutral": 0.042079273597368,
        "planetVotes": 0.288732600599068,
        "growth": -0.384671888152791,
        "farthestEffDef": -14.9325926182378,
        "inMyUmbrella": -0.147683459855206
      },
      {
        "isNeutral": -5.3150853211541,
        "planetVotes": 1.85230247115858,
        "growth": -1.47604659231432,
        "farthestEffDef": 1.09661964630224,
        "inMyUmbrella": -0.26561837113537
      },
      {
        "isNeutral": -0.252990136259726,
        "planetVotes": 0.33135029561564,
        "growth": 17.9486618244651,
        "farthestEffDef": -0.17905895269261,
        "inMyUmbrella": 15.0731141574626
      },
      {
        "isNeutral": 0.175636375172634,
        "planetVotes": -0.0213828579107078,
        "growth": 0.010842382233102,
        "farthestEffDef": 0.885895275657632,
        "inMyUmbrella": -0.178081939820765
      },
      {
        "isNeutral": 12.7435472418328,
        "planetVotes": 2.01912348329524,
        "growth": -13.9353169025037,
        "farthestEffDef": -0.339241476027628,
        "inMyUmbrella": 1.33663832618175
      },
      {
        "isNeutral": 7.93197965642688,
        "planetVotes": 0.294419835557144,
        "growth": -10.4874000656518,
        "farthestEffDef": 0.337720028457596,
        "inMyUmbrella": -0.60816532989043
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      -0.025,
      -0.4,
      -0.9,
      -0.2
    ],
    "input_weights": [
      {
        "growth": -0.0,
        "distance": 0.3
      },
      {
        "growth": -0.175,
        "distance": 1.6
      },
      {
        "growth": 0.4,
        "distance": 1.6
      },
      {
        "growth": 0.275,
        "distance": 0.125
      }
    ]
  },
  "created_on": "Sat Nov 06 08:39:01 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      -0.246420350537302,
      0.154319519645861,
      0.097509682929965,
      0.928128711783175
    ],
    "input_weights": [
      {
        "effDef": 1.24804916495016,
        "growth": 0.2,
        "distance": -0.225671403539736
      },
      {
        "effDef": 0.591900966994474,
        "growth": 0.25,
        "distance": 0.22641207404371
      },
      {
        "effDef": -8.970562579408,
        "growth": -2.0,
        "distance": 0.113758512332271
      },
      {
        "effDef": -0.059047983358716,
        "growth": -0.075,
        "distance": 0.070776628707969
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.003125,
      -0.04375,
      0.1,
      -0.4
    ],
    "input_weights": [
      {
        "effDef": -0.2,
        "growth": 0.075,
        "distance": -0.00625
      },
      {
        "effDef": -0.1,
        "growth": -0.3,
        "distance": 0.0125
      },
      {
        "effDef": 0.05,
        "growth": 0.1,
        "distance": 0.0
      },
      {
        "effDef": 0.4,
        "growth": 0.1,
        "distance": 0.025
      }
    ]
  }
}