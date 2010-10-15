var sys = require('sys'),
    Planet = require('./Planet').Planet,
    Fleet = require('./Fleet').Fleet,
    Universe = require('./Universe').Universe,
    setStartTime = require('./timer').setStartTime;
    sayTime = require('./timer').sayTime;

function parseInput(turnInput, turnFn) {
    var lines = turnInput.split('\n');
    var linesLength = lines.length;
    var i;
    var line;
    var noCommentLine;
    var planets = [];
    var fleets = [];
    var toks;
    var cmd;
    var universe;
    for (i = 0; i < linesLength; i++) {
        line = lines[i];
        noCommentLine = line.split('#')[0];
        toks = noCommentLine.split(' ');
        cmd = toks[0];
        switch (cmd) {
        case 'P':
            planets.push(new Planet(planets.length, toks[1], toks[2], toks[3],
                    toks[4], toks[5]));
            break;
        case 'F':
            fleets.push({ id          : parseInt(fleets.length),
                          owner       : parseInt(toks[1]),
                          ships       : parseInt(toks[2]),
                          source      : parseInt(toks[3]),
                          dest        : parseInt(toks[4]),
                          totalLength : parseInt(toks[5]),
                          remaining   : parseInt(toks[6]) });
            break;
        default:
            throw "Unknown command token: " + line;
        }
    }
    for(var fleetNum in fleets) {
        var fleet = fleets[fleetNum];
        var destPlanet = planets[fleet.dest];
        if(fleet.owner === 1) {
            sys.debug("adding to My")
            destPlanet.addMyIncomingFleet(new Fleet(fleet));
        } else {
            sys.debug("adding to Enemy")
            destPlanet.addEnemyIncomingFleet(new Fleet(fleet));
        }
    }
    
    universe = new Universe(planets);
    turnFn(universe);
    process.stdout.write('go\n');
}

exports.Play = function Play(turnFn) {
    var stdin = process.openStdin();
    var buffer = '';
    sys.debug('Play()');
    stdin.on('data', function(chunk) {
        buffer += chunk;
        var endOfTurn = buffer.indexOf('\ngo\n');
        if (endOfTurn >= 0) {
            setStartTime();
            var turnInput = buffer.substring(0, endOfTurn);
            buffer = buffer.substring(endOfTurn + 4);
            parseInput(turnInput, turnFn);
            // sayTime();
        }
    });

    stdin.on('end', function() {
        sys.debug('end of stdin, exiting');
        sys.exit();
    });
};
