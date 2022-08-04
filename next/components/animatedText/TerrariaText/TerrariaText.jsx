import React from 'react';
import styles from './TerrariaText.module.css'

export default function TerrariaText(props) {

  return (
    <span className={`${styles.terrariaText} ${props.draedon && styles.draedon} ${props.yharim && styles.yharim}`} style={props.colour && { color: props.colour }}>
      <b>{props.text}</b>
    </span>
  )
}