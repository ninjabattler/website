import db from '../db/db';
import requestIp from 'request-ip'
import { selectAllPostsData, selectUserId, insertNewUser } from '../db/queries';

export const postsServerSideProps = async (req) => {
  const ip = requestIp.getClientIp(req.req)

  const postsArray = await selectAllPostsData(db)
  const userId = await selectUserId(db, ip)

  if (!userId) {
    userId = await insertNewUser(db, ip)
  }

  return {
    props: {
      posts: postsArray,
      userId: userId,
      ip: ip
    }
  }
}