var planetWars = require('./PlanetWars');

function doTurn(universe) {
    // look at future of my planets
    
    // see if any of them will be taken.
    
    // see how many I have available to send
    
    // determine if any of them can be saved.
    
    // save the savable ones using ships from closest planets
    
    // if planets are not savable, consider sending those ships elsewhere (make them available for next stage)
    
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
