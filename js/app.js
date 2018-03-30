require('../node_modules/bootstrap/dist/js/bootstrap.bundle.js'); // to include in bundle
const $ = require('jquery');
const display = require('./display.js');

let cycleSelect = {};
let sheetInput = {};

const load = () => {
    cycleSelect = $('#cycle_select').change(setCycle);

    sheetInput = $('#balance_file_input').change(loadSheet);

    setBaseTextColour();

    if (cycleSelect.val()) setCycle();
    if (sheetInput.prop('files').length !== 0)
        loadSheet();
};

const setBaseTextColour = () =>
    display.setBaseTextColour([
        $('.masthead-brand'),
        $('.cover'),
        $('.custom-file-label'),
        $('.custom-select')
    ]);

const setCycle = () => {
    display.setCycle(cycleSelect.val());
    refresh();
};

const loadSheet = () => {
    const reader = new FileReader();
    reader.readAsText(
        sheetInput.prop('files')[0]
    );
    reader.onload = () => setSheet(JSON.parse(reader.result));
};

const setSheet = (sheet) => {
    display.setSheet(sheet);
    refresh();
};

const refresh = () => {
    display.sheetName($('#balance_name'));
    display.sum($('#balance'));
};

$(() => load());