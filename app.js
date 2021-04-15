let express = require('express')
let app = express()
const fetch = require('isomorphic-fetch')
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db_scrapping.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected');
  });

  db.run('INSERT INTO house(title, size, location, price, energy, foundation, textBody, textFooter, id_Ville) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', ['baba','200','vannes', '200 00', 'A', '2020', 'baba', 'baba', 3], (err) => {
	if(err) {
		return console.log(err.message); 
	}
	console.log('baba');
})




let title = [];
let size = [];
let location = [];
let price = [];
let energy = [];
let foundation = [];
let textBody = [];
let textFooter = [];
//let img = [];

function fetchData() {

    (async () => {
        let count = 1;
        for (let i = 0; i < 15; i++) {
            const response = await fetch('https://simply-home.herokuapp.com/house' + count + '.php');
            const text = await response.text();
            const dom = await new JSDOM(text);
            title.push(dom.window.document.getElementById("titleSingleArticle").textContent);
            size.push(dom.window.document.querySelector("p.size").textContent);
            location.push(dom.window.document.querySelector("p.location").textContent);
            price.push(dom.window.document.querySelector("p.price").textContent);
            energy.push(dom.window.document.querySelector("p.energy").textContent);
            foundation.push(dom.window.document.querySelector("p.foundation-years").textContent);
            textBody.push(dom.window.document.getElementById("articleContent").textContent);
            textFooter.push(dom.window.document.getElementById("articleSubContent").textContent);
            //img.push(dom.window.document.getElementById("singleArticleImage").textContent);
            count++;
        };

        let sizeSanitized = size.map(x => x.replace('m²', '').replace('m', ''));
        let locationSanitized = location.map(x => x.replace(/[0-9]/g, ''));
        let priceSanitized = price.map(x => x.slice(0, -1));
        let foundationSanitized = foundation.filter(x => !isNaN(x));
    })();
};
fetchData();