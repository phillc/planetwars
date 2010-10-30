var sys = require('sys'),
    players = require('./Players');

var planetDistances = [];
var distance = function(a, b){
    var dx = a.getX() - b.getX();
    var dy = a.getY() - b.getY();
    return Math.ceil(Math.sqrt(dx*dx+dy*dy));
}

var Planet = function(options) {
    var id     = options.id;
    var x      = options.x;
    var y      = options.y;
    var owner  = options.owner;
    var ships  = options.ships;
    var growth = options.growth;
    var incomingForces = [];

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
        distanceFrom : function() {
            return function(otherPlanet) {
                if (planetDistances[id] === undefined){
                    planetDistances[id] = [];
                }
                if(planetDistances[id][otherPlanet.getId()] === undefined) {
                    planetDistances[id][otherPlanet.getId] = distance(this, otherPlanet);
                }
                return planetDistances[id][otherPlanet.getId];
            }
        }(),
        isOwnedBy : function(player) {
            return owner === player;
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
        }
    }
}

exports.Planet = Planet;