
const puppeteer = require("puppeteer")
const bump =  require("./bump.js");
const threadFile = './file.json';
const fs = require("fs");
const LOOP = 50000;
const DELAY = 240;
let browser = null;

async function initbrowser(){
    browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ],
    headless: true,
    });
}

async function tm() {
    await initbrowser();
    execute();
    try {
        time = setInterval(async => execute(), LOOP);
    } catch (err) {
        console.log("error with excute loop\n"+ err)
    }
}
tm();

async function execute(){
    console.log("not Initiating main bump loop.");
    if(browser === null)
        initbrowser();

    let data = JSON.parse(fs.readFileSync(threadFile));
    let res = [];
    data.threads.forEach(e=>{
        let diff = Math.abs(Date.parse(e.lastbump) - new Date()) * 0.001 / 60;
        console.log(diff)
        if(diff > DELAY){
            res.push(e.thread);
            e.lastbump = new Date();
        } 
        fs.writeFileSync(threadFile, JSON.stringify(data, null, 4));
    })

    if(res.length === 0)
        console.log("No threads found.")
    else
        bump.run(browser, res);
    
}

async function killBrowser(){
    await browser.close();
}

module.exports = {
	execute,
    killBrowser
}