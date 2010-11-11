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
        planetSurplus : function(planet, player, turns) {
            var turns = turns || 0;
            var enemy = players.enemyOf(player);
            if (this.inUmbrella(planet, player) || this.planetsOwnedBy(enemy).length === 0 || this.planetsOwnedBy(player).length === 0) {
                return planet.shipBalance(turns, player);
            }
            
            var closestEnemyPlanets = this.closestPlanetsToOwnedBy(planet, enemy);
            var closestEnemyPlanetsLength = closestEnemyPlanets.length;
            var closestFriendlyPlanets = this.closestPlanetsToOwnedBy(planet, player);
            var closestFriendlyPlanetsLength = closestFriendlyPlanets.length;
            var fakePlanet = planet.clone();
            var closestEnemyPlanet = closestEnemyPlanets[0];
            var closestFriendlyPlanet = closestFriendlyPlanets[0];
            
            var enemyDistance = closestEnemyPlanet ? planet.distanceFrom(closestEnemyPlanet) : 0;
            var friendlyDistance = closestFriendlyPlanet ? planet.distanceFrom(closestFriendlyPlanet) : 0;
            var maxConsiderDistance = Math.max(enemyDistance, friendlyDistance) * 1.3;
            
            for(var eCount = 0 ; eCount < closestEnemyPlanetsLength ; eCount++) {
                var enemyPlanet = closestEnemyPlanets[eCount];
                var planetDistance = enemyPlanet.distanceFrom(planet);
                if (planetDistance <= maxConsiderDistance){
                    var enemyShipBalance = enemyPlanet.shipBalance(turns, enemy)
                    if (enemyShipBalance > 0) {
                        fakePlanet.addIncomingForce(enemy, enemyShipBalance, planetDistance);
                    }
                } else {
                    break;
                }
            }
            
            for(var fCount = 0 ; fCount < closestFriendlyPlanetsLength ; fCount++) {
                var friendlyPlanet = closestFriendlyPlanets[fCount];
                var planetDistance = friendlyPlanet.distanceFrom(planet);
                if (planetDistance <= maxConsiderDistance){
                    var friendlyShipBalance = friendlyPlanet.shipBalance(turns, player)
                    if (friendlyShipBalance > 0) {
                        fakePlanet.addIncomingForce(player, friendlyShipBalance, planetDistance);
                    }
                } else {
                    break;
                }
            }
            return Math.min(planet.shipBalance(turns, player), fakePlanet.shipBalance(turns, player));
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
            if ((closestEnemyPlanets.length > 0 && closestEnemyPlanets[0].isSamePlanet(targetPlanet)) || this.inUmbrella(planet, player)) {
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
                var enemy = players.enemyOf(player)
                var closestEnemyPlanets = this.closestPlanetsToOwnedBy(toPlanet, enemy)
                var closestEnemyPlanetsLength = closestEnemyPlanets.length;
                for (var count = 0 ; count < closestEnemyPlanetsLength ; count++) {
                    var nearbyEnemyPlanet = closestEnemyPlanets[count];
                    var nearbyEnemyDistance = toPlanet.distanceFrom(nearbyEnemyPlanet);
                    if (nearbyEnemyDistance < distanceToFriendly) {
                        clone.addIncomingForce(enemy, nearbyEnemyPlanet.shipBalance(distanceToFriendly - nearbyEnemyDistance, enemy), nearbyEnemyDistance);
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

