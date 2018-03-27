const numberOfDaysIn = {
    year: 365.25,
    month: 30.4375,
    week: 7
};

const getAmountPerCycle = (cycle, amountPerDay) => {
    if (typeof cycle != 'string' || typeof amountPerDay != 'number')
        throw 'Cycle must be a string, and days must be a number.';
    if (numberOfDaysIn[cycle] == undefined)
        throw `Unknown cycle "${cycle}"`;

    return amountPerDay * numberOfDaysIn[cycle];
};

const getAmountPerDay = entry => {
    if (typeof entry.amount != 'number')
        throw 'Entry must have an amount, and it must be a number.';

    const numberOfCycles = entry.every || 1;
    const numberOfDaysInCycle = numberOfDaysIn[entry.cycle] || 1;
    return entry.amount / (numberOfDaysInCycle * numberOfCycles);
};

const getBalancePerDay = entries => {
    if (typeof entries != 'object')
        throw 'Entries must be an object.';

    let balance = 0;
    if (entries.credit)
        entries.credit.forEach(entry => balance += getAmountPerDay(entry));
    if (entries.debit)
        entries.debit.forEach(entry => balance -= getAmountPerDay(entry));
    return balance;
};

module.exports = {
    getAmountPerCycle: getAmountPerCycle,
    getAmountPerDay: getAmountPerDay,
    getBalancePerDay: getBalancePerDay
};