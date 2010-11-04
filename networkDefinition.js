var networks = {
    attackConsideration : {
        inputs : [ "farthestEffDef",
                   "isNeutral",
                   "growth",
                   "planetVotes",
                   "inMyUmbrella"
                   ],
        hiddenLayer : 6
    },
    planetVote : {
        inputs : [ "distance",
                   "effDef" ],
        hiddenLayer : 4
    }
}
exports.networks = networks;
exports.toJSON = networks;
