import React, { FC } from "react";
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

type PostCardProps = {
  title: TitleType;
  date: string;
  comments: Array<any>;
  content: ArticleJson | TypedObject[];
  id: PostIdType;
  userId: UserIdType;
  ip: IpType;
};

const PostCard: FC<PostCardProps> = ({ title, date }) => {
  return (
    <div className={styles.post}>
      <h1 className={styles.title}>{title}</h1>

      <img src={"/Ninja placeholder.png"} alt="logo" />

      <h2 className={styles.date}>{moment(date).fromNow(true)}</h2>
    </div>
  );
};

export default PostCard;
