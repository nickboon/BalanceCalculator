const test = require('tape');
const getBalancePerDay = require('../js/balance.js').getBalancePerDay;

test('getBalancePerDay() with null argument', assert => {
    assert.throws(() => getBalancePerDay(), 'should throw an exception');
    assert.end();
});

test('getBalancePerDay() given null', assert => {
    assert.throws(function() {
        getBalancePerDay(null);
    }, 'should throw an exception');
    assert.end();
});

test('getBalancePerDay() given object with no credit or debit entries', assert => {
    const expected = 0;

    const actual = getBalancePerDay({});

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});

test('getBalancePerDay() given a single credit entry', assert => {
    const expected = 10;

    const actual = getBalancePerDay({
        credit: [{
            amount: expected
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('getBalancePerDay() given a single debit entry', assert => {
    const debit = 10;
    const expected = -debit;

    const actual = getBalancePerDay({
        debit: [{
            amount: debit
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('getBalancePerDay() given equal debit and credit entries', assert => {
    const amount = 10;
    const expected = 0;

    const actual = getBalancePerDay({
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