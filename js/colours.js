const baseColour = 128;
const maxColour = 256;
const midColour = (maxColour + baseColour) / 2;

const buildRed = (red, other) => [red, other, other];
const buildGreen = (green, other) => [other, green, other];
const buildGrey = (colour) => [colour, colour, colour];

const defaultCreditColour = buildGreen(midColour, baseColour);
const maxCreditColour = buildGreen(maxColour, 0);
const defaultDebitColour = buildRed(midColour, baseColour);
const maxDebitColour = buildRed(maxColour, 0);
const zeroBalanceColour = buildGrey(baseColour);

const calculateAmountColour = (amount, max, min) => {
    if (typeof amount != 'number') throw 'Amount must be a number.';

    if (max) return calculateColourToRatio(amount, max, min);

    if (amount > 0) return defaultCreditColour;
    if (amount < 0) return defaultDebitColour;

    return zeroBalanceColour;
};

const calculateColourToRatio = (amount, max, min) => {
    min = min || -max;

    if (amount >= max) return maxCreditColour;
    if (amount > 0) return buildColourToRatio(buildGreen, max / amount);
    if (amount <= min) return maxDebitColour;
    if (amount < 0) return buildColourToRatio(buildRed, min / amount);

    return zeroBalanceColour;
};

const buildColourToRatio = (builder, ratio) => builder(maxColour / ratio, baseColour / ratio);

module.exports = calculateAmountColour;