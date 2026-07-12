import express from 'express';
import cors from 'cors';

const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))


import productRouter from './routes/product.routes.js'
import authRouter from './routes/auth.routes.js'
//routes
app.use("/api/v1/products",productRouter)

//auth routes
app.use("/api/v1/auth/",authRouter)
export { app };