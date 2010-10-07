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
                   "distanceThreeFriendlyPlanets",
                   "distanceThreeEnemyPlanets"],
        hiddenLayer : 12
    }
}
exports.networks = networks;
exports.toJSON = networks;
