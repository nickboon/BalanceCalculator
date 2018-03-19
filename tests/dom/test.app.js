const getBalance = require('../../js/balance.js').getBalance;
const tables = require('../../js/tables.js');
const $ = require('jquery');
const testBalance = require('../fixtures.js').balance;

const balanceTable = $('#balance_table');

const displayBalance = selectedBalance => {
    balanceTable
        .empty()
        .append(tables.getBalanceTableBody(getBalance(selectedBalance)));
};

tables.setCurrency('EUR');
displayBalance(testBalance);