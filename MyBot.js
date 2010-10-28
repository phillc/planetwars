var sys = require('sys');
require('./underscore');

var PlanetWars = require('./PlanetWars'),
    timer = require('./timer'),
    isTimeException = timer.isTimeException;


function DoTurn(universe) {
    try {
        var evaluation = universe.runEvaluations();
        sys.debug("turn evaluation: " + evaluation[0])
        var bestCommands = evaluation[1];
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
