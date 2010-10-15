var sys = require('sys');
require('./underscore');

var PlanetWars = require('./PlanetWars'),
    timer = require('./timer'),
    isTimeException = timer.isTimeException;


function DoTurn(universe) {
    try {
        universe.run();
    } catch(err) {
        if(!isTimeException(err)) {
            sys.debug(err);
            throw err;
        }
    }
}

PlanetWars.Play(DoTurn);
