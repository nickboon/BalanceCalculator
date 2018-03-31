require('../node_modules/bootstrap/dist/js/bootstrap.bundle.js');
const $ = require('jquery');
const Mustache = require('mustache');
const calculate = require('./cycles.js');
const colour = require('./colour.js');

let selectedSheet = {};
let selectedCycle = 'day';
const setSheet = sheet => selectedSheet = sheet;
const setCycle = cycle => selectedCycle = cycle;

const setBaseTextColour = elements => elements.forEach(element => colourElement(element, 0));

const displaySheetName = element => element.text(selectedSheet.name);

const displayEntries = element => {
    const entries = {};
    if (selectedSheet.credit)
        entries.credit = toEntriesViewModel(selectedSheet.credit);

    element.html(Mustache.render($('#entries_template').html(), entries));
};

const toEntriesViewModel = (entries) => entries
    .filter(entry => entry.description !== 'target')
    .map(entry => ({
        amount: currencyString(entry.amount),
        description: entry.description
    }));

const displaySum = (element) => {
    let amount = calculate.sumPerDay(selectedSheet);

    colourBalanceElementBorder(element, amount);

    if (selectedCycle !== 'day')
        amount = calculate.amountPerCycle(selectedCycle, amount);

    element.text(currencyString(amount));
};

const colourBalanceElement = (element, amount) => {
    let max = getTargetAmountPerDayFor(selectedSheet.credit);
    let min = getTargetAmountPerDayFor(selectedSheet.debit);

    colourElement(element, amount, max, min);
};

const colourElement = (element, amount, max, min) => element.css(
    'color',
    `rgb(${colour(amount, max, min)})`
);

const colourBalanceElementBorder = (element, amount) => {
    let max = getTargetAmountPerDayFor(selectedSheet.credit);
    let min = getTargetAmountPerDayFor(selectedSheet.debit);

    colourElementBorder(element, amount, max, min);
};

const colourElementBorder = (element, amount, max, min) => element.css(
    'border-color',
    `rgb(${colour(amount, max, min)})`
);

const getTargetAmountPerDayFor = (entries) => {
    let targetEntry = false;

    if (entries)
        targetEntry = entries.find(x => x.description === 'target') || false;

    if (targetEntry) return calculate.amountPerDay(targetEntry);
};

const currencyString = amount => amount.toLocaleString(
    'en', { style: 'currency', currency: selectedSheet.currency || 'EUR' }
);

module.exports = {
    setSheet: setSheet,
    setCycle: setCycle,
    setBaseTextColour: setBaseTextColour,
    sheetName: displaySheetName,
    entries: displayEntries,
    sum: displaySum
};