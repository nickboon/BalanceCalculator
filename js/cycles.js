const numberOfDaysIn = {
    year: 365.25,
    month: 30.4375,
    week: 7
};

const amountPerCycle = (cycle, amountPerDay) => {
    if (typeof cycle !== 'string' || typeof amountPerDay !== 'number')
        throw 'Cycle must be a string, and days must be a number.';

    if (cycle == 'day') return amountPerDay;

    if (numberOfDaysIn[cycle] == undefined)
        throw `Unknown cycle "${cycle}".`;

    return amountPerDay * numberOfDaysIn[cycle];
};

const amountPerDay = entry => {
    if (typeof entry !== 'object' || entry == null)
        throw 'Entry must be an object.';

    if (typeof entry.amount != 'number')
        throw 'Amount must be a number.';

    const numberOfCycles = entry.every || 1;
    const numberOfDaysInCycle = numberOfDaysIn[entry.cycle] || 1;
    return entry.amount / (numberOfDaysInCycle * numberOfCycles);
};

const sumPerDay = sheet => {
    if (typeof sheet !== 'object' || sheet == null)
        throw 'Sheet must be an object.';

    let sum = 0;

    if (sheet.credit) sheet.credit
        .filter(x => x.description !== 'target')
        .forEach(entry => sum += amountPerDay(entry));

    if (sheet.debit) sheet.debit
        .filter(x => x.description !== 'target')
        .forEach(entry => sum -= amountPerDay(entry));

    return sum;
};

module.exports = {
    amountPerCycle: amountPerCycle,
    amountPerDay: amountPerDay,
    sumPerDay: sumPerDay
};