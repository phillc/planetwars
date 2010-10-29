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
            assert.isTrue(new Planet({owner : players.me}).isOwnedBy(players.me));
        },
        'should return false if the planet is owned by me and I give it the opponent' : function() {
            assert.isFalse(new Planet({owner : players.me}).isOwnedBy(players.opponent));
        },
        'should return false if the planet is neutral and I give it me' : function() {
            assert.isFalse(new Planet({owner : players.neutral}).isOwnedBy(players.me));
        },
        'should return true if the planet is owned by the opponent and I give it the opponent' : function() {
            assert.isTrue(new Planet({owner : players.opponent}).isOwnedBy(players.opponent));
        },
    },
    'isNeutral' : {
        'should return true if the planet is owned by the neutral player' : function() {
            assert.isTrue(new Planet({owner : players.neutral}).isNeutral());
        },
        'should return false if the planet is owned by me' : function() {
            assert.isFalse(new Planet({owner : players.me}).isNeutral());
        }
    },
    'addIncomingForce' : {
        'should add a force if it is for a planet of the same player' : function() {
            var planet = new Planet({owner : players.enemy});
            planet.addIncomingForce(players.enemy, 50, 5);
            assert.equal(planet.getIncomingForces(players.enemy, 5), 50);
        },
        'should add a force if it is for a planet of the opposing player' : function() {
            var planet = new Planet({owner : players.enemy});
            planet.addIncomingForce(players.me, 50, 5);
            assert.equal(planet.getIncomingForces(players.me, 5), 50);
        },
        'should add a force for all players' : function() {
            var planet = new Planet({owner : players.opponent});
            planet.addIncomingForce(players.me, 45, 5);
            planet.addIncomingForce(players.opponent, 45, 5);
            assert.equal(planet.getIncomingForces(players.me, 5), 45);
            assert.equal(planet.getIncomingForces(players.opponent, 5), 45);
        },
        'should add several forces for the same player' : function() {
            var planet = new Planet({owner : players.enemy})
            planet.addIncomingForce(players.me, 100, 5);
            planet.addIncomingForce(players.me, 100, 5);
            planet.addIncomingForce(players.me, 400, 3);
            assert.equal(planet.getIncomingForces(players.me, 5), 200);
            assert.equal(planet.getIncomingForces(players.me, 3), 400);
            assert.equal(planet.getIncomingForces(players.opponent, 5), 0);
            assert.equal(planet.getIncomingForces(players.opponent, 3), 0);
            assert.equal(planet.getIncomingForces(players.opponent, 2), 0);
        }
    },
}).export(module);
