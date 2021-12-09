import React from 'react';
import styles from "../styles/InfoBar.module.css";

export default function InfoBar(props){
  console.log(props)
  return (
    <div className={styles.infoBar}>
      <div className={styles.infoUnderline}></div>
      <span>
        <div>
          <i className="fas fa-calendar-alt"></i>
          {props.date}
        </div>
        <div>
          <i className="fas fa-gamepad"></i>
          {props.categoryGenre}
        </div>
      </span>
    </div>
  )
}