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

var coordinateAttacks = function(myClosestPlanets, nextClosestPlanets, simulatedTarget, realTarget) {
    // doesn't count for new ships =\
    // need to account for its own growth
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
                        // maybe this should be a sort of distance(p -> some planet) + distance(some planet -> target)
                        var planet_to_reinforce = _.detect(myClosestPlanets, function(reinforceablePlanet) {
                            var distanceToNearbyThenTarget = nextClosestPlanet.distanceFrom(reinforceablePlanet) + reinforceablePlanet.distanceFrom(realTarget)
                            return (distanceToNearbyThenTarget < turnsUntilFarthestArrival) && (distanceToNearbyThenTarget < nextClosestToTargetDistance * 1.3) ;
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

function doTurn(universe) {
    turnNumber += 1;
    
    var allPlanets = universe.allPlanets();
    var effectivelyNotMyPlanets = _.filter(allPlanets, function(planet) {
        return !planet.effectivelyOwnedBy(players.me);
    })
    var myPlanets = universe.planetsOwnedBy(players.me);
    var myPlanetsLength = myPlanets.length;
    
    var planetConsiderationsById = []
    
    myPlanets.forEach(function(myPlanet) {
        effectivelyNotMyPlanets.forEach(function(otherPlanet) {
            if (!myPlanet.isSamePlanet(otherPlanet)) {
                // if the growth gain wont pay off by maxTurnNumber, don't even consider
            
                var otherPlanetId = otherPlanet.getId();
                planetConsiderationsById[otherPlanetId] = planetConsiderationsById[otherPlanetId] || 0;
            
                var distance = myPlanet.distanceFrom(otherPlanet);
                var effDef = otherPlanet.effectiveDefensiveValue(players.me, distance)
            
                var values = { distance : distance,
                               effDef   :  effDef + myPlanet.shipBalance() };
                               // the voter's growth
                               // canTakeRightNow
                               // will have more to send
                               // can cover that planet
                               // something that would protray, could be sniped (actually, umbrella would do that)
                var voteValue = network.compute("planetVote", values);
                // sys.debug(sys.inspect(values));
                // sys.debug(sys.inspect(voteValue));
                planetConsiderationsById[otherPlanetId] += network.activation(voteValue);
            }
        });
    });
    
    var planetsByScore = []
    
    
    effectivelyNotMyPlanets.forEach(function(aPlanet){
        var aPlanetId = aPlanet.getId();
        var rating = planetConsiderationsById[aPlanet];
        
        var values = { farthestEffDef       : aPlanet.effectiveDefensiveValue(players.me, aPlanet.farthestForce()), // maybe not farthest force for this planet, but out of ALL planets
                       isNeutral            : aPlanet.isNeutral() ? 1 : -1,
                       growth               : aPlanet.getGrowth(),
                       planetVotes          : planetConsiderationsById[aPlanet.getId()] || 0 }
                       // needs ships (rescue?)
                       // under my umbrella (some count of my ship getting there faster than enemy ship)
        var scoreTuple = [network.compute("attackConsideration", values), aPlanet];
        // sys.debug(sys.inspect(values));
        // sys.debug(sys.inspect(scoreTuple[0]));
        planetsByScore.push(scoreTuple);
    });
    
    planetsByScore.sort(tupleSortGreaterFirst);
    
    
    // redistribute ships
    // ships that are not sendable, but perhaps can go to front line to free up more ships
    
    
    
    
    
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
    });
    
    // rebalace the umbrella trumps normal attack
    planetAttackOrder.forEach(function(targetPlanet) {
        var myClosestPlanets = _.filter(universe.closestPlanetsTo(targetPlanet), function(planet) {
            return planet.effectivelyOwnedBy(players.me); // || planet.ownedBy(me)
        });
        var simulatedTarget = targetPlanet.clone();
        coordinateAttacks(myClosestPlanets, myClosestPlanets.slice(0), simulatedTarget, targetPlanet);
    });
}

// Play the game with my bot
planetWars.play(doTurn);
