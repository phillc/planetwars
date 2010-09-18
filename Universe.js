exports.Universe = function(planets, fleets) {
    var i;
    var planetsLength = planets.length;
    var myPlanets = [];
    var enemyPlanets = [];
    var neutralPlanets = [];
    var planet;
    var planetsByOwner = [ neutralPlanets, myPlanets, enemyPlanets ];
    var owner;
    for (i = 0; i < planetsLength; i++) {
        planet = planets[i];
        owner = planet.owner;
        planetsByOwner[owner < 0 || owner > 1 ? 2 : owner].push(planet);
    }

    var myFleets = [];
    var enemyFleets = [];
    var fleetsLength = fleets.length;
    var fleetsByOwner = [ myFleets, enemyFleets ];
    var fleet;
    for (i = 0; i < fleetsLength; i++) {
        fleet = fleets[i];
        owner = fleet.owner;
        fleetsByOwner[owner == 1 ? 0 : 1].push(fleet);
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
