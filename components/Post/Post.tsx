import React, { useState, ReactElement, useEffect } from "react";
import styles from "./Post.module.scss";
import Comment from "../Comment/Comment";
import { TypedObject } from "sanity";
import { PortableText } from "next-sanity";
import Picture from "../articleComponents/Picture/Picture";
import Spoiler from "../articleComponents/Spoiler/Spoiler";
import { ArrowLeftSharp } from "@mui/icons-material";
import LikePanel from "../feedbackAndShare/LikePanel/LikePanel";
import ShareBar from "../feedbackAndShare/ShareBar/ShareBar";
import Link from "next/link";
import CommentArea from "../feedbackAndShare/CommentArea/CommentArea";
import { formatSanityDate } from "../../utils/dateHelpers";

type PostProps = {
  title: string;
  date?: string;
  id: string;
  content: TypedObject[];
  comments: CommentData[];
  likes: number;
  dislikes: number;
  isCurrentlyLiked: boolean;
  isCurrentlyDisliked: boolean;
  hide: boolean;
  goBack: () => void;
};

export default function Post({
  title,
  date,
  id,
  content,
  comments,
  likes,
  dislikes,
  isCurrentlyLiked,
  isCurrentlyDisliked,
  hide,
  goBack,
}: PostProps): ReactElement {
  const [commentList, setCommentList] = useState<CommentData[]>(comments || []);
  const [windowServer, setWindow] = useState<WindowServerType>({});

  const setComments = (commentId: string) => {
    const newCommentList = commentList.filter((comment) => {
      return comment._id !== commentId;
    });

    setCommentList(newCommentList);
  };

  useEffect(() => {
    setWindow(window);
  }, []);

  useEffect(() => {
    setCommentList(comments || []);
  }, [comments]);

  return (
    <article
      key={title}
      className={`${styles.post} ${hide ? styles.hide : ""}`}
    >
      {!hide && (
        <Link
          href="/posts"
          shallow
          className={styles.backButton}
          onClick={goBack}
        >
          <ArrowLeftSharp />
        </Link>
      )}

      <div className={styles.postContent}>
        {!hide && (
          <aside className={styles.commentPanel}>
            <LikePanel
              initialDislikes={dislikes}
              initialLikes={likes}
              isCurrentlyDisliked={isCurrentlyDisliked}
              isCurrentlyLiked={isCurrentlyLiked}
              postId={id}
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
            />

            <div className={styles.comments}>
              {commentList.map((com) => {
                return (
                  <Comment
                    id={com._id}
                    key={com._id}
                    username={com.user.name}
                    date={com._createdAt}
                    content={com.content}
                    byCurrentUser={com.byCurrentUser}
                    avatar={1}
                    setComments={setComments}
                  />
                );
              })}
            </div>
          </aside>
        )}

        <p className={styles.title}>{title}</p>

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
        <p className={styles.date}>{date ? formatSanityDate(date) : ""}</p>
      </div>
    </article>
  );
}
