const numberOfDaysIn = {
    year: 365.25,
    month: 30.4375,
    week: 7
};

const amountPerCycle = (cycle, amountPerDay) => {
    if (typeof cycle != 'string' || typeof amountPerDay != 'number')
        throw 'Cycle must be a string, and days must be a number.';
    if (numberOfDaysIn[cycle] == undefined)
        throw `Unknown cycle "${cycle}"`;

    return amountPerDay * numberOfDaysIn[cycle];
};

const amountPerDay = entry => {
    if (typeof entry.amount != 'number')
        throw 'Entry must have an amount, and it must be a number.';

    const numberOfCycles = entry.every || 1;
    const numberOfDaysInCycle = numberOfDaysIn[entry.cycle] || 1;
    return entry.amount / (numberOfDaysInCycle * numberOfCycles);
};

const sumPerDay = entries => {
    if (typeof entries != 'object')
        throw 'Entries must be an object.';

    let sum = 0;
    if (entries.credit)
        entries.credit.forEach(entry => sum += amountPerDay(entry));
    if (entries.debit)
        entries.debit.forEach(entry => sum -= amountPerDay(entry));
    return sum;
};

module.exports = {
    amountPerCycle: amountPerCycle,
    sumPerDay: sumPerDay
};