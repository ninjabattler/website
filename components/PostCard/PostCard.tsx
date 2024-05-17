import React, { FC, useEffect, useState } from "react";
import styles from "./PostCard.module.scss";
import {
  ArticleJson,
  IpType,
  PostIdType,
  TitleType,
  UserIdType,
} from "../../types";
import moment from "moment";
import { TypedObject } from "sanity";
import { CommentSharp, ThumbsUpDownSharp } from "@mui/icons-material";

type PostCardProps = {
  title: TitleType;
  date: string;
  comments: Array<any>;
  content: ArticleJson | TypedObject[];
  id: PostIdType;
  userId: UserIdType;
  ip: IpType;
  index: number;
};

const PostCard: FC<PostCardProps> = ({ title, date, index }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(
      () => {
        setVisible(true);
      },
      500 + 150 * index,
    );
  }, []);

  return (
    <div className={`${styles.postCard} ${visible ? styles.visible : ""}`}>
      <h1 className={styles.title}>{title}</h1>

      <img src={"/Ninja placeholder.png"} alt="logo" />

      <h2 className={styles.date}>
        <em>{moment(date).fromNow()}</em>
      </h2>

      <div className={styles.stats}>
        <ThumbsUpDownSharp />
        <div className={styles.likeDislikeBar}>
          <div className={styles.bar} />
        </div>
        <CommentSharp />0
      </div>
    </div>
  );
};

export default PostCard;
