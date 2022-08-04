import React from 'react';
import styles from './MetalHeadText.module.css'

export default function MetalHeadText(props){

  return (
    <span className={styles.metalHeadText}>
      {props.text}
    </span>
  )
}