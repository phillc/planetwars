var Planet = function(id, x, y, owner, ships, growth) {
    this.id     = id;
    this.x      = x;
    this.y      = y;
    this.owner  = owner;
    this.ships  = ships;
    this.growth = growth;
    this.enemyIncomingFleets    = [];
    this.friendlyIncomingFleets = [];
}

Planet.prototype.effectiveDefensiveValue = function(turns) {
    var willIncreaseBy = 0;
    var willBeAttackedBy = 0;
    var willBeReinforcedBy = 0;
    
    if(turns != null) {
        willIncreaseBy = turns * this.growth;
        for(var fleetNum in this.enemyIncomingFleets) {
            var fleet = this.enemyIncomingFleets[fleetNum];
            if(fleet.arriveBy(turns)) {
                willBeAttackedBy += fleet.ships;
            }
        }
        for(var fleetNum in this.friendlyIncomingFleets) {
            var fleet = this.friendlyIncomingFleets[fleetNum];
            if(fleet.arriveBy(turns)) {
                willBeReinforcedBy += fleet.ships;
            }
        }
    }
    
    return this.ships + willIncreaseBy - willBeAttackedBy + willBeReinforcedBy;
}

Planet.prototype.addEnemyIncomingFleet = function(fleet) {
    this.enemyIncomingFleets.push(fleet);
}

Planet.prototype.addFriendlyIncomingFleet = function(fleet) {
    this.friendlyIncomingFleets.push(fleet);
}

Planet.prototype.neededToDefend = function(){
    // max (each incomign ship(number of ships + growth * turns ships away))
}

exports.Planet = Planet;
