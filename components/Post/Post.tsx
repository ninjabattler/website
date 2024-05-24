import React, { useState, useRef, MutableRefObject, ReactElement } from "react";
import styles from "./Post.module.scss";
import Comment from "../Comment/Comment";
import {
  ArticleJson,
  HtmlItem,
  IpType,
  ParagraphItem,
  PictureItem,
  PostIdType,
  TitleType,
  UserIdType,
} from "../../types";
import moment from "moment";
import dynamic from "next/dynamic";
import { TypedObject } from "sanity";
import { PortableText } from "next-sanity";
import Picture from "../articleComponents/Picture/Picture";
import Spoiler from "../articleComponents/Spoiler/Spoiler";
import { CalendarMonthSharp } from "@mui/icons-material";
import LikePanel from "../feedbackAndShare/LikePanel/LikePanel";
import ShareBar from "../feedbackAndShare/ShareBar/ShareBar";
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
};

export default function Post({
  title,
  date,
  comments,
  content,
  id,
  userId,
}: PostProps): ReactElement {
  const [commentList, setCommentList] = useState<Array<any>>(comments || []);

  return (
    <article key={title} className={styles.post}>
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
            windowServer={window}
          />

          <CommentArea
            comments={commentList}
            setComments={setCommentList}
            postId={id}
            userId={userId}
          />

          <div className={styles.comments}>
            {commentList.map((com) => {
              if (com.username) {
                return (
                  <Comment
                    key={com.id}
                    username={com.username.slice(0, 10)}
                    date={com.date}
                    content={com.content}
                    avatar={com.avatar}
                  />
                );
              }
            })}
          </div>
        </aside>

        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
        <h2 className={styles.date}>
          <CalendarMonthSharp />
          <span>{date}</span>
        </h2>

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
