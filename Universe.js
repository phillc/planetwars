var sys = require('sys');

var Universe = function(planets, fleets) {
    var myPlanets = [];
    var enemyPlanets = [];
    var neutralPlanets = [];
    var planetsByOwner = [ neutralPlanets, myPlanets, enemyPlanets ];
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        var owner = planet.owner;
        planetsByOwner[owner < 0 || owner > 1 ? 2 : owner].push(planet);
    }
    
    var myFleets = [];
    var enemyFleets = [];
    var fleetsLength = fleets.length;
    var fleetsByOwner = [ myFleets, enemyFleets ];
    for (var i = 0; i < fleetsLength; i++) {
        var fleet = fleets[i];
        var owner = fleet.owner;
        fleetsByOwner[owner == 1 ? 0 : 1].push(fleet);
        fleet.owner == planets[fleet.dest].owner ? planets[fleet.dest].addFriendlyIncomingFleet(fleet)
                                                        : planets[fleet.dest].addEnemyIncomingFleet(fleet);
    }

    this.planets           = planets,
    this.neutralPlanets    = neutralPlanets,
    this.myPlanets         = myPlanets,
    this.enemyPlanets      = enemyPlanets,
    this.notMyPlanets      = neutralPlanets.concat(enemyPlanets),
    this.notEnemyPlanets   = neutralPlanets.concat(myPlanets),
    this.notNeutralPlanets = myPlanets.concat(enemyPlanets),

    this.fleets      = fleets,
    this.myFleets    = myFleets,
    this.enemyFleets = enemyFleets,

    this.issueOrder = function(source, dest, ships) {
        process.stdout.write('' + Math.floor(source) + ' ' +
                Math.floor(dest) + ' ' + Math.floor(ships) + '\n');
    }
}

exports.Universe = Universe;