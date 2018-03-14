var daysIn = {
    year: 365.25,
    month: 30.4375,
    week: 7
};

var amountPerDay = function(entry) {
    if (typeof entry.amount != 'number')
        throw 'Entry must have an amount, and it must be a number.';

    var multiplier = entry.every || 1;
    var days = daysIn[entry.cycles] || 1;
    return entry.amount / (days * multiplier);
};

module.exports = amountPerDay;