import "dotenv/config";
import { connectDB } from "./db/index.js";
import { app } from './app.js';

try {
  await connectDB();
  console.log("Database initialized successfully.");
} catch (error) {
  console.error("Database initialization failed", error);
}

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
