import { pool } from "../db/index.js";

const analyseDeal= async(productId, currentPrice)=>{
    const result= await pool.query(`select * from price_history where product_id=$1`,[productId]);
    if(result.rows.length<1){
        return "Not Enough Data";
    }
    let avg=0;
    let cnt=0;
    for(const row of result.rows){
        avg+=Number(row.price);
        cnt++;
    }
    avg=avg/cnt;
    if(avg<currentPrice){
        return "Bad Time To Buy"
    }
    else if(avg*0.9>=currentPrice){
        return "Good Deal!"
    }
    else return "Wait";
    
}

export {analyseDeal}