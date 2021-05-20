const express = require("express");
const scraper = require("images-scraper");
const cors = require("cors");

const app = express();
const port = process.env.PORT||8000;

app.use(express.json())
app.use(cors());

const google = new scraper({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox'] 
    },
});

app.get('/',(req,res)=>{
    res.send("Try POST requests")
})


app.post('/', (req,res)=>{
    const scrapeImages = async () =>{
        const results = await google.scrape(req.body.searchItem, req.body.quantity);
        res.json(results);
    }
    scrapeImages();
})

app.listen(port,()=>{console.log("listening")})