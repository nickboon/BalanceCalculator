var balance = require('./balance.js');

// Test modules
/* eslint-disable */
var dailyBalance = balance.sum({
    "credit": [{
        "amount": 7,
        "every": 2,
        "cycles": "week"
    }]
});
/* eslint-enable */

console.log(dailyBalance);