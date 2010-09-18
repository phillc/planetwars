var sys = require('sys');
var Planet = require('./Planet').Planet;
var Fleet = require('./Fleet').Fleet;
var Universe = require('./Universe').Universe;

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
            fleets.push(new Fleet(fleets.length, toks[1], toks[2], toks[3],
                    toks[4], toks[5], toks[6]));
            break;
        default:
            throw "Unknown command token: " + line;
        }
    }
    universe = new Universe(planets, fleets);
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
