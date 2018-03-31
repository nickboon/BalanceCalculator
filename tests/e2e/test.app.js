const $ = require('jquery');
const display = require('../../js/display.js');
const sheet = require('../fixtures.js').sheet;

display.setCycle('month');
display.setSheet(sheet);
display.entries($('#entries'));