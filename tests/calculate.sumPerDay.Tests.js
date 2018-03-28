const test = require('tape');
const sumPerDay = require('../js/calculate.js')
    .sumPerDay;

test('sumPerDay() with null argument', assert => {
    assert.throws(
        () => sumPerDay(),
        'should throw an exception'
    );
    assert.end();
});

test('sumPerDay() given null', assert => {
    assert.throws(
        function() { sumPerDay(null); },
        'should throw an exception'
    );
    assert.end();
});

test('sumPerDay() given object with no credit or debit entries', assert => {
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