exports.Fleet = function(id, owner, ships, source, dest, totalLength, remaining) {
    this.id          = id;
    this.owner       = owner;
    this.ships       = ships;
    this.source      = source;
    this.dest        = dest;
    this.totalLength = totalLength;
    this.remaining   = remaining;
}
