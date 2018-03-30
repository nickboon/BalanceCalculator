const test = require('tape');
const colour = require('../js/colours.js');
const amountNotNumberError = 'Amount must be a number.';

test('colour() given an undefined amount ', assert => {
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

test('colour() given a positive amount', assert => {
    assert.isEquivalent(
        colour(1), [64, 192, 64],
        'should return default credit colour');
    assert.end();
});

test('colour() given a negative amount', assert => {
    assert.isEquivalent(
        colour(-1), [192, 64, 64],
        'should return default debit colour.');
    assert.end();
});


test('colour() given a max argument and an amount equal to max', assert => {
    assert.isEquivalent(
        colour(1, 1), [0, 256, 0],
        'should return the max credit colour');
    assert.end();
});

test('colour() given a max argument only and an amount equal to negative max', assert => {
    assert.isEquivalent(
        colour(-1, 1), [256, 0, 0],
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