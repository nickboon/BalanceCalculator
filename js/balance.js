var daysIn = {
    year: 365.25,
    month: 30.4375,
    week: 7
};

var daysTo = (cycle, days) => {
    if (typeof cycle != 'string' || typeof days != 'number')
        throw 'Cycle must be a string, and days must be a number.';
    if (daysIn[cycle] == undefined)
        throw `Unknown Cycle "${cycle}"`;

    return days / daysIn[cycle];
};

var amountPerDay = (entry) => {
    if (typeof entry.amount != 'number')
        throw 'Entry must have an amount, and it must be a number.';

    var multiplier = entry.every || 1;
    var days = daysIn[entry.cycles] || 1;
    return entry.amount / (days * multiplier);
};

var sum = (entries) => {
    if (typeof entries != 'object')
        throw 'entries must be an object.';

    var balance = 0;
    if (entries.credit)
        entries.credit.forEach((entry) => balance += amountPerDay(entry));
    if (entries.debit)
        entries.debit.forEach((entry) => balance -= amountPerDay(entry));
    return balance;
};

module.exports = {
    daysTo: daysTo,
    amountPerDay: amountPerDay,
    sum: sum
};