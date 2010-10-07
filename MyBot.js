var sys = require('sys');
require('./underscore');

var PlanetWars = require('./PlanetWars');

var attackConsiderationSort = function(planet1, planet2) {
    return planet2.planet.attackConsiderationOrder(planet2.neededToMatch, planet2.distance, 0, 0) - planet1.planet.attackConsiderationOrder(planet1.neededToMatch, planet1.distance, 0, 0)
}

var decisionConsiderationSort = function(a, b){
    return b.decisionConsiderationOrder() - a.decisionConsiderationOrder();
}

function DoTurn(pw) {
    var myPlanets = pw.myPlanets;
    var myPlanetsForDecision = myPlanets.slice(0); //copy array
    myPlanetsForDecision.sort(decisionConsiderationSort)
    
    for(var planetNum in myPlanetsForDecision) {
        var myPlanet = myPlanetsForDecision[planetNum];
        var sendableShips = myPlanet.expendableShipsWithoutReinforce();
        
        if(sendableShips > 0) {
            var consideredPlanets = [];
            for(var consideredPlanetNum in pw.planets) {
                var consideredPlanet = pw.planets[consideredPlanetNum];
                if(consideredPlanet.id != myPlanet.id) {
                    var effDef = consideredPlanet.effectiveDefensiveValue(myPlanet.distanceFrom(consideredPlanet));
                    var neededToMatch = consideredPlanet.isFriendly() ? -effDef : effDef
                    var calcedPlanet = { neededToMatch: neededToMatch,
                                         planet: consideredPlanet,
                                         distance: consideredPlanet.distanceFrom(myPlanet) };
                    consideredPlanets.push(calcedPlanet);
                }
            }
            
            consideredPlanets.sort(attackConsiderationSort);
            
            while(sendableShips > 0 && consideredPlanets.length > 0) {
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
}

PlanetWars.Play(DoTurn);
