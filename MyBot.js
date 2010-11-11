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
        coordinateAttacks : function(closestPlanets, simulatedTarget) {
            // prevent a scenario where I send ships and volunteer to get sniped
            if (closestPlanets.length > 0){
                var sendingPlanet = closestPlanets.shift();
                var nextClosestPlanet = closestPlanets[0];
                var sendingToTargetDistance = sendingPlanet.distanceFrom(realTarget);
                // var shipsNeededAtTarget = -simulatedTarget.effectiveDefensiveValue(players.me, sendingToTargetDistance);
                var shipsNeededAtTarget = universe.shipsNeededAtFor(simulatedTarget, sendingToTargetDistance, players.me)
                if (shipsNeededAtTarget > 0) {
                    var sendingPlanetShipBalance = universe.planetCanSendTo(sendingPlanet, realTarget, players.me);
                    if (sendingPlanetShipBalance > 0) {
                        if (sendingPlanetShipBalance > shipsNeededAtTarget) {
                            sendingPlanet.sendShipsTo(shipsNeededAtTarget, realTarget);
                            return sendingToTargetDistance;
                        } else if (nextClosestPlanet) {
                            var nextClosestToTargetDistance = nextClosestPlanet.distanceFrom(realTarget);
                            var extraDistance = nextClosestToTargetDistance - sendingToTargetDistance;
                            if (universe.planetSurplus(sendingPlanet, players.me, extraDistance) > shipsNeededAtTarget) {
                                sendingPlanet.reserveShips(sendingPlanetShipBalance)
                                return sendingToTargetDistance + extraDistance;
                            } else {
                                var simulatedFrom = sendingPlanet.clone();
                                simulatedFrom.recordSendShipsTo(sendingPlanetShipBalance, simulatedTarget);
                                var turnsUntilFarthestArrival = this.coordinateAttacks(closestPlanets, simulatedTarget);
                                if (sendingToTargetDistance >= turnsUntilFarthestArrival) {
                                    sendingPlanet.sendShipsTo(sendingPlanetShipBalance, realTarget);
                                } else {
                                    this.reinforceACloserPlanetIfPossible(sendingPlanet, sendingPlanetShipBalance, turnsUntilFarthestArrival, sendingToTargetDistance);
                                }
                                return turnsUntilFarthestArrival;
                            }
                        } else {
                            this.reinforceACloserPlanetIfPossible(sendingPlanet, sendingPlanetShipBalance, turnsUntilFarthestArrival, sendingToTargetDistance);
                            return Infinity;
                        }
                    } else {
                        return this.coordinateAttacks(closestPlanets, simulatedTarget);
                    }
                }
            }
            return Infinity;
        },
        reinforceACloserPlanetIfPossible : function(sendingPlanet, ships, turnsUntilFarthestArrival, sendingToTargetDistance) {
            var planetToReinforce = this.planetToReinforce(sendingPlanet, turnsUntilFarthestArrival, sendingToTargetDistance);
            if (planetToReinforce) {
                sendingPlanet.sendShipsTo(ships, planetToReinforce);
            } else {
                sendingPlanet.reserveShips(ships)
            }
        },
        planetToReinforce : function(sendingPlanet, turnsUntilFarthestArrival, closestToTargetDistance) {
            return _.detect(myClosestPlanets, function(reinforceablePlanet) {
                var distanceToNearbyThenTarget = sendingPlanet.distanceFrom(reinforceablePlanet) + reinforceablePlanet.distanceFrom(realTarget);
                return (distanceToNearbyThenTarget < turnsUntilFarthestArrival) && (distanceToNearbyThenTarget < closestToTargetDistance * 1.3) ;
            });
        }
    }
}



function doTurn(universe) {
    turnNumber += 1;
    
    var allPlanets = universe.allPlanets();
    var planetsThatNeedShips = _.filter(allPlanets, function(planet) {
        return !planet.effectivelyOwnedBy(players.me) || !universe.inUmbrella(planet, players.me);
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
        planetsThatNeedShips.forEach(function(candidatePlanet) {
            if (!voter.isSamePlanet(candidatePlanet)) {
                // if the growth gain wont pay off by maxTurnNumber, don't even consider
            
            
                var distance = voter.distanceFrom(candidatePlanet);
                var effDef = candidatePlanet.effectiveDefensiveValue(players.me, distance);
            
                var values = { distance            : distance,
                               effDef              : effDef + voter.shipBalance(0, players.me),
                               shipsNeededAt       : universe.shipsNeededAtFor(candidatePlanet, distance, players.me),
                               growth              : voter.getGrowth(),
                               myTotalGrowth       : universe.totalGrowthFor(players.me),
                               opponentTotalGrowth : universe.totalGrowthFor(players.opponent),
                               neutralTotalGrowth  : universe.totalGrowthFor(players.neutral),
                               planetCanSendTo     : universe.planetCanSendTo(voter, candidatePlanet, players.me) };
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
        planetsThatNeedShips.forEach(function(candidatePlanet) {
            if (!voter.isSamePlanet(candidatePlanet)) {
                var distance = voter.distanceFrom(candidatePlanet);
                var effDef = candidatePlanet.effectiveDefensiveValue(players.opponent, distance);
            
                var values = { distance : distance,
                               effDef              : effDef + voter.shipBalance(0, players.opponent),
                               shipsNeededAt       : universe.shipsNeededAtFor(candidatePlanet, distance, players.opponent),
                               growth              : voter.getGrowth(),
                               myTotalGrowth       : universe.totalGrowthFor(players.me),
                               opponentTotalGrowth : universe.totalGrowthFor(players.opponent),
                               neutralTotalGrowth  : universe.totalGrowthFor(players.neutral),
                               planetCanSendTo     : universe.planetCanSendTo(voter, candidatePlanet, players.opponent) };
                               
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
        planetsThatNeedShips.forEach(function(candidatePlanet) {
            if (!voter.isSamePlanet(candidatePlanet)) {
                var distance = voter.distanceFrom(candidatePlanet);
                var effDef = candidatePlanet.effectiveDefensiveValue(players.neutral, distance);
            
                var values = { distance            : distance,
                               growth              : voter.getGrowth(),
                               shipsNeededAt       : universe.shipsNeededAtFor(candidatePlanet, distance, players.me),
                               myTotalGrowth       : universe.totalGrowthFor(players.me),
                               opponentTotalGrowth : universe.totalGrowthFor(players.opponent),
                               neutralTotalGrowth  : universe.totalGrowthFor(players.neutral) };
                               
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
    
    planetsThatNeedShips.forEach(function(aPlanet){
        var aPlanetId = aPlanet.getId();
        var values = { farthestEffDef        : aPlanet.effectiveDefensiveValue(players.me, aPlanet.farthestForce()), // maybe not farthest force for this planet, but out of ALL planets
                       shipsNeededAt         : universe.shipsNeededAtFor(aPlanet, aPlanet.farthestForce(), players.me),
                       isNeutral             : aPlanet.isNeutral() ? 1 : -1,
                       isMine                : aPlanet.isOwnedBy(players.me) ? 1 : -1,
                       isOpponent            : aPlanet.isOwnedBy(players.opponent) ? 1 : -1,
                       growth                : aPlanet.getGrowth(),
                       planetVotes           : myPlanetsVotesById[aPlanet.getId()] || 0,
                       opponentPlanetVotes   : opponentPlanetsVotesById[aPlanet.getId()] || 0,
                       neutralPlanetVotes    : neutralPlanetsVotesById[aPlanet.getId()] || 0,
                       inMyUmbrella          : universe.inUmbrella(aPlanet, players.me) ? 1 : -1,
                       myUmbrellaDepth       : universe.umbrellaDepth(aPlanet, players.me),
                       inOpponentUmbrella    : universe.inUmbrella(aPlanet, players.opponent) ? 1 : -1,
                       opponentUmbrellaDepth : universe.umbrellaDepth(aPlanet, players.opponent),
                       myTotalGrowth         : universe.totalGrowthFor(players.me),
                       opponentTotalGrowth   : universe.totalGrowthFor(players.opponent),
                       neutralTotalGrowth    : universe.totalGrowthFor(players.neutral),
                       myTotalSurplus        : universe.totalSurplusFor(players.me),
                       opponentTotalSurplus  : universe.totalSurplusFor(players.opponent)};
                       // needs ships (rescue?)
                       // under my umbrella (some count of my ship getting there faster than enemy ship)
        var scoreTuple = [network.compute("attackConsideration", values), aPlanet];
        // sys.debug(sys.inspect(values));
        // sys.debug(sys.inspect(scoreTuple[0]));
        planetsByScore.push(scoreTuple);
    });
    
    planetsByScore.sort(tupleSortGreaterFirst);
    
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
