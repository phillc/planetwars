var sys = require('sys'),
    timer = require('./timer'),
    checkTime = timer.checkTime;

var Universe = function(planets) {
    var myPlanets = [];
    var enemyPlanets = [];
    planets.forEach(function(planet) {
        if(planet.isMine()) {
            myPlanets.push(planet);
        }
        if(planet.isEnemy()) {
            enemyPlanets.push(planet);
        }
    })
    
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

Universe.prototype.runEvaluations = function(tickAfter, depth, alpha, beta) {
    var newAlpha;
    if(depth === 0) {
        return { score: this.evaluateBoard() };
    }

    var strats = this.strategies();
    if(strats.length === 0) {
        return { score: this.evaluateBoard() };
    }
    strats.forEach(function(strategy){
        var eval = runEvaluations(!tickAfter, tickAfter ? depth - 1 : depth, -beta, -alpha)
        if (eval.score > alpha) {
            newAlpha = eval;
        }
        if(beta <= newAlpha) {
            break;
        }
    }, this);
    return { score: newAlpha, commands: newCommands };
};

Universe.prototype.strategies = function() {
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

    var maxDepth = 4;
    return var bestState = evaluateCommands()
    
    var orderedStrategies = [
        // strategies.sendNothing,
        // strategies.sendNeededToTake,
        strategies.sendAll(fromPlanets, toPlanets)
    ]
    return orderedStrategies;
}

Universe.prototype.evaluateBoard = function(player) {
    var values = {
        totalShips  : this.summatePlanets("getShips", player),
        totalGrowth : this.summatePlanets("getGrowth", player)
    }
    network.compute("boardValue", values)
}



Universe.prototype.summatePlanets = function(fn, player) {
    var planets;
    if (player === "me") {
        planets = this.myPlanets;
    } else if (player === "enemy") {
        planets = this.enemyPlanets;
    }
    
    var sumCall = function(total, planet) {
        return total + planet[fn].call();
    }
    return _.reduce(planets, sumCall, 0);
}

exports.Universe = Universe;
