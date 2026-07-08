import 'dotenv/config';
import {connectDB} from './db/index.js'

try{
    await connectDB();
    console.log("Database initialized successfully.")
}catch(error){
    console.error("Database initialization failed", error);
}