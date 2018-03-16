var test = require('tape');
var daysTo = require('../js/balance.js').daysTo;

test('daysTo() given a cycle which is not of type string', (assert) => {
    assert.throws(() => daysTo(null, 1), 'should throw an exception');
    assert.end();
});

test('daysTo() given days argument which is not of type number', (assert) => {
    assert.throws(() => daysTo('week'), 'should throw an exception');
    assert.end();
});

test('daysTo() given an unknown cycle string', (assert) => {
    assert.throws(() => daysTo('', 1), 'should throw an exception');
    assert.end();
});

test('daysTo() given a cycle of week and days 7', (assert) => {
    var expected = 1;

    var actual = daysTo('week', 7);

    assert.equal(actual, expected, 'should return 1');
    assert.end();
});