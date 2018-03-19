const balance = require('./balance.js');
const tables = require('./tables.js');
const $ = require('jquery');

const input = {};
const balanceTable = $('#balance_table');

const load = () => {
    tables.setCurrency('EUR');

    input = $('#balance_file_input');
    input.change(loadBalance);
    if (input.prop('files').length !== 0) loadBalance();
};

const loadBalance = () => {
    const reader = new FileReader();
    reader.readAsText(input.prop('files')[0]);
    reader.onload = () =>
        displayBalance((JSON.parse(reader.result)));
};

const displayBalance = selectedBalance => {
    balanceTable
        .empty()
        .append(tables.getBalanceTableBody(balance.getBalance(selectedBalance)));
};

$(() => load());