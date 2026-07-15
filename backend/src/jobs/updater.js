import cron from "node-cron";
import { pool } from "../db/index.js";
import { scrapePrice } from "../utils/scraper.js";
import { analyseDeal } from "../utils/dealScorer.js";
import { sendDealAlert } from "../utils/mailer.js";

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

cron.schedule("*/2 * * * *", async () => {
  try {
    const result = await pool.query(`select name,id,url from products`);
    for (const product of result.rows) {
      console.log("Checking price for: " + product.url);
      const price = await scrapePrice(product.url);
      let dealStatus;
      if (price) {
        dealStatus = await analyseDeal(product.id, price);
        console.log("Status: " + dealStatus);
        // TODO: Implement alert deduplication/cooldown mechanism. Currently, this will spam emails every 2 minutes if a deal remains good.
        if (dealStatus == "Good Deal!") {
          await sendDealAlert(product.name, product.url, price);
        }
        await pool.query(
          `insert into price_history (product_id,price) values ($1, $2)`,
          [product.id, price]
        );
      }

      await delay(5000);
    }
  } catch (error) {
    console.error("failed to fetch the row", error);
  }
});

console.log("Cron job started");
