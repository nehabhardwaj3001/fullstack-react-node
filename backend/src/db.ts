import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  host: "postgres",
  user: "postgres",
  password: "postgres",
  database: "mydb",
  port: 5432,
});
const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("✅ Users table ready");
};
initDb().catch(console.error);
export default pool;
