import React, { useState, ReactElement, useEffect } from "react";
import styles from "./Post.module.scss";
import Comment from "../Comment/Comment";
import {
  ArticleJson,
  IpType,
  PostIdType,
  TitleType,
  UserIdType,
  WindowServerType,
} from "../../types";
import dynamic from "next/dynamic";
import { TypedObject } from "sanity";
import { PortableText } from "next-sanity";
import Picture from "../articleComponents/Picture/Picture";
import Spoiler from "../articleComponents/Spoiler/Spoiler";
import { ArrowBackIosNewSharp, CalendarMonthSharp } from "@mui/icons-material";
import LikePanel from "../feedbackAndShare/LikePanel/LikePanel";
import ShareBar from "../feedbackAndShare/ShareBar/ShareBar";
import Link from "next/link";
const CommentArea = dynamic(
  () => import("../feedbackAndShare/CommentArea/CommentArea"),
  { loading: () => <></> },
);

type PostProps = {
  title: TitleType;
  date: string;
  comments: Array<any>;
  content: ArticleJson | TypedObject[];
  id: PostIdType;
  userId: UserIdType;
  ip: IpType;
  goBack: () => void;
  hide: boolean;
};

export default function Post({
  title,
  date,
  comments,
  content,
  id,
  userId,
  goBack,
  hide,
}: PostProps): ReactElement {
  const [commentList, setCommentList] = useState<Array<any>>(comments || []);
  const [windowServer, setWindow] = useState<WindowServerType>({});

  useEffect(() => {
    setWindow(window);
  }, []);

  return (
    <article
      key={title}
      className={`${styles.post} ${hide ? styles.hide : ""}`}
    >
      <Link
        href="/posts"
        shallow
        className={styles.backButton}
        onClick={goBack}
      >
        <ArrowBackIosNewSharp />
      </Link>

      <div className={styles.postContent}>
        <aside className={styles.commentPanel}>
          <LikePanel
            initialDislikes={0}
            initialLikes={0}
            isCurrentlyDisliked={false}
            isCurrentlyLiked={false}
            postId={id}
            userId={1}
          />

          <ShareBar
            articleLink={`/posts?p=${id}`}
            title={title}
            windowServer={windowServer}
          />

          <CommentArea
            comments={commentList}
            setComments={setCommentList}
            postId={id}
            userId={userId}
          />

          <div className={styles.comments}>
            {commentList.map((com) => {
              return (
                <Comment
                  key={com.id}
                  username={com.user[0].name}
                  date={com._createdAt}
                  content={com.content}
                  avatar={1}
                />
              );
            })}
          </div>
        </aside>

        <main>
          <PortableText
            value={content as TypedObject[]}
            components={{
              types: {
                picture: ({ value }) => {
                  return (
                    <Picture
                      picture={value.image}
                      width={value.scale}
                      float={value.float}
                      source={value.source}
                      sourceLink={value.sourceLink}
                    />
                  );
                },
                spoiler: ({ value }) => {
                  return <Spoiler text={value.content} />;
                },
              },
            }}
          />
        </main>
      </div>
    </article>
  );
}
