const test = require('tape');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const wellKnown = require('./fixtures.js');

test('getBalanceTableBody()', assert => {
    const expected = wellKnown.balanceTableBody;
    const document = setUpDomFixture().window.document;
    const actual = getCellValues(document.getElementById('balance_table'));

    assert.isEquivalent(actual, expected, 'should return a balance table body');
    assert.end();
});

const setUpDomFixture = () => {
    const testIndexPath = 'tests/dom/test.index.html';
    const testIndexHtml = fs.readFileSync(testIndexPath, 'utf8');
    const dom = new JSDOM(testIndexHtml, { runScripts: 'dangerously' });
    const document = dom.window.document;

    const testBundlePath = 'tests/dom/js/test.bundle.js';
    const script = document.createElement('script');
    script.textContent = fs.readFileSync(testBundlePath, 'utf8');
    document.body.appendChild(script);

    return dom;
};

const getCellValues = table =>
    Array
    .from(table.getElementsByTagName('td'))
    .map(element => element.childNodes[0].nodeValue);