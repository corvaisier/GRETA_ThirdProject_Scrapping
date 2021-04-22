let sqlite3 = require('sqlite3').verbose();

let data;
let totalPrice = [];
let totalSize = [];
let totalFoundation = [];

let db = new sqlite3.Database('db_scrapping.db', (err) => {
    if (err) {
        console.error(err.message);
    };
    console.log('Connected');
});

// function insert(x, a, z, e, r, t, y, u, i, o) {
//     db.run('INSERT OR IGNORE INTO house(link_unik, title, img, size, location, price, energy, foundation, textBody, textFooter) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [x, a, z, e, r, t, y, u, i, o], (err) => {
//         if (err) {
//             return console.log(err.message);
//         };
//         console.log('success');
//     });
// };
function insert(x, a, z, e, r, t, y, u, i, o) {
    db.run('INSERT OR IGNORE INTO house(link_unik, title, img, size, location, price, energy, foundation, textBody, textFooter) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [x, a, z, e, r, t, y, u, i, o], (err) => {
        if (err) {
            return console.log(err.message);
        };
        console.log('success');
    });
};

function selectAll() {
    db.all('SELECT * FROM house', [], (err, rows) => {
        if (err) {
            throw err;
        };
        rows.forEach((row) => {
            console.log(row);
        });
    });
};

function selectOne(link) {
    db.all('SELECT * FROM house WHERE link_unik = ?', [link], (err, rows) => {
        if (err) {
            throw err;
        };
        data = rows;
    });
    return data;
};

function searchPrice(city) {
    db.all('SELECT price FROM house WHERE location = ?', [city], (err, rows) => {
        if (err) {
            throw err;
        };
        for (let i = 0; i < rows.length; i++) {
            totalPrice.push(rows[i].price);
        };
    });
    return totalPrice;
};

function searchSize(city) {
    db.all('SELECT size FROM house WHERE location = ?', [city], (err, rows) => {
        if (err) {
            throw err;
        };
        for (let i = 0; i < rows.length; i++) {
            totalSize.push(rows[i].size);
        };
    });
    return totalSize;
};
function searchFoundation(city) {
    db.all('SELECT foundation FROM house WHERE location = ?', [city], (err, rows) => {
        if (err) {
            throw err;
        };
        for (let i = 0; i < rows.length; i++) {
            totalFoundation.push(rows[i].foundation);
        };
    });
    return totalFoundation;
};

module.exports = {
    insert,
    selectOne,
    searchPrice,
    searchSize,
    searchFoundation,
    selectAll
};