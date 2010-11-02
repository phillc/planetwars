var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet,
    Universe = require('../Universe').Universe,
    players = require('../players');

vows.describe('Universe').addBatch({
    'planets by owner' : {
        topic : function() {
            var planets = [ Planet({owner : players.me}),
                            Planet({owner : players.opponent}),
                            Planet({owner : players.opponent}),
                            Planet({owner : players.opponent}),
                            Planet({owner : players.neutral}),
                            Planet({owner : players.neutral}),
                            Planet({owner : players.opponent}) ];
            return Universe(planets);
        },
        'planetsOwnedBy' : {
            'should split up my planets' : function(universe) {
                assert.equal(universe.planetsOwnedBy(players.me).length, 1);
            },
            'should split up neutral planets' : function(universe) {
                assert.equal(universe.planetsOwnedBy(players.neutral).length, 2);
            },
            'should split up opponent planets' : function(universe) {
                assert.equal(universe.planetsOwnedBy(players.opponent).length, 4);
            }
        },
        'planetsNotOwnedBy' : {
            'should return neutral and opponent planets for me' : function(universe) {
                assert.equal(universe.planetsNotOwnedBy(players.me).length, 6)
            },
            'should return neutral and my planets for opponent' : function(universe) {
                assert.equal(universe.planetsNotOwnedBy(players.opponent).length, 3)
            }
        },
    },

    'closestPlanetsTo' : {
        'should return the planets sorted by distance from the given planet' : function(universe) {
            var fromPlanet = Planet({id : 0, x : 0, y : 0});
            var planet6 = Planet({id : 6, x : 20, y : 1});
            var planet4 = Planet({id : 4, x : 1, y : 30});
            var planet1 = Planet({id : 1, x : 50, y : 10});
            var planet2 = Planet({id : 2, x : 60, y : 10});
            var planet5 = Planet({id : 5, x : 100, y : 100});
            var planet3 = Planet({id : 3, x : 100, y : 400});
            var universe = Universe([fromPlanet, planet1, planet2, planet3, planet4, planet5, planet6]);
            
            var results = universe.closestPlanetsTo(fromPlanet);
            assert.equal(results[0].getId(), planet6.getId());
            assert.isTrue(results[0].isSamePlanet(planet6));
            
            assert.equal(results[1].getId(), planet4.getId());
            assert.isTrue(results[1].isSamePlanet(planet4));
            
            assert.equal(results[2].getId(), planet1.getId());
            assert.isTrue(results[2].isSamePlanet(planet1));
            
            assert.equal(results[3].getId(), planet2.getId());
            assert.isTrue(results[3].isSamePlanet(planet2));
            
            assert.equal(results[4].getId(), planet5.getId());
            assert.isTrue(results[4].isSamePlanet(planet5));
            
            assert.equal(results[5].getId(), planet3.getId());
            assert.isTrue(results[5].isSamePlanet(planet3));
        }
    },
    'closestPlanetsToOwnedBy' : {
        'should return the planets sorted by distance from the given planet' : function(universe) {
            var fromPlanet = Planet({owner : players.opponent, id : 0, x : 0, y : 0});
            var planet6 = Planet({owner : players.opponent, id : 6, x : 20, y : 1});
            var planet4 = Planet({owner : players.me, id : 4, x : 1, y : 30});
            var planet1 = Planet({owner : players.opponent, id : 1, x : 50, y : 10});
            var planet2 = Planet({owner : players.me, id : 2, x : 60, y : 10});
            var planet5 = Planet({owner : players.opponent, id : 5, x : 100, y : 100});
            var planet3 = Planet({owner : players.me, id : 3, x : 100, y : 400});
            var universe = Universe([fromPlanet, planet1, planet2, planet3, planet4, planet5, planet6]);
            
            var opponentResults = universe.closestPlanetsToOwnedBy(fromPlanet, players.opponent);
            var meResults = universe.closestPlanetsToOwnedBy(fromPlanet, players.me);
            
            assert.equal(opponentResults[0].getId(), planet6.getId());
            assert.isTrue(opponentResults[0].isSamePlanet(planet6));
            assert.equal(opponentResults[1].getId(), planet1.getId());
            assert.isTrue(opponentResults[1].isSamePlanet(planet1));
            assert.equal(opponentResults[2].getId(), planet5.getId());
            assert.isTrue(opponentResults[2].isSamePlanet(planet5));
            
            assert.equal(meResults[0].getId(), planet4.getId());
            assert.isTrue(meResults[0].isSamePlanet(planet4));
            assert.equal(meResults[1].getId(), planet2.getId());
            assert.isTrue(meResults[1].isSamePlanet(planet2));
            assert.equal(meResults[2].getId(), planet3.getId());
            assert.isTrue(meResults[2].isSamePlanet(planet3));
        }
    },
}).export(module);
