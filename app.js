const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env['PORT'] || 9330;

// get pages 
app.get('/', (req, res) => {
    try {
        res.status(200).send("working fine !...");
    }
    catch (err) {
        res.status(500).send("something went wrong !...");
    }
});

//search for games
app.get('/search/:sugg', async (req, res) => {
    const sugg = req.params.sugg;
    let act_url = process.env['GET_SEARCH_URL'];
    act_url = act_url.replace("${sugg}", sugg);
    axios.get(act_url).then((response) => {
        const data = response.data;
        res.send(data);
        res.end();
    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});