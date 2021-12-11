import db from '../../../db/db';
const { selectUsersLike, deleteLike, insertNewLike } = require('../../../db/queries');

export default async function handler(req, res) {
  await selectUsersLike(db, req.query.userId)
    .then(async (response) => {

      if (response[0]) {
        await deleteLike(db, req.query.postId, req.query.userId)
        const newLike = await insertNewLike(db, req.query.like, req.query.userId, req.query.postId)

        res.status(200).json({
          newLike
        })
      } else {
        const newLike = await insertNewLike(db, req.query.like, req.query.userId, req.query.postId)

        res.status(200).json({
          newLike
        })
      }

    })
}