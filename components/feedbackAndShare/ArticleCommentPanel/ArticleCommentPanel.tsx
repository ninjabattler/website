import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./ArticleCommentPanel.module.scss";
import noCommentMessages from "../../../constants/noCommentMessages.json";
import LikePanel from "../LikePanel/LikePanel";
import ShareBar from "../ShareBar/ShareBar";
import Comment from "../../Comment/Comment";
import { ArticleData, PostCommentType, WindowServerType } from "../../../types";
import dynamic from "next/dynamic";
const CommentArea = dynamic(() => import("../CommentArea/CommentArea"), {
  loading: () => <></>,
});

export type ArticleCommentPanelProps = {
  articleData: ArticleData;
  liked: boolean;
  disliked: boolean;
  userId: number;
  url: string;
  randomQuoteIndex: number;
};

/**
 * A side panel used for displaying and creating comments
 * @author Ninjabattler
 * @param articleData The article data fetched from Sanity
 * @param liked Whether or not the current user has liked the article
 * @param disliked Whether or not the current user has disliked the article
 * @param userId The id of the current user
 * @param url The url of the article
 * @param randomQuoteIndex A random number for the no comment message
 */
const ArticleCommentPanel: FC<ArticleCommentPanelProps> = ({
  articleData,
  liked,
  disliked,
  userId,
  url,
  randomQuoteIndex,
}) => {
  const [commenting, setCommenting] = useState<boolean>(false);
  const [comments, setComments] = useState<PostCommentType[]>([]);
  const [windowServer, setWindow] = useState<WindowServerType>({});
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [showCommentPanel, setShowCommentPanel] = useState<boolean>(false);
  const [noAnim, setNoAnim] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const commentRef = useRef();

  useEffect(() => {
    setWindow(window);
    window.addEventListener("scroll", scrollListener);
  }, []);

  const scrollListener = () => {
    if (window.scrollY >= window.innerHeight + 300) {
      setShowCommentPanel(true);
      window.removeEventListener("scroll", scrollListener);
      setTimeout(() => {
        setNoAnim(true);
      }, 4000);
    }
  };

  return (
    <aside
      id={styles.commentPanel}
      style={{ display: showCommentPanel ? "flex" : "none" }}
    >
      <LikePanel
        postId={articleData.id}
        userId={userId}
        currentLikes={articleData.likes}
        isCurrentlyLiked={liked}
        currentDislikes={articleData.dislikes}
        isCurrentlyDisliked={disliked}
      />

      <ShareBar
        title={articleData.title}
        windowServer={windowServer}
        articleLink={url}
      />

      <CommentArea
        commentRef={commentRef}
        comments={comments}
        setComments={setComments}
        postId={articleData.id}
        userId={userId}
        commenting={commenting}
        setCommentContent={setCommentContent}
        setViewComment={setViewComment}
        viewComment={viewComment}
        setCommenting={setCommenting}
        commentContent={commentContent}
        noAnim={noAnim}
      />

      <div className={styles.comments}>
        {comments.length <= 0 && (
          <p id={styles.noCommentMessage}>
            {noCommentMessages[randomQuoteIndex]}
          </p>
        )}
        {comments.map((com, i) => {
          if (com.username) {
            return (
              <Comment
                key={i}
                username={com.username}
                date={com.date}
                content={com.content}
                avatar={com.avatar}
              />
            );
          }
        })}
      </div>
    </aside>
  );
};

export default ArticleCommentPanel;