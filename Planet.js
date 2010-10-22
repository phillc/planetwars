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
        // sys.debug('' + Math.floor(this.id) + ' ' + Math.floor(toPlanet.id) + ' ' + Math.floor(shipsNum) + '\n');
        process.stdout.write('' + Math.floor(this.id) + ' ' + Math.floor(toPlanet.id) + ' ' + Math.floor(shipsNum) + '\n');
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

var summateDistanceOf = function(numberOf, planets, fromPlanet) {
    var planetsLength = planets.length;
    var distance = 0;
    for(var i=0 ; (i < numberOf) && (i < planetsLength) ; i++) {
        distance += fromPlanet.distanceFrom(planets[i]);
    }
    return distance;
}

var summateShipsOf = function(numberOf, planets, fromPlanet) {
    var planetsLength = planets.length;
    var ships = 0;
    for(var i=0 ; (i < numberOf) && (i < planetsLength) ; i++) {
        ships += planets[i].ships;
    }
    return ships;
}

Planet.prototype.consider = function(myPlanets, enemyPlanets) {
    var nearbyMyPlanets = this.nearbyPlanetsOutOf(myPlanets);
    var nearbyEnemyPlanets = this.nearbyPlanetsOutOf(enemyPlanets);
    
    var distanceThreeMyPlanets = summateDistanceOf(3, nearbyMyPlanets, this);
    var distanceThreeEnemyPlanets = summateDistanceOf(3, nearbyEnemyPlanets, this);
    
    var shipsThreeMyPlanets = summateShipsOf(3, nearbyMyPlanets, this);
    var shipsThreeEnemyPlanets = summateShipsOf(3, nearbyEnemyPlanets, this);
    
    var values = { 
                   distanceThreeMyPlanets    : distanceThreeMyPlanets,
                   shipsThreeMyPlanets       : shipsThreeMyPlanets,
                   distanceThreeEnemyPlanets : distanceThreeEnemyPlanets,
                   shipsThreeEnemyPlanets    : shipsThreeEnemyPlanets,
                   isEnemy                   : this.isEnemy() ? 1 : -1,
                   isFriendly                : this.isMine() ? 1 : -1,
                   isNeutral                 : this.isNeutral() ? 1 : -1,
                   shipsDocked               : this.ships,
                   growth                    : this.growth };
    
    return [network.compute("attackConsideration", values), this, values]
                           
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
                   "with incoming fleets of:"].join(" ") ];
    str.push(this.myIncomingFleets.join("\n"))
    str.push(this.enemyIncomingFleets.join("\n"))
    return str.join("\n");
}

exports.Planet = Planet;
