import { scrapePrice } from './src/utils/scraper.js';

const test = async () => {
    console.log("Starting scrape test...");
    // Go find a real Amazon India product URL (like a laptop or phone) and paste it below
    const price = await scrapePrice('https://www.amazon.in/OnePlus-Playback-Translation-Dual-Device-Connectivity/dp/B0FMDL81GS/?_encoding=UTF8&ref_=pd_hp_d_btf_ls_gwc_pc_en2_');
    console.log(`Final Extracted Price: ${price}`);
};

test();