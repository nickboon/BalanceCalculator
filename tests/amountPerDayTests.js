/* eslint-disable quotes */
var test = require('tape');
var amountPerDay = require('../js/balance.js').amountPerDay;

test('amountPerDay() given a weekly credit entry', (assert) => {
    var credit = 7;
    var expected = 1;

    var actual = amountPerDay({
        "amount": credit,
        "cycles": "week"
    });

    assert.equal(actual, expected, 'should return that amount per day');
    assert.end();
});

test('amountPerDay() given an n weekly credit entry', (assert) => {
    var credit = 14;
    var n = 2;
    var expected = 1;

    var actual = amountPerDay({
        "amount": credit,
        "every": n,
        "cycles": "week"
    });

    assert.equal(actual, expected, 'should return that amount per day');
    assert.end();
});

test('amountPerDay() given an amount which is not of type string', (assert) => {
    assert.throws(() => amountPerDay({
        "amount": "0"
    }), 'should throw an exception');
    assert.end();
});

test('amountPerDay() given an amount of 0', (assert) => {
    assert.doesNotThrow(() => amountPerDay({
        "amount": 0
    }), 'should not throw an exception');
    assert.end();
});