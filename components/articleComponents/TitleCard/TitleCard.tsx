import React, { FC } from "react";
import styles from "./TitleCard.module.scss";
import Image from "next/image";
import { SanityImage } from "../../../types";

type TitleCardProps = {
  image?: SanityImage;
  title: string;
  coverBelow?: boolean;
};

/**
 * A large banner with a title and optional image used to start a new section in an article
 * @author Ninjabattler
 * @param title The title
 * @param image An image, displayed above the title
 * @param coverBelow An optional value used to better blend the title card with an image or quote component
 */
const TitleCard: FC<TitleCardProps> = ({ image, title, coverBelow }) => (
  <header
    className={`${styles.titleCard} ${coverBelow && styles.coverBelow}`}
    id={title}
  >
    <div className={styles.spaceContainer}>
      <div className={styles.space} />
      <div className={`${styles.space} ${styles.gradient}`} />
    </div>

    <div className={`${styles.glow} ${styles.top}`} />
    <div className={`${styles.glow} ${styles.bottom}`} />

    <div className={`${styles.bar} ${styles.dark}`} />
    {image && (
      <Image
        className={styles.banner}
        src={image.url}
        width={image.width}
        height={image.height}
        loading="lazy"
        placeholder="blur"
        blurDataURL={image.blur}
        alt={image.alt}
      />
    )}
    <div className={`${styles.bar} ${styles.light}`} />

    <h2>{title}</h2>
  </header>
);

export default TitleCard;
