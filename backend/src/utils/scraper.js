import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const cleanPrice = (rawPriceString) => {
  return Number(rawPriceString.replace(/[^0-9.]/g, ""));
};

const scrapePrice = async (url) => {
  let browser;
  let page;
  try {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector(".priceToPay .a-price-whole", {
      timeout: 10000,
    });
    const rawStringCost = await page.$eval(
      ".priceToPay .a-price-whole",
      (element) => element.innerText
    );
    const cleanedCost = cleanPrice(rawStringCost);
    return cleanedCost;
  } catch (error) {
    console.error("scraping failed", error);
    if(page) await page.screenshot({ path: "bot-debug.png" });
    return null;
  } finally {
    if (browser) await browser.close();
  }
};

export { scrapePrice };
