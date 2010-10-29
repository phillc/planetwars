var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet;

vows.describe('Planet').addBatch({
    'getShips' : {
        'should return the number of ships' : function() {
            var planet = new Planet({ships : 5});
            assert.equal(planet.getShips(), 5);
        }
    },
    'getOwner' : {
        'should return the owner' : function() {
            var planet = new Planet({owner : 4});
            assert.equal(planet.getOwner(), 4);
        }
    },
    'getId' : {
        'should return the id' : function() {
            var planet = new Planet({id : 13});
            assert.equal(planet.getId(), 13);
        }
    },
    'distanceFrom' : {
        'should return  euclidean distance for planet at (14.2884238258,0.622568806433) to planet at (23.6079911509,11.6215535875)' : function() {
            var planet1 = new Planet({ x : 14.2884238258, y : 0.622568806433 });
            var planet2 = new Planet({ x: 23.6079911509, y : 11.6215535875});
            assert.equal(planet1.distanceFrom(planet2), 15);
        }
    }
}).export(module);
