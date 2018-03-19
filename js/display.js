let currency = 'EUR';
const setCurrency = newCurrency => currency = newCurrency;

const currencyString = amount =>
    amount.toLocaleString('en', { style: 'currency', currency: currency });

module.exports = {
    setCurrency: setCurrency,
    currencyString: currencyString
};