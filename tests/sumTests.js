/* eslint-disable quotes */
var test = require('tape');
var sum = require('../js/balance.js').sum;

test('sum() with null argument', (assert) => {
    assert.throws(() => sum(), 'should throw an exception');
    assert.end();
});

test('sum() given null', (assert) => {
    assert.throws(function() {
        sum(null);
    }, 'should throw an exception');
    assert.end();
});

test('sum() given object with no credit or debit entries', (assert) => {
    var expected = 0;

    var actual = sum({});

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});

test('sum() given a single credit entry', (assert) => {
    var expected = 10;

    var actual = sum({
        "credit": [{
            "amount": expected
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('sum() given a single debit entry', (assert) => {
    var debit = 10;
    var expected = -debit;

    var actual = sum({
        "debit": [{
            "amount": debit
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('sum() given equal debit and credit entries', (assert) => {
    var amount = 10;
    var expected = 0;

    var actual = sum({
        "debit": [{
            "amount": amount
        }],
        "credit": [{
            "amount": amount
        }]
    });

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});