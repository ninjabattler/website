import db from '../../../db/db';
import selectUsersLike from '../../../db/selects/selectUsersLike';
import deleteLike from '../../../db/deletes/deleteLike';
import insertNewLike from '../../../db/inserts/insertNewLike';
import { NextApiRequest, NextApiResponse } from 'next';
import { PostIdType, UserIdType } from '../../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const userId: UserIdType = Number(req.query.userId);
  const postId: PostIdType = Number(req.query.postId);
  const like: string = req.query.like as string;

  await selectUsersLike(db, userId)
    .then(async (response) => {
      if (response[0]) {
        await deleteLike(db, postId, userId)
        let newLike: any;

        if (response[0].liked !== Boolean(like)) {
          newLike = await insertNewLike(db, like, postId, userId);
        }

        res.status(200).json({
          newLike
        })
      } else {
        const newLike = await insertNewLike(db, like, postId, userId)

        res.status(200).json({
          newLike
        })
      }

    })
}