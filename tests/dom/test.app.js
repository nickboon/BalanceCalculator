const getBalancePerDay = require('../../js/balance.js').getBalancePerDay;
const tables = require('../../js/tables.js');
const $ = require('jquery');
const testBalance = require('../fixtures.js').balance;

const balanceTable = $('#balance_table');

const displayBalance = selectedBalance => {
    balanceTable
        .empty()
        .append(tables.getBalanceTableBody(getBalancePerDay(selectedBalance)));
};

displayBalance(testBalance);