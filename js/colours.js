const baseColour = 128;
const maxColour = 256;
const midColour = (maxColour + baseColour) / 2;

const build = {
    red: (red, other) => [red, other, other],
    green: (green, other) => [other, green, other],
    grey: colour => [colour, colour, colour],
};

const buildColourToRatio = (colour, ratio) => {
    if (typeof ratio !== 'number' || ratio < 0 || ratio > 1)
        throw 'Ratio must be betweeen 0 and 1.';

    if (typeof build[colour] !== 'function') throw `Unknown colour "${colour}".`;

    const range = maxColour - baseColour;

    return build[colour](
        baseColour + range * ratio,
        baseColour - baseColour * ratio
    );
};

module.exports = {
    maxCredit: build['green'](maxColour, 0),
    maxDebit: build['red'](maxColour, 0),
    defaultCredit: buildColourToRatio('green', 0.5),
    defaultDebit: buildColourToRatio('red', 0.5),
    zeroAmount: build['grey'](baseColour),
    buildColourToRatio: buildColourToRatio
};