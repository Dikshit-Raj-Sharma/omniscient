import cron from "node-cron";
import { pool } from "../db/index.js";
import { scrapePrice } from "../utils/scraper.js";

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

cron.schedule("*/2 * * * *", async () => {
  try {
    const result = await pool.query(`select id,url from products`);
    for(const product of result.rows){
        console.log("Checking price for: " + product.url)
        const price = await scrapePrice(product.url);
        if(price){
            await pool.query(`insert into price_history (product_id,price) values ($1, $2)`,[product.id,price]);
        }
        await delay(5000);

    }
  } catch (error) {
    console.error("failed to fetch the row",error);
  }
});

console.log("Cron job started");