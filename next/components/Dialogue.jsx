import React from 'react';
import styles from "../styles/Dialogue.module.css";

export default function Dialogue(props){
  return (
    <div className={styles.dialogue} style={{ filter: `drop-shadow(2px 2px 0px ${props.pageColour})` }}>
      <div className={styles.dialogueText}>
        <h3 style={{ filter: `drop-shadow(2px 2px 0px ${props.pageColour})` }}>
          {props.speaker}
        </h3>
        <p>{props.text}</p>
      </div>
      <img src={props.imageSrc} style={{ filter: `drop-shadow(2px 2px 0px ${props.pageColour})` }} />
    </div>
  )
}