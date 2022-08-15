import db from '../db/db';
import requestIp from 'request-ip';
import { selectAllPostsData, selectUserId, insertNewUser } from '../db/queries';
import { GetServerSidePropsContext } from 'next';
import { PostData, UserIdType } from '../types';

export type PostsServerSideData = {
  props: {
    posts: PostData[];
    userId: UserIdType;
    ip: string | null;
  };
}

export const postsServerSideProps = async ({ req }: GetServerSidePropsContext): Promise<PostsServerSideData> => {
  const ip: string | null = requestIp.getClientIp(req)

  const postsArray: PostData[] = await selectAllPostsData(db)
  let userId: UserIdType = await selectUserId(db, ip)

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