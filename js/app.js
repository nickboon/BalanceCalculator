var balance = require('./balance.js');
var tables = require('./tables.js');
var $ = require('jquery');

var input = {};
var balanceTable = $('#balance_table');

var load = () => {
    tables.setCurrency('EUR');

    input = $('#balance_file_input');
    input.change(loadBalance);
    if (input.prop('files').length !== 0) loadBalance();
};

var loadBalance = () => {
    var reader = new FileReader();
    reader.readAsText(input.prop('files')[0]);
    reader.onload = () =>
        displayBalance((JSON.parse(reader.result)));
};

var displayBalance = (selectedBalance) => {
    balanceTable
        .empty()
        .append(tables.getBalanceTableBody(balance.getBalance(selectedBalance)));
};

$(() => load());