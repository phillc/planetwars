var sys = require('sys'),
    Planet = require('./Planet').Planet,
    players = require('./players'),
    Universe = require('./Universe').Universe;

function parseInput(turnInput, turnFn) {
    var lines = turnInput.split('\n');
    var linesLength = lines.length;
    var i;
    var line;
    var noCommentLine;
    var planets = [];
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
            planets.push(new Planet({ id     : planets.length,
                                      x      : parseFloat(toks[1]),
                                      y      : parseFloat(toks[2]),
                                      owner  : players.byId[parseInt(toks[3])],
                                      ships  : parseInt(toks[4]),
                                      growth : parseInt(toks[5]) }));
            break;
        case 'F':
            planets[toks[4]].addIncomingForce(players.byId[parseInt(toks[1])], parseInt(toks[2]), parseInt(toks[6]));
            break;
        case '':
            // Empty line.
            break;
        default:
            throw "Unknown command token: " + line;
        }
    }
    universe = new Universe(planets);
    turnFn(universe);
    process.stdout.write('go\n');
}

exports.play = function play(turnFn) {
    var stdin = process.openStdin();
    var buffer = '';
    sys.debug('Play()');
    stdin.on('data', function(chunk) {
        buffer += chunk;
        var endOfTurn = buffer.indexOf('\ngo\n');
        if (endOfTurn >= 0) {
            var turnInput = buffer.substring(0, endOfTurn);
            buffer = buffer.substring(endOfTurn + 4);
            parseInput(turnInput, turnFn);
        }
    });

    stdin.on('end', function() {
        sys.debug('end of stdin, exiting');
        sys.exit();
    });
};