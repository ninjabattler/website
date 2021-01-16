const createDb = require('./queries/createDb');
const selectSinglePost = require('./queries/selects/selectSinglePost');
const selectAllPosts = require('./queries/selects/selectAllPosts');
const selectUserLike = require('./queries/selects/selectUserLike');
const selectPostComments = require('./queries/selects/selectPostComments');
const insertNewPost = require('./queries/inserts/insertNewPost');
const insertNewLike = require('./queries/inserts/insertNewLike');
const insertNewComment = require('./queries/inserts/insertNewComment');
const findCreateUser = require('./queries/findCreateUser');

module.exports = {
  createDb,
  selectSinglePost,
  selectAllPosts,
  selectUserLike,
  selectPostComments,
  insertNewPost,
  insertNewLike,
  insertNewComment,
  findCreateUser
}