import React, { FC } from "react";
import styles from "./ArticleCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { CommentSharp, ThumbsUpDownSharp } from "@mui/icons-material";
import { ArticleData } from "../../types";
import { formatSanityDate } from "../../helpers/dateHelpers";

type ArticleCardProps = {
  article: ArticleData;
};

/**
 * A card to display an article and it's stats on the articles page
 * @author Ninjabattler
 */
const ArticleCard: FC<ArticleCardProps> = ({ article }) => (
  <Link className={styles.articleCard} href={`/articles/${article.slug}`}>
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

      <div className={styles.stats}>
        <span>
          <ThumbsUpDownSharp />
        </span>

        <span>
          {/* @ts-ignore */}
          <CommentSharp /> {article.comments}
        </span>
      </div>
    </div>

    <div className={styles.articleInfo}>
      <div className={styles.likeDislikeBar}>
        <div
          className={styles.fillBar}
          style={{
            width: `${(article.likes / (article.likes + article.dislikes)) * 100}%`,
            backgroundImage: `linear-gradient(90deg, ${article.colors.primary.hex} 0%, ${article.colors.secondary.hex} 100%)`,
          }}
        />
      </div>
      <h1>{article.title}</h1>
      <h2>
        <em>{formatSanityDate(article.date)}</em>
      </h2>
    </div>
  </Link>
);

export default ArticleCard;
