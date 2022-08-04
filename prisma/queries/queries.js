const selectAllPostsData = require('./selects/selectAllPostsData');
const selectUserId = require('./selects/selectUserId');
const selectAllArticles = require('./selects/selectAllArticles');
const selectSingleArticle = require('./selects/selectSingleArticle');
const selectUsersLike = require('./selects/selectUsersLike');
const insertNewComment = require('./inserts/insertNewComment');
const insertNewLike = require('./inserts/insertNewLike');
const deleteLike = require('./deletes/deleteLike');

module.exports = {
  selectAllPostsData,
  selectUserId,
  selectAllArticles,
  selectSingleArticle,
  selectUsersLike,
  insertNewComment,
  insertNewLike,
  deleteLike
}