const test = require('tape');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const wellKnown = require('../fixtures');
const zeroAmountColour = require('../../js/colours').zeroAmount;

// display methoods are called in test.app.js and then included in the browserify bundle.

test('display.sheetName()', assert => {
    assert.equal(
        setUpDomFixture().window.document.getElementById('sheet_name').textContent,
        wellKnown.sheet.name,
        'should display the expected name'
    );
    assert.end();
});

test('display.entries()', assert => {
    assert.isEquivalent(
        getCells(setUpDomFixture().window.document.getElementById('credit_table')),
        wellKnown.creditCells,
        'should display the expected credit cells'
    );
    assert.end();
});

test('display.entries()', assert => {
    const document = setUpDomFixture().window.document;

    assert.isEquivalent(
        getCells(document.getElementById('debit_table')),
        wellKnown.debitCells,
        'should display the expected debit cells'
    );
    assert.end();
});

test('display.sum()', assert => {
    assert.equal(
        setUpDomFixture().window.document.getElementById('sum')
        .firstElementChild
        .textContent,
        wellKnown.sum,
        'should display the expected sum'
    );
    assert.end();
});

test('display.setTextToZeroAmountColour()', assert => {
    assert.equal(
        setUpDomFixture().window.document.getElementsByClassName('cover')[0]
        .style
        .color,
        `rgb(${zeroAmountColour.join(', ')})`,
        'should set text to the zero amount colour'
    );
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