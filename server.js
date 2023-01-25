//server.js
const jsonServer = require('json-server');
const express = require('express')
const app = express();
const fs = require('fs');

app.use('/currencies')

// List to show all currencies in the file
app.get('/currencies', (req, res) => {
    fs.readFile('currencyDB1.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
        }

        try {
            const jsonData = JSON.parse(data);
            return res.json(jsonData);
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    });
});

app.get('/currency', (req, res) => {
    fs.readFile('./currencyDB1.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        try {
            const jsonData = JSON.parse(data);
            const currency = req.headers.currency;
            if (!currency)
                return res.status(400).json({ error: 'Currency key not found in headers' });
            if (!jsonData[currency]) {
                return res.status(404).json({ error: `Currency ${currency} not found` });
            }

            // Return if found, always return Last updated and the currency
            return res.json({
                "Last updated": jsonData['Last updated'],
                [currency]: jsonData[currency]
            });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})