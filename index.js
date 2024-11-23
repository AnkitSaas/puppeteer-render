const express = require('express')
const app = express()
const puppeteer = require('puppeteer')

/*
if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
    const chromium = require('chrome-aws-lambda')
    const puppeteer = require('puppeteer-core')
} else{
    const puppeteer = require('puppeteer')
}


    let options = {};

if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
    options = {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true
    }
}
*/

let result =[];
const run = async()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.futuretools.io/', { waitUntil: 'domcontentloaded', timeout: 5000 });

    const title = await page.title();

    result.push(title);

    // const products = await page.$$('.w-dyn-items .w-row');
    // console.log(products)

    // for (const item of products){
    //     const name = await page.evaluate(element => element.querySelector('.tool-item-link---new').textContent, item)

    //     const link = await page.evaluate(element => element.querySelector('.tool-item-new-window---new').getAttribute('href'), item)
     

    //     result.push({name, link})

    // }
    // console.log(result)
}

app.get('/api/title',async(req,res)=>{
    try {
    await run()
    res.send(result)
    
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('The server is listening on 3000...')
})