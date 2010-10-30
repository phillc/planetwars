var sys = require('sys'),
    players = require('./Players');
    
function Universe(planets) {
    var planets,
        planetsByOwnerCache;
        
    return {
        getPlanetsByOwner : function(owner) {
            if (planetsByOwnerCache) {
                return planetsByOwnerCache[owner];
            }

            var planetsByOwner = {};
            planets.forEach(function(planet) {
                var owner = planet.getOwner();
                planetsByOwner[owner] = planetsByOwner[owner] || [];
                planetsByOwner[owner].push(planet);
            });
            planetsByOwnerCache = planetsByOwner;
            return planetsByOwnerCache[owner] || [];
        }
    }
}


exports.Universe = Universe;

