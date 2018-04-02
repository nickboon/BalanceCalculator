const colours = require('./colours');

const calculateAmountColour = (amount, max, min) => {
    if (typeof amount != 'number') throw 'Amount must be a number.';

    if (max) return calculateColourToRatio(amount, max, min);
    if (amount > 0) return colours.defaultCredit;
    if (amount < 0) return colours.defaultDebit;

    return colours.zeroAmount;
};

const calculateColourToRatio = (amount, max, min) => {
    min = min || -max;

    if (amount >= max) return colours.maxCredit;
    if (amount > 0) return colours.buildColourToRatio('green', amount / max);
    if (amount <= min) return colours.maxDebit;
    if (amount < 0) return colours.buildColourToRatio('red', amount / min);

    return colours.zeroAmount;
};

module.exports = calculateAmountColour;