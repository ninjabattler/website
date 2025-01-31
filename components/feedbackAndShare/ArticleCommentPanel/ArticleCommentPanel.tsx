import React, { FC, useEffect, useState } from "react";
import styles from "./ArticleCommentPanel.module.scss";
import LikePanel from "../LikePanel/LikePanel";
import ShareBar from "../ShareBar/ShareBar";
import Comment from "../../Comment/Comment";
import CommentArea from "../CommentArea/CommentArea";

export type ArticleCommentPanelProps = {
  articleData: ArticleData;
  url: string;
};

/**
 * A side panel used for displaying and creating comments
 * @author Ninjabattler
 * @param articleData The article data fetched from Sanity
 * @param url The url of the article
 */
const ArticleCommentPanel: FC<ArticleCommentPanelProps> = ({
  articleData,
  url,
}) => {
  const [comments, setComments] = useState<CommentData[]>(
    articleData.comments || [],
  );
  const [windowServer, setWindow] = useState<WindowServerType>({});
  const [showCommentPanel, setShowCommentPanel] = useState<boolean>(false);

  const setCommentsList = (commentId: string) => {
    const newCommentList = comments.filter((comment) => {
      return comment._id !== commentId;
    });

    setComments(newCommentList);
  };

  useEffect(() => {
    setWindow(window);
    window.addEventListener("scroll", scrollListener);
  }, []);

  const scrollListener = () => {
    if (window.scrollY >= window.innerHeight + 300) {
      setShowCommentPanel(true);
      window.removeEventListener("scroll", scrollListener);
    }
  };

  return (
    <aside
      id={styles.commentPanel}
      style={{ display: showCommentPanel ? "flex" : "none" }}
    >
      <LikePanel
        articleId={articleData._id}
        initialLikes={articleData.likes || 0}
        isCurrentlyLiked={articleData.isLiked}
        initialDislikes={articleData.dislikes || 0}
        isCurrentlyDisliked={articleData.isDisliked}
      />

      <ShareBar
        title={articleData.title}
        windowServer={windowServer}
        articleLink={url}
      />

      <CommentArea
        comments={comments}
        setComments={setComments}
        articleId={articleData._id}
      />

      <div className={styles.comments}>
        {comments.map((com, i) => {
          return (
            <Comment
              key={i}
              id={com._id}
              username={com.user.name}
              date={com._createdAt}
              content={com.content}
              profilePic={com.user.profilePic}
              byCurrentUser={com.byCurrentUser}
              setComments={setCommentsList}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default ArticleCommentPanel;
