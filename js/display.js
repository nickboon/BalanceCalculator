require('../node_modules/bootstrap/dist/js/bootstrap.bundle.js');
const $ = require('jquery');
const calculate = require('./calculate.js');
const colour = require('./colours.js');

let selectedSheet = {};
let selectedCycle = 'day';

const setSheet = (sheet) => selectedSheet = sheet;

const setCycle = (cycle) => selectedCycle = cycle;

const displaySheetName = (element) => element.text(selectedSheet.name);

const displaySum = (element) => {
    let amount = calculate.sumPerDay(selectedSheet);

    if (selectedCycle !== 'day')
        amount = calculate.amountPerCycle(selectedCycle, amount);

    element.text(currencyString(amount));
    element.css(
        'color',
        `rgb(${colour(amount)})`
    );
};

const currencyString = amount =>
    amount.toLocaleString(
        'en', { style: 'currency', currency: selectedSheet.currency || 'EUR' }
    );

module.exports = {
    setSheet: setSheet,
    setCycle: setCycle,
    sheetName: displaySheetName,
    sum: displaySum
};