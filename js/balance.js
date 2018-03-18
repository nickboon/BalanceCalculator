var numberOfDaysIn = {
    year: 365.25,
    month: 30.4375,
    week: 7
};

var getAmountPerCycle = (cycle, amountPerDay) => {
    if (typeof cycle != 'string' || typeof amountPerDay != 'number')
        throw 'Cycle must be a string, and days must be a number.';
    if (numberOfDaysIn[cycle] == undefined)
        throw `Unknown cycle "${cycle}"`;

    return amountPerDay * numberOfDaysIn[cycle];
};

var getAmountPerDay = (entry) => {
    if (typeof entry.amount != 'number')
        throw 'Entry must have an amount, and it must be a number.';

    var numberOfCycles = entry.every || 1;
    var numberOfDaysInCycle = numberOfDaysIn[entry.cycle] || 1;
    return entry.amount / (numberOfDaysInCycle * numberOfCycles);
};

var getBalance = (entries) => {
    if (typeof entries != 'object')
        throw 'entries must be an object.';

    var balance = 0;
    if (entries.credit)
        entries.credit.forEach((entry) => balance += getAmountPerDay(entry));
    if (entries.debit)
        entries.debit.forEach((entry) => balance -= getAmountPerDay(entry));
    return balance;
};

module.exports = {
    getAmountPerCycle: getAmountPerCycle,
    getAmountPerDay: getAmountPerDay,
    getBalance: getBalance
};