var balance = require('./balance.js');

// Test modules
var dailyBalance = balance({
    "credit": [{
        "amount": 7,
        "every": 2,
        "cycles": "week"
    }]
});

console.log(dailyBalance);