const puppeteer = require("puppeteer");
const fs = require('fs');
const filePath = './cookies.txt';
const configPath = './cookies.txt';


async function run(browser, threads) {
	const msg = fs.readFileSync(configPath).userdata.msg;

	let page = await browser.newPage();
	await page.goto("https://sythe.org");

	await new Promise((res) => setTimeout(res, 690));

	if(((fs.statSync(filePath)).size) !== 0) {
		const content = fs.readFileSync(filePath);
		const cookiesArr = JSON.parse(content);
		if(cookiesArr.length !== 0) {
			for(let cookie of cookiesArr) {
				await page.setCookie(cookie);
			}
		}
	}

	for(let k = 0; k < threads.length; ++k){
		await new Promise((res) => setTimeout(res, 590));
		try{
			console.log("navigating to: ",threads[k])

			await page.goto(threads[k]);

			const textBox = 'div > iframe'
			await page.waitForSelector(textBox, {
				visible: true
			});

			await new Promise((res) => setTimeout(res, 444));

			await page.click(textBox);

			await new Promise((res) => setTimeout(res, 500));

			await page.keyboard.type(msg);

			await page.click('#QuickReply > div.submitUnit > input.button.primary')

			//Short wait for error popup to appear
			await new Promise((res) => setTimeout(res, 599));

			console.log("Attempting to bump " + threads[k])

			if (await page.$('body > div:nth-child(17) > div.errorOverlay'))
				throw(err)
		}
		catch(err) {
			console.log("Error Caught, Resetting threads.");
			console.log(err)
			await page.close();
		}
	}
    
	await page.close();
    
}

module.exports = {
	run
}