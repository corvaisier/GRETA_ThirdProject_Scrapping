const inventory = {
    sword: 19,
    knife: 1088,
    hammer: 1344
};

//first try un two part
const myPromise = (resolve, reject) => {
    if (inventory.sword) {
        resolve('sword !');
    } else {
        reject('bouuuuh !');
    }
}
function ordersword() {
    return new Promise(myPromise)
}
ordersword()
    .then(value => console.log("value: ", value))


// second in one block in return 
function otherPromise(x) {
    return new Promise((resolve, reject) => {
        if (inventory.hammer) {
            resolve('hammer yeaaah !');
        }
        else {
            reject('bouuuuh looser !');
        };
    })
    
}
otherPromise(inventory)
    .then(value => console.log("value: ", value))
