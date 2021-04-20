let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db_scrapping.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected');
});
function insert(a, z, e, r, t, y, u, i){ 
db.run('INSERT INTO house(title, size, location, price, energy, foundation, textBody, textFooter) VALUES(?, ?, ?, ?, ?, ?, ?, ? )', [a, z, e, r, t, y, u, i], (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('success');
})
}
function selectAll(){
    db.all('SELECT * FROM house', [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row.size);
        });
      });
    }
    
module.exports = {insert, selectAll};