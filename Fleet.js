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

exports.Fleet = Fleet;