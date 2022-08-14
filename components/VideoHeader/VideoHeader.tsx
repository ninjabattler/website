import React, { ComponentType } from 'react';
import { ColourType, TitleType } from '../../types';
import styles from './VideoHeader.module.css';

type VideoHeaderProps = {
  video: string;
  pageColour: ColourType;
  title: TitleType;
}

const VideoHeader: ComponentType<VideoHeaderProps> = ({ video, pageColour, title }) => (
  <div className={styles.videoHeader}>
    <div id={styles.videoContainer}>
      {!video.startsWith('htt') && (<div id={styles.videoOverlay} style={{ backgroundColor: pageColour }}></div>)}
      <video loop muted autoPlay >
        <source src={video ? video.replace('http://', 'https://') : "/defaultVideo.mp4"} type="video/webm"></source>
        <source src={video ? video.replace('http://', 'https://') : "/defaultVideo.mp4"} type="video/ogg"></source>
        <source src={video ? video.replace('http://', 'https://') : "/defaultVideo.mp4"} type="video/mp4"></source>
      </video>
    </div>

    <div className={styles.bar2}></div>
    <div className={styles.barC} style={{ borderBottomColor: pageColour, borderRightColor: "transparent" }}></div>
    <div className={`${styles.barC} ${styles.barGlow}`} style={{ borderBottomColor: pageColour, borderRightColor: "transparent" }}></div>
    <div className={styles.bar1}></div>

    <h1>
      {title}
    </h1>
  </div>
)

export default VideoHeader