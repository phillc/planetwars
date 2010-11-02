var sys = require('sys'),
    players = require('./Players');

var planetDistancesCache = [];
var distance = function(a, b) {
    var dx = a.getX() - b.getX();
    var dy = a.getY() - b.getY();
    return Math.ceil(Math.sqrt(dx*dx+dy*dy));
}

var Planet = function(options) {
    var id     = options.id,
        x      = options.x,
        y      = options.y,
        owner  = options.owner,
        ships  = options.ships,
        growth = options.growth,
        incomingForces = [];
        
    var futureStateCache = [];
    
    return {
        getShips : function() {
            return ships;
        },
        getId : function() {
            return id;
        },
        getGrowth : function() {
            return growth;
        },
        getOwner : function() {
            return owner;
        },
        getX : function() {
            return x;
        },
        getY : function() {
            return y;
        },
        isSamePlanet : function(otherPlanet) {
            return id == otherPlanet.getId();
        },
        distanceFrom : function() {
            return function(otherPlanet) {
                if (planetDistancesCache[id] === undefined){
                    planetDistancesCache[id] = [];
                }
                if(planetDistancesCache[id][otherPlanet.getId()] === undefined) {
                    planetDistancesCache[id][otherPlanet.getId] = distance(this, otherPlanet);
                }
                return planetDistancesCache[id][otherPlanet.getId];
            }
        }(),
        isOwnedBy : function(player) {
            return owner.samePlayerAs(player);
        },
        isNeutral : function() {
            return owner === players.neutral;
        },
        addIncomingForce : function(player, ships, turns) {
            incomingForces[turns] = incomingForces[turns] || {};
            incomingForces[turns][player] = (incomingForces[turns][player] || 0) + ships;
        },
        getIncomingForces : function(player, turns) {
            return (incomingForces[turns] && incomingForces[turns][player]) || 0;
        },
        farthestForce : function() {
            return incomingForces.length - 1;
        },
        futureState : function(turns) {
            if (turns === 0) {
                return { ships : ships, owner : owner };
            }
            if (futureStateCache[turns]) {
                return futureStateCache[turns];
            }
            
            var prevTurn = this.futureState(turns - 1);
            var thisTurn = this.createNextTurn(prevTurn, turns);
            futureStateCache[turns] = thisTurn;
            return thisTurn;
        },
        shipBalance : function() {
            var balance = ships;
            var farthestAction = this.farthestForce();
            
            for(var i = 1 ; i <= farthestAction ; i++) {
                var future = this.futureState(i);
                if (future.owner === owner) {
                    balance = Math.min(balance, future.ships);
                } else {
                    balance = -future.ships;
                }
            }
            return balance;
        },
        createNextTurn : function(prevTurnPlanet, turnNumber) {
            var nextTurnShips = prevTurnPlanet.ships,
                nextTurnOwner = prevTurnPlanet.owner;

            if (nextTurnOwner !== players.neutral) {
                nextTurnShips += growth;
            }

            var opponentShips = this.getIncomingForces(players.opponent, turnNumber);
            var myShips = this.getIncomingForces(players.me, turnNumber);

            if (opponentShips > myShips) {
                var shipDiff = opponentShips - myShips; 
                if (nextTurnOwner === players.opponent) {
                    nextTurnShips += shipDiff;
                } else {
                    nextTurnShips -= shipDiff;
                    if (nextTurnShips < 0) {
                        nextTurnShips = -nextTurnShips;
                        nextTurnOwner = players.opponent;
                    }
                }
            } else if (myShips > opponentShips) {
                var shipDiff = myShips - opponentShips;
                if (nextTurnOwner === players.me) {
                    nextTurnShips += shipDiff;
                } else {
                    nextTurnShips -= shipDiff;
                    if (nextTurnShips < 0) {
                        nextTurnShips = -nextTurnShips;
                        nextTurnOwner = players.me;
                    }
                }
            }
            return { ships : nextTurnShips, owner : nextTurnOwner }
        },
    }
}

exports.Planet = Planet;