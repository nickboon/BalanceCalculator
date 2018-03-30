const test = require('tape');
const amountPerDay = require('../js/calculate.js').amountPerDay;
const entryNotObjectError = 'Entry must be an object.';
const amountNotNumberError = 'Amount must be a number.';

test('amountPerDay() given an undefined entry', assert => {
    assert.throws(
        () => amountPerDay(),
        RegExp(entryNotObjectError),
        `should throw ${entryNotObjectError}`
    );
    assert.end();
});

test('amountPerDay() given a null entry', assert => {
    assert.throws(
        function() { amountPerDay(null); },
        RegExp(entryNotObjectError),
        `should throw ${entryNotObjectError}`
    );
    assert.end();
});

test('amountPerDay() given a weekly credit entry', assert => {
    assert.equal(
        amountPerDay({ amount: 7, cycle: 'week' }),
        1,
        'should return the correct amount per day'
    );
    assert.end();
});

test('amountPerDay() given an fortnightly credit entry', assert => {
    assert.equal(
        amountPerDay({ amount: 14, every: 2, cycle: 'week' }),
        1,
        'should return the correct amount per day'
    );
    assert.end();
});

test('amountPerDay() given an amount which is not of type number', assert => {
    assert.throws(
        () => amountPerDay({ amount: '0' }),
        RegExp(amountNotNumberError),
        `should throw ${amountNotNumberError}`
    );
    assert.end();
});

test('amountPerDay() given an amount of 0', assert => {
    assert.doesNotThrow(
        () => amountPerDay({ amount: 0 }),
        'should not throw an exception'
    );
    assert.end();
});