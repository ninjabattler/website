import React from 'react';
import styles from "./Dialogue.module.css";

export default function Dialogue(props){
  return (
    <div className={styles.dialogue} style={{ filter: `drop-shadow(0px 0.3vw 0px ${props.pageColour})` }}>
      <div className={styles.dialogueText}>
        <h3>
          {props.speaker}
        </h3>
        <p>{props.text}</p>
      </div>
      <div className={styles.background1}></div>
      <img src={props.imageSrc} />
    </div>
  )
}