var test = require('tape');
var balance = require('../js/balance.js');

test('balance() with null argument', function(assert) {
    assert.throws(function() {
        balance();
    }, 'should throw an exception');
    assert.end();
});

test('balance() given null', function(assert) {
    assert.throws(function() {
        balance(null);
    }, 'should throw an exception');
    assert.end();
});

test('balance() given obejct with no credit or debit entries', function(assert) {
    var expected = 0;

    var actual = balance({});

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});

test('balance() given a single credit entry', function(assert) {
    var expected = 10;

    var actual = balance({
        "credit": [{
            "amount": expected
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('balance() given a single debit entry', function(assert) {
    var debit = 10;
    var expected = -debit;

    var actual = balance({
        "debit": [{
            "amount": debit
        }]
    });

    assert.equal(actual, expected, 'should return the daily value of that entry');
    assert.end();
});

test('balance() given equal debit and credit entries', function(assert) {
    var amount = 10;
    var expected = 0;

    var actual = balance({
        "debit": [{
            "amount": amount
        }],
        "credit": [{
            "amount": amount
        }]
    });

    assert.equal(actual, expected, 'should return 0');
    assert.end();
});