const dbFile = require("./db");



function housePrice(city){
   let averagePrice = average(dbFile.searchPrice(city));
   console.log(averagePrice);
   let size = dbFile.searchSize(city);
   //console.log(size);
}

function average(x) {
    let withoutDuplication = [...new Set(x)];
    let averageA = withoutDuplication.reduce((acc,v) => acc + v) / withoutDuplication.length;
    return averageA;
}

module.exports = {
 housePrice
};