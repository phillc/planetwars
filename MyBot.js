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

var attackPlan = function(universe, myClosestPlanets, realTarget) {
    return {
        go : function() {
            return this.coordinateAttacks(myClosestPlanets.slice(0), realTarget.clone());
        },
        planetToReinforce : function(closestPlanet, turnsUntilFarthestArrival, closestToTargetDistance) {
            // maybe this should be a sort of distance(p -> some planet) + distance(some planet -> target)
            // make this so that it choses one that is DEFENITELY mine
            return _.detect(myClosestPlanets, function(reinforceablePlanet) {
                var distanceToNearbyThenTarget = closestPlanet.distanceFrom(reinforceablePlanet) + reinforceablePlanet.distanceFrom(realTarget);
                return (distanceToNearbyThenTarget < turnsUntilFarthestArrival) && (distanceToNearbyThenTarget < closestToTargetDistance * 1.3) ;
            });
        },
        coordinateAttacks : function(closestPlanets, simulatedTarget) {
            // prevent a scenario where I send ships and volunteer to get sniped
            if (closestPlanets.length > 0){
                var closestPlanet = closestPlanets.shift();
                var nextClosestPlanet = closestPlanets[0];
                var closestToTargetDistance = closestPlanet.distanceFrom(realTarget);
                var simulatedTargetEffDef = simulatedTarget.effectiveDefensiveValue(players.me, closestToTargetDistance);
                if (simulatedTargetEffDef < 0) {
                    var closestPlanetShipBalance = universe.planetCanSendTo(closestPlanet, realTarget, players.me);
                    if (closestPlanetShipBalance > 0) {
                        if (closestPlanetShipBalance > -simulatedTargetEffDef) {
                            closestPlanet.sendShipsTo(-simulatedTargetEffDef, realTarget);
                            return closestToTargetDistance;
                        } else if (nextClosestPlanet) {
                            var nextClosestToTargetDistance = nextClosestPlanet.distanceFrom(realTarget);
                            var extraDistance = nextClosestToTargetDistance - closestToTargetDistance;
                            if (closestPlanet.shipBalance(extraDistance) > -simulatedTargetEffDef) {
                                closestPlanet.reserveShips(closestPlanetShipBalance)
                                return closestToTargetDistance + extraDistance;
                            } else {
                                var simulatedFrom = closestPlanet.clone();
                                simulatedFrom.recordSendShipsTo(closestPlanetShipBalance, simulatedTarget);
                                var turnsUntilFarthestArrival = this.coordinateAttacks(closestPlanets, simulatedTarget);
                                if (closestToTargetDistance >= turnsUntilFarthestArrival) {
                                    closestPlanet.sendShipsTo(closestPlanetShipBalance, realTarget);
                                } else {
                                    var planetToReinforce = this.planetToReinforce(closestPlanet, turnsUntilFarthestArrival, closestToTargetDistance);
                                    if (planetToReinforce) {
                                        closestPlanet.sendShipsTo(closestPlanetShipBalance, planetToReinforce);
                                    } else {
                                        closestPlanet.reserveShips(closestPlanetShipBalance)
                                    }
                                }
                                return turnsUntilFarthestArrival;
                            }
                        }
                    } else {
                        return this.coordinateAttacks(closestPlanets, simulatedTarget);
                    }
                }
            }
            return Infinity;
        }
    }
}



function doTurn(universe) {
    turnNumber += 1;
    
    var allPlanets = universe.allPlanets();
    var effectivelyNotMyPlanets = _.filter(allPlanets, function(planet) {
        return !planet.effectivelyOwnedBy(players.me);
    })
    var myPlanets = universe.planetsOwnedBy(players.me);
    var myPlanetsLength = myPlanets.length;
    var opponentPlanets = universe.planetsOwnedBy(players.opponent);
    var opponentPlanetsLength = opponentPlanets.length;
    var neutralPlanets = universe.planetsOwnedBy(players.neutral);
    var neutralPlanetsLength = neutralPlanets.length;
    
    var myPlanetsVotesById = [];
    var neutralPlanetsVotesById = [];
    var opponentPlanetsVotesById = [];
    
    myPlanets.forEach(function(voter) {
        effectivelyNotMyPlanets.forEach(function(candidatePlanet) {
            if (!voter.isSamePlanet(candidatePlanet)) {
                // if the growth gain wont pay off by maxTurnNumber, don't even consider
            
            
                var distance = voter.distanceFrom(candidatePlanet);
                var effDef = candidatePlanet.effectiveDefensiveValue(players.me, distance);
            
                var values = { distance : distance,
                               effDef   : effDef + voter.shipBalance(),
                               growth   : voter.getGrowth(),
                               myTotalGrowth : universe.totalGrowthFor(players.me),
                               opponentTotalGrowth : universe.totalGrowthFor(players.opponent),
                               neutralTotalGrowth : universe.totalGrowthFor(players.neutral) };
                               // canTakeRightNow
                               // will have more to send
                               // can cover that planet
                               // something that would protray, could be sniped (actually, umbrella would do that)
                var voteValue = network.compute("planetVote", values);
                // sys.debug(sys.inspect(values));
                // sys.debug(sys.inspect(voteValue));
                var candidatePlanetId = candidatePlanet.getId();
                myPlanetsVotesById[candidatePlanetId] = myPlanetsVotesById[candidatePlanetId] || 0;
                myPlanetsVotesById[candidatePlanetId] += network.activation(voteValue);
            }
        });
    });
    
    opponentPlanets.forEach(function(voter) {
        effectivelyNotMyPlanets.forEach(function(candidatePlanet) {
            if (!voter.isSamePlanet(candidatePlanet)) {
                var distance = voter.distanceFrom(candidatePlanet);
                var effDef = candidatePlanet.effectiveDefensiveValue(players.opponent, distance);
            
                var values = { distance : distance,
                               effDef   : effDef + voter.shipBalance(),
                               growth   : voter.getGrowth(),
                               myTotalGrowth : universe.totalGrowthFor(players.me),
                               opponentTotalGrowth : universe.totalGrowthFor(players.opponent),
                               neutralTotalGrowth : universe.totalGrowthFor(players.neutral) };
                               
                var voteValue = network.compute("opponentPlanetVote", values);
                // sys.debug(sys.inspect(values));
                // sys.debug(sys.inspect(voteValue));
                var candidatePlanetId = candidatePlanet.getId();
                opponentPlanetsVotesById[candidatePlanetId] = opponentPlanetsVotesById[candidatePlanetId] || 0;
                opponentPlanetsVotesById[candidatePlanetId] += network.activation(voteValue);
            }
        });
    });
    
    neutralPlanets.forEach(function(voter) {
        effectivelyNotMyPlanets.forEach(function(candidatePlanet) {
            if (!voter.isSamePlanet(candidatePlanet)) {
                var distance = voter.distanceFrom(candidatePlanet);
                var effDef = candidatePlanet.effectiveDefensiveValue(players.neutral, distance);
            
                var values = { distance : distance,
                               growth   : voter.getGrowth(),
                               myTotalGrowth : universe.totalGrowthFor(players.me),
                               opponentTotalGrowth : universe.totalGrowthFor(players.opponent),
                               neutralTotalGrowth : universe.totalGrowthFor(players.neutral) };
                               
                var voteValue = network.compute("neutralPlanetVote", values);
                // sys.debug(sys.inspect(values));
                // sys.debug(sys.inspect(voteValue));
                var candidatePlanetId = candidatePlanet.getId();
                neutralPlanetsVotesById[candidatePlanetId] = neutralPlanetsVotesById[candidatePlanetId] || 0;
                neutralPlanetsVotesById[candidatePlanetId] += network.activation(voteValue);
            }
        });
    });
    
    var planetsByScore = []
    
    effectivelyNotMyPlanets.forEach(function(aPlanet){
        var aPlanetId = aPlanet.getId();
        var values = { farthestEffDef       : aPlanet.effectiveDefensiveValue(players.me, aPlanet.farthestForce()), // maybe not farthest force for this planet, but out of ALL planets
                       isNeutral            : aPlanet.isNeutral() ? 1 : -1,
                       isMine               : aPlanet.isOwnedBy(players.me) ? 1 : -1,
                       isOpponent           : aPlanet.isOwnedBy(players.opponent) ? 1 : -1,
                       growth               : aPlanet.getGrowth(),
                       planetVotes          : myPlanetsVotesById[aPlanet.getId()] || 0,
                       opponentPlanetVotes  : opponentPlanetsVotesById[aPlanet.getId()] || 0,
                       neutralPlanetVotes   : neutralPlanetsVotesById[aPlanet.getId()] || 0,
                       inMyUmbrella         : universe.inUmbrella(aPlanet, players.me) ? 1 : -1,
                       myUmbrellaDepth      : universe.umbrellaDepth(aPlanet, players.me),
                       inOpponentUmbrella   : universe.inUmbrella(aPlanet, players.opponent) ? 1 : -1,
                       opponentUmbrellaDepth : universe.umbrellaDepth(aPlanet, players.opponent),
                       myTotalGrowth : universe.totalGrowthFor(players.me),
                       opponentTotalGrowth : universe.totalGrowthFor(players.opponent),
                       neutralTotalGrowth : universe.totalGrowthFor(players.neutral) };
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
        var plan = attackPlan(universe, myClosestPlanets, targetPlanet);
        plan.go();
    });
}

// Play the game with my bot
planetWars.play(doTurn);
