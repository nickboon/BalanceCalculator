const calculate = require('../js/cycles');

const cycle = 'month';

const sheet = {
    'name': 'Test Balance',
    'credit': [{
        'description': 'Salary after tax',
        'amount': 0,
        'cycle': 'month'
    }, {
        'description': 'target',
        'amount': 1000,
        'cycle': 'month'
    }],
    'debit': [{
        'description': 'Wi-fi bill',
        'amount': 1000,
        'every': 1,
        'cycle': 'month'
    }]
};

const calculateSum = () => currencyString(calculate.amountPerCycle(
    cycle,
    calculate.sumPerDay(sheet)
));

// const getSum = entriesName => sheet[entriesName]
//     .map(entry => entry.amount)
//     .reduce((accumulator, current) => accumulator + current);

const getCells = entriesName => [].concat.apply( // Array.filter() is not a function
    [],
    sheet[entriesName]
    .filter(entry => entry.description !== 'target')
    .map(entry => [
        entry.description,
        currencyString(calculateAmount(entry))
    ])
);

const calculateAmount = entry => calculate.amountPerCycle(
    cycle,
    calculate.amountPerDay(entry)
);

const currencyString = amount => amount.toLocaleString(
    'en', { style: 'currency', currency: sheet.currency || 'EUR' }
);

module.exports = {
    cycle: cycle,
    sheet: sheet,
    creditCells: getCells('credit'),
    debitCells: getCells('debit'),
    sum: calculateSum()
};