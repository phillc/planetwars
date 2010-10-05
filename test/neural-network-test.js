var vows = require('vows'),
    assert = require('assert');

var NeuralNetwork = require('../network'),
    sigmoid = NeuralNetwork.sigmoid;

vows.describe('sigmoid function').addBatch({
    'of 0 is 0.5' : function() {
        assert.equal(sigmoid(0), 0.5)
    },
    'of 2 is greater than 0.5' : function() {
        assert.isTrue(sigmoid(2) > 0.5)
    },
    'of 6 is close to 1' : function() {
        assert.isTrue(sigmoid(6) > 0.9)
        assert.isTrue(sigmoid(6) < 1)
    },
    'of -2 is less than 0.5' : function() {
        assert.isTrue(sigmoid(-2) < 0.5)
    },
    'of -6 is close to 0' : function() {
        assert.isTrue(sigmoid(-6) > 0)
        assert.isTrue(sigmoid(-6) < 0.1)
    }
}).export(module);