const test = require('tape');
const amountPerCycle = require('../js/calculate.js')
    .amountPerCycle;

test('amountPerCycle() given a cycle which is not of type string', assert => {
    assert.throws(
        () => amountPerCycle(null, 1),
        'should throw an exception'
    );
    assert.end();
});

test('amountPerCycle() given days argument which is not of type number', assert => {
    assert.throws(
        () => amountPerCycle('week'),
        'should throw an exception'
    );
    assert.end();
});

test('amountPerCycle() given an unknown cycle string', assert => {
    assert.throws(
        () => amountPerCycle('', 1),
        'should throw an exception'
    );
    assert.end();
});

test('amountPerCycle() given a cycle of week and amount 7', assert => {
    assert.equal(
        amountPerCycle('week', 1),
        7,
        'should return 7'
    );
    assert.end();
});