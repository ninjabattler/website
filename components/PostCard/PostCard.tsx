import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./PostCard.module.scss";
import moment from "moment";
import { CommentSharp, ThumbsUpDownSharp } from "@mui/icons-material";
import Link from "next/link";

const PostCard: FC<SanityPostsResult> = ({
  _id,
  title,
  date,
  comments,
  index,
  hidden,
  likes,
  dislikes,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const onClick = () => {
    setSelected(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 350 * index);
  }, []);

  return (
    <Link
      href={`/posts?p=${_id}`}
      onClick={onClick}
      className={`${styles.postCard} ${(visible && !hidden) || selected ? styles.visible : ""} ${selected ? styles.selected : ""}`}
      shallow
    >
      <h1 className={styles.title}>{title}</h1>

      <img src={"/Ninja placeholder.png"} alt="logo" />

      <h2 className={styles.date}>
        <em>{moment(date).fromNow()}</em>
      </h2>

      <div className={styles.stats}>
        <ThumbsUpDownSharp />
        <div className={styles.likeDislikeBar}>
          <div
            className={styles.bar}
            style={{ width: `${(likes / (likes + dislikes)) * 100}%` }}
          />
        </div>
        <CommentSharp />
        {comments}
      </div>
    </Link>
  );
};

export default PostCard;
