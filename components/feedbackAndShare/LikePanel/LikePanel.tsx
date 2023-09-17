import React, { ReactElement } from 'react';
import styles from "./LikePanel.module.scss";
// import { ThumbUpSharp, ThumbDownSharp } from '@material-ui/icons';
import { like } from '../../../helpers/articlePageHelpers';
import { ColourType, PostIdType, UserIdType } from '../../../types';

interface LikePanelProps {
  postId: PostIdType;
  userId: UserIdType;
  likes: number;
  isLiked: boolean;
  setIsLiked: Function;
  setLikes: Function;
  dislikes: number;
  isDisliked: boolean;
  setIsDisliked: Function;
  setDislikes: Function;
  pageColour: ColourType;
}

export default function LikePanel({ postId, userId, likes, isLiked, setIsLiked, setLikes, dislikes, isDisliked, setIsDisliked, setDislikes, pageColour }: LikePanelProps): ReactElement {
  const likePercent: number = (likes / (likes + dislikes)) * 100;

  const clickLike = (): void => {
    like(true, postId, userId, () => {
      setIsLiked(!isLiked)
      if (isLiked === false) {
        setLikes(likes + 1)
      } else {
        setLikes(likes - 1)
      }
      if (isDisliked) {
        setIsDisliked(!isDisliked)
        setDislikes(dislikes - 1)
      }
    })
  }

  const clickDislike = (): void => {
    like(false, postId, userId, () => {
      setIsDisliked(!isDisliked)
      if (isDisliked === false) {
        setDislikes(dislikes + 1)
      } else {
        setDislikes(dislikes - 1)
      }
      if (isLiked) {
        setIsLiked(!isLiked)
        setLikes(likes - 1)
      }
      console.log(isLiked, isDisliked)
    })
  }

  return (
    <aside className={styles.likePanel} >
      <button className={styles.like} onClick={clickLike}
        style={{ color: isLiked === true ? pageColour : 'var(--light-gray)' }}>
        <span className={styles.likeOption}>
          {/* <ThumbUpSharp className={styles.shareIcon} /> */}
          {likes}
        </span>

      </button>

      <div id={styles.likeBar} style={{ backgroundImage: `linear-gradient(90deg, ${pageColour} ${likePercent}%, transparent ${likePercent}%)` }}>

      </div>
      <button className={styles.dislike} onClick={clickDislike}
        style={{ color: isDisliked === true ? pageColour : 'var(--light-gray)' }}>
        <span className={styles.likeOption}>
          {/* <ThumbDownSharp className={styles.shareIcon} /> */}
          {dislikes}
        </span>
      </button>
    </aside>
  )
}

