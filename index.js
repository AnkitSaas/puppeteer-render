require('dotenv').config()
const { executablePath, defaultViewport } = require('chrome-aws-lambda');
const express = require('express')
const app = express()

let chrome = {};
let puppeteer;

if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
    chrome = require('chrome-aws-lambda')
    puppeteer = require('puppeteer-chrome')
}else{
    puppeteer = require('puppeteer')
}

let result =[];
let options = {};

if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
    options = {
        args:[...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true
    }
}

const run = async()=>{
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto('https://www.futuretools.io/', 
    { waitUntil: 'domcontentloaded', timeout: 5000 });

    const title = await page.title();

    result.push(title);

}

app.get('/api/title',async(req,res)=>{
    try {
    await run()
    res.send(result)
    
    } catch (error) {
        console.log(error)
    }
    
})

app.get('/',async(req,res)=>{
    try {
    res.send("The server is running on Production...")
    
    } catch (error) {
        console.log(error)
    } 
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('The server is listening on 3000...')
})