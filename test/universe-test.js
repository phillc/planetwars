var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var Universe = require('../Universe').Universe,
    Planet = require('../Planet').Planet;

vows.describe('Universe summatePlanets').addBatch({
    'should summate the values returned by each planet' : function() {
        var planets = [ new Planet(null, null, null, 1, 10, null, null),
                        new Planet(null, null, null, 1, 15, null, null),
                        new Planet(null, null, null, 1, 13, null, null) ]
        assert.equal(new Universe(planets).summatePlanets("getShips", "me"), 38);
    }
}).export(module);

vows.describe('Universe countPlanets').addBatch({
    'should count the planets that evaluate true for each planet' : function() {
        var planets = [ new Planet(null, null, null, 1, 10, null, null),
                        new Planet(null, null, null, 1, 15, null, null),
                        new Planet(null, null, null, 1, 13, null, null) ]
        assert.equal(new Universe(planets).countPlanets("isMine", "me"), 3);
    }
}).export(module);
