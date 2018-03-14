(function(factory) {
    // allows unit testing in node
    if (typeof module != 'undefined' && module.exports)
        module.exports = factory();
})(function() {
    function balance(balanceObject) {
        if (balanceObject == undefined || balanceObject == null)
            throw 'Balance can\'t be null or undefined.';

        var sum = 0;

        if (balanceObject.credit)
            balanceObject.credit.forEach(entry => sum += entry.amount);

        if (balanceObject.debit)
            balanceObject.debit.forEach(entry => sum -= entry.amount);

        return sum;
    }

    return balance;
});