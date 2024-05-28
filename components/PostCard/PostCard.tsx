import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./PostCard.module.scss";
import { ArticleJson, PostIdType, TitleType, UserIdType } from "../../types";
import moment from "moment";
import { TypedObject } from "sanity";
import { CommentSharp, ThumbsUpDownSharp } from "@mui/icons-material";
import Link from "next/link";

type PostCardProps = {
  title: TitleType;
  date: string;
  comments: number;
  id: PostIdType;
  index: number;
  hidden: boolean;
  likes: number;
  dislikes: number;
};

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  date,
  index,
  hidden,
  comments,
  likes,
  dislikes,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setSelected(true);
  }, []);

  useEffect(() => {
    setTimeout(
      () => {
        setVisible(true);
      },
      500 + 200 * index,
    );
  }, []);

  return (
    <Link
      href={`/posts?p=${id}`}
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
