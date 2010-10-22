 var sys = require('sys'),
    timer = require('./timer'),
    checkTime = timer.checkTime;

var Universe = function(planets) {
    var myPlanets = [];
    var enemyPlanets = [];
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        if(planet.isMine()) {
            myPlanets.push(planet);
        }
        if(planet.isEnemy()) {
            enemyPlanets.push(planet);
        }
    }
    
    this.planets           = planets,
    this.myPlanets         = myPlanets,
    this.enemyPlanets      = enemyPlanets,

    this.issueOrder = function(source, dest, ships) {
        process.stdout.write('' + Math.floor(source) + ' ' +
                Math.floor(dest) + ' ' + Math.floor(ships) + '\n');
    }
}

var tupleSort = function(tuple1, tuple2) {
    return tuple2[0] - tuple1[0];
}

var decisionConsiderationSort = function(a, b){
    return b.decisionConsiderationOrder() - a.decisionConsiderationOrder();
}

var SendCommand = function(fromPlanet, toPlanet, shipNumber) {
    this.fromPlanet = fromPlanet;
    this.toPlanet = toPlanet;
    this.shipNumber = shipNumber;
}

SendCommand.prototype.execute = function() {
    this.fromPlanet.sendShips(this.shipNumber, this.toPlanet);
}

SendCommand.prototype.pretend = function() {
    
}

var strategies = {
    sendNothing : function(fromPlanet, toPlanet) {
        return [];
    },
    sendNeededToTake : function(fromPlanet, toPlanet) {
        var moves = []
        while(sendable > 0 && numCount < upTo){
            numCount++
        }
    },
    sendAll : function(fromPlanets, toPlanets) {
        var commands = []
        for(var planetNum in fromPlanets) {
            var fromPlanet = fromPlanets[planetNum];
            commands.push(new SendCommand(fromPlanet, toPlanets[0], fromPlanet.getShips()))
        }
        return commands;
    },
    sendGrowth : function(upTo) {
        var actions = []
        actions.push [from, to, this.growth]

        return actions;
    }

}

var orderedStrategies = [
    // strategies.sendNothing,
    // strategies.sendNeededToTake,
    strategies.sendAll(fromPlanets, toPlanets)
]
var orderedStrategiesLength = orderedStrategies.length;

Universe.prototype.evaluateNextCommand = function(node, depth, alpha, beta) {
    var newAlpha;
    if(depth === 0) {
        return evaluateBoard();
    }
    for(var strategyNum = 0 ; strategyNum < orderedStrategiesLength ; strategyNum++) {
        newAlpha = Max(alpha, -evaluateNextCommand(orderedStrategies[strategyNum], depth - 1, -beta, -alpha))
        if(beta <= newAlpha) {
            break;
        }
    }
    return newAlpha;
};


Universe.prototype.run = function() {
    var planetEvaluations = [];
    for(var consideredPlanetNum in this.planets) {
        checkTime();
        var otherPlanet = this.planets[consideredPlanetNum];
        planetEvaluations.push(otherPlanet.consider(this.myPlanets, this.enemyPlanets));
    }
            
    planetEvaluations.sort(tupleSort);
    
    var sortedPlanets = _.map(planetEvaluations, function(tuple) { return tuple[1]; })
    
    var i = 0; //replace with do while time < time threshold
    var bestScore;
    var bestCommands;

    var currentStateOfBoard = [network.compute("boardValue", values), []]
    var maxDepth = 4;
    var bestState = evaluateCommands(currentStateOfBoard, maxDepth, -Infinity, Infinity)
    bestCommands = bestSate[1];
    
    for(var commandNum in bestCommands){
        bestCommands[commandNum].execute();
    }
}

exports.Universe = Universe;
