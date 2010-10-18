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

var strategies = {
    sendNothing : function() {
        return [];
    },
    sendNeededToTake : function(fromPlanet, toPlanets) {
        var moves = []
        while(sendable > 0 && numCount < up To){
            numCount++
        }
    },
    sendAll : function() {
        return from, to, this.ships
    },
    sendGrowth : function(upTo) {
        var actions = []
        actions.push [from, to, this.growth]

        return actions;
    }
    
}





var evaluateBoard = function(planets) {
    
}

var evaluateCommands = function(ply, universePlanets, fromPlanet, toPlanets) {
    var commandScores = [];
    // can skip if equal (like growth and sendAll)
    for(var stratName in strategies) {
        var strategy = strategies[stratName];
        var command = strategy(fromPlanet, toPlanets);
        var score = evaluateCommands(ply - 1, universePlanets, afterFromPlanet, afterToPlanets);
        allCommands.push([score, command]);
    }
}


Universe.prototype.run = function() {
    var myPlanetsForDecision = this.myPlanets.slice(0); //copy array
    myPlanetsForDecision.sort(decisionConsiderationSort)

    for(var planetNum in myPlanetsForDecision) {
        checkTime();
        var myPlanet = myPlanetsForDecision[planetNum];
        
        var planetEvaluations = [];
        for(var consideredPlanetNum in this.planets) {
            checkTime();
            var otherPlanet = this.planets[consideredPlanetNum];
            planetEvaluations.push(myPlanet.considerSendingTo(otherPlanet, this.myPlanets, this.enemyPlanets));
        }
                
        planetEvaluations.sort(tupleSort);
        
        return evaluateCommands(3, planetEvaluations[0, 3])
    }
}

exports.Universe = Universe;