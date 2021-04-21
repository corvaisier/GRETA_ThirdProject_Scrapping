const dbFile = require("./db");

function priceSize(city) {
    return (housePrice(city) / houseSize(city));
};

function housePrice(city) {
    let averagePrice = average(dbFile.searchPrice(city));
    return averagePrice;
};

function houseSize(city) {
    let averageSize = average(dbFile.searchSize(city));
    return averageSize;
};

function average(x) {
    let withoutDuplication = [...new Set(x)];
    let averageA = withoutDuplication.reduce((acc, v) => acc + v) / withoutDuplication.length;
    return averageA;
};

module.exports = {
    priceSize
};