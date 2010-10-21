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

Universe.prototype.run = function() {
    var myPlanetsForDecision = this.myPlanets.slice(0); //copy array
    myPlanetsForDecision.sort(decisionConsiderationSort)

    for(var planetNum in myPlanetsForDecision) {
        checkTime();
        var myPlanet = myPlanetsForDecision[planetNum];
        var sendableShips = myPlanet.expendableShipsWithoutReinforce();
    
        if(sendableShips > 0) {
            var planetEvaluations = [];
            for(var consideredPlanetNum in this.planets) {
                checkTime();
                var otherPlanet = this.planets[consideredPlanetNum];
                planetEvaluations.push(myPlanet.considerSendingTo(otherPlanet, this.myPlanets, this.enemyPlanets));
            }

            planetEvaluations.sort(tupleSort);
        
            while(sendableShips > 0 && planetEvaluations.length > 0) {
                checkTime();
                var pTuple = planetEvaluations.shift();
                var targetPlanet = pTuple[1];
                var values = pTuple[2];
                var neededToMatch = -values.effDef;

                var shipsToSend = 0;
                if(values.isEffectivelyNotMine === 1 && sendableShips > neededToMatch) {
                    shipsToSend = neededToMatch;
                    myPlanet.sendShips(shipsToSend , targetPlanet);
                    sendableShips -= shipsToSend;
                    // sys.debug([ "==================================================",
                    //             "sendableShips " + sendableShips,
                    //             "sending " + shipsToSend + " ships",
                    //             "needing " + neededToMatch + " to match",
                    //             ].join("\n"));
                } else if(values.isEffectivelyNotMine === 1){
                    sendableShips = 0;
                } else {
                    shipsToSend = sendableShips;
                    myPlanet.sendShips(shipsToSend , targetPlanet);
                    sendableShips = 0;
                }
            }
        }
    }
}

exports.Universe = Universe;
