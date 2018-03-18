var balance = require('./balance.js');
var $ = require('jquery');

$(() => $('#balance_file_input').change(loadBalance));

var loadBalance = function(event) {
    var reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () =>
        displayBalance(balance.getBalance(JSON.parse(reader.result)));
};

var displayBalance = function(dailyBalance) {
    console.log('Daily: ' + dailyBalance);
    console.log('Weekly: ' + balance.getAmountPerCycle('week', dailyBalance));
    console.log('Monthly: ' + balance.getAmountPerCycle('month', dailyBalance));
    console.log('Yearly: ' + balance.getAmountPerCycle('year', dailyBalance));
};