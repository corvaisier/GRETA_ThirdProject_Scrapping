let express = require('express')
let app = express()
const fetch = require('isomorphic-fetch')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.get('/status', (req, res) => {
    res.send('ok')
})
app.get('/baba', (req, res) => {
    (async () => {
        let count = 1;
        let title = [];
        let size = []
        for(let i = 0; i < 15; i++) {
            const response = await fetch('https://simply-home.herokuapp.com/house' + count + '.php');
            const text = await response.text();
            const dom = await new JSDOM(text);
            titre.push(dom.window.document.getElementById("titleSingleArticle").textContent);
            console.log(dom.window.document.querySelector("p.size").textContent);
            count++;
        }
        console.log(titre)
      })()
    })
app.listen(4200)
