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


// do all async treatment for One link
function getDom(link) {
    return new Promise((resolve, reject) => {
        fetch(link)
        .then(response => {
            return response.text()
         } )
        .then(text => new JSDOM(text))
        .then(dom => resolve(dom))
        .catch(error => {
            console.error('getDom failed with error:', error, 'on given link:', link);
            reject(error);
        });
      })
}

// this should resolve different dom elementS parsedS but not sanitizedS
function getAndSplitVariablesNotSanitized() {
    const idxs = [1, 2]

    const Promises = idxs.map((id) => getDom('https://simply-home.herokuapp.com/house' + id + '.php'))

    const links = [];
    const titles = [];

    // this give us resolve/reject to make our function a Promise thenable
    return new Promise ((resolve, reject) => {
        // Promise.all wait until Promises array all resolved or rejected
        Promise.all(Promises)
            .then((values) => {
                // extract each variable from all doms resolved
                values.forEach((oneDom, index) => {
                    // store each variables in "global-but-local" arrays
                    links.push('https://simply-home.herokuapp.com/house' + index + '.php');
                    titles.push(oneDom.window.document.getElementById("titleSingleArticle").textContent);
                  });
                // resolve all "global-but-local" arrays
                resolve({links, titles});
            })
            .catch(error => {
                console.log("sanitize fail with error:", error);
                reject(error);
            })
    })
}
function getTitleSanitized(titles) {
    return titles.map(title => title.replace("m", ""))
}

// sanitize all dom elements regrouped in one function
getAndSplitVariablesNotSanitized()
    .then(({titles}) => getTitleSanitized(titles))
    .then(data => console.log(data));


