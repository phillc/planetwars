var networks = {
    attackConsideration : {
        inputs : [ "farthestEffDef",
                   "shipsNeededAt",
                   "isNeutral",
                   "isMine",
                   "isOpponent",
                   "growth",
                   "planetVotes",
                   "opponentPlanetVotes",
                   "neutralPlanetVotes",
                   "inMyUmbrella",
                   "myUmbrellaDepth",
                   "inOpponentUmbrella",
                   "opponentUmbrellaDepth",
                   "myTotalGrowth",
                   "opponentTotalGrowth",
                   "neutralTotalGrowth" ],
        hiddenLayer : 8
    },
    planetVote : {
        inputs : [ "distance",
                   "effDef",
                   "growth",
                   "myTotalGrowth",
                   "opponentTotalGrowth",
                   "neutralTotalGrowth",
                   "shipsNeededAt" ],
        hiddenLayer : 5
    },
    opponentPlanetVote : {
        inputs : [ "distance",
                   "effDef",
                   "growth",
                   "myTotalGrowth",
                   "opponentTotalGrowth",
                   "neutralTotalGrowth",
                   "shipsNeededAt" ],
        hiddenLayer : 4
    },
    neutralPlanetVote : {
        inputs : [ "distance",
                   "growth",
                   "myTotalGrowth",
                   "opponentTotalGrowth",
                   "neutralTotalGrowth",
                   "shipsNeededAt" ],
        hiddenLayer : 4
    },
}
exports.networks = networks;
exports.toJSON = networks;
