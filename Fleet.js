var sys = require('sys');

var Fleet = function(id, owner, ships, source, dest, totalLength, remaining) {
    this.id          = parseInt(id);
    this.owner       = parseInt(owner);
    this.ships       = parseInt(ships);
    this.source      = parseInt(source);
    this.dest        = parseInt(dest);
    this.totalLength = parseInt(totalLength);
    this.remaining   = parseInt(remaining);
}

Fleet.prototype.arriveBy = function(turns) {
    return this.remaining <= turns
}

Fleet.prototype.getRemaining = function(turns) {
    return this.remaining;
}

Fleet.prototype.getShips = function() {
    return this.ships;
}

Fleet.prototype.registerDestination = function(planetsById) {
    var destPlanet = planetsById[this.dest];
    if(this.isMine()) {
        destPlanet.addMyIncomingFleet(this);
    } else {
        destPlanet.addEnemyIncomingFleet(this);
    }
}

Fleet.prototype.isEnemy = function() {
    return this.owner === 2;
}

Fleet.prototype.isMine = function() {
    return this.owner === 1;
}

Fleet.prototype.toString = function() {
    var f_or_e = this.owner == 1 ? "My" : "Enemy"
    return f_or_e + " Fleet of " + this.ships + " is " + this.remaining + " away";
}

Fleet.prototype.trickIntoOneTurn = function() {
    if(this.dest == this.source) {
        this.remaining = 1;
    }
}

exports.Fleet = Fleet;