import axios from 'axios';
import db from '../db/db';
import { selectAllPostsData, selectUserId, insertNewUser } from '../db/queries';

export const postsServerSideProps = async () => {
  let ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' }, })
  ip = ip.data.ip;

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