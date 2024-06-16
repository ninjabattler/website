import { GetServerSidePropsContext } from "next";
import { getCachedClient } from "../sanity/lib/getClient";
import { getSession } from "next-auth/react";
import { getAllPostsQuery, getPostQuery } from "../sanity/lib/queries";

export type PostsServerSideData = {
  props: {
    posts: SanityPostsResult[];
    selectedPost: any | null;
  };
};

export const postsServerSideProps = async ({
  req,
  query,
  draftMode,
}: GetServerSidePropsContext): Promise<PostsServerSideData> => {
  const session = await getSession({ req });
  let userId;
  let selectedPost = null;

  if (session && session.user) {
    userId = session.user.id;
  }

  const preview = draftMode
    ? { token: process.env.SANITY_API_READ_WRITE_TOKEN }
    : undefined;

  const postsArray: SanityPostsResult[] =
    await getCachedClient()(getAllPostsQuery());

  if (query.p && typeof query.p === "string") {
    selectedPost = await getCachedClient(preview)(
      getPostQuery(query.p, userId),
    );
  }

  return {
    props: {
      posts: postsArray,
      selectedPost,
    },
  };
};
