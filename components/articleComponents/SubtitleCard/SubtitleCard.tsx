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
    <div className={styles.background2} style={{ '--subtitleColour1': pageColour } as any}></div>

    <div className={styles.background1}>
      <div />
      <div className={styles.sketch} />
    </div>

    <div className={styles.background3}>
      <div className={styles.sketch} />
    </div>

    <div className={styles.background4} style={{ '--subtitleColour1': pageColour } as any}></div>

    {imageSrc ?
      (<div className={`${styles.imageContainer} ${lower && styles.lower} ${higher && styles.higher}`} >
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