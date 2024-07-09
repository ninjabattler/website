import React, { CSSProperties, FC } from "react";
import styles from "./ArticleCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarMonthSharp,
  CommentSharp,
  ThumbDownSharp,
  ThumbUpSharp,
} from "@mui/icons-material";
import { formatSanityDate } from "../../utils/dateHelpers";

/**
 * A card to display an article and it's stats on the articles page
 * @author Ninjabattler
 * @param article The article data to display
 */
const ArticleCard: FC<SanityArticlesSearchResult> = ({
  title,
  slug,
  date,
  thumbnail,
  comments,
  likes,
  dislikes,
  tags,
  colors,
  hidden,
}) => (
  <Link
    className={`${styles.articleCard} ${hidden ? styles.hidden : ""}`}
    href={`/articles/${slug}`}
    style={
      {
        "--custom-gradient-colour-1": colors.primary,
        "--custom-gradient-colour-2": colors.secondary,
        "--custom-space-colour": colors.space,
        "--custom-stars-colour": colors.stars,
      } as CSSProperties
    }
  >
    <div className={styles.spaceContainer}>
      <div className={styles.space} />
      <div className={`${styles.space} ${styles.gradient}`} />
    </div>

    <div className={styles.articleInfo}>
      <div className={`${styles.gradientBar} ${styles.bottom}`} />

      <h1>{title}</h1>
      <h2>
        <CalendarMonthSharp />
        <em>{formatSanityDate(date)}</em>
        <CommentSharp /> {comments}
      </h2>
    </div>

    <div className={styles.thumbnail}>
      <Image
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
        loading="lazy"
        placeholder="blur"
        blurDataURL={thumbnail.blur}
        alt={thumbnail.alt}
      />
    </div>

    <div className={styles.articleInfo}>
      <div className={styles.gradientBar} />

      <div className={styles.tags}>
        {tags.map((tag, i) => {
          return <div key={i}>{tag}</div>;
        })}
      </div>

      <div className={styles.stats}>
        <span>
          <ThumbUpSharp /> {likes}
        </span>

        <span>
          <ThumbDownSharp /> {dislikes}
        </span>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
