var sys = require('sys'),
    Fleet = require('./Fleet').Fleet;
    network = require('./network');

var Planet = function(id, x, y, owner, ships, growth) {
    this.id     = parseInt(id);
    this.x      = parseFloat(x);
    this.y      = parseFloat(y);
    this.owner  = parseInt(owner);
    this.ships  = parseInt(ships);
    this.growth = parseInt(growth);
    this.enemyIncomingFleets    = [];
    this.myIncomingFleets = [];
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

Planet.prototype.getCoordinates = function() {
    return [this.x, this.y];
}

Planet.prototype.isNeutral = function() {
    return this.owner === 0;
}

Planet.prototype.isEnemy = function() {
    return this.owner === 2;
}

Planet.prototype.isNotMine = function() {
    return !this.isMine();
}

Planet.prototype.isMine = function() {
    return this.owner === 1;
}

Planet.prototype.effectiveDefensiveValue = function(turns) {
    // turn this recursive???
    var numTurns = turns ? turns : 0
    var ships = this.isMine() ? this.ships : -this.ships;
    for(var turn = 1 ; turn <= numTurns ; turn++) {
        if(!this.isNeutral()) {
            ships += ships >= 0 ? this.growth : -this.growth;
        }
        
        for(var fleetNum in this.enemyIncomingFleets) {
            var fleet = this.enemyIncomingFleets[fleetNum];
            if(fleet.getRemaining() === turn) {
                ships -= fleet.ships;
            }
        }
        
        for(var fleetNum in this.myIncomingFleets) {
            var fleet = this.myIncomingFleets[fleetNum];
            if(fleet.getRemaining() === turn) {
                ships += fleet.ships;
            }
        }
    }
    return ships;
}

Planet.prototype.expendableShipsWithoutReinforce = function() {
    var expendableShips;
    var incEnemyFleets = this.enemyIncomingFleets.slice(0);
    incEnemyFleets.sort(function(a, b){a.remaining - b.remaining});
    farthestDistance = incEnemyFleets[0] ? incEnemyFleets[0].remaining : 0;
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
    var fleet = new Fleet({ owner       : 1, 
                            ships       : shipsNum,
                            source      : this.id,
                            dest        : toPlanet.id,
                            totalLength : dist,
                            remaining   : dist });
                            
    toPlanet.addMyIncomingFleet(fleet);
    
    process.stdout.write('' + Math.floor(this.id) + ' ' +
            Math.floor(toPlanet.id) + ' ' + Math.floor(shipsNum) + '\n');
}

Planet.prototype.addEnemyIncomingFleet = function(fleet) {
    this.enemyIncomingFleets.push(fleet);
}

Planet.prototype.addMyIncomingFleet = function(fleet) {
    this.myIncomingFleets.push(fleet);
}

Planet.prototype.decisionConsiderationOrder = function(){
    return network.compute("decisionConsideration", { ships  : this.ships,
                                                      growth : this.growth });    
    // #total growth of each player, #of planet of each player
    // what sending ships to a planet would do to its link, as in closest x friendly planets
    // turns remaining
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


Planet.prototype.considerSendingTo = function(targetPlanet, myPlanets, enemyPlanets) {
    var distance = this.distanceFrom(targetPlanet);
    var effDef = targetPlanet.effectiveDefensiveValue(distance);
    
    var nearbyMyPlanets = targetPlanet.nearbyPlanetsOutOf(myPlanets);
    var nearbyEnemyPlanets = targetPlanet.nearbyPlanetsOutOf(enemyPlanets);
    
    var distanceThreeMyPlanets = summateDistanceOf(3, nearbyMyPlanets, targetPlanet);
    var distanceThreeEnemyPlanets = summateDistanceOf(3, nearbyEnemyPlanets, targetPlanet);
    
    var shipsThreeMyPlanets = summateShipsOf(3, nearbyMyPlanets, targetPlanet);
    var shipsThreeEnemyPlanets = summateShipsOf(3, nearbyEnemyPlanets, targetPlanet);
    
    var values = { 
                   canTakeRightNow           : targetPlanet.ships > effDef ? 1 : -1,
                   distance                  : distance,
                   distanceThreeMyPlanets    : distanceThreeMyPlanets,
                   shipsThreeMyPlanets       : shipsThreeMyPlanets,
                   distanceThreeEnemyPlanets : distanceThreeEnemyPlanets,
                   shipsThreeEnemyPlanets    : shipsThreeEnemyPlanets,
                   effDef                    : effDef,
                   isEnemy                   : targetPlanet.isEnemy() ? 1 : -1, // is effectively enemy? (in x turns, where x is distance (to help sniping))
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
                   "with incoming fleets of:"].join(" ") ];
    str.push(this.myIncomingFleets.join("\n"))
    str.push(this.enemyIncomingFleets.join("\n"))
    return str.join("\n");
}

exports.Planet = Planet;
