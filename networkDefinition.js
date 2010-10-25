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
    }
}
exports.networks = networks;
exports.toJSON = networks;
