import React from 'react';
import styles from "../styles/VideoBackground.module.css";

export default function VideoBackground(props) {
  return (
    <div id={styles.videoBackground}>
      <video loop muted autoPlay >
        <source src={props.video} type="video/webm"></source>
        <source src={props.video} type="video/ogg"></source>
        <source src={props.video} type="video/mp4"></source>
      </video>
    </div>
  )
}