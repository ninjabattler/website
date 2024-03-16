import React, { FC } from "react";
import styles from "./SubtitleCard.module.scss";
import Image from "next/image";
import { SanityImage } from "../../../types";

type SubtitleCardProps = {
  image: SanityImage;
  title: string;
};

/**
 * A banner with a title and optional image used to start a new sub section in an article
 * @author Ninjabattler
 * @param title The title
 * @param image An image, displayed above the title
 */
const SubtitleCard: FC<SubtitleCardProps> = ({ image, title }) => (
  <div className={styles.subtitleCard}>
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

    <h2 id={title}>{title}</h2>
  </div>
);

export default SubtitleCard;
