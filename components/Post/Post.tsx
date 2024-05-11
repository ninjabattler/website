import React, { useState, useRef, MutableRefObject, ReactElement } from "react";
import styles from "./Post.module.scss";
import FireText from "../animatedText/FireText/FireText";
import IceText from "../animatedText/IceText/IceText";
import ThunderText from "../animatedText/ThunderText/ThunderText";
import EarthText from "../animatedText/EarthText/EarthText";
import RegexText from "../animatedText/RegexText/RegexText";
import MetalHeadText from "../animatedText/MetalHeadText/MetalHeadText";
import TerrariaText from "../animatedText/TerrariaText/TerrariaText";
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
import ArticleContent from "../articleComponents/ArticleContent/ArticleContent";
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
      <h1>{title}</h1>
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

          <ArticleContent content={content} />
        </div>
      )}
    </article>
  );
}
