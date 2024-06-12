import React, { FC } from "react";
import styles from "./ArticleCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarMonthSharp,
  CommentSharp,
  ThumbDownSharp,
  ThumbUpSharp,
} from "@mui/icons-material";
import { ArticleData } from "../../types";
import { formatSanityDate } from "../../helpers/dateHelpers";

type ArticleCardProps = {
  article: ArticleData;
};

/**
 * A card to display an article and it's stats on the articles page
 * @author Ninjabattler
 * @param article The article data to display
 */
const ArticleCard: FC<ArticleCardProps> = ({ article }) => (
  <Link className={styles.articleCard} href={`/articles/${article.slug}`}>
    {/* @ts-ignore */}
    <div
      className={styles.spaceContainer}
      style={{
        // @ts-ignore
        "--custom-space-colour": article.colors.space.hex,
        // @ts-ignore
        "--custom-stars-colour": article.colors.stars.hex,
      }}
    >
      <div className={styles.space} />
      <div className={`${styles.space} ${styles.gradient}`} />
    </div>

    <div className={styles.articleInfo}>
      <div
        className={`${styles.gradientBar} ${styles.bottom}`}
        style={{
          // @ts-ignore
          "--custom-gradient-colour-1": article.colors.primary.hex,
          // @ts-ignore
          "--custom-gradient-colour-2": article.colors.secondary.hex,
        }}
      />

      <h1>{article.title}</h1>
      <h2>
        <CalendarMonthSharp />
        <em>{formatSanityDate(article.date)}</em>
        {/* @ts-ignore */}
        <CommentSharp /> {article.comments}
      </h2>
    </div>

    <div className={styles.thumbnail}>
      <Image
        src={article.thumbnail.url}
        width={article.thumbnail.width}
        height={article.thumbnail.height}
        loading="lazy"
        placeholder="blur"
        blurDataURL={article.thumbnail.blur}
        alt={article.thumbnail.alt}
      />
    </div>

    <div className={styles.articleInfo}>
      <div
        className={styles.gradientBar}
        style={{
          // @ts-ignore
          "--custom-gradient-colour-1": article.colors.primary.hex,
          // @ts-ignore
          "--custom-gradient-colour-2": article.colors.secondary.hex,
        }}
      />

      <div className={styles.tags}>
        {article.tags.map((tag, i) => {
          return <div key={i}>{tag}</div>;
        })}
      </div>

      <div className={styles.stats}>
        <span>
          <ThumbUpSharp /> {article.likes}
        </span>

        <span>
          <ThumbDownSharp /> {article.dislikes}
        </span>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
