var amountPerDay = require('./cycles.js');

var balance = function(entries) {
    if (typeof entries != 'object')
        throw 'entries must be an object.';

    var sum = 0;

    if (entries.credit)
        entries.credit.forEach(entry => sum += amountPerDay(entry));

    if (entries.debit)
        entries.debit.forEach(entry => sum -= amountPerDay(entry));

    return sum;
};

module.exports = balance;