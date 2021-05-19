const express = require("express");
const scraper = require("images-scraper");

const app = express();
const port = 8000;

app.use(express.json())

const google = new scraper({
    puppeteer: {
        headless: false,
    },
});

app.get('/', (req,res)=>{
    const scrapeImages = async () =>{
        const results = await google.scrape("ok", 2);
        console.log('results', results);
        res.json(results);
    }
    scrapeImages();
})

app.post('/', (req,res)=>{
    const scrapeImages = async () =>{
        const results = await google.scrape(req.body.searchItem, 2);
        res.json(results);
    }
    scrapeImages();
})

app.listen(port,()=>{console.log("listening")})