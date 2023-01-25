import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./SubtitleCard.module.scss";

type SubtitleCardProps = {
  imageSrc: string;
  inverse?: boolean;
  pageColour: ColourType;
  lower: boolean;
  higher: boolean;
  smaller: boolean;
  extraSmaller: boolean;
  title: string;
}

const SubtitleCard: ComponentType<SubtitleCardProps> = ({ imageSrc, inverse, pageColour, lower, higher, smaller, extraSmaller, title }) => (
  <div className={`${styles.bossCard} ${inverse ? styles.inverse : ''}`}>
    <div className={`${styles.background2} ${styles.background2Glow}`} style={{ borderColor: pageColour, borderLeftColor: "transparent" }}></div>
    <div className={styles.background2} style={{ borderColor: pageColour, borderLeftColor: "transparent" }}></div>
    <div className={styles.background1}></div>

    {imageSrc ?
      (<div className={`${styles.imageContainer} ${lower && styles.lower} ${higher && styles.higher}`} >
        <img
          className={`${smaller && styles.smaller} ${extraSmaller && styles.extraSmaller} ${styles.backgroundGlow}`}
          src={imageSrc.replace('http://', 'https://')}
          alt='header image'
        />
        <img
          className={`${smaller && styles.smaller} ${extraSmaller && styles.extraSmaller}`}
          src={imageSrc.replace('http://', 'https://')}
          alt='header image'
        />
      </div>)
      :
      (null)
    }

    <h2 id={title}>{title}</h2>
  </div>
)

export default SubtitleCard