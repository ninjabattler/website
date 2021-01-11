const express = require('express');
const queries = require('../db/queries');
const { encrypt, decrypt } = require('../helpers/encryptHelper');
const router = express.Router();
const cors = require('cors');

module.exports = (database) => {

  router.use(cors())

  router.get('/like', async (req, res) => {
    const user = await queries.findCreateUser(database, {ip: req.query.ip})

    console.log(user.rows)

    res.send('YES')
  })

  return router;

}