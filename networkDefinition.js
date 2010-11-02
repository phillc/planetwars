var networks = {
    attackConsideration : {
        inputs : [
                   "isEffectivelyEnemy",
                   "isEffectivelyNotMine",
                   "isNeutral",
                   "growth",
                   ],
        hiddenLayer : 7
    },
    planetVote : {
        inputs : [ "distance",
                   "effDef" ],
        hiddenLayer : 3
    }
}
exports.networks = networks;
exports.toJSON = networks;
