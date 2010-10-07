exports.weights = {
  "attackConsideration": {
    "input_weights": [
      {
        "isFriendly": -1,
        "effDef": -1,
        "incomingFriendlyFleets": -1,
        "isNeutral": 3,
        "growth": 0,
        "incomingEnemyFleets": -1,
        "distance": -1,
        "canTakeRightNow": -3,
        "isEnemy": 2
      },
      {
        "isFriendly": 2,
        "effDef": -3,
        "incomingFriendlyFleets": -2,
        "isNeutral": 2,
        "growth": -3,
        "incomingEnemyFleets": 3,
        "distance": 2,
        "canTakeRightNow": 3,
        "isEnemy": 3
      },
      {
        "isFriendly": 2,
        "effDef": -2,
        "incomingFriendlyFleets": 2,
        "isNeutral": -2,
        "growth": -2,
        "incomingEnemyFleets": 0,
        "distance": 2,
        "canTakeRightNow": 3,
        "isEnemy": 0
      },
      {
        "isFriendly": 1,
        "effDef": 0,
        "incomingFriendlyFleets": -1,
        "isNeutral": 1,
        "growth": -1,
        "incomingEnemyFleets": -3,
        "distance": 3,
        "canTakeRightNow": 0,
        "isEnemy": -2
      },
      {
        "isFriendly": -1,
        "effDef": 1,
        "incomingFriendlyFleets": 0,
        "isNeutral": 1,
        "growth": -1,
        "incomingEnemyFleets": 3,
        "distance": -2,
        "canTakeRightNow": 0,
        "isEnemy": -2
      },
      {
        "isFriendly": 2,
        "effDef": 0,
        "incomingFriendlyFleets": 3,
        "isNeutral": 0,
        "growth": 0,
        "incomingEnemyFleets": 3,
        "distance": -2,
        "canTakeRightNow": -2,
        "isEnemy": 1
      },
      {
        "isFriendly": -3,
        "effDef": -1,
        "incomingFriendlyFleets": 1,
        "isNeutral": -1,
        "growth": 0,
        "incomingEnemyFleets": -1,
        "distance": 2,
        "canTakeRightNow": -1,
        "isEnemy": 2
      },
      {
        "isFriendly": -3,
        "effDef": 0,
        "incomingFriendlyFleets": 3,
        "isNeutral": 1,
        "growth": 3,
        "incomingEnemyFleets": 1,
        "distance": 1,
        "canTakeRightNow": 2,
        "isEnemy": 0
      },
      {
        "isFriendly": -3,
        "effDef": 3,
        "incomingFriendlyFleets": -3,
        "isNeutral": 3,
        "growth": -3,
        "incomingEnemyFleets": -2,
        "distance": 1,
        "canTakeRightNow": -3,
        "isEnemy": -3
      },
      {
        "isFriendly": -3,
        "effDef": 1,
        "incomingFriendlyFleets": 2,
        "isNeutral": -2,
        "growth": 2,
        "incomingEnemyFleets": 2,
        "distance": 3,
        "canTakeRightNow": 0,
        "isEnemy": -2
      },
      {
        "isFriendly": 3,
        "effDef": 0,
        "incomingFriendlyFleets": -3,
        "isNeutral": -2,
        "growth": -2,
        "incomingEnemyFleets": -3,
        "distance": 1,
        "canTakeRightNow": -2,
        "isEnemy": 0
      },
      {
        "isFriendly": 0,
        "effDef": 3,
        "incomingFriendlyFleets": 3,
        "isNeutral": 0,
        "growth": 2,
        "incomingEnemyFleets": 3,
        "distance": 3,
        "canTakeRightNow": -1,
        "isEnemy": -1
      }
    ],
    "hidden_weights": [
      -2,
      -1,
      1,
      3,
      3,
      -3,
      0,
      3,
      0,
      -2,
      0,
      -1
    ]
  },
  "decisionConsideration": {
    "input_weights": [
      {
        "ships": 1,
        "growth": 0
      },
      {
        "ships": -3,
        "growth": -1
      },
      {
        "ships": -2,
        "growth": -3
      },
      {
        "ships": 1,
        "growth": 1
      }
    ],
    "hidden_weights": [
      2,
      -1,
      2,
      -2
    ]
  },
  "created_on": "Wed Oct 06 22:46:40 -0400 2010"
}