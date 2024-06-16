import React, { FC, useCallback, useMemo, useState } from "react";
import styles from "./LikePanel.module.scss";
import { ThumbUpSharp, ThumbDownSharp } from "@mui/icons-material";
import { PostIdType } from "../../../types";
import { useSession } from "next-auth/react";
import axios from "axios";

interface LikePanelProps {
  postId?: PostIdType;
  articleId?: PostIdType;
  initialLikes: number;
  isCurrentlyLiked: boolean;
  initialDislikes: number;
  isCurrentlyDisliked: boolean;
}

/**
 * A panel shown on posts, used to like/dislike them and show the current amount of likes/dislikes
 * @author Ninjabattler
 * @param postId The id of the current post
 * @param articleId The id of the current article
 * @param initialLikes The inital amount of likes
 * @param isCurrentlyLiked Whether the current user has liked this post
 * @param initialDislikes The inital amount of dislikes
 * @param isCurrentlyDisliked Whether the current user has disliked this post
 */
const LikePanel: FC<LikePanelProps> = ({
  postId,
  articleId,
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
  const { data, status } = useSession();
  const oldLikePercent: number =
    likes === 0 && dislikes === 0 ? 0 : (likes / (likes + dislikes)) * 100;

  const newLike = useCallback(
    async (isLike: boolean) => {
      try {
        await axios({
          method: "post",
          url: `/api/likes/newLike`,
          data: {
            isLike,
            userId: data && data.user ? data.user.id : null,
            postId: postId || null,
            articleId: articleId || null,
          },
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [data, articleId, postId],
  );

  const deleteLike = useCallback(async () => {
    try {
      await axios({
        method: "post",
        url: `/api/likes/delete`,
        data: {
          userId: data && data.user ? data.user.id : null,
          postId: postId || null,
          articleId: articleId || null,
        },
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
  }, [data, articleId, postId]);

  const clickLike = async (): Promise<void> => {
    if (isDisliked) {
      await deleteLike();
    }

    if (!isLiked) {
      await newLike(true);
    } else {
      await deleteLike();
    }

    setIsLiked(!isLiked);
    setLikes(likes + (isLiked ? -1 : 1));
    setIsHovered(false);

    if (isDisliked) {
      setIsDisliked(!isDisliked);
      setDislikes(dislikes - 1);
    }
  };

  const clickDislike = async (): Promise<void> => {
    if (isLiked) {
      await deleteLike();
    }

    if (!isDisliked) {
      await newLike(false);
    } else {
      await deleteLike();
    }

    setIsDisliked(!isDisliked);
    setDislikes(dislikes + (isDisliked ? -1 : 1));
    setIsHovered(false);

    if (isLiked) {
      setIsLiked(!isLiked);
      setLikes(likes - 1);
    }
  };

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
          <span>{initialLikes - (isCurrentlyLiked ? 1 : 0)}</span>
          <span>{initialLikes + 1 - (isCurrentlyLiked ? 1 : 0)}</span>
        </div>
        \
        <div className={isDisliked ? styles.selected : ""}>
          <span>{initialDislikes - (isCurrentlyDisliked ? 1 : 0)}</span>
          <span>{initialDislikes + 1 - (isCurrentlyDisliked ? 1 : 0)}</span>
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
