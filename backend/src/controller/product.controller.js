import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { scrapePrice } from "../utils/scraper.js";
import { pool } from "../db/index.js";

const addProduct = asyncHandler(async (req, res) => {
  const { url, name, } = req.body;

  if (!url || !name) {
    throw new ApiError(400, "name and url required!");
  }
  const result = await pool.query(
    `select * from products where url=$1;`,
    [url]
  );
  if (result.rows.length > 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Product Already tracked"));
  }
  const price = await scrapePrice(url);
  if (!price) {
    throw new ApiError(500, "failed to scrape product");
  }
  const newProduct = await pool.query(
    `
        insert into products (url,name,user_id)
        values($1,$2,$3)
        returning id`,
    [url, name,req.user.id]
  );
  if (newProduct.rows.length === 0) {
    throw new ApiError(500, "failed to add product");
}
  const newProductId = newProduct.rows[0].id;
  if(!newProductId){
    throw  new ApiError(400,"failed to get product Id");
  }
  await pool.query(`INSERT INTO price_history (product_id, price) VALUES ($1, $2)`,[newProductId,price]);
  return res
    .status(201)
    .json(new ApiResponse(201, price, "Product Added successfully"));
});

const getDashboardData = asyncHandler(async(req,res)=>{
  const productsResult = await pool.query(`SELECT * FROM products WHERE user_id = $1`,[req.user.id]);
  if(productsResult.rows.length === 0){
    return res
    .status(200)
    .json(new ApiResponse(200,[],"No Products Added!"));
  }
  const dashboardData= await Promise.all(
    productsResult.rows.map(async (product)=>{
      const historyQuery=await pool.query(`select price,scraped_at from price_history where product_id=$1 order by scraped_at ASC`,[product.id]);
      return {
        ...product,
        history: historyQuery.rows
      }
    })
  )
  return res
    .status(200)
    .json(new ApiResponse(201,dashboardData,"Information Sent Successfully"));
})
export {addProduct,getDashboardData}