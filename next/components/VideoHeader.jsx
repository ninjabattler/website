import { React, useEffect, useState } from 'react';
import styles from '../styles/VideoHeader.module.css'
// import video from './test/CosmicCarnage.mp4';

export default function VideoHeader(props) {
  const [windowVar, setWindowVar] = useState({});

  useEffect(() => {
    setWindowVar(window)
  }, [])

  return (
    <div className={styles.videoHeader}>
      <div id={styles.videoContainer}>
        {!props.video.startsWith('htt') && (<div id={styles.videoOverlay} style={{backgroundColor: props.pageColour}}></div>)}
        <video loop muted autoPlay >
          <source src={props.video || "/defaultVideo.mp4"} type="video/webm"></source>
          <source src={props.video || "/defaultVideo.mp4"} type="video/ogg"></source>
          <source src={props.video || "/defaultVideo.mp4"} type="video/mp4"></source>
        </video>
      </div>

      <div className={styles.bar2}></div>
      <div className={styles.barC} style={{ borderBottomColor: props.pageColour, borderRightColor: "transparent" }}></div>
      <div className={styles.bar1}></div>

      <h1 style={{ textShadow: windowVar.innerWidth > 414 ? `1px 1px 0px ${props.pageColour}` : `0.5px 0.5px 0px ${props.pageColour}` }}>
        {props.title}
      </h1>
    </div>
  )
}