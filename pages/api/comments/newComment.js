import db from '../../../db/db';
const insertNewComment = require('../../../db/inserts/insertNewComment');

export default async function handler(req, res) {
  await insertNewComment(db, req.query.content, req.query.postId, req.query.userId)
    .then(async (response) => {

      const user = await db.query(`
      SELECT * FROM users WHERE id = $1
      `, [Number(req.query.userId)])

      res.status(200).json({
        content: req.query.content,
        data: response.date,
        avatar: user.rows[0].avatar,
        username: user.rows[0].username
      })
    })
}