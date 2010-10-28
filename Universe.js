 var sys = require('sys'),
    timer = require('./timer'),
    checkTime = timer.checkTime;

var Universe = function(planets, options) {
    this.real = options.real;
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

Universe.prototype.run = function() {
    var myPlanetsForDecision = this.myPlanets.slice(0); //copy array
    myPlanetsForDecision.sort(decisionConsiderationSort)
    
    myPlanetsForDecision.forEach(function(myPlanet) {
        checkTime();
        var sendableShips = myPlanet.expendableShipsWithoutReinforce();
        if (this.myPlanets.length === 1 && this.enemyPlanets.length === 1) {
            var myStartingPlanet = this.myPlanets[0];
            var enemyStartingPlanet = this.enemyPlanets[0];
            sendableShips = Math.min(sendableShips, myStartingPlanet.getShips() + (myStartingPlanet.getGrowth() * myStartingPlanet.distanceFrom(enemyStartingPlanet) - enemyStartingPlanet.getShips()));
        }
    
        if(sendableShips > 0) {
            var planetEvaluations = [];
            this.planets.forEach(function(otherPlanet) {
                checkTime();
                planetEvaluations.push(myPlanet.considerSendingTo(otherPlanet, this.myPlanets, this.enemyPlanets));
            }, this);

            planetEvaluations.sort(tupleSort);
        
            while(sendableShips > 0 && planetEvaluations.length > 0) {
                checkTime();
                var pTuple = planetEvaluations.shift();
                var targetPlanet = pTuple[1];
                var values = pTuple[2];
                var neededToMatch = -values.effDef;

                var shipsToSend = 0;
                if(values.isEffectivelyNotMine === 1) {
                    if (sendableShips > neededToMatch) {
                        shipsToSend = neededToMatch;
                        myPlanet.sendShips(shipsToSend , targetPlanet);
                        sendableShips -= shipsToSend;
                        // sys.debug([ "==================================================",
                        //             "sendableShips " + sendableShips,
                        //             "sending " + shipsToSend + " ships",
                        //             "needing " + neededToMatch + " to match",
                        //             ].join("\n"));
                    } else {
                        //send all to a closer friendly planet, if total trip wont be more than x%
                        var nearbyPlanets = targetPlanet.nearbyPlanetsOutOf(this.myPlanets);
                        nearbyPlanetsLength = nearbyPlanets.length;
                        for (var nearbyPlanetNum = 0; nearbyPlanetNum < nearbyPlanetsLength ; nearbyPlanetNum++) {
                            checkTime();
                            var nearbyPlanet = nearbyPlanets[nearbyPlanetNum];
                            if (nearbyPlanet.isSamePlanet(myPlanet)) {
                                break;
                            } else if ((myPlanet.distanceFrom(nearbyPlanet) + nearbyPlanet.distanceFrom(targetPlanet)) < myPlanet.distanceFrom(targetPlanet) * 1.33) {
                                shipsToSend = sendableShips;
                                myPlanet.sendShips(shipsToSend , nearbyPlanet);
                                break;
                            }
                        }
                        sendableShips = 0;
                    }
                } else {
                    // friendly, so send all
                    shipsToSend = sendableShips;
                    myPlanet.sendShips(shipsToSend , targetPlanet);
                    sendableShips = 0;
                }
            }
        }
    }, this);
}

exports.Universe = Universe;
