var test = require('tape');
var getBalance = require('../js/balance.js').getBalance;

test('getBalance() with null argument', (assert) => {
    assert.throws(() => getBalance(), 'should throw an exception');
    assert.end();
});

test('getBalance() given null', (assert) => {
    assert.throws(function() {
        getBalance(null);
    }, 'should throw an exception');
    assert.end();
});

test('getBalance() given object with no credit or debit entries', (assert) => {
    var expected = 0;

    var actual = getBalance({});

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});

/* eslint-disable quotes */

test('getBalance() given a single credit entry', (assert) => {
    var expected = 10;

    var actual = getBalance({
        "credit": [{
            "amount": expected
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('getBalance() given a single debit entry', (assert) => {
    var debit = 10;
    var expected = -debit;

    var actual = getBalance({
        "debit": [{
            "amount": debit
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('getBalance() given equal debit and credit entries', (assert) => {
    var amount = 10;
    var expected = 0;

    var actual = getBalance({
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