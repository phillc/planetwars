var sys = require('sys');

var Fleet = function(opts) {
    this.id          = opts.id;
    this.owner       = opts.owner;
    this.ships       = opts.ships;
    this.source      = opts.source;
    this.dest        = opts.dest;
    this.totalLength = opts.totalLength;
    this.remaining   = opts.remaining;
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