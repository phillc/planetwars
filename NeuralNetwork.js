var sys = require("sys");
require("./underscore");

exports.sigmoid = function(t) {
    return 1/(1+Math.exp(-t));
}

function Neuron() {
    
}
exports.Neuron = Neuron;

exports.networks = {
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
                   "distance"],
        hiddenLayer : 12
    }
}
exports.toJSON = exports.networks;