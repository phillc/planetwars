var sys = require('sys'),
    players = require('./Players');

var Planet = function(options) {
    this.id     = options.id;
    this.x      = options.x;
    this.y      = options.y;
    this.owner  = options.owner;
    this.ships  = options.ships;
    this.growth = options.growth;
    this.incomingForces = [];
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

Planet.prototype.isOwnedBy = function(player) {
    return this.owner === player;
}

Planet.prototype.isNeutral = function() {
    return this.owner === players.neutral;
}

Planet.prototype.addIncomingForce = function(player, ships, turns) {
    this.incomingForces[turns] = this.incomingForces[turns] || {};
    this.incomingForces[turns][player] = (this.incomingForces[turns][player] || 0) + ships;
}

Planet.prototype.getIncomingForces = function(player, turns) {
    return (this.incomingForces[turns] && this.incomingForces[turns][player]) || 0;
}

exports.Planet = Planet;
