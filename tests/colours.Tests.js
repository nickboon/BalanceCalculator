const test = require('tape');
const colour = require('../js/colours.js');
const amountNotNumberError = 'Amount must be a number.';

test('colour() given balance where the total is not set ', assert => {
    assert.throws(
        () => colour(),
        RegExp(amountNotNumberError),
        `should throw ${amountNotNumberError}`);
    assert.end();
});

test('colour() given 0', assert => {
    assert.isEquivalent(
        colour(0), [128, 128, 128],
        'should return default zero balance colour');
    assert.end();
});

test('colour() given a positive amount',
    assert => {
        assert.isEquivalent(
            colour(1), [128, 192, 128],
            'should return default credit colour');
        assert.end();
    });

test('colour() given a negative amount',
    assert => {
        assert.isEquivalent(
            colour(-1), [192, 128, 128],
            'should return default debit colour.');
        assert.end();
    });