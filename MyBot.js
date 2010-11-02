require('./underscore');

var planetWars = require('./PlanetWars'),
    players = require('./Players'),
    sys = require('sys'),
    network = require('./network');


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
    
    var allPlanets = universe.allPlanets();
    var myPlanets = universe.planetsOwnedBy(players.me);
    var myPlanetsLength = myPlanets.length;
    
    var planetConsiderationsById = []
    
    myPlanets.forEach(function(myPlanet) {
        allPlanets.forEach(function(otherPlanet) {
            var otherPlanetId = otherPlanet.getId();
            planetConsiderationsById[otherPlanetId] = planetConsiderationsById[otherPlanetId] || 0;
            
            var distance = myPlanet.distanceFrom(otherPlanet);
            var effDef = otherPlanet.effectiveDefensiveValue(players.me, distance)
            var values = { distance : distance,
                           effDef   :  effDef + myPlanet.getShips() > 0 ? 1 : -1 };
                           // the voter's growth
                           // the voter's ship count
                           // canTakeRightNow
                           // will have more to send
                           // can cover that planet
            planetConsiderationsById[otherPlanetId] += network.activation(network.compute("planetVote", values));
        });
    });
    
    var planetsByScore = []
    
    allPlanets.forEach(function(aPlanet){
        var aPlanetId = aPlanet.getId();
        var rating = planetConsiderationsById[aPlanet];
        
        var values = { "isEffectivelyNotMine" : aPlanet.effectiveDefensiveValue(players.me, aPlanet.farthestForce()) < 0 ? -1 : 1,
                       "isEffectivelyEnemy"   : aPlanet.effectiveDefensiveValue(players.opponent, aPlanet.farthestForce()) >= 0 ? -1 : 1,
                       "isNeutral"            : aPlanet.isNeutral(),
                       "growth"               : aPlanet.getGrowth(),
                       "planetVotes"          : planetConsiderationsById[aPlanet.getId()] }
                       
        planetsByScore.push([network.compute("attackConsideration", values), aPlanet]);
    });
    
    planetsByScore.sort(tupleSortGreaterFirst);
    
    
    // Surplus by target? As in, if a surplus is kept because of one planet, the target planet actually has more surplus
    
    // var myPlanetsBySurplus = [];
    // myPlanets.forEach(function(myPlanet) {
    //     var surplus = 
    //     if (surplus > 0) {
    //         myPlanetsBySurplus.push([surplus, myPlanet]);
    //     }
    // });
    
    
    
    
    
}

// Play the game with my bot
planetWars.play(doTurn);
