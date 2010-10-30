var vows = require('vows'),
    assert = require('assert');

var network = require('../network'),
    activation = network.activation;

vows.describe('activation function').addBatch({
    'of 0 is 0' : function() {
        assert.equal(activation(0), 0)
    },
    'of 2 is greater than 0.5' : function() {
        assert.isTrue(activation(2) > 0.5)
    },
    'of 6 is close to 1' : function() {
        assert.isTrue(activation(6) > 0.9)
        assert.isTrue(activation(6) < 1)
    },
    'of 500 is 1' : function() {
        assert.equal(activation(500), 1)
    },
    'of -2 is less than -0.5' : function() {
        assert.isTrue(activation(-2) < -0.5)
    },
    'of -6 is close to -1' : function() {
        assert.isTrue(activation(-6) > -1)
        assert.isTrue(activation(-6) < -0.9)
    },
    'of -500 is -1' : function() {
        assert.equal(activation(-500), -1)
    }
}).export(module);