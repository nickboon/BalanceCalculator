const test = require('tape');
const sumPerDay = require('../js/cycles').sumPerDay;
const sheetNotObjectError = 'Sheet must be an object.';

test('sumPerDay() given an undefined sheet', assert => {
    assert.throws(
        () => sumPerDay(),
        RegExp(sheetNotObjectError),
        `should throw ${sheetNotObjectError}`
    );
    assert.end();
});

test('sumPerDay() given a null sheet', assert => {
    assert.throws(
        function() { sumPerDay(null); },
        RegExp(sheetNotObjectError),
        `should throw ${sheetNotObjectError}`
    );
    assert.end();
});

test('sumPerDay() given an empty sheet', assert => {
    assert.equal(
        sumPerDay({}),
        0,
        'should return 0'
    );
    assert.end();
});

test('sumPerDay() given a single credit entry', assert => {
    assert.equal(
        sumPerDay({ credit: [{ amount: 10 }] }),
        10,
        'should return the daily value of that entry'
    );
    assert.end();
});

test('sumPerDay() given a single debit entry', assert => {
    assert.equal(
        sumPerDay({ debit: [{ amount: 10 }] }), -10,
        'should return the daily value of that entry'
    );
    assert.end();
});

test('sumPerDay() given equal debit and credit entries', assert => {
    assert.equal(
        sumPerDay({
            debit: [{ amount: 10 }],
            credit: [{ amount: 10 }]
        }),
        0,
        'should return 0'
    );
    assert.end();
});