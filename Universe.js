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


Universe.prototype.evaluateNextCommand = function() {
    var evaluateBoard = function(planets) {
    
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
    
    var keys = _.keys(strategies);
    
    var iterator = 0;
    var nextStrategy() {
        var strategy = strategies[keys[iterator % keys.length]]
        iterator++;
        return strategy;
    }
    
    var commandScores = [];
    
    return function(maxPly, universePlanets, fromPlanet, toPlanets) {
        // can skip if equal (like growth and sendAll)
        var strategy = nextStrategy();
        var myCommand = strategy(fromPlanet, toPlanets);
        var enemyCommand = 
        var score = evaluateCommands(maxPly - 1, universePlanets, afterFromPlanet, afterToPlanets);
        allCommands.push([score, command]);
    }
}();


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
        
        var i = 0; //replace with do while time < time threshold
        var best = [];
        while (i < 10) {
            i++;
            
            best = evaluateNextCommand(3, planetEvaluations[0, 3]);
        }
        
        best.each.execute;
    }
}

exports.Universe = Universe;
