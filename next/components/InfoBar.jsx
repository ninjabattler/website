import React from 'react';
import styles from "../styles/InfoBar.module.css";
import { GamepadSharp, CalendarTodaySharp } from '@material-ui/icons'
import { formatSqlDate } from '../helpers/dateHelpers';

export default function InfoBar(props){
  return (
    <div className={styles.infoBar}>
      <div className={styles.infoUnderline}></div>
      <span>
        <div>{formatSqlDate(props.date)}</div>
        <div>/</div>
        <div>{props.category}</div>
        <div>/</div>
        <div>{props.genre}</div>  
      </span>
    </div>
  )
}