const test = require('tape');
const getBalanceColour = require('../js/display.js').getBalanceColour;
const amountNotNumberError = 'Amount must be a number.';

test('getBalanceColour() given balance where the total is not set ', assert => {
    assert.throws(
        () => getBalanceColour(),
        RegExp(amountNotNumberError),
        `should throw ${amountNotNumberError}`);
    assert.end();
});

test('getBalanceColour() given 0', assert => {
    assert.equal(
        getBalanceColour(0),
        0x666666,
        'should return default zero balance colour');
    assert.end();
});

test('getBalanceColour() given a positive amount',
    assert => {
        assert.equal(
            getBalanceColour(1),
            0x006600,
            'should return default credit colour');
        assert.end();
    });

test('getBalanceColour() given a negative amount',
    assert => {
        assert.equal(
            getBalanceColour(-1),
            0x660000,
            'should return default debit colour.');
        assert.end();
    });