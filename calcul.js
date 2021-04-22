const dbFile = require("./db");

function priceSize(city) {
    return (housePrice(city) / houseSize(city));
};

function housePrice(city) {
    return average(dbFile.searchPrice(city));   
};

function houseSize(city) {
    return average(dbFile.searchSize(city));
};

function houseFoundation(city) {
    return average(dbFile.searchFoundation(city));
};

function percent(x, y) {
    return (((x -  y) / y) * 100).toFixed(2);
}

function average(x) {
    let withoutDuplication = [...new Set(x)];
    return withoutDuplication.reduce((acc, v) => acc + v) / withoutDuplication.length;
};

module.exports = {
    priceSize,
    percent,
    houseFoundation
};