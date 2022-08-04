import React from 'react';
import styles from './ThunderText.module.css'

export default function ThunderText(props) {

  return (
    <span className={styles.thunderText}>
      {props.text}
    </span>
  )
}