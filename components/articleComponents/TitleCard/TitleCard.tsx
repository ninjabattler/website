import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./TitleCard.module.scss";

type TitleCardProps = {
  imageSrc: string;
  title: string;
  pageColour: ColourType;
  inverse?: boolean;
  lower?: boolean
}

const TitleCard: ComponentType<TitleCardProps> = ({ imageSrc, title, pageColour, inverse, lower }) => (
  <div className={`${styles.bossCard} ${inverse ? styles.inverse : ''}`} id={title}>
    <div className={styles.background3}></div>
    <div className={`${styles.background2} ${styles.background2Glow}`} style={{ borderColor: pageColour, borderRightColor: "transparent" }}></div>
    <div className={styles.background2} style={{ borderColor: pageColour, borderRightColor: "transparent" }}></div>
    <div className={styles.background1}></div>

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