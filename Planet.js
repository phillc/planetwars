var sys = require('sys');

var Planet = function(options) {
    this.id     = options.id;
    this.x      = options.x;
    this.y      = options.y;
    this.owner  = options.owner;
    this.ships  = options.ships;
    this.growth = options.growth;
    this.enemyIncomingFleets = [0];
    this.myIncomingFleets = [0];
    // this.real = options.real;
}

Planet.prototype.getShips = function() {
    return this.ships;
}

Planet.prototype.getId = function() {
    return this.id;
}

Planet.prototype.getGrowth = function() {
    return this.growth;
}

Planet.prototype.getOwner = function() {
    return this.owner;
}

Planet.prototype.distanceFrom = function() {
    var planetDistances = [];
    var distance = function(a, b){
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.ceil(Math.sqrt(dx*dx+dy*dy));
    }
    return function(otherPlanet) {
        if (planetDistances[this.id] === undefined){
            planetDistances[this.id] = [];
        }
        if(planetDistances[this.id][otherPlanet.id] === undefined) {
            planetDistances[this.id][otherPlanet.id] = distance(this, otherPlanet);
        }
        return planetDistances[this.id][otherPlanet.id];
    }
}();


exports.Planet = Planet;
