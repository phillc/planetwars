var sys = require('sys');
require('./underscore');

var PlanetWars = require('./PlanetWars');

var attackConsiderationSort = function(planet1, planet2) {
    return planet2.planet.attackConsiderationOrder(planet2.neededToMatch, planet2.distance, 0, 0) - planet1.planet.attackConsiderationOrder(planet1.neededToMatch, planet1.distance, 0, 0)
}

var decisionConsiderationSort = function(a, b){
    return b.decisionConsiderationOrder() - a.decisionConsiderationOrder();
}

var currentTime = function(){
    return new Date().valeueOf;
}

var TIME_ERROR = "Time!"

var checkTime = function(startTime){
    if(currentTime() - startTime > 900) {
        sys.debug("********* TIMED OUT ***********")
        throw TIME_ERROR;
    };
}

function DoTurn(pw) {
    try {
        var startTime = currentTime();
        var myPlanets = pw.myPlanets;
        var myPlanetsForDecision = myPlanets.slice(0); //copy array
        myPlanetsForDecision.sort(decisionConsiderationSort)
    
        for(var planetNum in myPlanetsForDecision) {
            checkTime();
            var myPlanet = myPlanetsForDecision[planetNum];
            var sendableShips = myPlanet.expendableShipsWithoutReinforce();
        
            if(sendableShips > 0) {
                var consideredPlanets = [];
                for(var consideredPlanetNum in pw.planets) {
                    checkTime();
                    var consideredPlanet = pw.planets[consideredPlanetNum];
                    if(consideredPlanet.id != myPlanet.id) {
                        var effDef = consideredPlanet.effectiveDefensiveValue(myPlanet.distanceFrom(consideredPlanet));
                        var neededToMatch = consideredPlanet.isFriendly() ? -effDef : effDef
                    
                        var nearbyMyPlanets = consideredPlanet.nearbyPlanets(pw.myPlanets.slice(0));
                        var distanceThreeMyPlanets = nearbyMyPlanets[0] + nearbyMyPlanets[1] + nearbyMyPlanets[2];
                        var nearbyEnemyPlanets = consideredPlanet.nearbyPlanets(pw.enemyPlanets.slice(0));
                        var distanceThreeEnemyPlanets = nearbyEnemyPlanets[0] + nearbyEnemyPlanets[1] + nearbyEnemyPlanets[2];
                    
                        var calcedPlanet = { neededToMatch                : neededToMatch,
                                             planet                       : consideredPlanet,
                                             distance                     : consideredPlanet.distanceFrom(myPlanet),
                                             distanceThreeFriendlyPlanets : distanceThreeMyPlanets,
                                             distanceThreeEnemyPlanets    : distanceThreeEnemyPlanets };
                                             // and number of ships those 3 have
                        consideredPlanets.push(calcedPlanet);
                    }
                }
            
                checkTime();
                consideredPlanets.sort(attackConsiderationSort);
            
                while(sendableShips > 0 && consideredPlanets.length > 0) {
                    checkTime();
                    var pHash = consideredPlanets.shift();
                    var neededToMatch = pHash.neededToMatch;
                    var targetPlanet = pHash.planet;
                    if(neededToMatch >= 0) {
                        var shipsToSend = Math.min(sendableShips, neededToMatch + 1);
                        // sys.debug([ "==================================================",
                        //             "sendableShips " + sendableShips,
                        //             "sending " + shipsToSend + " ships",
                        //             "****from:",
                        //             myPlanet,
                        //             "****to planet",
                        //             targetPlanet,
                        //             "needing " + neededToMatch + " to match",
                        //             "distance of " + myPlanet.distanceFrom(targetPlanet),
                        //             "neutral? " + targetPlanet.isNeutral() + " enemy? " + targetPlanet.isEnemy()].join("\n"));
                        myPlanet.sendShips(shipsToSend, targetPlanet);
                        sendableShips  = sendableShips - shipsToSend;
                    }
                }
            }
        }
    } catch(err) {
        if(err !== TIME_ERROR) {
            throw err;
        }
    }
}

PlanetWars.Play(DoTurn);
