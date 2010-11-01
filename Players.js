var sys = require('sys');


var Player = function(options) {
    this.name = options.name;
}

Player.prototype.samePlayerAs = function(player) {
    return this.name == player.name;
}

Player.prototype.toString = function() {
    return this.name;
}

var me = new Player({ name : "ME" });
var opponent = new Player({ name : "OPPONENT" })
var neutral = new Player({ name : "NEUTRAL" })

var enemyOf = function(player) {
    if (player.samePlayerAs(me)) {
        return opponent;
    }
    if (player.samePlayerAs(opponent)) {
        return me;
    }
    throw "Didn't get either apparently."
}

exports.me = me;
exports.opponent = opponent;
exports.neutral = neutral;
exports.byId = [neutral, me, opponent];
exports.enemyOf = enemyOf;

