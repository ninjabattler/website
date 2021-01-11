const createDb = require('./queries/createDb');
const selectSinglePost = require('./queries/selects/selectSinglePost');
const selectAllPosts = require('./queries/selects/selectAllPosts');
const insertNewPost = require('./queries/inserts/insertNewPost');
const findCreateUser = require('./queries/findCreateUser');

module.exports = {
  createDb,
  selectSinglePost,
  selectAllPosts,
  insertNewPost,
  findCreateUser
}