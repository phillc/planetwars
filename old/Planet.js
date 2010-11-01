
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

Planet.prototype.checkExpendableShips = function(turns) {
    if (!this.isMine()) {
         return 0;
    } else if(turns === 0) {
        return this.ships;
    }
    return Math.min(this.ships, this.nextTurn().checkExpendableShips(turns - 1));
}

Planet.prototype.expendableShipsWithoutReinforce = function() {
    var farthestDistance = this.enemyIncomingFleets.length;
    return this.checkExpendableShips(farthestDistance);
}

Planet.prototype.nearbyPlanetsOutOf = function(planets){
    planets.slice(0);
    var that = this;
    return planets.sort(function(a, b){
        return that.distanceFrom(a) - that.distanceFrom(b);
    });
}
