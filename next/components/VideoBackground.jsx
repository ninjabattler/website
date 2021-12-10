import React from 'react';
import styles from "../styles/VideoBackground.module.css";

export default function VideoBackground(props) {
  return (
    <div id={styles.videoBackground}>
      {!props.video && (<div style={{ backgroundColor: props.pageColour }}></div>)}
      <video loop muted autoPlay >
        <source src={props.video || "/defaultVideo.mp4"} type="video/webm"></source>
        <source src={props.video || "/defaultVideo.mp4"} type="video/ogg"></source>
        <source src={props.video || "/defaultVideo.mp4"} type="video/mp4"></source>
      </video>
    </div>
  )
}