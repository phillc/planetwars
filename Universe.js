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
            if (this.inUmbrella(planet, player)) {
                return planet.shipBalance();
            }
            var enemy = enemyOf(player);
            var closestEnemyPlanet = this.closestPlanetsToOwnedBy(planet, enemy)[0];
            var distance = planet.distanceFrom(closestEnemyPlanet);
            var nearbyFriendlyPlanets = this.closestPlanetsToOwnedBy(planet, player);
            fakePlanet = planet.clone();
            fakePlanet.addIncomingForce(enemy, closestEnemyPlanet.getShips(), distance)
            return fakePlanet.shipBalance();
        },
        inUmbrella : function(planet, player) {
            //very dumb
            // could squash with planet Surplus and just send enemy to it and all friendly to it, then get ship balance
            // if you arn't in umbrella, you must be part of it?
            var enemy = players.enemyOf(player);
            
            var closestFriendlyPlanets = this.closestPlanetsToOwnedBy(planet, player);
            if (closestFriendlyPlanets.length === 0) {
                return false;
            }
            var closestFriendlyPlanet = closestFriendlyPlanets[0];
            var closestEnemyPlanets = this.closestPlanetsToOwnedBy(planet, enemy);
            if (closestEnemyPlanets.length === 0) {
                return true;
            }
            var closestEnemyPlanet = closestEnemyPlanets[0];
            var friendlyDistance = planet.distanceFrom(closestFriendlyPlanet);
            var enemyDistance = planet.distanceFrom(closestEnemyPlanet);
            
            // and it is a stable planet?
            return friendlyDistance > enemyDistance;
        },
    };
}

exports.Universe = Universe;

