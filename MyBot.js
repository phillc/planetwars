var planetWars = require('./PlanetWars'),
    players = require('./Players');


function doTurn(universe) {
    var myPlanets = universe.getPlanetsByOwner(players.me);
    var myPlanetsLength = myPlanets.length;
    var myEndangeredPlanets = [];
    
    for (var myPlanetNum = 0 ; myPlanetNum < myPlanetsLength ; myPlanetNum++) {
        var myPlanet = myPlanets[myPlanetNum];
        if (myPlanet.shipBalance() < 0) {
            myEndangeredPlanets.push(myPlanet);
        }
    }
    
    
    // see how many I have available to send
    
    // determine if any of them can be saved.
    
    // save the savable ones using ships from closest planets
    
    // if planets are not savable, consider sending those ships elsewhere (make them available for next stage), or consider that planet as an attackable planet
    
    // do something with the available ships
    
    
    
    
    
    
    
    
    var targetPlanet = universe.weakestNotMinePlanet();

    // (4) Send half the ships from my strongest planet to the weakest
    // planet that I do not own.
    if ( source >= 0 && dest >= 0 ) {
        numShips = Math.floor(sourceShips / 2);
        pw.issueOrder(source, dest, numShips);
    }
}

// Play the game with my bot
planetWars.play(doTurn);
