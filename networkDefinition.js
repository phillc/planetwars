var networks = {
    decisionConsideration : {
        inputs : [ "ships",
                   "growth"],
        hiddenLayer : 1
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
                   "distance"],
        hiddenLayer : 2
    }
}
exports.networks = networks;
exports.toJSON = networks;
