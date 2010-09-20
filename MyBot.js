/*
// The DoTurn function is where your code goes. The PlanetWars object contains
// the state of the game, including information about all planets and fleets
// that currently exist. Inside this function, you issue orders using the
// pw.IssueOrder() function. For example, to send 10 ships from planet 3 to
// planet 8, you would say pw.IssueOrder(3, 8, 10).
//
// There is already a basic strategy in place here. You can use it as a
// starting point, or you can throw it out entirely and replace it with your
// own. Check out the tutorials and articles on the contest website at
// http://www.ai-contest.com/resources.
*/

var PlanetWars = require('./PlanetWars');

var distance = function(a, b){
    var x1 = a.x;
    var y1 = a.y;
    var x2 = b.x;
    var y2 = b.y
    return sqrt(abs(x2 - x1)^2 + abs(y2-y1)^2);
}

function DoTurn(pw) {
    var myPlanets = pw.myPlanets;
    var myPlanetsByScore = myPlanets.slice(0) //copy array
    myPlanetsByScore.sort(function(a, b){
        (a.ships / (1 + a.growth)) - (b.ships / (1 + b.growth))
    })
    
    for(var planetNum in myPlanetsByScore) {
        myPlanetsByScore[planetNum]
    }
    

    // (4) Send half the ships from my strongest planet to the weakest
    // planet that I do not own.
    if ( source >= 0 && dest >= 0 ) {
        numShips = Math.floor(sourceShips / 2);
        pw.issueOrder(source, dest, numShips);
    }
}

// Play the game with my bot
PlanetWars.Play(DoTurn);
