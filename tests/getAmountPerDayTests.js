var test = require('tape');
var getAmountPerDay = require('../js/balance.js').getAmountPerDay;

/* eslint-disable quotes */

test('getAmountPerDay() given a weekly credit entry', (assert) => {
    var expected = 1;

    var actual = getAmountPerDay({
        "amount": 7,
        "cycle": "week"
    });

    assert.equal(actual, expected, 'should return the correct amount per day');
    assert.end();
});

test('getAmountPerDay() given an fortnightly credit entry', (assert) => {
    var expected = 1;

    var actual = getAmountPerDay({
        "amount": 14,
        "every": 2,
        "cycle": "week"
    });

    assert.equal(actual, expected, 'should return the correct amount per day');
    assert.end();
});

test('getAmountPerDay() given an amount which is not of type number', (assert) => {
    assert.throws(() => getAmountPerDay({
        "amount": "0"
    }), 'should throw an exception');
    assert.end();
});

test('getAmountPerDay() given an amount of 0', (assert) => {
    assert.doesNotThrow(() => getAmountPerDay({
        "amount": 0
    }), 'should not throw an exception');
    assert.end();
});