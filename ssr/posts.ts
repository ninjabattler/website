import requestIp from "request-ip";
import { GetServerSidePropsContext } from "next";
import { IpType, PostData, UserData, UserIdType } from "../types";
import { getCachedClient } from "../sanity/lib/getClient";
import { groq } from "next-sanity";

export type PostsServerSideData = {
  props: {
    posts: PostData[];
    userId: UserIdType | UserIdType[] | UserData[];
    ip: IpType;
  };
};

export const postsServerSideProps = async ({
  req,
}: GetServerSidePropsContext): Promise<PostsServerSideData> => {
  const ip: IpType = requestIp.getClientIp(req);

  let userId: UserIdType[] | UserData[] = [
    { id: 0, ip: "", avatar: 0, username: "" },
  ];

  const postsQuery = await groq`*[_type == "post"] | order(date desc){
    title,
    date,
  }`;

  const postsArray: PostData[] = await getCachedClient()(postsQuery);

  return {
    props: {
      posts: postsArray,
      userId: userId[0].id,
      ip: ip,
    },
  };
};
