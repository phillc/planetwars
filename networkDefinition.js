var networks = {
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
                   "distanceOneMyPlanets",
                   "distanceOneEnemyPlanets",
                   "shipsOneMyPlanets",
                   "shipsOneEnemyPlanets",
                   "growthOneMyPlanets",
                   "growthOneEnemyPlanets",
                   "distanceThreeMyPlanets",
                   "distanceThreeEnemyPlanets",
                   "shipsThreeMyPlanets",
                   "shipsThreeEnemyPlanets",
                   "growthThreeMyPlanets",
                   "growthThreeEnemyPlanets",
                   "isSelf",
                   "shipsDocked"],
        hiddenLayer : 12
    },
    boardValue : {
        inputs : [ "totalShips",
                   "totalGrowth",
                   // "totalShipsDocked",
                   // "totalShipsMoving"
                  ],
        hiddenLayer : 5
    }
}
exports.networks = networks;
exports.toJSON = networks;
