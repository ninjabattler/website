import React, { FC, useEffect, useState } from "react";
import styles from "./ArticleCommentPanel.module.scss";
import LikePanel from "../LikePanel/LikePanel";
import ShareBar from "../ShareBar/ShareBar";
import Comment from "../../Comment/Comment";
import { ArticleData, PostCommentType, WindowServerType } from "../../../types";
import { useSession } from "next-auth/react";
import CommentArea from "../CommentArea/CommentArea";

export type ArticleCommentPanelProps = {
  articleData: ArticleData;
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
  url,
}) => {
  const [comments, setComments] = useState<PostCommentType[]>(
    articleData.comments || [],
  );
  const [windowServer, setWindow] = useState<WindowServerType>({});
  const [showCommentPanel, setShowCommentPanel] = useState<boolean>(false);
  const { data, status } = useSession();

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
              username={com.user.name}
              date={com._createdAt}
              content={com.content}
              avatar={com.user.avatar}
              byCurrentUser={com.byCurrentUser}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default ArticleCommentPanel;
