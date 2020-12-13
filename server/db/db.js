const Pool= require("pg").Pool;
require('dotenv').config();

console.log(process.env.DB_PASSWORD)

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  database:process.env.DB_NAME
});

module.exports = pool;