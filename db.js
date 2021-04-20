let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db_scrapping.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected');
});
function insert(x, a, z, e, r, t, y, u, i){ 
db.run('INSERT OR IGNORE INTO house(link_uniq, title, size, location, price, energy, foundation, textBody, textFooter) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? )', [x, a, z, e, r, t, y, u, i], (err) => {
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


    var data;
    function selectOne(link){    
        
        db.all('SELECT * FROM house WHERE link_uniq = ?', [link], (err, rows) => {
            if (err) {
              throw err;
            }
        
            data = rows;
          });
          
          return data;
        }
module.exports = {insert, selectAll, selectOne};