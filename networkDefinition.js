var networks = {
    decisionConsideration : {
        inputs : [ "ships",
                   "growth"],
        hiddenLayer : 4
    },
    attackConsideration : {
        inputs : [ "isEnemy",
                   "isFriendly",
                   "isNeutral",
                   "canTakeRightNow",
                   "incomingEnemyFleets",
                   "incomingFriendlyFleets",
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
    }
}
exports.networks = networks;
exports.toJSON = networks;
