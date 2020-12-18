const createDb = require('./queries/createDb');
const selectSinglePost = require('./queries/selects/selectSinglePost');
const insertNewPost = require('./queries/inserts/insertNewPost');

module.exports = {
  createDb,
  selectSinglePost,
  insertNewPost
}