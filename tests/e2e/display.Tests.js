const test = require('tape');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const wellKnown = require('../fixtures.js');

// display.entries is called in test.app.js
test('display.entries()', assert => {
    assert.isEquivalent(
        getCells(setUpDomFixture().window.document.getElementById('credit_table')),
        wellKnown.creditCells,
        'should display the expected credit cells');
    assert.end();
});

//display.entries is called in test.app.js
test('display.entries()', assert => {
    const document = setUpDomFixture().window.document;

    assert.isEquivalent(
        getCells(document.getElementById('debit_table')),
        wellKnown.debitCells,
        'should display the expected debit cells');
    assert.end();
});



const setUpDomFixture = () => {
    const testIndexHtml = fs.readFileSync('dist/index.html', 'utf8');
    const dom = new JSDOM(testIndexHtml, { runScripts: 'dangerously' });
    const document = dom.window.document;

    const script = document.createElement('script');
    script.textContent = fs.readFileSync('tests/e2e/js/test.bundle.js', 'utf8');
    document.body.appendChild(script);

    return dom;
};

const getCells = table =>
    Array
    .from(table.getElementsByTagName('td'))
    .map(element => element.childNodes[0].nodeValue);