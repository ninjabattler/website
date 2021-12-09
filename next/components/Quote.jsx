import React from 'react';
import styles from "../styles/Quote.module.css";

export default function Quote(props){
  return (
    <div className={styles.quote}>
      <div>
        <h2>"</h2>
        <p><i>{props.quote}</i></p>
        <h2>"</h2>
      </div>
      <h3>{props.source}</h3>
    </div>
  )
}