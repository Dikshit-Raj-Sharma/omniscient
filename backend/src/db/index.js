import { Pool } from 'pg';
import 'dotenv/config';
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const connectDB= async () =>{
    try{
        const response= await pool.query('SELECT NOW()')
        console.log("DB Connected successfully at:", response.rows[0]);
    }
    catch(error){
        console.error("connection to database failed",error);
        process.exit(1);
    }
}

export {pool, connectDB}