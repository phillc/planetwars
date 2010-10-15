var vows = require('vows'),
    assert = require('assert');

var Fleet = require('../Fleet').Fleet;

vows.describe('Fleet').addBatch({
    'A Fleet' : {
        'arriveBy()' : {
            'when 6 turns remaining ' : {
                topic: new Fleet({ remaining: 6 }),
                'for 4 is false' : function(fleet) {
                    assert.isFalse(fleet.arriveBy(4));
                },
                'for 6 is true' : function(fleet) {
                    assert.isTrue(fleet.arriveBy(6));
                },
                'for 7 is true' : function(fleet) {
                    assert.isTrue(fleet.arriveBy(7));
                }
            }
        }
    }
}).export(module);