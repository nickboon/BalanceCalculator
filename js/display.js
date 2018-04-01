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

const setEntriesToggleClick = (toggle, entries) => {
    toggle.click(() => {
        if (entries.hasClass('show')) {
            toggle.removeClass('arrow-down');
            toggle.addClass('arrow-up');
        } else {
            toggle.removeClass('arrow-up');
            toggle.addClass('arrow-down');
        }
    });
};

const displaySheetName = element => element.text(selectedSheet.name);

const displayEntries = element => {
    const entries = {};
    if (selectedSheet.credit)
        entries.credit = toEntriesViewModel(selectedSheet.credit);

    if (selectedSheet.debit)
        entries.debit = toEntriesViewModel(selectedSheet.debit);

    element.html(Mustache.render($('#entries_template').html(), entries));
};

const toEntriesViewModel = (entries) => entries
    .filter(entry => entry.description !== 'target')
    .map(entry => ({
        amount: currencyString(
            calculate.amountPerCycle(
                selectedCycle,
                calculate.amountPerDay(entry)
            )),
        description: entry.description
    }));

const displaySum = (element) => {
    let amount = calculate.sumPerDay(selectedSheet);
    colourBalanceElementBorder(element, amount);

    element
        .children()
        .first()
        .html(currencyString(calculate.amountPerCycle(selectedCycle, amount)));
};

const colourElement = (element, amount, max, min) => element.css(
    'color',
    `rgb(${colour(amount, max, min)})`
);

const colourBalanceElementBorder = (element, amount) => {
    let max = getTargetAmountPerDayFor(selectedSheet.credit);
    let min = getTargetAmountPerDayFor(selectedSheet.debit);

    element.css(
        'border-color',
        `rgb(${colour(amount, max, min)})`
    );
};

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
    setEntriesToggleClick: setEntriesToggleClick,
    setCycle: setCycle,
    setBaseTextColour: setBaseTextColour,
    sheetName: displaySheetName,
    entries: displayEntries,
    sum: displaySum
};