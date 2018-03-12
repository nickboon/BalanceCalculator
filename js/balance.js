(function(factory) {
    // allows unit testing in node
    if (typeof module != 'undefined' && module.exports)
        module.exports = factory();
})(function() {
    var balance = {};

    return balance;
});