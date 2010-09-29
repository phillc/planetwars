var sys = require('sys'),
    Fleet = require('./Fleet').Fleet;

var OWNER = [];
OWNER['NEUTRAL'] = 0;
OWNER['ME']      = 1;
OWNER['ENEMY']   = 2;

var Planet = function(id, x, y, owner, ships, growth) {
    this.id     = parseInt(id);
    this.x      = parseFloat(x);
    this.y      = parseFloat(y);
    this.owner  = parseInt(owner);
    this.ships  = parseInt(ships);
    this.growth = parseInt(growth);
    this.enemyIncomingFleets    = [];
    this.friendlyIncomingFleets = [];
}

Planet.prototype.getShips = function() {
    return this.ships;
}

Planet.prototype.getEnemyIncomingFleets = function() {
    return this.enemyIncomingFleets;
}

Planet.prototype.getCoordinates = function() {
    return [this.x, this.y];
}

Planet.prototype.isNeutral = function() {
    return this.owner == OWNER['NEUTRAL'];
}

Planet.prototype.isEnemy = function() {
    return this.owner == OWNER['ENEMY'];
}

Planet.prototype.isNotFriendly = function() {
    return !this.isFriendly();
}

Planet.prototype.isFriendly = function() {
    return this.owner == OWNER['ME'];
}

Planet.prototype.effectiveDefensiveValue = function(turns) {
    var willIncreaseBy = 0;
    var willBeAttackedBy = 0;
    var willBeReinforcedBy = 0;
    
    // But this doesn't account for ownership changes
    if(turns != null) {
        willIncreaseBy = turns * (this.isNeutral() ? 0 : this.growth);
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

Planet.prototype.expendableShipsWithoutReinforce = function() {
    var expendableShips;
    var incEnemyFleets = this.enemyIncomingFleets.slice(0);
    incEnemyFleets.sort(function(a, b){a.remaining - b.remaining});
    farthestDistance = incEnemyFleets[0] ? incEnemyFleets[0].remaining : 0;
    return Math.min(this.ships, this.effectiveDefensiveValue(farthestDistance));
}

var planetDistances = [];
var distance = function(a, b){
    var x1 = a.x;
    var y1 = a.y;
    var x2 = b.x;
    var y2 = b.y
    return Math.ceil(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1,2)));
}

Planet.prototype.distanceFrom = function(otherPlanet) {
    var ids = [this.id, otherPlanet.id].sort();
    if (planetDistances[ids[0]] == null){
        planetDistances[ids[0]] = [];
    }
    if(planetDistances[ids[0]][otherPlanet.id] == null) {
        planetDistances[ids[0]][otherPlanet.id] = distance(this, otherPlanet);
    }
    return planetDistances[ids[0]][otherPlanet.id];
}

Planet.prototype.sendShips = function(shipsNum, toPlanet) {
    var dist = this.distanceFrom(toPlanet);
    var fleet = new Fleet(null, OWNER['ME'], shipsNum, this.id, toPlanet.id, dist, dist);
    if(toPlanet.isFriendly()) {
        toPlanet.addFriendlyIncomingFleet(fleet);
    } else {
        toPlanet.addEnemyIncomingFleet(fleet);
    }
    process.stdout.write('' + Math.floor(this.id) + ' ' +
            Math.floor(toPlanet.id) + ' ' + Math.floor(shipsNum) + '\n');
}

Planet.prototype.addEnemyIncomingFleet = function(fleet) {
    this.enemyIncomingFleets.push(fleet);
}

Planet.prototype.addFriendlyIncomingFleet = function(fleet) {
    fleet.trickIntoOneTurn(); // In the main loops, a planet can send ships to its
                              // self, but we trick it to thinking the help comes
                              // next turn to remove the ships from the sendable
                              // pool.
    this.friendlyIncomingFleets.push(fleet);
}

Planet.prototype.decisionConsiderationOrder = function(){
    var order = 0;
    order += this.ships * weight.decisionConsideration.ships;
    order += this.growth * weight.decisionConsideration.growth;
    return order;
    // proximity to friendly, proximity to enemy, #total ships, #total growth of each player, #of planet of each player
    // sum of distances of 3 closest planets
    // what sending ships to a planet would do to its link, as in closest x friendly planets
}

Planet.prototype.attackConsiderationOrder = function(effDef, distance) {
    return new AttackConsiderationNetwork({ isEnemy         : this.isEnemy() ? 1 : 0,
                                            isFriendly      : this.isFriendly() ? 1 : 0,
                                            isNeutral       : this.isNeutral() ? 1 : 0,
                                            canTakeRightNow : this.ships > effDef ? 1 : 0,
                                            incomingEnemyFleets : this.enemyIncomingFleets.length > 0 ? 1 : 0,
                                            incomingFriendlyFleets : this.friendlyIncomingFleets.length > 0 ? 1 : 0,
                                            growth          : this.growth,
                                            effDef          : effDef,
                                            distance        : distance }).compute();
    
}

Planet.prototype.toString = function() {
    var f_or_e = this.owner == 1 ? "My" : "Enemy"
    var str = [ [ f_or_e + " Planet id:" + this.id + " with ",
                   this.ships + " ships,",
                   this.growth + " growth,",
                   "@(" + this.getCoordinates() + ")",
                   "with incoming fleets of:"].join(" ") ];
    str.push(this.friendlyIncomingFleets.join("\n"))
    str.push(this.enemyIncomingFleets.join("\n"))
    return str.join("\n");
}

exports.Planet = Planet;
