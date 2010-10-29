var sys = require('sys'),
    players = require('./Players');
    
function Universe(planets) {
    this.planets = planets;
}

Universe.prototype.getPlanetsByOwner = function(owner) {
    if (this.getPlanetsByOwnerCache) {
        return this.getPlanetsByOwnerCache[owner];
    }
    
    var planetsByOwner = {};
    this.planets.forEach(function(planet) {
        var owner = planet.getOwner();
        planetsByOwner[owner] = planetsByOwner[owner] || [];
        planetsByOwner[owner].push(planet);
    });
    this.planetsByOwnerCache = planetsByOwner;
    return this.planetsByOwnerCache[owner] || [];
}

exports.Universe = Universe;

