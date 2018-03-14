(function(factory) {
    // allows unit testing in node
    if (typeof module != 'undefined' && module.exports)
        module.exports = factory();
})(function() {
    var daysIn = {
        year: 365.25,
        month: 30.4375,
        week: 7
    };

    var convert = {};

    convert.amountPerDay = function(entry) {
        if (typeof entry.amount != 'number')
            throw 'Entry must have an amount, and it must be a number.';

        var multiplier = entry.every || 1;
        var days = daysIn[entry.cycles] || 1;
        return entry.amount / (days * multiplier);
    };

    var balance = function(balanceObject) {
        if (typeof balanceObject != 'object')
            throw 'Balance must be an object.';

        var sum = 0;

        if (balanceObject.credit)
            balanceObject.credit.forEach(entry => sum += convert.amountPerDay(entry));

        if (balanceObject.debit)
            balanceObject.debit.forEach(entry => sum -= convert.amountPerDay(entry));

        return sum;
    };

    return balance;
});