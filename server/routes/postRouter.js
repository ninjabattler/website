const express = require('express');
const queries = require('../db/queries');
const router = express.Router();

module.exports = (database) => {

  router.get('/', async (req, res) => {
    const posts = await queries.selectAllPosts(database)

    res.send(posts)
  })

  return router;

}