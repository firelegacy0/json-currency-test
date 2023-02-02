const axios = require('axios');

let myData = [];

async function getData(callback) {
    try {
        const response = await axios.get("https://my-json-server.typicode.com/firelegacy0/json-currency-test/currencies");
        myData = response.data;
        callback(myData);
    } catch (error) {
        console.error(error);
    }
}

getData(data => {
    for (const [key, value] of Object.entries(data[0])) {
        if (key == "Last updated") {
            console.log("Key: " + key)
            console.log("Value: " + value)
        }

        if (key == "US Dollar") {
            console.log("Key: " + key)
            console.log("Value: " + value)
        }
    }
    // console.log(data);

})


// fetch("https://my-json-server.typicode.com/firelegacy0/json-currency-test/currencies")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error));