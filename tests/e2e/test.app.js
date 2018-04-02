const $ = require('jquery');
const display = require('../../js/display');
const wellKnown = require('../fixtures');

display.setCycle(wellKnown.cycle);
display.setSheet(wellKnown.sheet);
display.setTextToZeroAmountColour([$('.cover')]);
display.sheetName($('#sheet_name'));
display.entries($('#entries'));
display.sum($('#sum'));