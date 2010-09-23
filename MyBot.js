var sys = require('sys');

/*
// The DoTurn function is where your code goes. The PlanetWars object contains
// the state of the game, including information about all planets and fleets
// that currently exist. Inside this function, you issue orders using the
// pw.IssueOrder() function. For example, to send 10 ships from planet 3 to
// planet 8, you would say pw.IssueOrder(3, 8, 10).
//
// There is already a basic strategy in place here. You can use it as a
// starting point, or you can throw it out entirely and replace it with your
// own. Check out the tutorials and articles on the contest website at
// http://www.ai-contest.com/resources.
*/

var PlanetWars = require('./PlanetWars');

function attackConsiderationSort(planet1, planet2) {
     return planet2[1].attackConsiderationWeight(planet2[0]) - planet1[1].attackConsiderationWeight(planet1[0])
}

function DoTurn(pw) {
    var myPlanets = pw.myPlanets;
    var myPlanetsByScore = myPlanets.slice(0); //copy array
    myPlanetsByScore.sort(function(a, b){
        a.decisionConsiderationWeight() - a.decisionConsiderationWeight();
    })
    
    for(var planetNum in myPlanetsByScore) {
        var myPlanet = myPlanetsByScore[planetNum];
        var sendableShips = myPlanet.expendableShipsWithoutReinforce();
        
        if(sendableShips > 0) {
            var consideredPlanets = [];
            for(var consideredPlanetNum in pw.planets) {
                var consideredPlanet = pw.planets[consideredPlanetNum];
                if(consideredPlanet.id != myPlanet.id) {
                    var effDef = consideredPlanet.effectiveDefensiveValue(myPlanet.distanceFrom(consideredPlanet));
                    var tuple = [consideredPlanet.isFriendly() ? -effDef : effDef, consideredPlanet];
                    consideredPlanets.push(tuple);
                }
            }
            
            consideredPlanets.sort(attackConsiderationSort);
            
            while(sendableShips > 0 && consideredPlanets.length > 0) {
                var tuple = consideredPlanets.shift();
                var neededToMatch = tuple[0];
                var targetPlanet = tuple[1];
                if(neededToMatch >= 0) {
                    var shipsToSend = Math.min(sendableShips, neededToMatch + 1);
                    myPlanet.sendShips(shipsToSend, targetPlanet);
                    sendableShips  = sendableShips - shipsToSend;
                    sys.debug("sending " + shipsToSend + " from planet with " + myPlanet.getShips() + " @ (" + myPlanet.getCoordinates() + ") to planet @ (" + targetPlanet.getCoordinates() + ") with " + neededToMatch + " distance: " + myPlanet.distanceFrom(targetPlanet) + " neutral? " + targetPlanet.isNeutral() + " enemy? " + targetPlanet.isEnemy() + " incoming fleets count: " + targetPlanet.getEnemyIncomingFleets())
                }
            }
        } else {
            //flag for help by least in danger that is less distance than threat
        }
    }
}

// Play the game with my bot
PlanetWars.Play(DoTurn);
