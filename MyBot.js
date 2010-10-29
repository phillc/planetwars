var planetWars = require('./PlanetWars');

function doTurn(pw) {
    // (1) If we currently have a fleet in flight, just do nothing.
    if ( pw.myFleets.length >= 1 ) {
        return;
    }

    // (2) Find my strongest planet.
    var source = -1;
    var score;
    var sourceScore = -999999.0;
    var sourceShips = 0;
    var myPlanets = pw.myPlanets;
    var p, pi, plen;
    var dest, destScore, notMyPlanets;
    var numShips;
    plen = myPlanets.length;
    for (pi = 0; pi < plen; pi++) {
        p = myPlanets[pi];
        score = p.getShips();
        if (score > sourceScore ) {
            sourceScore = score;
            source = p.getId();
            sourceShips = p.getShips();
        }
    }

    // (3) Find the weakest enemy or neutral planet.
    dest = -1;
    destScore = -999999.0;
    notMyPlanets = pw.notMyPlanets;
    plen = notMyPlanets.length;
    for (pi = 0; pi < plen; pi++) {
        p = notMyPlanets[pi];
        score = 1.0 / (1 + p.getShips());
        if (score > destScore) {
            destScore = score;
            dest = p.getId();
        }
    }

    // (4) Send half the ships from my strongest planet to the weakest
    // planet that I do not own.
    if ( source >= 0 && dest >= 0 ) {
        numShips = Math.floor(sourceShips / 2);
        pw.issueOrder(source, dest, numShips);
    }
}

// Play the game with my bot
planetWars.play(doTurn);
