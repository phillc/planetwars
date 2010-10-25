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

Planet.prototype.getGrowth = function() {
    return this.growth;
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

Planet.prototype.clone = function() {
    var clone = new Planet(this.id, this.x, this.y, this.owner, this.ships, this.growth);
    clone.enemyIncomingFleets = this.enemyIncomingFleets.slice(0);
    clone.myIncomingFleets = this.myIncomingFleets.slice(0);
    return clone;
}

Planet.prototype.tick = function() {
    if(this.owner !== NEUTRAL) {
        this.ships += this.growth;
    }
    
    var enemyShips = this.enemyIncomingFleets.shift() || 0;
    var myShips = this.myIncomingFleets.shift() || 0;
    
    if (enemyShips > myShips) {
        var shipDiff = enemyShips - myShips; 
        if (this.owner === ENEMY) {
            this.ships += shipDiff;
        } else {
            this.ships -= shipDiff;
            if (this.ships < 0) {
                this.ships = -this.ships;
                this.owner = ENEMY;
            }
        }
    } else if (myShips > enemyShips) {
        var shipDiff = myShips - enemyShips;
        if (this.owner === MINE) {
            this.ships += shipDiff;
        } else {
            this.ships -= shipDiff;
            if (this.ships < 0) {
                this.ships = -this.ships;
                this.owner = MINE;
            }
        }
    }
    
}

Planet.prototype.nextTurn = function() {
    if (this.nextTurnCache) {
        return this.nextTurnCache;
    } else {
        var clone = this.clone();
        clone.tick();
        this.nextTurnCache = clone;
        return clone;
    }
}

Planet.prototype.futureState = function(turns) {
    if(turns === 0) {
        return this;
    }
    return this.nextTurn().futureState(turns - 1);
}

Planet.prototype.effectiveDefensiveValue = function(turns) {
    var futurePlanet = this.futureState(turns || 0);
    if (futurePlanet.isMine()) {
        return futurePlanet.getShips();
    }
    return (-1 * futurePlanet.getShips()) - 1;
}

Planet.prototype.isEffectivelyEnemy = function(turns) {
    var futurePlanet = this.futureState(turns || 0);
    return futurePlanet.isEnemy();
}

Planet.prototype.isEffectivelyNotMine = function(turns) {
    var futurePlanet = this.futureState(turns || 0);
    return !futurePlanet.isMine();
}


Planet.prototype.expendableShipsWithoutReinforce = function() {
    var farthestDistance = this.enemyIncomingFleets.length;
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
    var arrPosition = turn - 1;
    if(!this.enemyIncomingFleets[arrPosition]) {
        this.enemyIncomingFleets[arrPosition] = 0;
    }
    this.enemyIncomingFleets[arrPosition] += ships;
}

Planet.prototype.addMyIncomingFleet = function(turn, ships) {
    var arrPosition = turn - 1;
    if(!this.myIncomingFleets[arrPosition]) {
        this.myIncomingFleets[arrPosition] = 0;
    }
    this.myIncomingFleets[arrPosition] += ships;
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
