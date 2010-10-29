var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet,
    players = require('../Players');

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
        'should return euclidean distance for planet at (14.2884238258,0.622568806433) to planet at (23.6079911509,11.6215535875)' : function() {
            var planet1 = new Planet({ x : 14.2884238258, y : 0.622568806433 });
            var planet2 = new Planet({ x: 23.6079911509, y : 11.6215535875});
            assert.equal(planet1.distanceFrom(planet2), 15);
        }
    },
    'isOwnedBy' : {
        'should return true if the planet is owned by me and I give it me' : function() {
            assert.isTrue(new Planet({owner : players.me}).isOwnedBy(players.me))
        },
        'should return false if the planet is owned by me and I give it the opponent' : function() {
            assert.isFalse(new Planet({owner : players.me}).isOwnedBy(players.opponent))
        },
        'should return false if the planet is neutral and I give it me' : function() {
            assert.isFalse(new Planet({owner : players.neutral}).isOwnedBy(players.me))
        },
        'should return true if the planet is owned by the opponent and I give it the opponent' : function() {
            assert.isTrue(new Planet({owner : players.opponent}).isOwnedBy(players.opponent))
        },
    },
    'addIncomingFleet' : {
        'should add a friendly fleet if it is for a planet of the same player' : function() {
            
        }
        
    },
}).export(module);
