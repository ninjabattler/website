const express = require('express');
const queries = require('../db/queries');
const router = express.Router();
const cors = require('cors');

module.exports = (database) => {

  router.use(cors())

  router.get('/', async (req, res) => {
    const posts = await queries.selectAllPosts(database)

    res.send(posts)
  })

  return router;

}