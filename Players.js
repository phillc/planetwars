var Player = function(options) {
    this.name = options.name;
}

var me = new Player({ name : "ME" });
var opponent = new Player({ name : "OPPONENT" })
var neutral = new Player({ name : "NEUTRAL" })

exports.me = me;
exports.opponent = opponent;
exports.neutral = neutral;
exports.byId = [neutral, me, opponent];

