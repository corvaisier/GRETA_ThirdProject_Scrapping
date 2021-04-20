let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db_scrapping.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected');
});

let data;
let average = [];

function insert(x, a, z, e, r, t, y, u, i) {
    db.run('INSERT OR IGNORE INTO house(link_uniq, title, size, location, price, energy, foundation, textBody, textFooter) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? )', [x, a, z, e, r, t, y, u, i], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('success');
    })
}

function selectAll() {
    db.all('SELECT * FROM house', [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.size);
        });
    });
}

function selectOne(link) {
    db.all('SELECT * FROM house WHERE link_uniq = ?', [link], (err, rows) => {
        if (err) {
            throw err;
        }
        data = rows;
    });
    return data;
}
function searchPrice(city) {
    db.all('SELECT price FROM house WHERE ?', [city], (err, rows) => {
        if(err) {
            throw err;
        }
        console.log(rows)
        // let averagePrice = [];
        // for (let i = 0; i < rows.length; i++){
        //     averagePrice.push(rows[i].price)
        // }
        // average = averagePrice.reduce((acc,v) => acc + v) / averagePrice.length;
        // return average;
     })
}

module.exports = {
    insert,
    selectOne,
    searchPrice
};