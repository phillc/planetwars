require('./underscore');
var sys = require('sys'),
    timer = require('./timer'),
    checkTime = timer.checkTime,
    network = require('./network');
    
var ME = "me",
    ENEMY = "enemy"
    

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
    sendNothing : function(universe) {
        return [];
    },
    sendNeededToTake : function(fromPlanet, toPlanet) {
        var moves = []
        while(sendable > 0 && numCount < upTo){
            numCount++
        }
    },
    sendAll : function(universe, player) {
        var commands = []
        if (player === ME) {
            if (universe.enemyPlanets.length > 0){
                universe.myPlanets.forEach(function(myPlanet){
                    commands.push(new SendCommand(myPlanet, universe.enemyPlanets[0], myPlanet.getShips()))
                })
            }
        } else if (player === ENEMY) {
            if (universe.myPlanets.length > 0){
                universe.enemyPlanets.forEach(function(enemyPlanet){
                    commands.push(new SendCommand(enemyPlanet, universe.myPlanets[0], enemyPlanet.getShips()))
                })
            }
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

Universe.prototype.runEvaluations = function() {
    return this.runMyEvaluation(1, [-Infinity], [Infinity]);
}

Universe.prototype.runMyEvaluation = function(depth, alpha, beta) {
    if(depth === 0) {
        this.tick();
        return [this.evaluateBoard()];
    }

    var bestAlpha = alpha;
    var commandSet = this.commands(ME);
    var commandSetLength = commandSet.length;
    
    for (var commandNum = 0; commandNum < commandSetLength; commandNum++) {
        var commands = commandSet[commandNum];
        var clonedUniverse = this.clone();
        clonedUniverse.applyCommands(commands);
        
        var eval = clonedUniverse.runEnemyEvaluation(depth, bestAlpha, beta)
        
        if (eval[0] > bestAlpha[0]) {
            bestAlpha = [eval[0], commands];
        }
        if(beta[0] < bestAlpha[0]) {
            break;
        }
    }
    return bestAlpha;
};

Universe.prototype.runEnemyEvaluation = function(depth, alpha, beta) {

    var bestBeta = beta;
    var commandSet = this.commands(ENEMY);
    var commandSetLength = commandSet.length;
    for (var commandNum = 0; commandNum < commandSetLength; commandNum++) {
        var commands = commandSet[commandNum];
        var clonedUniverse = this.clone();
        clonedUniverse.applyCommands(commands);
        
        var eval = clonedUniverse.runMyEvaluation(depth - 1, alpha, bestBeta)
        
        if (eval[0] < bestBeta[0]) {
            bestBeta = [eval[0], commands];
        }
        if(bestBeta[0] < alpha[0]) {
            break;
        }
    }
    return bestBeta;
};

Universe.prototype.commands = function(player) {
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
        strategies.sendAll(this, player),
        strategies.sendNothing(this, player),
    ]
    return commands;
}

Universe.prototype.evaluateBoard = function() {
    var myValues = {
        totalShips  : this.summatePlanets("getShips", ME),
        totalGrowth : this.summatePlanets("getGrowth", ME),
    }
    var enemyValues = {
        totalShips  : this.summatePlanets("getShips", ENEMY),
        totalGrowth : this.summatePlanets("getGrowth", ENEMY),
    }
    return network.compute("boardValue", myValues) - network.compute("boardValue", enemyValues);
}

Universe.prototype.summatePlanets = function(fn, player) {
    var planets;
    if (player === ME) {
        planets = this.myPlanets;
    } else if (player === ENEMY) {
        planets = this.enemyPlanets;
    }
    var sumCall = function(total, planet) {
        return total + planet[fn].call(planet);
    }
    return _.reduce(planets, sumCall, 0);
}

Universe.prototype.countPlanets = function(fn, player) {
    var planets;
    if (player === ME) {
        planets = this.myPlanets;
    } else if (player === ENEMY) {
        planets = this.enemyPlanets;
    }
    var countCall = function(total, planet) {
        return total + (planet[fn].call(planet) ? 1 : 0);
    }
    return _.reduce(planets, countCall, 0);
}

Universe.prototype.clone = function() {
    var clonedPlanets = []
    this.planets.forEach(function(planet){
        clonedPlanets.push(planet.clone());
    })
    return new Universe(clonedPlanets, false);
}

Universe.prototype.tick = function() {
    this.planets.forEach(function(planet){
        planet.tick();
    })
}

exports.Universe = Universe;
