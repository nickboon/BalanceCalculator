require('../node_modules/bootstrap/dist/js/bootstrap.bundle.js');
const $ = require('jquery');
const balance = require('./balance.js');
const display = require('./display.js');

let input = {};
let select = {};
let selectedCycle = 'day';
let selectedBalance = {};

const load = () => {
    display.setCurrency('EUR');

    select = $('#cycle_select').change(updateCycle);
    if (select.val()) updateCycle();

    input = $('#balance_file_input').change(loadBalance);
    if (input.prop('files').length !== 0) loadBalance();
};

const updateCycle = () => {
    selectedCycle = select.val();
    refresh();
};

const loadBalance = () => {
    const reader = new FileReader();
    reader.readAsText(input.prop('files')[0]);
    reader.onload = () => updateBalance(JSON.parse(reader.result));
};

const updateBalance = (newBalance) => {
    selectedBalance = newBalance;
    refresh();
};

const refresh = () => {
    $('#balance_name').text(selectedBalance.name);

    let amount = balance.getBalancePerDay(selectedBalance);
    if (selectedCycle != 'day')
        amount = balance.getAmountPerCycle(selectedCycle, amount);

    $('#balance').text(display.currencyString(amount));
    $('#balance').css('color', `rgb(${display.getBalanceColour(amount)})`);
};

$(() => load());