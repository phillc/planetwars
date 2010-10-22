var networks = {
    decisionConsideration : {
        inputs : [ "ships",
                   "growth"],
        hiddenLayer : 4
    },
    attackConsideration : {
        inputs : [ "isEnemy",
                   "isEffectivelyEnemy",
                   "isEffectivelyNotMine",
                   "isFriendly",
                   "isNeutral",
                   "canTakeRightNow",
                   "growth",
                   "effDef",
                   "distance",
                   "distanceThreeMyPlanets",
                   "shipsThreeMyPlanets",
                   "distanceThreeEnemyPlanets",
                   "shipsThreeEnemyPlanets",
                   "isSelf",
                   "shipsDocked"],
        hiddenLayer : 12
    },
    boardValue : {
        inputs : [ "totalShips",
                   "totalGrowth",
                   "totalShipsDocked",
                   "totalShipsMoving",
                   "closestPlanetWouldTake"
                  ],
        hiddenLayer : 12
    }
}
exports.networks = networks;
exports.toJSON = networks;
