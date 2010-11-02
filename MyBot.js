require('./underscore');

var planetWars = require('./PlanetWars'),
    players = require('./Players'),
    sys = require('sys');


var sendShipsFromTo = function(ships, from, to) {
    sys.debug("send " + ships + " from " + from.getId() + " to " + to.getId());
    process.stdout.write('' + Math.floor(from.getId()) + ' ' +
            Math.floor(to.getId()) + ' ' + Math.floor(ships) + '\n');
}

var tupleSortGreaterFirst = function(tuple1, tuple2) {
    return tuple2[0] - tuple1[0];
}

var tupleSortSmallerFirst = function(tuple1, tuple2) {
    return tuple1[0] - tuple2[0];
}

var turnNumber = 0;
var maxTurnNumber = 200;

function doTurn(universe) {
    turnNumber += 1;
    
    var myPlanets = universe.planetsOwnedBy(players.me);
    var myPlanetsLength = myPlanets.length;
        
    var allPlanets = universe.allPlanets();
    
    allPlanets.forEach(function(planet) {
        costPerGrowth = planet.effectiveDefensiveValue(planet.distanceFrom())
        []
    });
    
    
    var planetsThatCanSend = [];
    
    var closestEnemiesTuple = [];
    myPlanets.forEach(function(planet) {
        var closePlanets = universe.closestPlanetsTo(planet);
        var closestEnemy = _.filter(closePlanets, function(closePlanet) {
            return closePlanet.isOwnedBy(players.opponent);
        });
        
        
        if (closestEnemy[0]) {
            var distance = planet.distanceFrom(closestEnemy[0])
            if(closestEnemy[1]) {
                distance += planet.distanceFrom(closestEnemy[1])
            }
            closestEnemiesTuple.push([distance, planet]);
        }
    });
    
    closestEnemiesTuple.sort(tupleSortSmallerFirst)
    var focalPoint = closestEnemiesTuple.shift();
    
    closestEnemiesTuple.forEach(function(aPlanet) {
        if (aPlanet[1].shipBalance() > 0) {
            sendShipsFromTo(aPlanet[1].shipBalance(), aPlanet[1], focalPoint[1]);
        }
    })
    
    if (focalPoint[1].shipBalance() > 0) {
        sendShipsFromTo(focalPoint[1].shipBalance(), focalPoint[1], sendToPlanets[0]);
    }
    
    
    
    
    // can i send to it a defendable amount
    
    // does it need to go right now?
    
    // 
    
    
    
    
    
    
    // prevent from consideration neutral planets that I would not regain cost sunk by 200 turns
}

// Play the game with my bot
planetWars.play(doTurn);
