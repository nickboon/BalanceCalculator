const baseColour = 128;
const maxColour = 256;
const midColour = (maxColour + baseColour) / 2;

const buildRed = (red, other) => [red, other, other];
const buildGreen = (green, other) => [other, green, other];
const buildGrey = colour => [colour, colour, colour];
const buildColourToRatio = (builder, ratio) => {
    const range = maxColour - baseColour;

    return builder(
        baseColour + range * ratio,
        baseColour - baseColour * ratio
    );
};

const maxCreditColour = buildGreen(maxColour, 0);
const maxDebitColour = buildRed(maxColour, 0);
const defaultCreditColour = buildColourToRatio(buildGreen, 0.5);
const defaultDebitColour = buildColourToRatio(buildRed, 0.5);
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
    if (amount > 0) return buildColourToRatio(buildGreen, amount / max);
    if (amount <= min) return maxDebitColour;
    if (amount < 0) return buildColourToRatio(buildRed, amount / min);

    return zeroBalanceColour;
};

module.exports = calculateAmountColour;