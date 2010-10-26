var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet;

vows.describe('Planet effectiveDefensiveValue()').addBatch({
    'when the growth rate is 3 and 2 ships are already there,' : {
        'and it is mine' : {
            topic: function(){
                return new Planet(null, null, null, 1, 2, 3);
            },
            'right now should be equal to the number of ships' : function(planet){
                assert.equal(planet.effectiveDefensiveValue(), 2);
            },
            'in 3 turns should be the number of ships + turns * growth rate' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(3), 11);
            }
        },
        'and it is the enemys' : {
            topic: function(){
                return new Planet(null, null, null, 2, 2, 3);
            },
            'right now should be equal to the - number of ships - 1' : function(planet){
                assert.equal(planet.effectiveDefensiveValue(), -3);
            },
            'in 3 turns should be the -1 * number of ships - turns * growth rate - 1' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(3), -12);
            }
        }
    },
    'when there would be zero ships on it' : {
        'and it is mine' : function() {
            var planet = new Planet(null, null, null, 1, 0, 3);
            assert.equal(planet.effectiveDefensiveValue(), 0)
        },
        'and it is neutral' : function() {
            var planet = new Planet(null, null, null, 0, 0, 3);
            assert.equal(planet.effectiveDefensiveValue(), -1)
        },
        'and it it the enemys' : function() {
            var planet = new Planet(null, null, null, 2, 0, 3);
            assert.equal(planet.effectiveDefensiveValue(), -1)
        }
    },
    'when the growth rate is 3, 2 ships are already there, and a fleet of 5 enemy ships are 4 turns away' : {
        'and is mine' : {
            topic : function(){
                planet = new Planet(null, null, null, 1, 2, 3);
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
                planet = new Planet(null, null, null, 2, 2, 3);
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
            planet = new Planet(null, null, null, 1, 2, 3);
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
            planet = new Planet(null, null, null, 1, 15, 5);
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
            topic: new Planet(null, null, null, 0, 2, 3),
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
            var planet = new Planet(null, null, null, 1, 15, 5);
            
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
            var planet = new Planet(null, null, null, 0, 15, 5);
            
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
            var planet = new Planet(null, null, null, 2, 15, 5);
            
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
            var planet = new Planet(null, null, null, 2, 15, 5);
            
            planet.addMyIncomingFleet(1, 20);
            
            assert.equal(planet.effectiveDefensiveValue(1), -1);
            assert.equal(planet.effectiveDefensiveValue(2), -6);
        },
        'should work with a neutral planet at the zero boundary' : function() {
            var planet = new Planet(null, null, null, 0, 15, 5);
            
            planet.addMyIncomingFleet(1, 15);
            planet.addMyIncomingFleet(3, 1);
            
            assert.equal(planet.effectiveDefensiveValue(1), -1);
            assert.equal(planet.effectiveDefensiveValue(2), -1);
            assert.equal(planet.effectiveDefensiveValue(3), 1);
        }
    }
}).export(module);


vows.describe('Planet distanceFrom()').addBatch({
    'planet at (14.2884238258,0.622568806433) to planet at (23.6079911509,11.6215535875)' : {
        topic: function(){
            var planet1 = new Planet(null, 14.2884238258, 0.622568806433, null, null, null);
            var planet2 = new Planet(null, 23.6079911509, 11.6215535875, null, null, null);
            return planet1.distanceFrom(planet2);
        },
        'should be calculated using euclidean distance' : function(distance){
            assert.equal(distance, 15);
        }
    }
}).export(module);

vows.describe('Planet expendableShipsWithoutReinforce()').addBatch({
    'when the growth rate is 4 and 16 ships are already there,' : {
        'should be the number of ships' : function() {
            var planet = new Planet(null, null, null, 1, 16, 4);
            assert.equal(planet.expendableShipsWithoutReinforce(), 16);
        },
        'and there are 20 enemy ships 3 turns away' : {
            'should be the number of ships + (turns away * growth) - enemy ships' : function() {
                var planet = new Planet(null, null, null, 1, 16, 4);
                planet.addEnemyIncomingFleet(3, 20);
                assert.equal(planet.expendableShipsWithoutReinforce(), 8);
            },
            'and there are 5 friendly ships 2 turns away' : {
                'should be the number of ships + (turns away * growth) - enemy ships + friendly ships' : function() {
                    var planet = new Planet(null, null, null, 1, 16, 4);
                    planet.addEnemyIncomingFleet(3, 20);
                    planet.addMyIncomingFleet(2, 5);
                    assert.equal(planet.expendableShipsWithoutReinforce(), 13);
                }
            }
        }
    },
    'should not be greater than the current number of ships' : function() {
        var planet = new Planet(null, null, null, 1, 2, 5);
        planet.addEnemyIncomingFleet(16, 26);
        assert.equal(planet.expendableShipsWithoutReinforce(), 2);
    },
    'when an enemy fleet would set my planet to 0 ships, and another enemy fleet is incoming later' : {
        'should take into account the zero boundary' : function() {
            var planet = new Planet(null, null, null, 1, 10, 5);
            planet.addEnemyIncomingFleet(3, 25);
            planet.addEnemyIncomingFleet(5, 5);
            assert.equal(planet.expendableShipsWithoutReinforce(), 0);
        }
    }
}).export(module);

vows.describe('Planet considerSendingTo()').addBatch({
    'when given the same planet' : {
        topic : function() {
            var planet = new Planet(42, 3, 5, null, 32, 4);
            return planet.considerSendingTo(planet, [], []);
        },
        'the values computed' : {
            topic : function(tuple) {
                return tuple[2];
            },
            'should know it is its self' : function(values) {
                assert.equal(values.isSelf, 1);
            },
            'should not consider the ships that are already on the planet' : function(values) {
                assert.equal(values.shipsDocked, 0)
            }
        }
    },
    'when given another planet' : {
        topic : function() {
            var fromPlanet = new Planet(42, 0, 0, 1, 32, 4);
            var toPlanet = new Planet(43, 5, 3, 2, 32, 4);
            
            closeFriendly = new Planet(44, 13, 15, null, 13, 4);
            assert.equal(toPlanet.distanceFrom(closeFriendly), 15)
            
            closerFriendly = new Planet(45, 9, 11, null, 12, 3);
            assert.equal(toPlanet.distanceFrom(closerFriendly), 9)
            
            closestFriendly = new Planet(47, 5, 7, null, 122, 5);
            assert.equal(toPlanet.distanceFrom(closestFriendly), 4)
            
            farFriendly = new Planet(48, 32, 32, null, 100, 5);
            assert.equal(toPlanet.distanceFrom(farFriendly), 40)
            
            var friendlyPlanets = [closestFriendly, closerFriendly, closeFriendly, farFriendly];
            
            closeEnemy = new Planet(46, 14, 12, null, 3, 2);
            assert.equal(toPlanet.distanceFrom(closeEnemy), 13)
            
            closerEnemy = new Planet(49, 10, 8, null, 5, 2);
            assert.equal(toPlanet.distanceFrom(closerEnemy), 8)
            
            closestEnemy = new Planet(50, 6, 4, null, 13, 2);
            assert.equal(toPlanet.distanceFrom(closestEnemy), 2)
            
            farEnemy = new Planet(51, 32, 32, null, 32, 2);
            assert.equal(toPlanet.distanceFrom(farEnemy), 40)
            
            var enemyPlanets = [closestEnemy, closerEnemy, closeEnemy, farEnemy];
            return fromPlanet.considerSendingTo(toPlanet, friendlyPlanets, enemyPlanets);
        },
        'the values computed' : {
            topic : function(tuple) {
                return tuple[2]
            },
            'should know it is not self' : function(values) {
                assert.equal(values.isSelf, -1);
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
            'cannot take the planet now' : function(values) {
                assert.equal(values.canTakeRightNow, -1);
            },
            'should return the distance between the two' : function(values) {
                assert.equal(values.distance, 6)
            },
            'enemys planet is effectivelyEnemy' : function(values) {
                assert.equal(values.isEffectivelyEnemy, 1)
            }
        }
    }
}).export(module);

vows.describe('Planet isEffectivelyEnemy()').addBatch({
    'should be true for an unthreatened enemy planet' : function() {
        var planet = new Planet(null, null, null, 2, 1, 1);
        assert.isTrue(planet.isEffectivelyEnemy());
    },
    'should be false for an unthreatened friendly planet' : function() {
        var planet = new Planet(null, null, null, 1, 1, 1);
        assert.isFalse(planet.isEffectivelyEnemy());
    }
}).export(module);

vows.describe('Planet isSamePlanet()').addBatch({
    'should be true when given the same planet' : function() {
        var planet = new Planet(1, null, null, null, null, null);
        assert.isTrue(planet.isSamePlanet(planet));
    },
    'should be false when given a different planet' : function() {
        var planet1 = new Planet(1, null, null, null, null, null);
        var planet2 = new Planet(2, null, null, null, null, null);
        assert.isFalse(planet1.isSamePlanet(planet2));
    }
}).export(module);