const test = require('tape');
const getBalance = require('../js/balance.js').getBalance;

test('getBalance() with null argument', assert => {
    assert.throws(() => getBalance(), 'should throw an exception');
    assert.end();
});

test('getBalance() given null', assert => {
    assert.throws(function() {
        getBalance(null);
    }, 'should throw an exception');
    assert.end();
});

test('getBalance() given object with no credit or debit entries', assert => {
    const expected = 0;

    const actual = getBalance({});

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});

test('getBalance() given a single credit entry', assert => {
    const expected = 10;

    const actual = getBalance({
        credit: [{
            amount: expected
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('getBalance() given a single debit entry', assert => {
    const debit = 10;
    const expected = -debit;

    const actual = getBalance({
        debit: [{
            amount: debit
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('getBalance() given equal debit and credit entries', assert => {
    const amount = 10;
    const expected = 0;

    const actual = getBalance({
        debit: [{
            amount: amount
        }],
        credit: [{
            amount: amount
        }]
    });

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});