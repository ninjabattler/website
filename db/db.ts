import { Pool } from "pg";
require("dotenv").config();
let pool: Pool;

if (process.env.DB_URL) {
  pool = new Pool({
    connectionString: process.env.DB_URL,
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    database: process.env.DB_NAME,
  });
}

export default pool;
