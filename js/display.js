let currency = 'EUR';
const setCurrency = newCurrency => currency = newCurrency;

const currencyString = amount =>
    amount.toLocaleString('en', { style: 'currency', currency: currency });

const getBalanceColour = function(amount) {
    if (typeof amount != 'number')
        throw 'Amount must be a number.';

    if (amount > 0)
        return [128, 192, 128];
    else if (amount < 0)
        return [192, 128, 128];

    return [128, 128, 128];

};

module.exports = {
    setCurrency: setCurrency,
    currencyString: currencyString,
    getBalanceColour: getBalanceColour
};