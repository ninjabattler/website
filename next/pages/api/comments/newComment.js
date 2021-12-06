import prisma from '../../../prisma/prisma';
const insertNewComment = require('../../../prisma/queries/inserts/insertNewComment');

export default async function handler(req, res) {
  await insertNewComment(prisma, req.query.content, req.query.postId, req.query.userId)
    .then(async (response) => {

      const user = await prisma.users.findMany({
        where: {
          id: Number(req.query.userId)
        }
      })

      res.status(200).json({
        content: req.query.content,
        data: response.date,
        avatar: user[0].avatar,
        username: user[0].username
      })
    })
}