const express = require("express");
const scraper = require("images-scraper");
const cors = require("cors");

const app = express();
const port = process.env.PORT||8000;

app.use(express.json())
app.use(cors()) ;

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
        let result = 0;
        const results = [];
        const promises = req.body.searchItems.map(async searchItem=>{
            result = await google.scrape(searchItem.title, searchItem.quantity);
            result.splice(0,0,searchItem.title);
            return result;
        })
        for (let index = 0; index < promises.length; index++) {
            results[index] = await promises[index];
        }
        res.json(results);
    }
    scrapeImages();
})

app.listen(port,()=>{console.log("listening")})