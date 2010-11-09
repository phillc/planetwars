var sys = require('sys'),
    players = require('./players');

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
        incomingForces = [[]];
        
    var futureStateCache = [];
    var reservedShips = 0;
    
    return {
        invalidateCache : function() {
            futureStateCache = [];
        },
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
            return owner.samePlayerAs(players.neutral);
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
        shipBalance : function(turns, player) {
            var turns = turns || 0;
            var balance = ships;
            var farthestAction = Math.max(turns, this.farthestForce());
            
            for(var i = 0 ; i <= farthestAction ; i++) {
                var future = this.futureState(i);
                if (player.samePlayerAs(owner)) {
                    if (i <= turns) {
                        balance = future.ships
                    } else {
                        balance = Math.min(balance, future.ships);
                    }
                } else {
                    balance = Math.min(balance, -future.ships);
                }
            }
            return balance - reservedShips;
        },
        createNextTurn : function(prevTurnPlanet, turnNumber) {
            var nextTurnShips = prevTurnPlanet.ships,
                nextTurnOwner = prevTurnPlanet.owner;

            
            if (!nextTurnOwner.samePlayerAs(players.neutral)) {
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
        effectiveDefensiveValue : function(player, turns) {
            var futureState = this.futureState(turns);
            if (player.samePlayerAs(futureState.owner)) {
                return futureState.ships;
            }
            
            return  -futureState.ships - 1;
        },
        effectivelyOwnedBy : function(player) {
            var futureState = this.futureState(this.farthestForce());
            return player.samePlayerAs(futureState.owner);
        },
        clone : function() {
            var clonedPlanet =  Planet({ id : id,
                                         x : x,
                                         y : y,
                                         owner : owner,
                                         ships: ships, 
                                         growth : growth });
            for (var turns = 0 ; turns <= this.farthestForce() ; turns++) {
                clonedPlanet.addIncomingForce(players.me, this.getIncomingForces(players.me, turns), turns)
                clonedPlanet.addIncomingForce(players.opponent, this.getIncomingForces(players.opponent, turns), turns)
            }
            return clonedPlanet;
        },
        recordSendShipsTo : function(numShips, targetPlanet) {
            ships -= numShips;
            if (this.isSamePlanet(targetPlanet)) {
                targetPlanet.addIncomingForce(owner, numShips, 0);
            } else {
                targetPlanet.addIncomingForce(owner, numShips, this.distanceFrom(targetPlanet));
                this.invalidateCache();
                targetPlanet.invalidateCache();
            }
        },
        reserveShips : function(numShips) {
            reservedShips += numShips;
        },
        sendShipsTo : function(numShips, targetPlanet) {
            // sys.debug("Sending " + numShips + " from planet " + id + " with " + ships + " ships to planet " + targetPlanet.getId() + " with " + targetPlanet.getShips() + " ships and " + targetPlanet.getGrowth() + " growth at a distance of " + this.distanceFrom(targetPlanet))
            this.recordSendShipsTo(numShips, targetPlanet);
            if (!this.isSamePlanet(targetPlanet)){
                process.stdout.write('' + Math.floor(id) + ' ' +
                                     Math.floor(targetPlanet.getId()) + ' ' +
                                     Math.floor(numShips) + '\n');
            }
        }
    };
}

exports.Planet = Planet;