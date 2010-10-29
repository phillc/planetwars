var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet;

vows.describe('Planet').addBatch({
    'getShips' : {
        'should return the number of ships' : function() {
            var planet = Planet({ships : 5});
            assert.equal(planet.getShips(), 5);
        }
    },
    'getOwner' : {
        'should return the owner' : function() {
            var planet = Planet({owner : 4});
            assert.equal(planet.getOwner(), 4);
        }
    },
    'getId' : {
        'should return the id' : function() {
            var planet = Planet({id : 13});
            assert.equal(planet.getId(), 13);
        }
    }
}).export(module);
