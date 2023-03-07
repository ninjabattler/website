import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./TitleCard.module.scss";

type TitleCardProps = {
  imageSrc: string;
  title: string;
  pageColour: ColourType;
  lower?: boolean
}

const TitleCard: ComponentType<TitleCardProps> = ({ imageSrc, title, pageColour, lower }) => (
  <div className={styles.bossCard} id={title}>

    <div className={styles.background4} style={{ backgroundColor: pageColour }} />

    <div className={styles.background3} />
    <div className={`${styles.background3} ${styles.sketch}`} />

    <div className={`${styles.background2} ${styles.glow}`} style={{ backgroundColor: pageColour }} />
    <div className={styles.background2} style={{ backgroundColor: pageColour }} />

    <div className={styles.background1} />
    <div className={`${styles.background1} ${styles.sketch}`} />

    {imageSrc ?
      (<div className={`${styles.imageContainer} ${lower && styles.lower}`}>
        <img
          className={styles.backgroundGlow}
          src={imageSrc.replace('http://', 'https://')}
          alt='header image'
        />
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