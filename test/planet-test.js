var vows = require('vows'),
    assert = require('assert');

var Planet = require('../Planet').Planet,
    Fleet = require('../Fleet').Fleet;

vows.describe('Planet').addBatch({
    'A Planet' : {
        'effectiveDefensiveValue()' : {
            'when the growth rate is 3 and 2 ships are already there,' : {
                topic: function(){
                    return new Planet(null, null, null, 1, 2, 3);
                },
                'right now is 2' : function(planet){
                    assert.equal(planet.effectiveDefensiveValue(), 2);
                },
                'in 3 turns is 11' : function(planet) {
                    assert.equal(planet.effectiveDefensiveValue(3), 11);
                },
                'when 5 enemy ships are 4 turns away' : {
                    topic : function(planet){
                        planet.addEnemyIncomingFleet(new Fleet(null, 1, 5, null, null, null, 4));
                        return planet;
                    },
                    'right now is 2' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(), 2);
                    },
                    'in 3 turns is 11' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(3), 11);
                    },
                    'in 4 turns is 9' : function(planet) {
                        assert.equal(planet.effectiveDefensiveValue(4), 9);
                    }
                },
                'when ships are reinforcing' : {
                    
                },
                'when tons of shit happens' : {
                
                }
            }
        }
    }
}).export(module);