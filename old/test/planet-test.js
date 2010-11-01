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