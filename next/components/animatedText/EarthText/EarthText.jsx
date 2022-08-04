import React from 'react';
import styles from './EarthText.module.css'

export default function EarthText(props){
  return (
    <span className={styles.earthText}>
      {props.text}
    </span>
  )
}