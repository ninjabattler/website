import React from 'react';
import styles from "../styles/InfoBar.module.css";
import { GamepadSharp, CalendarTodaySharp } from '@material-ui/icons'

export default function InfoBar(props){
  return (
    <div className={styles.infoBar}>
      <div className={styles.infoUnderline}></div>
      <span>
        <div>
          <CalendarTodaySharp />
          {props.date}
        </div>
        <div>
          <GamepadSharp />
          {props.categoryGenre}
        </div>
      </span>
    </div>
  )
}