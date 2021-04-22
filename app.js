let express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;
let app = express();
app.use(bodyParser.json());
app.use(cors());

const dbFile = require("./db");
const calculFile = require("./calcul");

let link = [];
let linkImg = [];
let title = [];
let size = [];
let location = [];
let price = [];
let energy = [];
let foundation = [];
let textBody = [];
let textFooter = [];

let result = [];

async function fetchData() {

    let count = 1;

    for (let i = 0; i < 15; i++) {
        const response = await fetch('https://simply-home.herokuapp.com/house' + count + '.php');
        const text = await response.text();
        const dom = await new JSDOM(text);

        link.push('https://simply-home.herokuapp.com/house' + count + '.php');
        linkImg.push(dom.window.document.getElementById("singleArticleImage").querySelector("img").getAttribute('src'));
        title.push(dom.window.document.getElementById("titleSingleArticle").textContent);
        size.push(dom.window.document.querySelector("p.size").textContent);
        location.push(dom.window.document.querySelector("p.location").textContent);
        price.push(dom.window.document.querySelector("p.price").textContent);
        energy.push(dom.window.document.querySelector("p.energy").textContent);
        foundation.push(dom.window.document.querySelector("p.foundation-years").textContent);
        textBody.push(dom.window.document.getElementById("articleContent").textContent);
        textFooter.push(dom.window.document.getElementById("articleSubContent").textContent);
        count++;
    };

    return ([link, linkImg, title, size, location, price, energy, foundation, textBody, textFooter]);
};

function addlinkImg(link, img) {
    let a = [];
    for (let i = 0; i < 15; i++) {
        a.push(link[i] += img[i]);
    }
    return a;
}

fetchData()
    .then(
        data =>
        linkForImage = link
        .map(x => x.split("/")
            .slice(0, -1)
            .join()
            .replaceAll(",", "/")
        ),
        titleSanitized = title
        .map(x => x.length < 3 || x.length > 100 ? x = "Maison" : x),
        sizeSanitized = size
        .map(x => x.replace(/([^0-9])+/i, "")),
        sizeSanitized = sizeSanitized.map(x => parseInt(x)),
        locationSanitized = location
        .map(x => x.replace(/[0-9]/g, "")),
        priceSanitized = price
        .map(x => x.slice(0, -1)
            .replace(" ", "")
            .replace(/([^0-9])+/i, "")),
        priceSanitized = priceSanitized.map(x => parseInt(x)),
        energySanitized = energy
        .map(x => x.length != 1 ? x = "X" : x),
        foundationSanitized = foundation
        .map(x => x.replace(/([^0-9])+/i, "0")),
        foundationSanitized = foundationSanitized.map(x => parseInt(x)),
        textBodySanitized = textBody
        .map(x => x.length < 3 || x.length > 5000 ? x = "bodyText indisponible" : x),
        textFooterSanitized = textFooter
        .map(x => x.length < 3 || x.length > 5000 ? x = "bodyText indisponible" : x)
    )
    .then(data => linkImgSanitized = linkImg.map(x => x.slice(1)))
    .then(data =>  imgSanitized = addlinkImg(linkForImage, linkImgSanitized))
//    .then(data => console.log(imgSanitized))
.then(data => {
    for (let i = 0; i < 17; i++) {
        dbFile.insert(link[i], titleSanitized[i], sizeSanitized[i], locationSanitized[i], priceSanitized[i], energySanitized[i], foundationSanitized[i], textBodySanitized[i], textFooterSanitized[i], imgSanitized[i])
    }
})
app.get('/cors-test', function (req, res) {
    res.send('This is CORS-enabled for all origins!');
});
app.get('/data', (req, res) => {
    let data = dbFile.selectAll();
    res.send(data);
});
app.post('/insert', (req, res) => {
    result = dbFile.selectOne(req.body.link);
    let priceSize = calculFile.priceSize(result[0].location);
    result.push(
        priceSize,
        calculFile.percent(priceSize, (result[0].price / result[0].size)),
        calculFile.percent(calculFile.houseFoundation(result[0].location), result[0].foundation),
    );
    console.log(result);
    res.send(result);
})

app.listen(8081);