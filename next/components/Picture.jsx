import React from 'react';
import styles from "../styles/Picture.module.css";

export default function Picture(props) {
  return (
    <div className={styles.picture}>
      <img
        src={props.imageSrc}
        style={{ filter: `drop-shadow(5px 5px 0px ${props.pageColour})` }}
        alt=''
      />
    </div>
  )
}