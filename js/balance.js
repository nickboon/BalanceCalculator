var amountPerDay = require('./cycles.js');

var sum = function(entries) {
    if (typeof entries != 'object')
        throw 'entries must be an object.';

    var balance = 0;
    if (entries.credit)
        entries.credit.forEach((entry) => balance += amountPerDay(entry));
    if (entries.debit)
        entries.debit.forEach((entry) => balance -= amountPerDay(entry));
    return balance;
};

module.exports = sum;