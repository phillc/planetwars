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
    if(this.enemyIncomingFleets.length > 0) {
        var farthestDistance;
        for(var fleetNum in this.enemyIncomingFleets) {
            var fleet = this.enemyIncomingFleets[fleetNum];
            if(farthestDistance == null) {
                farthestDistance = fleet.distance;
            } else {
                farthestDistance = farthestDistance > fleet.remaining ? farthestDistance : fleet.remaining;
            }
        }
        var lowestEffDef;
        for(var turnNum = 1 ; turnNum <= farthestDistance ; turnNum++) {
            var effDef = planet.effectiveDefensiveValue(turnNum);
            if(lowestEffDef == null) {
                lowestEffDef = effDef;
            } else {
                effDef = lowestEffDef <= effDef ? lowestEffDef : effDef;
            }
        }
        return expendableShips = this.ships - lowestEffDef;
    }
    return this.ships;
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
    this.friendlyIncomingFleets.push(fleet);
}

Planet.prototype.decisionConsiderationWeight = function(){
    return this.ships / (1 + this.growth);
}

Planet.prototype.attackConsiderationWeight = function(effDef) {
    var weight = 0;
    weight += this.isEnemy() ? .25 : 0
    weight += (1/effDef) * 20
    weight += this.growth
    return weight;
}

exports.Planet = Planet;
