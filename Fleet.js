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

Fleet.prototype.getShips = function() {
    return this.ships;
}

Fleet.prototype.toString = function() {
    var f_or_e = this.owner == 1 ? "My" : "Enemy"
    return f_or_e + " Fleet of " + this.ships + " is " + this.remaining + " away";
}
exports.Fleet = Fleet;