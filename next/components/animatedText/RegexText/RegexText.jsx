import React from 'react';
import styles from './RegexText.module.css'

export default function RegexText(props){

  return (
    <span className={styles.regexText}>
      {props.text}
    </span>
  )
}