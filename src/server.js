const express = require('express')
const https = require('node:https');
const app = express()
const port = 3000
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const SITE = 'https://scrapeme.live/shop/';
const test = 'https://jsonplaceholder.typicode.com/users'

app.get('/', (req, res) => {
    https.get(SITE, res => {
        let data = '';
        res.setEncoding('utf8');

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            // console.log(data)
            const document = new JSDOM(data).window.document;
            let elements = document.getElementsByTagName('A');
            const t = Array.from(elements)
                .map(el => el.getAttribute('href'))
                .filter(href => typeof href === 'string')
                .map(href => href.trim())
                .filter(Boolean);

            console.log(t)
        })
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})