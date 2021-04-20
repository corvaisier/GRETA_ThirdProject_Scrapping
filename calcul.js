const dbFile = require("./db");

function housePrice(){
    dbFile.searchPrice()
    
}

module.exports = {
 housePrice
};