import { React } from 'react';
import styles from "./TitleCard.module.css";

export default function TitleCard(props) {

  return (
    <div className={`${styles.bossCard} ${props.inverse ? styles.inverse : ''}`} id={props.title}>
      <div className={styles.background3}></div>
      <div className={`${styles.background2} ${styles.background2Glow}`} style={{ borderColor: props.pageColour, borderRightColor: "transparent" }}></div>
      <div className={styles.background2} style={{ borderColor: props.pageColour, borderRightColor: "transparent" }}></div>
      <div className={styles.background1}></div>

      {props.imageSrc ?
        (<div className={`${styles.imageContainer} ${props.lower && styles.lower}`}>
          <img
            className={styles.backgroundGlow}
            src={props.imageSrc.replace('http://', 'https://')}
          />
          <img
            src={props.imageSrc.replace('http://', 'https://')}
          />
        </div>)
        :
        (null)
      }

      <h2>{props.title}</h2>
    </div>
  )
}