var sys = require('sys'),
    players = require('./players');

var closestPlanetsToCache = [];
    
function Universe(planets) {
    var planets;
    
    var planetsOwnedByCache,
        planetsNotOwnedByCache = [],
        closestPlanetsToOwnedByCache = [];
        
    return {
        allPlanets : function() {
            return planets;
        },
        planetsOwnedBy : function(owner) {
            if (planetsOwnedByCache) {
                return planetsOwnedByCache[owner] || [];
            }

            var planetsByOwner = {};
            planets.forEach(function(planet) {
                var owner = planet.getOwner();
                planetsByOwner[owner] = planetsByOwner[owner] || [];
                planetsByOwner[owner].push(planet);
            });
            planetsOwnedByCache = planetsByOwner;
            return this.planetsOwnedBy(owner);
        },
        planetsNotOwnedBy : function(owner) {
            if (planetsNotOwnedByCache[owner]) {
                return planetsNotOwnedByCache[owner];
            }
            
            planetsNotOwnedByCache[owner] = this.planetsOwnedBy(players.neutral).concat(this.planetsOwnedBy(players.enemyOf(owner)));
            return this.planetsNotOwnedBy(owner);
        },
        closestPlanetsTo : function(planet) {
            var planetId = planet.getId();
            if (closestPlanetsToCache[planetId]) {
                var closestPlanets = [];
                closestPlanetsToCache[planetId].forEach(function(id){
                    closestPlanets.push(planets[id]);
                })
                return closestPlanets;
            }
            var ids = []
            planets.slice(0).sort(function(planet1, planet2) {
                return planet1.distanceFrom(planet) - planet2.distanceFrom(planet);
            }).forEach(function(sortedPlanet){
                if (!planet.isSamePlanet(sortedPlanet)){
                    ids.push(sortedPlanet.getId());
                }
            })
            
            closestPlanetsToCache[planetId] = ids;
            return this.closestPlanetsTo(planet);
        },
        closestPlanetsToOwnedBy : function(planet, player) {
            var planetId = planet.getId();
            if(closestPlanetsToOwnedByCache[planetId] && closestPlanetsToOwnedByCache[planetId][player]) {
                return closestPlanetsToOwnedByCache[planetId][player];
            }
            
            closestPlanetsToOwnedByCache[planetId] = closestPlanetsToOwnedByCache[planetId] || []
            closestPlanetsToOwnedByCache[planetId][player] = _.filter(this.closestPlanetsTo(planet), function(closePlanet) {
                return closePlanet.getOwner().samePlayerAs(player);
            });
            return this.closestPlanetsToOwnedBy(planet, player);
        },
        planetSurplus : function(planet, player) {
            var enemy = players.enemyOf(player);
            var closestEnemyPlanets = this.closestPlanetsToOwnedBy(planet, enemy);
            var closestFriendlyPlanets = this.closestPlanetsToOwnedBy(planet, player);
            if (this.inUmbrella(planet, player) || closestEnemyPlanets.length === 0 || closestFriendlyPlanets.length === 0) {
                return planet.shipBalance(0, player);
            }
            var fakePlanet = planet.clone();
            var closestEnemyPlanet = closestEnemyPlanets[0];
            var closestFriendlyPlanet = closestFriendlyPlanets[0];
            
            var enemyDistance = planet.distanceFrom(closestEnemyPlanet);
            var friendlyDistance = planet.distanceFrom(closestFriendlyPlanet);
            var maxConsiderDistance = Math.max(enemyDistance, friendlyDistance) * 1.3;
            
            _.filter(closestEnemyPlanets, function(enemyPlanet) {
                return planet.distanceFrom(enemyPlanet) <= maxConsiderDistance;
            }).forEach(function(enemyPlanet) {
                var enemyShipBalance = enemyPlanet.shipBalance(0, enemy)
                var planetDistance = enemyPlanet.distanceFrom(planet);
                if (enemyShipBalance > 0) {
                    fakePlanet.addIncomingForce(enemy, enemyShipBalance, planetDistance);
                }
            });
            
            _.filter(closestFriendlyPlanets, function(friendlyPlanet) {
                return planet.distanceFrom(friendlyPlanet) <= maxConsiderDistance;
            }).forEach(function(friendlyPlanet) {
                var friendlyShipBalance = friendlyPlanet.shipBalance(0, player)
                var planetDistance = friendlyPlanet.distanceFrom(planet);
                if (friendlyShipBalance > 0) {
                    fakePlanet.addIncomingForce(player, friendlyShipBalance, planetDistance);
                }
            });
            return Math.min(planet.shipBalance(0, player), fakePlanet.shipBalance(0, player));
        },
        inUmbrella : function(planet, player) {
            return this.umbrellaDepth(planet, player) > 0;
        },
        umbrellaDepth : function(planet, player) {
            var enemy = players.enemyOf(player);
            var depth = 0;
            
            var closestFriendlyPlanets = this.closestPlanetsToOwnedBy(planet, player);
            var closestFriendlyPlanetsLength = closestFriendlyPlanets.length;
            var closestEnemyPlanets = this.closestPlanetsToOwnedBy(planet, enemy);
            var closestEnemyPlanetsLength = closestEnemyPlanets.length;
            
            if (closestFriendlyPlanetsLength > 0 && closestEnemyPlanetsLength > 0) {
                var closestEnemyPlanet = closestEnemyPlanets[0];
                var enemyDistance = planet.distanceFrom(closestEnemyPlanet);
                
                for (var count = 0 ; count < closestFriendlyPlanetsLength ; count++) {
                    var friendlyDistance = planet.distanceFrom(closestFriendlyPlanets[count]);
                    if (friendlyDistance < enemyDistance ) {
                        depth++
                    } else {
                        break;
                    }
                }
            }
            return depth;
        },
        totalGrowthFor : function(player) {
            return _.reduce(this.planetsOwnedBy(player), function(memo, planet) {
                return memo + planet.getGrowth();
            }, 0)
        },
        planetCanSendTo : function(planet, targetPlanet, player) {
            var enemy = players.enemyOf(player);
            var closestEnemyPlanets = this.closestPlanetsToOwnedBy(planet, enemy);
            if ((closestEnemyPlanets.length > 0 && closestEnemyPlanets[0].isSamePlanet(targetPlanet)) || this.inUmbrella(targetPlanet, player)) {
                return planet.shipBalance(0, player);
            } else {
                return this.planetSurplus(planet, player);
            }
        },
        shipsNeededAtFor : function(toPlanet, turns, player) {
            if (this.inUmbrella(toPlanet, player)) {
                return -toPlanet.effectiveDefensiveValue(player, turns);
            }
            var clone = toPlanet.clone();
            var closestFriendlyPlanet = this.closestPlanetsToOwnedBy(toPlanet, player)[0];
            if(closestFriendlyPlanet) {
                var distanceToFriendly = closestFriendlyPlanet.distanceFrom(toPlanet);
                clone.addIncomingForce(player, closestFriendlyPlanet.shipBalance(0, player), distanceToFriendly);
                var enemy = players.enemyOf(player)
                var closestEnemyPlanets = this.closestPlanetsToOwnedBy(toPlanet, enemy)
                var closestEnemyPlanetsLength = closestEnemyPlanets.length;
                for (var count = 0 ; count < closestEnemyPlanetsLength ; count++) {
                    var nearbyPlanet = closestEnemyPlanets[count];
                    var nearbyDistance = toPlanet.distanceFrom(nearbyPlanet);
                    if (nearbyDistance < distanceToFriendly) {
                        clone.addIncomingForce(enemy, nearbyPlanet.shipBalance(distanceToFriendly - nearbyDistance, enemy), nearbyDistance);
                    } else {
                        break;
                    }
                }
            }
            return -clone.effectiveDefensiveValue(player, turns);
        }
    };
}

exports.Universe = Universe;

