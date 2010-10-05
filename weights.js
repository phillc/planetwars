exports.weights = {
  "attackConsideration": {
    "hidden_weights": [
      -1,
      2
    ],
    "input_weights": [
      {
        "isFriendly": -2,
        "effDef": 1,
        "incomingFriendlyFleets": 1,
        "isNeutral": -1,
        "growth": 2,
        "incomingEnemyFleets": -2,
        "distance": 2,
        "canTakeRightNow": 1,
        "isEnemy": -1
      },
      {
        "isFriendly": 2,
        "effDef": 2,
        "incomingFriendlyFleets": 0,
        "isNeutral": 2,
        "growth": 0,
        "incomingEnemyFleets": 2,
        "distance": -2,
        "canTakeRightNow": 1,
        "isEnemy": 2
      }
    ]
  },
  "decisionConsideration": {
    "hidden_weights": [
      -3
    ],
    "input_weights": [
      {
        "ships": -1,
        "growth": -2
      }
    ]
  }
}