var sys = require('sys'),
    network = require('./network');

var ENEMY = 2,
    MINE = 1,
    NEUTRAL = 0

var Planet = function(id, x, y, owner, ships, growth) {
    this.id     = parseInt(id);
    this.x      = parseFloat(x);
    this.y      = parseFloat(y);
    this.owner  = parseInt(owner);
    this.ships  = parseInt(ships);
    this.growth = parseInt(growth);
    this.enemyIncomingFleets = [0];
    this.myIncomingFleets = [0];
}

Planet.prototype.getShips = function() {
    return this.ships;
}

Planet.prototype.isSamePlanet = function(otherPlanet) {
    return this.id === otherPlanet.id;
}

Planet.prototype.getEnemyIncomingFleets = function() {
    return this.enemyIncomingFleets;
}

Planet.prototype.getMyIncomingFleets = function() {
    return this.myIncomingFleets;
}

Planet.prototype.getCoordinates = function() {
    return [this.x, this.y];
}

Planet.prototype.isNeutral = function() {
    return this.owner === NEUTRAL;
}

Planet.prototype.isEnemy = function() {
    return this.owner === ENEMY;
}

Planet.prototype.isNotMine = function() {
    return !this.isMine();
}

Planet.prototype.isMine = function() {
    return this.owner === MINE;
}

Planet.prototype.defenseValue = function(turn) {
    if(turn === 0) {
        return [this.ships, this.owner];
    }
    var prevTurn = this.defenseValue(turn - 1);
    var ships = prevTurn[0];
    var owner = prevTurn[1];
    if(owner !== NEUTRAL) {
        ships += this.growth;
    }
    
    var enemyShips = this.enemyIncomingFleets[turn] || 0;
    var myShips = this.myIncomingFleets[turn] || 0;
    
    if (enemyShips > myShips) {
        var shipDiff = enemyShips - myShips; 
        if (owner === ENEMY) {
            ships += shipDiff;
        } else {
            ships -= shipDiff;
            if (ships < 0) {
                return [-ships, ENEMY];
            }
        }
    } else if (myShips > enemyShips) {
        var shipDiff = myShips - enemyShips;
        if (owner === MINE) {
            ships += shipDiff;
        } else {
            ships -= shipDiff;
            if (ships < 0) {
                return [-ships, MINE];
            }
        }
    }
    
    return [ships, owner];
}

Planet.prototype.effectiveDefensiveValue = function(turns) {
    var defVal = this.defenseValue(turns || 0);
    var ships = defVal[0];
    var owner = defVal[1];

    if (owner === MINE) {
        return ships;
    }
    return (-1 * ships) - 1;
}

Planet.prototype.isEffectivelyEnemy = function(turns) {
    var defVal = this.defenseValue(turns || 0);
    var owner = defVal[1];

    return owner === ENEMY;
}

Planet.prototype.isEffectivelyNotMine = function(turns) {
    var defVal = this.defenseValue(turns || 0);
    var owner = defVal[1];

    return owner !== MINE;
}


Planet.prototype.expendableShipsWithoutReinforce = function() {
    var farthestDistance = this.enemyIncomingFleets.length - 1;
    return Math.min(this.ships, this.effectiveDefensiveValue(farthestDistance));
}


Planet.prototype.distanceFrom = function() {
    var planetDistances = [];
    var distance = function(a, b){
        var x1 = a.x;
        var y1 = a.y;
        var x2 = b.x;
        var y2 = b.y
        return Math.ceil(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1,2)));
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

Planet.prototype.sendShips = function(shipsNum, toPlanet) {
    var dist = this.distanceFrom(toPlanet);
    toPlanet.addMyIncomingFleet(dist, shipsNum);
    
    if(!this.isSamePlanet(toPlanet)){
        process.stdout.write('' + Math.floor(this.id) + ' ' +
                Math.floor(toPlanet.id) + ' ' + Math.floor(shipsNum) + '\n');
    }
}

Planet.prototype.addEnemyIncomingFleet = function(turn, ships) {
    if(!this.enemyIncomingFleets[turn]) {
        this.enemyIncomingFleets[turn] = 0;
    }
    this.enemyIncomingFleets[turn] += ships;
}

Planet.prototype.addMyIncomingFleet = function(turn, ships) {
    if(!this.myIncomingFleets[turn]) {
        this.myIncomingFleets[turn] = 0;
    }
    this.myIncomingFleets[turn] += ships;
}

Planet.prototype.decisionConsiderationOrder = function(){
    return network.compute("decisionConsideration", { ships  : this.ships,
                                                      growth : this.growth });    
}

Planet.prototype.summateCallsOf = function(planets, fnName, args) {
    var total = 0;
    planets.forEach(function(planet){
        total += planet[fnName].apply(planet, args);
    }, this);
    return total;
}

Planet.prototype.considerSendingTo = function(targetPlanet, myPlanets, enemyPlanets) {
    var distance = this.distanceFrom(targetPlanet);
    var effDef = targetPlanet.effectiveDefensiveValue(distance);
    
    var nearbyMyPlanets = targetPlanet.nearbyPlanetsOutOf(myPlanets);
    var nearbyEnemyPlanets = targetPlanet.nearbyPlanetsOutOf(enemyPlanets);
    
    var distanceThreeMyPlanets = targetPlanet.summateCallsOf(nearbyMyPlanets.slice(0, 3), "distanceFrom", [targetPlanet]);
    var distanceThreeEnemyPlanets = targetPlanet.summateCallsOf(nearbyEnemyPlanets.slice(0, 3), "distanceFrom", [targetPlanet]);
    
    var shipsThreeMyPlanets = targetPlanet.summateCallsOf(nearbyMyPlanets.slice(0, 3), "getShips");
    var shipsThreeEnemyPlanets = targetPlanet.summateCallsOf(nearbyEnemyPlanets.slice(0, 3), "getShips");
    
    var values = { canTakeRightNow           : this.ships + effDef > 0 ? 1 : -1,
                   distance                  : distance,
                   distanceThreeMyPlanets    : distanceThreeMyPlanets,
                   shipsThreeMyPlanets       : shipsThreeMyPlanets,
                   distanceThreeEnemyPlanets : distanceThreeEnemyPlanets,
                   shipsThreeEnemyPlanets    : shipsThreeEnemyPlanets,
                   effDef                    : effDef,
                   isEnemy                   : targetPlanet.isEnemy() ? 1 : -1,
                   isEffectivelyEnemy        : targetPlanet.isEffectivelyEnemy(distance) ? 1 : -1,
                   isEffectivelyNotMine      : targetPlanet.isEffectivelyNotMine(distance) ? 1 : -1,
                   isFriendly                : targetPlanet.isMine() ? 1 : -1,
                   isNeutral                 : targetPlanet.isNeutral() ? 1 : -1,
                   isSelf                    : this.isSamePlanet(targetPlanet) ? 1 : -1,
                   shipsDocked               : this.isSamePlanet(targetPlanet) ? 0 : targetPlanet.ships,
                   growth                    : targetPlanet.growth };
    
    return [network.compute("attackConsideration", values), targetPlanet, values]
                           
}

Planet.prototype.nearbyPlanetsOutOf = function(planets){
    planets.slice(0);
    var that = this;
    return planets.sort(function(a, b){
        return that.distanceFrom(a) - that.distanceFrom(b);
    });
}

Planet.prototype.toString = function() {
    var f_or_e = this.owner === 1 ? "My" : "Enemy"
    var str = [ [ f_or_e + " Planet id:" + this.id + " with ",
                   this.ships + " ships,",
                   this.growth + " growth,",
                   "@(" + this.getCoordinates() + ")",
                   ].join(" ") ];
    return str.join("\n");
}

exports.Planet = Planet;
