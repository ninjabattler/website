import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./TitleCard.module.scss";

type TitleCardProps = {
  imageSrc: string;
  title: string;
  pageColour?: ColourType;
  lower?: boolean;
  coverBelow?: boolean;
}

const TitleCard: ComponentType<TitleCardProps> = ({ imageSrc, title, pageColour, lower, coverBelow }) => (
  <div className={`${styles.bossCard} ${coverBelow && styles.coverBelow}`} id={title}>
    <div className={styles.space} />
    <div className={`${styles.space} ${styles.gradient}`} />

    <div className={styles.background4} />

    <div className={styles.background3} />
    <div className={`${styles.background3} ${styles.sketch}`} />

    <div className={styles.background2} />
    <div className={styles.background1}>
      <p />
      <p className={styles.sketch} />
    </div>

    {imageSrc ?
      (<div className={`${styles.imageContainer} ${lower && styles.lower}`}>
        <img
          src={imageSrc.replace('http://', 'https://')}
          alt='header image'
        />
      </div>)
      :
      (null)
    }

    <h2>{title}</h2>
  </div>
)

export default TitleCard