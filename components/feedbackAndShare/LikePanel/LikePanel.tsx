import React, { ReactElement, useCallback, useState } from "react";
import styles from "./LikePanel.module.scss";
import { ThumbUpSharp, ThumbDownSharp } from "@mui/icons-material";
import { like } from "../../../helpers/articlePageHelpers";
import { PostIdType, UserIdType } from "../../../types";

interface LikePanelProps {
  postId: PostIdType;
  userId: UserIdType;
  currentLikes: number;
  isCurrentlyLiked: boolean;
  currentDislikes: number;
  isCurrentlyDisliked: boolean;
}

/**
 * A panel shown on posts, used to like/dislike them and show the current amount of likes/dislikes
 * @author Ninjabattler
 * @param postId The id of the current post
 * @param userId The id of the current user
 * @param currentLikes The current amount of likes
 * @param isCurrentlyLiked Whether the current user has liked this post
 * @param currentDislikes The current amount of dislikes
 * @param isCurrentlyDisliked Whether the current user has disliked this post
 */
export default function LikePanel({
  postId,
  userId,
  currentLikes,
  isCurrentlyLiked,
  currentDislikes,
  isCurrentlyDisliked,
}: LikePanelProps): ReactElement {
  const [likes, setLikes] = useState<number>(Number(currentLikes));
  const [dislikes, setDislikes] = useState<number>(currentDislikes);
  const [isLiked, setIsLiked] = useState<boolean>(isCurrentlyLiked);
  const [isDisliked, setIsDisliked] = useState<boolean>(isCurrentlyDisliked);
  const likePercent: number =
    likes === 0 && dislikes === 0 ? 0 : (likes / (likes + dislikes)) * 100;

  const clickLike = useCallback((): void => {
    like(true, postId, userId, () => {
      setIsLiked(!isLiked);
      setLikes(likes + (isLiked ? -1 : 1));

      if (isDisliked) {
        setIsDisliked(!isDisliked);
        setDislikes(dislikes - 1);
      }
    });
  }, [likes, dislikes, isLiked, isDisliked]);

  const clickDislike = useCallback((): void => {
    like(false, postId, userId, () => {
      setIsDisliked(!isDisliked);
      setDislikes(dislikes + (isDisliked ? -1 : 1));

      if (isLiked) {
        setIsLiked(!isLiked);
        setLikes(likes - 1);
      }
    });
  }, [likes, dislikes, isLiked, isDisliked]);

  return (
    <aside id={styles.likePanel}>
      <button
        className={`${styles.like} ${isLiked ? styles.selected : ""}`}
        onClick={clickLike}
      >
        <ThumbUpSharp className={styles.shareIcon} />
        <ThumbUpSharp className={`${styles.shareIcon} ${styles.glow}`} />
        <span className={styles.amount}>{likes}</span>
      </button>

      <div id={styles.likeBar}>
        <div
          className={styles.bar}
          style={{
            mask: `linear-gradient(-45deg, transparent ${
              100 - likePercent
            }%, black ${100 - likePercent}%)`,
          }}
        />
      </div>

      <button
        className={`${styles.dislike} ${isDisliked ? styles.selected : ""}`}
        onClick={clickDislike}
      >
        <span className={styles.amount}>{dislikes}</span>
        <ThumbDownSharp className={styles.shareIcon} />
        <ThumbDownSharp className={`${styles.shareIcon} ${styles.glow}`} />
      </button>
    </aside>
  );
}
