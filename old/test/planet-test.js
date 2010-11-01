var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet;

vows.describe('Planet effectiveDefensiveValue()').addBatch({

    'when there would be zero ships on it' : {
        'and it is mine' : function() {
            var planet = new Planet({ owner : 1,
                                ships : 0,
                                growth : 3 });
            assert.equal(planet.effectiveDefensiveValue(), 0)
        },
        'and it is neutral' : function() {
            var planet = new Planet({ owner : 0,
                                ships : 0,
                                growth : 3 });
            assert.equal(planet.effectiveDefensiveValue(), -1)
        },
        'and it it the enemys' : function() {
            var planet = new Planet({ owner : 2,
                                ships : 0,
                                growth : 3 });
            assert.equal(planet.effectiveDefensiveValue(), -1)
        }
    },
    'when the growth rate is 3, 2 ships are already there, and a fleet of 5 enemy ships are 4 turns away' : {
        'and is mine' : {
            topic : function(){
                var planet = new Planet({ owner : 1,
                                    ships : 2,
                                    growth : 3 });
                planet.addEnemyIncomingFleet(4, 5);
                return planet;
            },
            'right now should be equal to the number of ships' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(), 2);
            },
            'in 3 turns should be the number of ships + turns * growth rate' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(3), 11);
            },
            'in 4 turns should be the number of ships + turns * growth rate - enemy ships' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(4), 9);
            }
        },
        'and is the enemys' : {
            topic : function(){
                var planet = new Planet({ owner : 2,
                                    ships : 2,
                                    growth : 3 });
                planet.addEnemyIncomingFleet(4, 5);
                return planet;
            },
            'right now should be equal to the - number of ships' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(), -3);
            },
            'in 3 turns should be negative the number of ships + turns * growth rate' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(3), -12);
            },
            'in 4 turns should be negative the number of ships + turns * growth rate - enemy ships' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(4), -20);
            }
        },
    },
    'when the growth rate is 3, 2 ships are already there, and 9 ships are reinforcing in 3 turns' : {
        topic : function(){
            var planet = new Planet({ owner : 1,
                                ships : 2,
                                growth : 3 });
            planet.addMyIncomingFleet(3, 9);
            return planet;
        },
        'right now should be equal to the number of ships' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(), 2);
        },
        'in 3 turns should be the number of ships + turns * growth rate + friendly ships' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(3), 20);
        },
    },
    'when the growth rate is 5, 15 ships are already there, 20 enemy ships are 4 turns away, and 10 ships are reinforcing in 3 turns' : {
        topic : function() {
            var planet = new Planet({ owner : 1,
                                ships : 15,
                                growth : 5 });
            planet.addMyIncomingFleet(3, 10);
            planet.addEnemyIncomingFleet(4, 20);
            return planet;
        },
        'right now should be equal to the number of ships' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(), 15);
        },
        'in 3 turns should be the number of ships + turns * growth rate + friendly ships' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(3), 40);
        },
        'in 4 turns should the number of ships + turns * growth rate + friendly ships - enemy ships' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(4), 25);
        }
    },
    'when the planet is neutral' : {
        'and the growth rate is 3, and 2 ships are already there' : {
            topic : new Planet({ owner : 0,
                                ships : 2,
                                growth : 3 }),
            'right now should be equal to negative the number of ships - 1' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(), -3);
            },
            'next turn should be equal to negative the number of ships - 1' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(1), -3);
            }
        }
    },
    'when the planet switches ownership' : {
        'should work with friendly planets' : function() {
            var planet = new Planet({ owner : 1,
                                ships : 15,
                                growth : 5 });
            
            planet.addEnemyIncomingFleet(1, 25);
            planet.addMyIncomingFleet(4, 25);
            
            assert.equal(planet.effectiveDefensiveValue(), 15);
            assert.equal(planet.effectiveDefensiveValue(1), -6);
            assert.equal(planet.effectiveDefensiveValue(2), -11);
            assert.equal(planet.effectiveDefensiveValue(3), -16);
            assert.equal(planet.effectiveDefensiveValue(4), 5);
            assert.equal(planet.effectiveDefensiveValue(5), 10);
        },
        'should work with neutral planets' : function() {
            var planet = new Planet({ owner : 0,
                                ships : 15,
                                growth : 5 });
            
            planet.addEnemyIncomingFleet(1, 25);
            planet.addMyIncomingFleet(4, 35);
            
            assert.equal(planet.effectiveDefensiveValue(), -16);
            assert.equal(planet.effectiveDefensiveValue(1), -11);
            assert.equal(planet.effectiveDefensiveValue(2), -16);
            assert.equal(planet.effectiveDefensiveValue(3), -21);
            assert.equal(planet.effectiveDefensiveValue(4), 10);
            assert.equal(planet.effectiveDefensiveValue(5), 15);
        },
        'should work with enemy planets' : function() {
            var planet = new Planet({ owner : 2,
                                      ships : 15,
                                      growth : 5 });
            
            planet.addMyIncomingFleet(1, 25);
            planet.addEnemyIncomingFleet(4, 25);
            
            assert.equal(planet.effectiveDefensiveValue(), -16);
            assert.equal(planet.effectiveDefensiveValue(1), 5);
            assert.equal(planet.effectiveDefensiveValue(2), 10);
            assert.equal(planet.effectiveDefensiveValue(3), 15);
            assert.equal(planet.effectiveDefensiveValue(4), -6);
            assert.equal(planet.effectiveDefensiveValue(5), -11);
        },
        'should work with an enemy planet at the zero boundary' : function() {
            var planet = new Planet({ owner : 2,
                                      ships : 15,
                                      growth : 5 });
            
            
            planet.addMyIncomingFleet(1, 20);
            
            assert.equal(planet.effectiveDefensiveValue(1), -1);
            assert.equal(planet.effectiveDefensiveValue(2), -6);
        },
        'should work with a neutral planet at the zero boundary' : function() {
            var planet = new Planet({ owner : 0,
                                      ships : 15,
                                      growth : 5 });
            
            planet.addMyIncomingFleet(1, 15);
            planet.addMyIncomingFleet(3, 1);
            
            assert.equal(planet.effectiveDefensiveValue(1), -1);
            assert.equal(planet.effectiveDefensiveValue(2), -1);
            assert.equal(planet.effectiveDefensiveValue(3), 1);
        }
    }
}).export(module);


vows.describe('Planet expendableShipsWithoutReinforce()').addBatch({

    'should not be greater than the current number of ships' : function() {
        var planet = new Planet({ owner : 1,
                                  ships : 2,
                                  growth : 5 });
        planet.addEnemyIncomingFleet(16, 26);
        assert.equal(planet.expendableShipsWithoutReinforce(), 2);
    },
    'when an enemy fleet would set my planet to 0 ships, and another enemy fleet is incoming later' : {
        'should take into account the zero boundary' : function() {
            var planet = new Planet({ owner : 1,
                                      ships : 10,
                                      growth : 5 });
            planet.addEnemyIncomingFleet(3, 25);
            planet.addEnemyIncomingFleet(5, 5);
            assert.equal(planet.expendableShipsWithoutReinforce(), 0);
        }
    }
}).export(module);

vows.describe('Planet consider()').addBatch({
    'when given another planet' : {
        topic : function() {
            var fromPlanet = new Planet({id:42, x:0, y:0, owner:1, ships:32, growth:4});
            var toPlanet = new Planet({id:43, x:5, y:3, owner:2, ships:32, growth:4});
            
            closeFriendly = new Planet({id:44, x:13, y:15, ships:13, growth:4});
            assert.equal(toPlanet.distanceFrom(closeFriendly), 15)
            
            closerFriendly = new Planet({id:45, x:9, y:11, ships:12, growth:3});
            assert.equal(toPlanet.distanceFrom(closerFriendly), 9)
            
            closestFriendly = new Planet({id:47, x:5, y:7, ships:122, growth:5});
            assert.equal(toPlanet.distanceFrom(closestFriendly), 4)
            
            farFriendly = new Planet({id:48, x:32, y:32, ships:100, growth:5});
            assert.equal(toPlanet.distanceFrom(farFriendly), 40)
            
            var friendlyPlanets = [closestFriendly, closerFriendly, closeFriendly, farFriendly];
            
            closeEnemy = new Planet({id:46, x:14, y:12, ships:3, growth:2});
            assert.equal(toPlanet.distanceFrom(closeEnemy), 13)
            
            closerEnemy = new Planet({id:49, x:10, y:8, ships:5, growth:2});
            assert.equal(toPlanet.distanceFrom(closerEnemy), 8)
            
            closestEnemy = new Planet({id:50, x:6, y:4, ships:13, growth:2});
            assert.equal(toPlanet.distanceFrom(closestEnemy), 2)
            
            farEnemy = new Planet({id:51, x:32, y:32, ships:32, growth:2});
            assert.equal(toPlanet.distanceFrom(farEnemy), 40)
            
            var enemyPlanets = [closestEnemy, closerEnemy, closeEnemy, farEnemy];
            return fromPlanet.consider(friendlyPlanets, enemyPlanets);
        },
        'the values computed' : {
            topic : function(tuple) {
                return tuple[2]
            },
            'should consider the ships that are already on the planet' : function(values) {
                assert.equal(values.shipsDocked, 32)
            },
            'should return distance of 3 closest friendly' : function(values) {
                assert.equal(values.distanceThreeMyPlanets, 28);
            },
            'should return ships of 3 closest friendly' : function(values) {
                assert.equal(values.shipsThreeMyPlanets, 147);
            },
            'should return distance of 3 closest enemy' : function(values) {
                assert.equal(values.distanceThreeEnemyPlanets, 23);
            },
            'should return ships of 3 closest enemy' : function(values) {
                assert.equal(values.shipsThreeEnemyPlanets, 21);
            },
        }
    }
}).export(module);

vows.describe('Planet isEffectivelyEnemy()').addBatch({
    'should be true for an unthreatened enemy planet' : function() {
        var planet = new Planet({ owner : 2,
                                  ships : 1,
                                  growth : 1 });
        assert.isTrue(planet.isEffectivelyEnemy());
    },
    'should be false for an unthreatened friendly planet' : function() {
        var planet = new Planet({ owner : 1,
                                  ships : 1,
                                  growth : 1 });
        assert.isFalse(planet.isEffectivelyEnemy());
    }
}).export(module);

vows.describe('Planet isSamePlanet()').addBatch({
    'should be true when given the same planet' : function() {
        var planet = new Planet({ id : 2 });
        
        assert.isTrue(planet.isSamePlanet(planet));
    },
    'should be false when given a different planet' : function() {
        var planet1 = new Planet({ id : 1 });
        var planet2 = new Planet({ id : 2 });
        assert.isFalse(planet1.isSamePlanet(planet2));
    }
}).export(module);