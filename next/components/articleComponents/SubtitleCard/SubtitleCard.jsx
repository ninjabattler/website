import { React } from 'react';
import styles from "./SubtitleCard.module.css";

export default function SubtitleCard(props) {

  return (
    <div className={`${styles.bossCard} ${props.inverse ? styles.inverse : ''}`}>
      <div className={`${styles.background2} ${styles.background2Glow}`} style={{ borderColor: props.pageColour, borderLeftColor: "transparent" }}></div>
      <div className={styles.background2} style={{ borderColor: props.pageColour, borderLeftColor: "transparent" }}></div>
      <div className={styles.background1}></div>

      {props.imageSrc ?
        (<div className={`${styles.imageContainer} ${props.lower && styles.lower} ${props.higher && styles.higher}`} >
          <img
            className={`${props.smaller && styles.smaller} ${props.extraSmaller && styles.extraSmaller} ${styles.backgroundGlow}`}
            src={props.imageSrc.replace('http://', 'https://')}
          />
          <img
            className={`${props.smaller && styles.smaller} ${props.extraSmaller && styles.extraSmaller}`}
            src={props.imageSrc.replace('http://', 'https://')}
          />
        </div>)
        :
        (null)
      }

      <h2 id={props.title}>{props.title}</h2>
    </div>
  )
}