import prisma from '../../../prisma/prisma';
const { selectUsersLike, deleteLike, insertNewLike } = require('../../../prisma/queries/queries');

export default async function handler(req, res) {
  await selectUsersLike(prisma, req.query.userId)
    .then(async (response) => {

      if (response[0]) {
        await deleteLike(prisma, req.query.postId, req.query.userId)
        const newLike = await insertNewLike(prisma, req.query.like, req.query.userId, req.query.postId)

        res.status(200).json({
          newLike
        })
      } else {
        const newLike = await insertNewLike(prisma, req.query.like, req.query.userId, req.query.postId)

        res.status(200).json({
          newLike
        })
      }

    })
}