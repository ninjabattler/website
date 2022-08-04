import React from 'react';
import styles from './FireText.module.css'

export default function FireText(props){
  return (
    <span className={styles.fireText}>
      {props.text}
    </span>
  )
}