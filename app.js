let express = require('express')
let app = express()
const fetch = require('isomorphic-fetch')
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;
const dbInsert = require("./db");

let title = [];
let size = [];
let location = [];
let price = [];
let energy = [];
let foundation = [];
let textBody = [];
let textFooter = [];

async function fetchData() {

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
        count++;
    };
    return ([title, size, location, price, energy, foundation, textBody, textFooter])

};

fetchData()
    .then(data => titleSanitized = title
        .map(x => x.length < 3 || x.length > 100 ? x = "Maison" : x))
    .then(data => sizeSanitized = size
        .map(x => x.replace(/([^0-9])+/i, "")))
        .then(data => sizeSanitized = sizeSanitized.map(x => parseInt(x)))
    .then(data => locationSanitized = location
        .map(x => x.replace(/[0-9]/g, "")))
    .then(data => priceSanitized = price
        .map(x => x.slice(0, -1)
        .replace(/([^0-9])+/i, "")))
        .then(data => priceSanitized = priceSanitized.map(x => parseInt(x)))
    .then(data => energySanitized = energy
        .map(x => x.length != 1 ? x = "X" : x))
    .then(data => foundationSanitized = foundation
        .map(x => x.replace(/([^0-9])+/i, "0")))
        .then(data => foundationSanitized = foundationSanitized.map(x => parseInt(x)))
    .then(data => textBodySanitized = textBody
        .map(x => x.length < 3 || x.length > 5000 ? x = "bodyText indisponible" : x))
    .then(data => textFooterSanitized = textFooter
        .map(x => x.length < 3 || x.length > 5000 ? x = "bodyText indisponible" : x))
    .then(data => console.log(title, sizeSanitized, locationSanitized, priceSanitized, energy, foundationSanitized, textBody, textFooter))
    // .then(data => {
    //     for (let i = 0; i < 17; i++) {
    //         dbInsert.insert(titleSanitized[i], sizeSanitized[i], locationSanitized[i], priceSanitized[i], energySanitized[i], foundationSanitized[i], textBodySanitized[i], textFooterSanitized[i], 3)
    //     }
    // })