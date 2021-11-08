const createDb = require('./queries/createDb');
const selectSinglePost = require('./queries/selects/selectSinglePost');
const selectAllPosts = require('./queries/selects/selectAllPosts');
const selectAllArticles = require('./queries/selects/selectAllArticles');
const selectUserLike = require('./queries/selects/selectUserLike');
const selectPostComments = require('./queries/selects/selectPostComments');
const selectArticleMetadata = require('./queries/selects/selectArticleMetadata');
const insertNewPost = require('./queries/inserts/insertNewPost');
const insertNewLike = require('./queries/inserts/insertNewLike');
const insertNewComment = require('./queries/inserts/insertNewComment');
const findCreateUser = require('./queries/findCreateUser');

const db = require('./db');
db.connect()
.then(() => {
  console.log('Connected')
});

module.exports = {
  // createDb: async (options) => { return await createDb(db, options) },
  selectSinglePost: async (options) => { return await selectSinglePost(db, options) },
  selectAllPosts: async (options) => { return await selectAllPosts(db, options) },
  selectAllArticles: async (options) => { return await selectAllArticles(db, options) },
  selectUserLike: async (options) => { return await selectUserLike(db, options) },
  selectPostComments: async (options) => { return await selectPostComments(db, options) },
  selectArticleMetadata: async (options) => { return await selectArticleMetadata(db, options) },
  insertNewPost: async (options) => { return await insertNewPost(db, options) },
  insertNewLike: async (options) => { return await insertNewLike(db, options) },
  insertNewComment: async (options) => { return await insertNewComment(db, options) },
  findCreateUser: async (options) => { return await findCreateUser(db, options) },
}