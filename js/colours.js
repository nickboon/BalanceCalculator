const defaultCreditColour = [128, 192, 128];
const defaultDebitColour = [192, 128, 128];
const zeroColour = [128, 128, 128];

const calculateAmountColour = function(amount) {
    if (typeof amount != 'number')
        throw 'Amount must be a number.';

    if (amount > 0)
        return defaultCreditColour;
    else if (amount < 0)
        return defaultDebitColour;

    return zeroColour;
};

module.exports = calculateAmountColour;