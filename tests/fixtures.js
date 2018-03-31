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

const creditCells = [
    'Salary after tax', '€0.00'
];

const debitCells = [
    'Wi-fi bill', '€1,000.00'
];

module.exports = {
    sheet: sheet,
    creditCells: creditCells,
    debitCells: debitCells
};