var planetWars = require('./PlanetWars'),
    players = require('./Players'),
    sys = require('sys');


var sendShipsFromTo = function(ships, from, to) {
    sys.debug("send " + ships + " from " + from.getId() + " to " + to.getId());
    process.stdout.write('' + Math.floor(from.getId()) + ' ' +
            Math.floor(to.getId()) + ' ' + Math.floor(ships) + '\n');
}

function doTurn(universe) {
    var myPlanets = universe.planetsOwnedBy(players.me);
    var myPlanetsLength = myPlanets.length;
        
    var sendToPlanets = universe.planetsOwnedByWithNegativeShipBalance(players.me).concat(universe.planetsNotOwnedBy(players.me))
    
    sendShipsFromTo(myPlanets[0].shipBalance(), myPlanets[0], sendToPlanets[0]);
    
    
    
    
    
    
    // can i send to it a defendable amount
    
    // does it need to go right now?
    
    // 
    
    
    
    
    
    
    // prevent from consideration neutral planets that I would not regain cost sunk by 200 turns
}

// Play the game with my bot
planetWars.play(doTurn);
