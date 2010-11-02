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
    'planetsOwnedByWithNegativeShipBalance' : {
        'should return planets owned by that player with a negative balance' : function() {
            var myPlanetPositive = Planet({id : 5, owner : players.me, ships : 10});
            assert.isTrue(myPlanetPositive.shipBalance() > 0);
            
            var myPlanetNegative1 = Planet({id : 8, owner : players.me, ships : 10, growth : 5});
            myPlanetNegative1.addIncomingForce(players.opponent, 50, 2);
            assert.isTrue(myPlanetNegative1.shipBalance() < 0);
            
            var myPlanetNegative2 = Planet({id : 13, owner : players.me, ships : 10, growth : 5});
            myPlanetNegative2.addIncomingForce(players.opponent, 50, 2);
            assert.isTrue(myPlanetNegative2.shipBalance() < 0);
            
            var enemyPlanetNegative = Planet({id : 9, owner : players.opponent, ships : 10, growth: 5});
            enemyPlanetNegative.addIncomingForce(players.me, 50, 2);
            assert.isTrue(enemyPlanetNegative.shipBalance() < 0);
            
            
            var planets = [ Planet({owner : players.me}),
                            Planet({owner : players.opponent}),
                            myPlanetNegative2,
                            enemyPlanetNegative,
                            Planet({owner : players.neutral}),
                            myPlanetPositive,
                            myPlanetNegative1 ];
            
            
            var universe = Universe(planets);
            var getIds = function(planet){return planet.getId()}
            var result = _.map(universe.planetsOwnedByWithNegativeShipBalance(players.me), getIds).sort();
            var expected = _.map([myPlanetNegative1, myPlanetNegative2], getIds).sort();
            assert.deepEqual(result, expected);
        }
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
            
            assert.equal(universe.closestPlanetsTo(fromPlanet)[0].getId(), planet6.getId());
            assert.isTrue(universe.closestPlanetsTo(fromPlanet)[0].isSamePlanet(planet6));
            
            assert.equal(universe.closestPlanetsTo(fromPlanet)[1].getId(), planet4.getId());
            assert.isTrue(universe.closestPlanetsTo(fromPlanet)[1].isSamePlanet(planet4));
            
            assert.isTrue(universe.closestPlanetsTo(fromPlanet)[2].isSamePlanet(planet1));
            assert.equal(universe.closestPlanetsTo(fromPlanet)[2].getId(), planet1.getId());
            
            assert.isTrue(universe.closestPlanetsTo(fromPlanet)[3].isSamePlanet(planet2));
            assert.equal(universe.closestPlanetsTo(fromPlanet)[3].getId(), planet2.getId());
            
            assert.isTrue(universe.closestPlanetsTo(fromPlanet)[4].isSamePlanet(planet5));
            assert.equal(universe.closestPlanetsTo(fromPlanet)[4].getId(), planet5.getId());
            
            assert.isTrue(universe.closestPlanetsTo(fromPlanet)[5].isSamePlanet(planet3));
            assert.equal(universe.closestPlanetsTo(fromPlanet)[5].getId(), planet3.getId());
        }
    },
}).export(module);
