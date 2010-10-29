exports.Planet = function(options) {
    var id     = options.id,
        x      = options.x,
        y      = options.y,
        owner  = options.owner,
        ships  = options.ships,
        growth = options.growth,
        enemyIncomingFleets = [0],
        myIncomingFleets = [0];
    // real = options.real;
    
    return {
        getShips : function() {
            return ships;
        },
        getOwner : function() {
            return owner;
        },
        getId : function() {
            return id;
        }
    }
}
