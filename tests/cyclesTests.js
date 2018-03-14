var test = require('tape');
var cycles = require('../js/cycles.js');

test('cycles() given a weekly credit entry', (assert) => {
    var credit = 7;
    var expected = 1;

    var actual = cycles({
        "amount": credit,
        "cycles": "week"
    });

    assert.equal(actual, expected, 'should return that amount per day');
    assert.end();
});

test('cycles() given an n weekly credit entry', (assert) => {
    var credit = 14;
    var n = 2
    var expected = 1;

    var actual = cycles({
        "amount": credit,
        "every": n,
        "cycles": "week"
    });

    assert.equal(actual, expected, 'should return that amount per day');
    assert.end();
});

test('cycles() given an amount which is not of type string', (assert) => {
    assert.throws(() => cycles({
        "amount": "0"
    }), 'should throw an exception');
    assert.end();
});

test('cycles() given an amount of 0', (assert) => {
    assert.doesNotThrow(() => cycles({
        "amount": 0
    }), 'should not throw an exception');
    assert.end();
});