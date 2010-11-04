var networks = {
    attackConsideration : {
        inputs : [ "farthestEffDef",
                   "isNeutral",
                   "growth",
                   "planetVotes"
                   ],
        hiddenLayer : 4
    },
    planetVote : {
        inputs : [ "distance",
                   "effDef" ],
        hiddenLayer : 3
    }
}
exports.networks = networks;
exports.toJSON = networks;
