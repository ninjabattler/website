import { React, useEffect, useState } from 'react';
import styles from "../styles/TitleCard.module.css";

export default function TitleCard(props) {

  const [windowVar, setWindowVar] = useState({});

  useEffect(() => {
    setWindowVar(window)
  }, [])

  return (
    <div className={`${styles.bossCard} ${props.inverse ? styles.inverse : ''}`} id={props.title}>
      <div className={styles.background2} style={{ borderColor: props.pageColour, borderRightColor: "transparent" }}></div>
      <div className={styles.background1}></div>

      {props.imageSrc ?
        (<div className={`${styles.imageContainer} ${props.lower && styles.lower}`} style={{ filter: windowVar.innerWidth > 414 ? `drop-shadow(1px 1px 0px ${props.pageColour})` : `drop-shadow(0.3px 0.3px 0px ${props.pageColour})` }}>
          <img
            src={props.imageSrc.replace('http://', 'https://')}
          />
        </div>)
        :
        (null)
      }

      <h2 style={{ textShadow: windowVar.innerWidth > 414 ? `1px 1px 0px ${props.pageColour}` : `0.3px 0.3px 0px ${props.pageColour}` }} >{props.title}</h2>
    </div>
  )
}