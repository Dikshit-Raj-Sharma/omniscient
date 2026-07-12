import { pool } from "./index.js";
const initializeDatabase = async () => {
  try {
    console.log("creating tables");
    await pool.query(`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    url TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
    await pool.query(`CREATE TABLE IF NOT EXISTS price_history (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    price NUMERIC(10,2) NOT NULL,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
    console.log("tables created successfully");
  } catch (error) {
    console.error("table creation failed", error);
  } finally {
    await pool.end();
  }
};

initializeDatabase();
