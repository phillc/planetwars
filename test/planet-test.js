var vows = require('vows'),
    assert = require('assert');

var Planet = require('../Planet').Planet,
    Fleet = require('../Fleet').Fleet;

vows.describe('Planet effectiveDefensiveValue()').addBatch({
    'when the growth rate is 3 and 2 ships are already there,' : {
        topic: function(){
            return new Planet(null, null, null, null, 2, 3);
        },
        'right now is 2' : function(planet){
            assert.equal(planet.effectiveDefensiveValue(), 2);
        },
        'in 3 turns is 11' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(3), 11);
        }
    }
}).addBatch({
    'when the growth rate is 3, 2 ships are already there, and a fleet of 5 enemy ships are 4 turns away' : {
        topic : function(){
            planet = new Planet(null, null, null, null, 2, 3);
            planet.addEnemyIncomingFleet(new Fleet(null, null, 5, null, null, null, 4));
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
}).addBatch({
    'when the growth rate is 3, 2 ships are already there, and 9 ships are reinforcing in 3 turns' : {
        topic : function(){
            planet = new Planet(null, null, null, null, 2, 3);
            planet.addFriendlyIncomingFleet(new Fleet(null, null, 9, null, null, null, 3));
            return planet;
        },
        'right now is 2' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(), 2);
        },
        'in 3 turns is 20' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(3), 20);
        },
    }
}).addBatch({
    'when the growth rate is 5, 15 ships are already there, 20 enemy ships are 4 turns away, and 10 ships are reinforcing in 3 turns' : {
        topic : function() {
            planet = new Planet(null, null, null, null, 15, 5);
            planet.addFriendlyIncomingFleet(new Fleet(null, null, 10, null, null, null, 3));
            planet.addEnemyIncomingFleet(new Fleet(null, null, 20, null, null, null, 4));
            return planet;
        },
        'right now is 15' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(), 15);
        },
        'in 3 turns is 40' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(3), 40);
        },
        'in 4 turns is 25' : function(planet) {
            assert.equal(planet.effectiveDefensiveValue(4), 25);
        }
    }
}).addBatch({
    'when the planet is neutral' : {
        'and the growth rate is 3, and 2 ships are already there' : {
            topic: new Planet(null, null, null, 0, 2, 3),
            'right now is 2' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(), 2);
            },
            'next turn is 2' : function(planet) {
                assert.equal(planet.effectiveDefensiveValue(1), 2);
            }
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
        'is 15' : function(distance){
            assert.equal(distance, 15);
        }
    }
}).export(module)