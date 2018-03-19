const test = require('tape');
const getAmountPerCycle = require('../js/balance.js').getAmountPerCycle;

test('getAmountPerCycle() given a cycle which is not of type string', assert => {
    assert.throws(() => getAmountPerCycle(null, 1), 'should throw an exception');
    assert.end();
});

test('getAmountPerCycle() given days argument which is not of type number', assert => {
    assert.throws(() => getAmountPerCycle('week'), 'should throw an exception');
    assert.end();
});

test('getAmountPerCycle() given an unknown cycle string', assert => {
    assert.throws(() => getAmountPerCycle('', 1), 'should throw an exception');
    assert.end();
});

test('getAmountPerCycle() given a cycle of week and amount 7', assert => {
    const expected = 7;

    const actual = getAmountPerCycle('week', 1);

    assert.equal(actual, expected, 'should return 7');
    assert.end();
});