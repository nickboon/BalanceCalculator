var amountPerDay = require('./cycles.js');

var total = 0;
var credit = function(entry) { total += amountPerDay(entry); };
var debit = function(entry) { total -= amountPerDay(entry); };

var balance = function(entries) {
    if (typeof entries != 'object')
        throw 'entries must be an object.';

    total = 0;
    if (entries.credit) entries.credit.forEach(credit);
    if (entries.debit) entries.debit.forEach(debit);
    return total;
};

module.exports = balance;