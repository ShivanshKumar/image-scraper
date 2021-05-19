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

app.post('/', (req,res)=>{
    const scrapeImages = async () =>{
        const results = await google.scrape(req.body.searchItem, 2);
        res.json(results);
    }
    scrapeImages();
})

app.listen(port,()=>{console.log("listening")})