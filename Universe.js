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
            if (this.inUmbrella(planet, player) || closestEnemyPlanets.length === 0) {
                return planet.shipBalance();
            }
            var closestEnemyPlanet = closestEnemyPlanets[0];
            var enemyDistance = planet.distanceFrom(closestEnemyPlanet);
            var nearbyFriendlyPlanets = this.closestPlanetsToOwnedBy(planet, player);
            var nearbyFriendlyPlanetsLength = nearbyFriendlyPlanets.length;
            fakePlanet = planet.clone();
            fakePlanet.addIncomingForce(enemy, closestEnemyPlanet.getShips(), enemyDistance);
            for (var count = 0 ; count < nearbyFriendlyPlanetsLength ; count++) {
                var nearbyPlanet = nearbyFriendlyPlanets[count];
                var nearbyDistance = planet.distanceFrom(nearbyPlanet);
                if (nearbyDistance < enemyDistance) {
                    // make not getships... make shipBalance for enemy????
                    fakePlanet.addIncomingForce(player, nearbyPlanet.getShips(), nearbyDistance)
                } else {
                    break;
                }
            }
            return Math.min(planet.shipBalance(), fakePlanet.shipBalance());
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
            if (closestEnemyPlanets.length > 0 && closestEnemyPlanets[0].isSamePlanet(targetPlanet)) {
                return planet.shipBalance();
            } else {
                return this.planetSurplus(planet, player);
            }
        }
    };
}

exports.Universe = Universe;

