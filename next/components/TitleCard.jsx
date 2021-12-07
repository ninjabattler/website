import React from 'react';
import styles from "../styles/TitleCard.module.css";

export default function TitleCard(props){
  return (
    <div className={`${styles.bossCard} ${props.inverse ? styles.inverse : ''}`}>
      <div className={styles.background2} style={{borderColor: props.pageColour, borderRightColor: "transparent"}}></div>
      <div className={styles.background1}></div>

      {props.imageSrc ? 
      (<div className={styles.imageContainer} style={{filter: `drop-shadow(1px 1px 0px ${props.pageColour})`}}> 
        <img
          src={props.imageSrc}
        />
      </div>)
      :
      (null)
      }   

      <h2 style={{textShadow: `1px 1px 0px ${props.pageColour}`}}>{props.title}</h2>
    </div>
  )
}