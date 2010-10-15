var sys = require('sys'),
    timer = require('./timer'),
    checkTime = timer.checkTime;

var Universe = function(planets, fleets) {
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
    
    var fleetsLength = fleets.length;
    for (var i = 0; i < fleetsLength; i++) {
        fleets[i].registerDestination(planets);
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

var sendNothing = function() {
    return []
}
var sendNeededToTake = function(upTo) {
    while(sendable > 0 && numCount < up To){
        numCount++
    }
}

var sendAll = function() {
    return from, to, this.ships
}

var sendGrowth  = function(upTo) {
    var actions = []
    actions.push [from, to, this.growth]
    
    return actions;
}



var evaluateBoard = function(planets) {
    
}

var runEvaluations = function(ply, universePlanets, fromPlanet, toPlanets) {
    // can skip if equal (like growth and sendAll)
    strategies.each {
        from, to, ships = strategy()
        
        runEvaluations(ply - 1);
    }
}


Universe.prototype.run = function() {
    var planets = this.planets;
    var myPlanets = this.myPlanets;
    var enemyPlanets = this.enemyPlanets;
    var myPlanetsForDecision = myPlanets.slice(0); //copy array
    myPlanetsForDecision.sort(decisionConsiderationSort)

    for(var planetNum in myPlanetsForDecision) {
        checkTime();
        var myPlanet = myPlanetsForDecision[planetNum];
        
        var planetEvaluations = [];
        for(var consideredPlanetNum in planets) {
            checkTime();
            var otherPlanet = planets[consideredPlanetNum];
            if(!myPlanet.isSamePlanet(otherPlanet)){
                planetEvaluations.push(myPlanet.considerSendingTo(otherPlanet, myPlanets, enemyPlanets));
            }
        }
                
        planetEvaluations.sort(tupleSort);


        
        runEvaluations(3, planetEvaluations[0, 3]).each {
            command.execute
        }
        
        
                
                check board score for each action in x turns, where x max(distance, 10)
    }
}

exports.Universe = Universe;