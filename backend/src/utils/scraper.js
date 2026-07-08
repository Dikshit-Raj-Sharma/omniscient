import puppeteer from 'puppeteer';

const cleanPrice = (rawPriceString) => {
    return Number(
        rawPriceString.replace(/[^0-9.]/g, '')
    );
}

const scrapePrice = async(url) =>{
    let browser;
    try{
        browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(url,{waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForSelector('.priceToPay .a-price-whole', { timeout: 10000 })
        const rawStringCost=await page.$eval('.priceToPay .a-price-whole', (element) => element.innerText)
        const cleanedCost=cleanPrice(rawStringCost)
        return cleanedCost
    }catch(error){
        console.error("scraping failed",error);
        return null;
    }finally{
        if(browser) await browser.close();
    } 
}

export { scrapePrice };
