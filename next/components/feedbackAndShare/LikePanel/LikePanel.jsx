import React from 'react';
import styles from "./LikePanel.module.css";
import { ThumbUpSharp, ThumbDownSharp } from '@material-ui/icons';
import { like } from '../../../helpers/articlePageHelpers';

export default function LikePanel({ postId, userId, likes, isLiked, setIsLiked, setLikes, dislikes, isDisliked, setIsDisliked, setDislikes, pageColour }) {
  return (
    <aside className={styles.likePanel} >
      <button onClick={() => {
        like( true, postId, userId, () => {
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
          console.log(isLiked, isDisliked)
        })
      }}
        style={{ color: isLiked === true ? pageColour : '#292929' }}>
        <span className={styles.likeOption}><ThumbUpSharp className={styles.shareIcon} />{likes}</span>

      </button>

      <div id={styles.likeBar} style={{ backgroundImage: `linear-gradient(90deg, ${pageColour} ${(likes / (likes + dislikes)) * 100}%, transparent ${(likes / (likes + dislikes)) * 100}%)` }}>

      </div>
      <button onClick={() => {
        like( false, postId, userId, () => {
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
      }}
        style={{ color: isDisliked === true ? pageColour : '#292929' }}>
        <span className={styles.likeOption}><ThumbDownSharp className={styles.shareIcon} />{dislikes}</span>
      </button>
    </aside>
  )
}

