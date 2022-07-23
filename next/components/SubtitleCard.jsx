import { React, useEffect, useState } from 'react';
import styles from "../styles/SubtitleCard.module.css";

export default function SubtitleCard(props) {

  const [windowVar, setWindowVar] = useState({});

  useEffect(() => {
    setWindowVar(window)
  }, [])

  return (
    <div className={`${styles.bossCard} ${props.inverse ? styles.inverse : ''}`}>
      <div className={`${styles.background2} ${styles.background2Glow}`} style={{ borderColor: props.pageColour, borderLeftColor: "transparent" }}></div>
      <div className={styles.background2} style={{ borderColor: props.pageColour, borderLeftColor: "transparent" }}></div>
      <div className={styles.background1}></div>

      {props.imageSrc ?
        (<div className={`${styles.imageContainer} ${props.lower && styles.lower} ${props.higher && styles.higher}`} style={{ filter: windowVar.innerWidth > 414 ? `drop-shadow(1px 1px 0px ${props.pageColour})` : `drop-shadow(0.3px 0.3px 0px ${props.pageColour})` }}>
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