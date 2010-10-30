var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Planet = require('../Planet').Planet,
    Universe = require('../Universe').Universe,
    players = require('../players');

vows.describe('Universe').addBatch({
    'getPlanetsByOwner' : {
        topic : function() {
            var planets = [ Planet({owner : players.me}),
                            Planet({owner : players.opponent}),
                            Planet({owner : players.opponent}),
                            Planet({owner : players.neutral}),
                            Planet({owner : players.neutral}),
                            Planet({owner : players.opponent}) ];
            return Universe(planets);
        },
        'should split up my planets' : function(universe) {
            assert.equal(universe.getPlanetsByOwner(players.me).length, 1);
        },
        'should split up neutral planets' : function(universe) {
            assert.equal(universe.getPlanetsByOwner(players.neutral).length, 2);
        },
        'should split up opponent planets' : function(universe) {
            assert.equal(universe.getPlanetsByOwner(players.opponent).length, 3);
        }
    }
}).export(module);
