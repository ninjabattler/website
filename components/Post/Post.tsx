import React, { useState, ReactElement, useEffect } from "react";
import styles from "./Post.module.scss";
import Comment from "../Comment/Comment";
import { TypedObject } from "sanity";
import { PortableText } from "next-sanity";
import Picture from "../articleComponents/Picture/Picture";
import Spoiler from "../articleComponents/Spoiler/Spoiler";
import { ArrowBackIosNewSharp } from "@mui/icons-material";
import LikePanel from "../feedbackAndShare/LikePanel/LikePanel";
import ShareBar from "../feedbackAndShare/ShareBar/ShareBar";
import Link from "next/link";
import CommentArea from "../feedbackAndShare/CommentArea/CommentArea";

type PostProps = {
  title: string;
  id: string;
  userId: string;
  content: TypedObject[];
  comments: Array<any>;
  likes: number;
  dislikes: number;
  isCurrentlyLiked: boolean;
  isCurrentlyDisliked: boolean;
  hide: boolean;
  goBack: () => void;
};

export default function Post({
  title,
  id,
  userId,
  content,
  comments,
  likes,
  dislikes,
  isCurrentlyLiked,
  isCurrentlyDisliked,
  hide,
  goBack,
}: PostProps): ReactElement {
  const [commentList, setCommentList] = useState<Array<any>>(comments || []);
  const [windowServer, setWindow] = useState<WindowServerType>({});

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
            {commentList.map((com, i) => {
              return (
                <Comment
                  key={i}
                  username={com.user.name}
                  date={com._createdAt}
                  content={com.content}
                  byCurrentUser={com.byCurrentUser}
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
