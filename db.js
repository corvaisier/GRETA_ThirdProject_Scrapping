let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db_scrapping.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected');
});
function insert(a, z, e, r, t, y, u, i, o){ 
db.run('INSERT INTO house(title, size, location, price, energy, foundation, textBody, textFooter, id_Ville) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [a, z, e, r, t, y, u, i, o], (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('success');
})
}
module.exports = {insert};