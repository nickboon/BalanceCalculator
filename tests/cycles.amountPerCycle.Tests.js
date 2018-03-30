const test = require('tape');
const amountPerCycle = require('../js/cycles.js').amountPerCycle;
const invalidArgumentError = 'Cycle must be a string, and days must be a number.';
const unknownCycleError = 'Unknown cycle "unkownCycle".';

test('amountPerCycle() given a cycle which is not of type string', assert => {
    assert.throws(
        () => amountPerCycle(null, 1),
        RegExp(invalidArgumentError),
        `should throw ${invalidArgumentError}`
    );
    assert.end();
});

test('amountPerCycle() given days argument which is not of type number', assert => {
    assert.throws(
        () => amountPerCycle('week'),
        RegExp(invalidArgumentError),
        `should throw ${invalidArgumentError}`
    );
    assert.end();
});

test('amountPerCycle() given an unknown cycle string', assert => {
    assert.throws(
        () => amountPerCycle('unkownCycle', 1),
        RegExp(unknownCycleError),
        `should throw ${unknownCycleError}`
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