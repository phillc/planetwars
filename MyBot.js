require('./underscore');

var planetWars = require('./PlanetWars'),
    players = require('./players'),
    sys = require('sys'),
    network = require('./network');


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
            
            // if the growth gain wont pay off by maxTurnNumber, don't even consider
            
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
            var voteValue = network.activation(network.compute("planetVote", values));
            planetConsiderationsById[otherPlanetId] += voteValue;
        });
    });
    
    var planetsByScore = []
    
    allPlanets.forEach(function(aPlanet){
        var aPlanetId = aPlanet.getId();
        var rating = planetConsiderationsById[aPlanet];
        
        var values = { "isEffectivelyNotMine" : aPlanet.effectiveDefensiveValue(players.me, aPlanet.farthestForce()) < 0 ? -1 : 1,
                       "isEffectivelyEnemy"   : aPlanet.effectiveDefensiveValue(players.opponent, aPlanet.farthestForce()) >= 0 ? -1 : 1,
                       "isNeutral"            : aPlanet.isNeutral() ? 1 : -1,
                       "growth"               : aPlanet.getGrowth(),
                       "planetVotes"          : planetConsiderationsById[aPlanet.getId()] || 0 }
                       
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
    
    
    var planetAttackOrder = _.map(planetsByScore, function(pTuple) {
        return pTuple[1];
    })
    
    var coordinateAttacks = function(myClosestPlanets, nextClosestPlanets, simulatedTarget, realTarget) {
        // doesn't count for new ships =\
        if (nextClosestPlanets.length > 0){
            var nextClosestPlanet = nextClosestPlanets.shift();
            var nextClosestToTargetDistance = nextClosestPlanet.distanceFrom(realTarget);
            var simulatedTargetEffDef = simulatedTarget.effectiveDefensiveValue(players.me, nextClosestToTargetDistance);
            if (simulatedTargetEffDef < 0) {
                var nextClosestPlanetShipBalance = nextClosestPlanet.shipBalance();
                if (nextClosestPlanetShipBalance > 0) {
                    if (nextClosestPlanetShipBalance > -simulatedTargetEffDef) {
                        nextClosestPlanet.sendShipsTo(-simulatedTargetEffDef, realTarget);
                        return nextClosestToTargetDistance;
                    } else if (nextClosestPlanets.length !== 0) {
                        var simulatedFrom = nextClosestPlanet.clone();
                        simulatedFrom.recordSendShipsTo(nextClosestPlanetShipBalance, simulatedTarget);
                        var turnsUntilFarthestArrival = coordinateAttacks(myClosestPlanets, nextClosestPlanets, simulatedTarget, realTarget);
                        if (nextClosestToTargetDistance >= turnsUntilFarthestArrival) {
                            nextClosestPlanet.sendShipsTo(nextClosestPlanetShipBalance, realTarget);
                        } else {
                            var planet_to_reinforce = _.detect(myClosestPlanets, function(reinforceablePlanet) {
                                return (nextClosestPlanet.distanceFrom(reinforceablePlanet) + reinforceablePlanet.distanceFrom(realTarget)) < turnsUntilFarthestArrival;
                            });
                            nextClosestPlanet.sendShipsTo(nextClosestPlanetShipBalance, planet_to_reinforce);
                        }
                        return turnsUntilFarthestArrival;
                    }
                } else {
                    return coordinateAttacks(myClosestPlanets, nextClosestPlanets, simulatedTarget, realTarget);
                }
            }
        }
        return Infinity;
    }

    planetAttackOrder.forEach(function(targetPlanet) {
        var myClosestPlanets = universe.closestPlanetsToOwnedBy(targetPlanet, players.me);
        var simulatedTarget = targetPlanet.clone();
        coordinateAttacks(myClosestPlanets, myClosestPlanets.slice(0), simulatedTarget, targetPlanet);
    });
}

// Play the game with my bot
planetWars.play(doTurn);
