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
    var myPlanetsByScore = myPlanets.slice(0) //copy array
    myPlanetsByScore.sort(function(a, b){
        a.considerationWeight() - b.considerationWeight()
    })
    
    for(var planetNum in myPlanetsByScore) {
        var myPlanet = myPlanetsByScore[planetNum];
        var origSendableShips = myPlanet.expendableShipsWithoutReinforce();
        var sendableShips = origSendableShips
        
        if(sendableShips > 0) {
            var takeablePlanets = [];
            var untakeableEnemyPlanets = []
            for(var consideredPlanetNum in pw.notMyPlanets) {
                var consideredPlanet = pw.notMyPlanets[consideredPlanetNum];
                
                var effDef = consideredPlanet.effectiveDefensiveValue(myPlanet.distanceFrom(consideredPlanet));
                var tuple = [effDef, consideredPlanet];
                if(effDef > 0){
                    if(effDef < sendableShips){
                        takeablePlanets.push(tuple);
                    } else if(consideredPlanet.isEnemy()){
                        untakeableEnemyPlanets.push(tuple);
                    }
                }
            }
            
            takeablePlanets.sort(attackConsiderationSort);
            untakeableEnemyPlanets.sort(attackConsiderationSort);
            
            while(sendableShips > 0 && takeablePlanets.length > 0) {
                var tuple = takeablePlanets.shift();
                var targetPlanetEffDef = tuple[0];
                var targetPlanet = tuple[1];
                var shipsToSend = Math.min(sendableShips, targetPlanetEffDef + 1);
                if(shipsToSend > targetPlanetEffDef){
                    myPlanet.sendShips(shipsToSend, targetPlanet);
                    sendableShips  = sendableShips - shipsToSend;
                }
                sys.debug("sending " + shipsToSend + " from planet with " + myPlanet.getShips() + " to takeable planet with " + targetPlanetEffDef + " neutral? " + targetPlanet.isNeutral() + " enemy? " + targetPlanet.isEnemy())
            }
            
            while(sendableShips > 0 && untakeableEnemyPlanets.length > 0) {
                var tuple = untakeableEnemyPlanets.shift();
                var targetPlanetEffDef = tuple[0];
                var targetPlanet = tuple[1];
                var shipsToSend = Math.min(sendableShips, targetPlanetEffDef + 1);
                sys.debug("sending " + shipsToSend + " from planet with " + myPlanet.getShips() + " to untakeable enemy planet with " + targetPlanetEffDef + " neutral? " + targetPlanet.isNeutral() + " enemy? " + targetPlanet.isEnemy())
                myPlanet.sendShips(shipsToSend, targetPlanet);
                sendableShips  = sendableShips - shipsToSend;
            }
        } else {
            //flag for help by least in danger that is less distance than threat
        }
    }
}

// Play the game with my bot
PlanetWars.Play(DoTurn);
