// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Pool = require("pg").Pool;
require('dotenv').config();
let pool;

if (process.env.DB_URL) {
  pool = new Pool({
    connectionString: process.env.DB_URL
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });
}

pool.connect()

export default function handler(req, res) {
  if (req.method === 'GET') {
    pool.query(`SELECT * FROM posts WHERE review = false`)
      .then((response) => {
        res.status(200).send(response.rows)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }
}
