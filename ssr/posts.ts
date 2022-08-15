import db from '../db/db';
import requestIp from 'request-ip';
import selectAllPostsData from '../db/selects/selectAllPostsData';
import selectUserId from '../db/selects/selectUserId';
import insertNewUser from '../db/inserts/insertNewUser';
import { GetServerSidePropsContext } from 'next';
import { PostData, UserData, UserIdType } from '../types';

export type PostsServerSideData = {
  props: {
    posts: PostData[];
    userId: UserIdType[] | UserData[];
    ip: string | null;
  };
}

export const postsServerSideProps = async ({ req }: GetServerSidePropsContext): Promise<PostsServerSideData> => {
  const ip: string | null = requestIp.getClientIp(req)

  const postsArray: PostData[] = await selectAllPostsData(db)
  let userId: UserIdType[] | UserData[] = await selectUserId(db, ip)

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