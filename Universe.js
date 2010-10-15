var sys = require('sys'),
    timer = require('./timer'),
    checkTime = timer.checkTime;

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
        owner == 1 ? planets[fleet.dest].addMyIncomingFleet(fleet)
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

var tupleSort = function(tuple1, tuple2) {
    return tuple2[0] - tuple1[0];
}

var decisionConsiderationSort = function(a, b){
    return b.decisionConsiderationOrder() - a.decisionConsiderationOrder();
}

Universe.prototype.run = function() {
    var planets = this.planets;
    var myPlanets = this.myPlanets;
    var enemyPlanets = this.enemyPlanets;
    var myPlanetsForDecision = myPlanets.slice(0); //copy array
    myPlanetsForDecision.sort(decisionConsiderationSort)

    for(var planetNum in myPlanetsForDecision) {
        checkTime();
        var myPlanet = myPlanetsForDecision[planetNum];
        
        var planetEvaluations = [];
        for(var consideredPlanetNum in planets) {
            checkTime();
            var otherPlanet = planets[consideredPlanetNum];
            if(!myPlanet.isSamePlanet(otherPlanet)){
                planetEvaluations.push(myPlanet.considerSendingTo(otherPlanet, myPlanets, enemyPlanets));
            }
        }
                
        planetEvaluations.sort(tupleSort);


        
        var sendNothing = function() {
            return []
        }
        var sendNeededToTake = function(upTo) {
            while(sendable > 0 && numCount < up To){
                numCount++
            }
        }
        
        var sendAll = function() {
            return from, to, this.ships
        }
        
        var sendGrowth  = function(upTo) {
            var actions = []
            actions.push [from, to, this.growth]
            
            return actions;
        }
        
        

        var evaluateBoard = function(planets) {
            
        }

        var runEvaluations = function(ply, universePlanets, fromPlanet, toPlanets) {
            // can skip if equal (like growth and sendAll)
            strategies.each {
                from, to, ships = strategy()
                
                runEvaluations(ply - 1);
            }
        }
        runEvaluations(3, planetEvaluations[0, 3]).each {
            command.execute
        }
        
        
                
                check board score for each action in x turns, where x max(distance, 10)
                
                
        

        //         
        // 
        // while(sendableShips > 0 && planetEvaluations.length > 0) {
        //     checkTime();
        //     var pTuple = planetEvaluations.shift();
        //     var targetPlanet = pTuple[1];
        //     var values = pTuple[2];
        //     var neededToMatch = -values.effDef;
        //     
        //     // sys.debug([ "==================================================",
        //     //             "sendableShips " + sendableShips,
        //     //             "sending " + shipsToSend + " ships",
        //     //             "****from:",
        //     //             myPlanet,
        //     //             "****to planet",
        //     //             targetPlanet,
        //     //             "needing " + values.neededToMatch + " to match",
        //     //             "distance of " + myPlanet.distanceFrom(targetPlanet),
        //     //             "neutral? " + targetPlanet.isNeutral() + " enemy? " + targetPlanet.isEnemy()].join("\n"));
        //     // 
        //     
        //    if(neededToMatch >= 0) {
        //         var shipsToSend = Math.min(sendableShips, neededToMatch + 1);
        //         myPlanet.sendShips(shipsToSend, targetPlanet);
        //         sendableShips -= shipsToSend;
        //     }                    
        //     // }
        }
    }
}

exports.Universe = Universe;