import express from "express";
import pool from "./db";
import authRoutes from "../src/Routes/Auth";
const app = express();
app.use(express.json());
app.use("/auth", authRoutes(pool));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
