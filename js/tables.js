const balance = require('./balance.js');
const $ = require('jquery');
const currencyString = require('./display.js').currencyString;

const getBalanceTableBody = amountPerDay => {
    const tbody = $(document.createElement('tbody'));
    getBalanceRow('day', amountPerDay).appendTo(tbody);
    getBalanceRow('week', amountPerDay).appendTo(tbody);
    getBalanceRow('month', amountPerDay).appendTo(tbody);
    getBalanceRow('year', amountPerDay).appendTo(tbody);
    return tbody;
};

const getBalanceRow = (cycle, amountPerDay) => {
    const row = $(document.createElement('tr'));
    getAmountField(cycle, amountPerDay).appendTo(row);
    $('<td>', { text: `per ${cycle}` }).appendTo(row);
    return row;
};

const getAmountField = (cycle, amountPerDay) => {
    var amount = 0;
    if (cycle === 'day') amount = amountPerDay;
    else amount = balance.getAmountPerCycle(cycle, amountPerDay);
    return $('<td>', { text: currencyString(amount) });
};

module.exports = {
    getBalanceTableBody: getBalanceTableBody
};