const test = require('tape');
const colours = require('../js/colours');
const colour = require('../js/colour');
const buildColourToRatio = colours.buildColourToRatio;
const ratioNotInRangeError = 'Ratio must be betweeen 0 and 1.';
const unknownColourError = 'Unknown colour "unknownColour".';
const amountNotNumberError = 'Amount must be a number.';

test('buildColourToRatio() given an unknown colour', assert => {
    assert.throws(
        () => buildColourToRatio('red', 2),
        RegExp(ratioNotInRangeError),
        `should throw ${ratioNotInRangeError}`);
    assert.end();
});

test('buildColourToRatio() given an unknown colour', assert => {
    assert.throws(
        () => buildColourToRatio('unknownColour', 1),
        RegExp(unknownColourError),
        `should throw ${unknownColourError}`);
    assert.end();
});

test('colour() given an undefined amount', assert => {
    assert.throws(
        () => colour(),
        RegExp(amountNotNumberError),
        `should throw ${amountNotNumberError}`);
    assert.end();
});

test('colour() given 0', assert => {
    assert.isEquivalent(
        colour(0),
        colours.zeroAmount,
        'should return default zero balance colour');
    assert.end();
});

test('colour() given a positive amount', assert => {
    assert.isEquivalent(
        colour(1),
        colours.defaultCredit,
        'should return default credit colour');
    assert.end();
});

test('colour() given a negative amount', assert => {
    assert.isEquivalent(
        colour(-1),
        colours.defaultDebit,
        'should return default debit colour.');
    assert.end();
});


test('colour() given a max argument and an amount equal to max', assert => {
    assert.isEquivalent(
        colour(1, 1),
        colours.maxCredit,
        'should return the max credit colour');
    assert.end();
});

test('colour() given a max argument only and an amount equal to negative max', assert => {
    assert.isEquivalent(
        colour(-1, 1),
        colours.maxDebit,
        'should return the max debit colour');
    assert.end();
});

test('colour() given a max argument and an amount equal to half max', assert => {
    assert.isEquivalent(
        colour(1, 2), [64, 192, 64],
        'should return a colour halfway between max credit and zero');
    assert.end();
});

test('colour() given a max argument only and an amount equal to -half max', assert => {
    assert.isEquivalent(
        colour(-1, 2), [192, 64, 64],
        'should return a colour halfway between max debit and zero');
    assert.end();
});

test('colour() given a min argument and an amount less than min', assert => {
    assert.isEquivalent(
        colour(-3, 4, -2), [256, 0, 0],
        'should return the max debit colour');
    assert.end();
});

test('colour() given a min argument and an amount equal to half min', assert => {
    assert.isEquivalent(
        colour(-2, 1, -4), [192, 64, 64],
        'should return a colour halfway between max debit and zero');
    assert.end();
});