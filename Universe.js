var sys = require('sys'),
    players = require('./Players');
    
function Universe(planets) {
    var planets;
    
    var getPlanetsByOwnerCache,
        getNotMyPlanetsCache;
        
    return {
        getPlanetsByOwner : function(owner) {
            if (getPlanetsByOwnerCache) {
                return getPlanetsByOwnerCache[owner];
            }

            var planetsByOwner = {};
            planets.forEach(function(planet) {
                var owner = planet.getOwner();
                planetsByOwner[owner] = planetsByOwner[owner] || [];
                planetsByOwner[owner].push(planet);
            });
            getPlanetsByOwnerCache = planetsByOwner;
            return getPlanetsByOwnerCache[owner] || [];
        },
        getNotMyPlanets : function() {
            return getNotMyPlanetsCache || this.getPlanetsByOwner(players.neutral).concat(this.getPlanetsByOwner(players.opponent))
        },
        weakestNotMinePlanet : function() {
            // from starter bot
            // (3) Find the weakest enemy or neutral planet.
            dest = -1;
            destScore = -999999.0;
            notMyPlanets = this.getNotMyPlanets();
            plen = notMyPlanets.length;
            for (pi = 0; pi < plen; pi++) {
                p = notMyPlanets[pi];
                score = 1.0 / (1 + p.getShips());
                if (score > destScore) {
                    destScore = score;
                    dest = p.getId();
                }
            }
        }
    }
}


exports.Universe = Universe;

