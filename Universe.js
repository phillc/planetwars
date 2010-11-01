var sys = require('sys'),
    players = require('./Players');

var closestPlanetsToCache = [];
    
function Universe(planets) {
    var planets;
    
    var planetsOwnedByCache,
        planetsNotOwnedByCache = [];
        
    return {
        planetsOwnedBy : function(owner) {
            if (planetsOwnedByCache) {
                return planetsOwnedByCache[owner];
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
        planetsOwnedByWithNegativeShipBalance : function(owner) {
            var negBalance = []
            this.planetsOwnedBy(owner).forEach(function(planet) {
                if (planet.shipBalance() < 0) {
                    negBalance.push(planet);
                }
            });
            return negBalance;
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
    }
}


exports.Universe = Universe;

