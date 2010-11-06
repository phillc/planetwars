exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      0.372121814550325,
      0.0124065547568253,
      -0.0273764283181865,
      0.000148219214760485,
      0.27342951629092,
      -144.153380734805,
      0.2
    ],
    "input_weights": [
      {
        "myTotalGrowth": 0.2,
        "opponentPlanetVotes": -0.1,
        "opponentTotalGrowth": 0.0,
        "opponentUmbrellaDepth": 0.2,
        "isNeutral": 0.263365811221056,
        "inOpponentUmbrella": -0.2,
        "planetVotes": -0.102816849850233,
        "growth": 0.434671888152791,
        "farthestEffDef": -2.01657407727972,
        "myUmbrellaDepth": -0.2,
        "inMyUmbrella": -0.281467678841644,
        "neutralPlanetVotes": -0.4
      },
      {
        "myTotalGrowth": -0.1,
        "opponentPlanetVotes": -0.05,
        "opponentTotalGrowth": 0.1,
        "opponentUmbrellaDepth": 0.1,
        "isNeutral": -333.765460553862,
        "inOpponentUmbrella": 0.0,
        "planetVotes": 3.70460494231716,
        "growth": -0.0146016535006138,
        "farthestEffDef": -2.24323929260448,
        "myUmbrellaDepth": 0.0,
        "inMyUmbrella": 0.108595407216158,
        "neutralPlanetVotes": -0.05
      },
      {
        "myTotalGrowth": 3.2,
        "opponentPlanetVotes": 0.0,
        "opponentTotalGrowth": 0.3,
        "opponentUmbrellaDepth": -0.2,
        "isNeutral": -32.0827374412452,
        "inOpponentUmbrella": 0.0,
        "planetVotes": -0.103918786951955,
        "growth": -18.0986618244651,
        "farthestEffDef": 2.23247162154088,
        "myUmbrellaDepth": 0.0,
        "inMyUmbrella": -3.86827853936566,
        "neutralPlanetVotes": -0.2
      },
      {
        "myTotalGrowth": -0.8,
        "opponentPlanetVotes": 0.2,
        "opponentTotalGrowth": -0.2,
        "opponentUmbrellaDepth": 0.1,
        "isNeutral": -0.125318187586317,
        "inOpponentUmbrella": 0.05,
        "planetVotes": 0.392125726571325,
        "growth": -1.68673905786482,
        "farthestEffDef": -0.142947637828816,
        "myUmbrellaDepth": -0.2,
        "inMyUmbrella": -0.0304795150448085,
        "neutralPlanetVotes": -0.1
      },
      {
        "myTotalGrowth": -0.05,
        "opponentPlanetVotes": -0.1,
        "opponentTotalGrowth": 0.0,
        "opponentUmbrellaDepth": -0.2,
        "isNeutral": -408.643511738648,
        "inOpponentUmbrella": -0.0,
        "planetVotes": -0.036902391147024,
        "growth": -6.41765845125184,
        "farthestEffDef": 0.660758523972372,
        "myUmbrellaDepth": -0.1,
        "inMyUmbrella": 10.693106609454,
        "neutralPlanetVotes": -0.6
      },
      {
        "myTotalGrowth": -1.2,
        "opponentPlanetVotes": 1.0,
        "opponentTotalGrowth": -0.2,
        "opponentUmbrellaDepth": 0.2,
        "isNeutral": 32.1279186257075,
        "inOpponentUmbrella": -0.2,
        "planetVotes": -0.052790082221428,
        "growth": -169.198401050429,
        "farthestEffDef": -0.5836075017786,
        "myUmbrellaDepth": -0.1,
        "inMyUmbrella": -7.73064527824688,
        "neutralPlanetVotes": -0.05
      },
      {
        "myTotalGrowth": 0.1,
        "opponentPlanetVotes": 0.0,
        "opponentTotalGrowth": 0.1,
        "opponentUmbrellaDepth": 0.05,
        "isNeutral": 1.6,
        "inOpponentUmbrella": -0.1,
        "planetVotes": -0.2,
        "growth": 0.0,
        "farthestEffDef": 0.025,
        "myUmbrellaDepth": 0.0,
        "inMyUmbrella": 0.0,
        "neutralPlanetVotes": 0.1
      }
    ]
  },
  "neutralPlanetVote": {
    "hidden_weights": [
      0.65625,
      -6.0,
      0.03125,
      0.0
    ],
    "input_weights": [
      {
        "myTotalGrowth": -0.1,
        "opponentTotalGrowth": -0.0,
        "growth": -0.6,
        "distance": 0.25
      },
      {
        "myTotalGrowth": -0.05,
        "opponentTotalGrowth": 0.0,
        "growth": 0.325,
        "distance": -92.8
      },
      {
        "myTotalGrowth": 0.35,
        "opponentTotalGrowth": 0.2,
        "growth": -10.9,
        "distance": 1.6
      },
      {
        "myTotalGrowth": -0.1,
        "opponentTotalGrowth": 0.1,
        "growth": 0.25,
        "distance": -0.8
      }
    ]
  },
  "created_on": "Sat Nov 06 16:54:02 -0400 2010",
  "planetVote": {
    "hidden_weights": [
      -0.573210175268652,
      2.76911231433378,
      1.07030985375888,
      24.4251187770616,
      0.025
    ],
    "input_weights": [
      {
        "myTotalGrowth": 0.25,
        "effDef": 0.69804916495016,
        "opponentTotalGrowth": -0.3,
        "growth": 0.125,
        "distance": -0.065708925442467
      },
      {
        "myTotalGrowth": 0.05,
        "effDef": 0.045950483497238,
        "opponentTotalGrowth": 0.0,
        "growth": -0.95,
        "distance": -9.54518636939872
      },
      {
        "myTotalGrowth": -0.2,
        "effDef": -0.457535161213,
        "opponentTotalGrowth": -0.6,
        "growth": 0.0,
        "distance": -0.113758512332272
      },
      {
        "myTotalGrowth": 0.0,
        "effDef": -0.130595966717434,
        "opponentTotalGrowth": 0.3,
        "growth": 1.9,
        "distance": 0.441553257415938
      },
      {
        "myTotalGrowth": -0.0125,
        "effDef": -0.0,
        "opponentTotalGrowth": 0.25,
        "growth": 0.0,
        "distance": 0.05
      }
    ]
  },
  "opponentPlanetVote": {
    "hidden_weights": [
      -0.06484375,
      0.2125,
      -0.3,
      -0.075
    ],
    "input_weights": [
      {
        "myTotalGrowth": 0.025,
        "effDef": -0.2,
        "opponentTotalGrowth": 0.05,
        "growth": 0.059375,
        "distance": 0.5
      },
      {
        "myTotalGrowth": 0.2,
        "effDef": -0.15,
        "opponentTotalGrowth": -1.9,
        "growth": -1.3,
        "distance": 0.20625
      },
      {
        "myTotalGrowth": 0.1,
        "effDef": 0.153125,
        "opponentTotalGrowth": -0.1,
        "growth": -1.2,
        "distance": 0.125
      },
      {
        "myTotalGrowth": -0.1,
        "effDef": 0.1,
        "opponentTotalGrowth": -0.3,
        "growth": -0.325,
        "distance": -11.2
      }
    ]
  }
}