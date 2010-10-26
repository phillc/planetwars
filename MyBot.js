var sys = require('sys');
require('./underscore');

var PlanetWars = require('./PlanetWars'),
    timer = require('./timer'),
    isTimeException = timer.isTimeException;


function DoTurn(universe) {
    try {
        bestCommands = universe.runEvaluations("me", 1, [-Infinity], [Infinity])[1];
        bestCommands.forEach(function(command){
            command.execute(universe);
        })
    } catch(err) {
        if(!isTimeException(err)) {
            sys.debug(err);
            throw err;
        }
    }
}

PlanetWars.Play(DoTurn);
