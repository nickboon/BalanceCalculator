const balance = require('./balance.js');
const $ = require('jquery');

const currency = 'EUR';

const setCurrency = newCurrency => currency = newCurrency;

const getBalanceTableBody = amountPerDay => {
    const tbody = $(document.createElement('tbody'));
    getBalanceRow('day', amountPerDay).appendTo(tbody);
    getBalanceRow('week', amountPerDay).appendTo(tbody);
    getBalanceRow('month', amountPerDay).appendTo(tbody);
    getBalanceRow('year', amountPerDay).appendTo(tbody);
    return tbody;
};

const getBalanceRow = (period, amountPerDay) => {
    const row = $(document.createElement('tr'));
    getAmountField(period, amountPerDay).appendTo(row);
    $('<td>', { text: `per ${period}` }).appendTo(row);
    return row;
};

const getAmountField = (period, amountPerDay) => {
    var amount = 0;
    if (period === 'day') amount = amountPerDay;
    else amount = balance.getAmountPerCycle(period, amountPerDay);
    return $('<td>', { text: toCurrencyString(amount) });
};

const toCurrencyString = amount =>
    amount.toLocaleString('en', { style: 'currency', currency: currency });

module.exports = {
    setCurrency: setCurrency,
    getBalanceTableBody: getBalanceTableBody
};