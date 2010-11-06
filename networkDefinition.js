var networks = {
    attackConsideration : {
        inputs : [ "farthestEffDef",
                   "isNeutral",
                   "growth",
                   "planetVotes",
                   "opponentPlanetVotes",
                   "neutralPlanetVotes",
                   "inMyUmbrella",
                   "inOpponentUmbrella",
                   "myTotalGrowth",
                   "opponentTotalGrowth" ],
        hiddenLayer : 7
    },
    planetVote : {
        inputs : [ "distance",
                   "effDef",
                   "growth",
                   "myTotalGrowth",
                   "opponentTotalGrowth" ],
        hiddenLayer : 5
    },
    opponentPlanetVote : {
        inputs : [ "distance",
                   "effDef",
                   "growth",
                   "myTotalGrowth",
                   "opponentTotalGrowth" ],
        hiddenLayer : 4
    },
    neutralPlanetVote : {
        inputs : [ "distance",
                   "growth",
                   "myTotalGrowth",
                   "opponentTotalGrowth" ],
        hiddenLayer : 4
    },
}
exports.networks = networks;
exports.toJSON = networks;
