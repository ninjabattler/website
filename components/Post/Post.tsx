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
  const [closed, setClosed] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Array<any>>(comments || []);
  const [commenting, setCommenting] = useState<boolean>(false);
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const commentRef: MutableRefObject<undefined> = useRef();

  return (
    <article
      key={title}
      className={`${
        closed === 0
          ? styles.post
          : closed === 1
            ? styles.expanded
            : `${styles.post} ${styles.closed}`
      }`}
      style={{ backgroundImage: "/Ninja placeholder.png" }}
      onClick={() => {
        setClosed(closed === 0 || closed === 2 ? 1 : 2);
        setTimeout(() => {
          setShowContent(!showContent);
        }, 700);
      }}
    >
      <style>
        {`
            :root {
              --article-colour: #aaaa44;
            }
          `}
      </style>

      {!showContent && <img src={"/Ninja placeholder.png"} alt="logo" />}
      <h1 className={styles.title}>{title}</h1>
      {!showContent && <h2>{moment(date).fromNow(true)}</h2>}

      {showContent && (
        <div
          className={`${styles.postContent} ${styles.shrunk}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <aside className={styles.commentPanel}>
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

          <main>
            <PortableText
              value={content}
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
      )}
    </article>
  );
}
