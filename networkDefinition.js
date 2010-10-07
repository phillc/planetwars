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
                   "distanceThreeEnemyPlanets"],
        hiddenLayer : 12
    }
}
exports.networks = networks;
exports.toJSON = networks;
