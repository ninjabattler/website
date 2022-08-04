import React from 'react';
import styles from './IceText.module.css'

export default function IceText(props) {
  return (
    <span className={styles.iceText}>
      {props.text}
    </span>
  )
}