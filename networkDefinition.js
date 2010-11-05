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
                   "effDef",
                   "growth" ],
        hiddenLayer : 4
    },
    opponentPlanetVote : {
        inputs : [ "distance",
                   "effDef",
                   "growth" ],
        hiddenLayer : 4
    },
    neutralPlanetVote : {
        inputs : [ "distance",
                   "growth" ],
        hiddenLayer : 4
    },
}
exports.networks = networks;
exports.toJSON = networks;
