require('./underscore');
var sys = require('sys'),
    timer = require('./timer'),
    checkTime = timer.checkTime,
    network = require('./network');
    

var Universe = function(planets, realUniverse) {
    this.realUniverse = realUniverse;
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
    this.fromPlanet = fromPlanet.getId();
    this.toPlanet = toPlanet.getId();
    this.shipNumber = shipNumber;
}

SendCommand.prototype.execute = function(universeContext) {
    universeContext.planets[this.fromPlanet].sendShips(this.shipNumber, universeContext.planets[this.toPlanet])
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
    sendAll : function(universe) {
        var commands = []
        if (universe.enemyPlanets.length > 0){
            universe.myPlanets.forEach(function(myPlanet){
                commands.push(new SendCommand(myPlanet, universe.enemyPlanets[0], myPlanet.getShips()))
            })
        }
        return commands;
    },
    sendGrowth : function(upTo) {
        var actions = []
        actions.push [from, to, this.growth]

        return actions;
    }

}

Universe.prototype.applyCommands = function(commands) {
    commands.forEach(function(command){
        command.execute(this);
    }, this);
}

Universe.prototype.runEvaluations = function(player, depth, alpha, beta) {
    var newAlpha = alpha;
    if(depth === 0) {
        return [this.evaluateBoard(player)];
    }

    var commandSet = this.commands();
    var commandSetLength = commandSet.length;
    if(commandSetLength === 0) {
        return [this.evaluateBoard(player)];
    }
    for (var commandNum = 0; commandNum < commandSetLength; commandNum++) {
        var commands = commandSet[commandNum];
        var clonedUniverse = this.clone();
        clonedUniverse.applyCommands(commands);
        if (player === "enemy") {
            clonedUniverse.tick();
        }
        
        var eval = clonedUniverse.runEvaluations(player === "me" ? "enemy" : "me", depth - 1, [-beta[0]], [-alpha[0]])
        if (eval[0] > alpha[0]) {
            newAlpha = [eval[0], commands];
        }
        if(beta <= newAlpha) {
            break;
        }
    }
    return [newAlpha[0], newAlpha[1] || []];
};

Universe.prototype.commands = function() {
    // var planetEvaluations = [];
    // for(var consideredPlanetNum in this.planets) {
    //     checkTime();
    //     var otherPlanet = this.planets[consideredPlanetNum];
    //     planetEvaluations.push(otherPlanet.consider(this.myPlanets, this.enemyPlanets));
    // }
    //         
    // planetEvaluations.sort(tupleSort);
    // 
    // var sortedPlanets = _.map(planetEvaluations, function(tuple) { return tuple[1]; })
    // 
    var commands = [
        strategies.sendAll(this)
    ]
    return commands;
}

Universe.prototype.evaluateBoard = function(player) {
    var values = {
        totalShips  : this.summatePlanets("getShips", player),
        totalGrowth : this.summatePlanets("getGrowth", player)
    }
    return network.compute("boardValue", values)
}

Universe.prototype.summatePlanets = function(fn, player) {
    var planets;
    if (player === "me") {
        planets = this.myPlanets;
    } else if (player === "enemy") {
        planets = this.enemyPlanets;
    }
    var sumCall = function(total, planet) {
        return total + planet[fn].call(planet);
    }
    return _.reduce(planets, sumCall, 0);
}

Universe.prototype.clone = function() {
    var clonedPlanets = []
    this.planets.forEach(function(planet){
        clonedPlanets.push(planet.clone());
    })
    return new Universe(clonedPlanets, false);
}

exports.Universe = Universe;
