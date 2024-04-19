import React, { FC, useCallback, useMemo, useState } from "react";
import styles from "./LikePanel.module.scss";
import { ThumbUpSharp, ThumbDownSharp } from "@mui/icons-material";
import { like } from "../../../helpers/articlePageHelpers";
import { PostIdType, UserIdType } from "../../../types";

interface LikePanelProps {
  postId: PostIdType;
  userId: UserIdType;
  initialLikes: number;
  isCurrentlyLiked: boolean;
  initialDislikes: number;
  isCurrentlyDisliked: boolean;
}

/**
 * A panel shown on posts, used to like/dislike them and show the current amount of likes/dislikes
 * @author Ninjabattler
 * @param postId The id of the current post
 * @param userId The id of the current user
 * @param initialLikes The inital amount of likes
 * @param isCurrentlyLiked Whether the current user has liked this post
 * @param initialDislikes The inital amount of dislikes
 * @param isCurrentlyDisliked Whether the current user has disliked this post
 */
const LikePanel: FC<LikePanelProps> = ({
  postId,
  userId,
  initialLikes,
  isCurrentlyLiked,
  initialDislikes,
  isCurrentlyDisliked,
}) => {
  const [likes, setLikes] = useState<number>(Number(initialLikes));
  const [dislikes, setDislikes] = useState<number>(initialDislikes);
  const [isLiked, setIsLiked] = useState<boolean>(isCurrentlyLiked);
  const [isDisliked, setIsDisliked] = useState<boolean>(isCurrentlyDisliked);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [newLikePercent, setNewLikePercent] = useState<number>(
    ((likes + 1) / (likes + 1 + dislikes)) * 100,
  );
  // const [oldLikePercent, setOldLikePercent] = useState<number>((likes + 1) / ((likes + 1) + dislikes) * 100);
  const oldLikePercent: number =
    likes === 0 && dislikes === 0 ? 0 : (likes / (likes + dislikes)) * 100;

  const clickLike = useCallback((): void => {
    // like(true, postId, userId, () => {
    setIsLiked(!isLiked);
    setLikes(likes + (isLiked ? -1 : 1));
    setIsHovered(false);

    if (isDisliked) {
      setIsDisliked(!isDisliked);
      setDislikes(dislikes - 1);
    }
    // });
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

  const hoverLike = useCallback(() => {
    setIsHovered(true);
    if (isDisliked) {
      setNewLikePercent(((likes + 1) / (likes + 1 + (dislikes - 1))) * 100);
    } else if (isLiked) {
      setNewLikePercent(((likes - 1) / (likes - 1 + dislikes)) * 100);
    } else {
      setNewLikePercent(((likes + 1) / (likes + 1 + dislikes)) * 100);
    }
  }, [likes, dislikes]);

  const leaveLike = useCallback(() => {
    setIsHovered(false);
    setNewLikePercent(oldLikePercent);
  }, [likes, dislikes]);

  const hoverDislike = useCallback(() => {
    setIsHovered(true);
    if (isLiked) {
      setNewLikePercent(((likes - 1) / (likes - 1 + (dislikes + 1))) * 100);
    } else if (isDisliked) {
      setNewLikePercent((likes / (likes + (dislikes - 1))) * 100);
    } else {
      setNewLikePercent((likes / (likes + (dislikes + 1))) * 100);
    }
  }, [likes, dislikes]);

  const leaveDislike = useCallback(() => {
    setIsHovered(false);
    setNewLikePercent(oldLikePercent);
  }, [likes, dislikes]);

  return (
    <aside id={styles.likePanel}>
      <button
        className={`${styles.like} ${isLiked ? styles.selected : ""}`}
        onClick={clickLike}
        onMouseOver={hoverLike}
        onMouseLeave={leaveLike}
      >
        <ThumbUpSharp className={styles.likeIcon} />
        <ThumbUpSharp className={`${styles.likeIcon} ${styles.glow}`} />
      </button>

      <div className={styles.amounts}>
        <div className={isLiked ? styles.selected : ""}>
          <span>{initialLikes}</span>
          <span>{initialLikes + 1}</span>
        </div>
        \
        <div className={isDisliked ? styles.selected : ""}>
          <span>{initialDislikes}</span>
          <span>{initialDislikes + 1}</span>
        </div>
      </div>

      <div id={styles.likeBar}>
        <div className={styles.bar} />
        <div
          className={`${styles.bar} ${styles.fill} ${styles.preview}`}
          style={{
            width: isHovered
              ? `${oldLikePercent < newLikePercent ? newLikePercent - oldLikePercent : oldLikePercent - newLikePercent}%`
              : 0,
            marginLeft: `${oldLikePercent < newLikePercent ? oldLikePercent : newLikePercent}%`,
          }}
        />
        <div
          className={`${styles.bar} ${styles.fill}`}
          style={{
            width: `${oldLikePercent < newLikePercent ? oldLikePercent : newLikePercent}%`,
          }}
        />
      </div>

      <button
        className={`${styles.dislike} ${isDisliked ? styles.selected : ""}`}
        onClick={clickDislike}
        onMouseOver={hoverDislike}
        onMouseLeave={leaveDislike}
      >
        <ThumbDownSharp className={styles.likeIcon} />
        <ThumbDownSharp className={`${styles.likeIcon} ${styles.glow}`} />
      </button>
    </aside>
  );
};

export default LikePanel;
