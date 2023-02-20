import React, { ComponentType } from 'react';
import { ColourType, TitleType } from '../../types';
import InfoBar, { InfoBarProps } from '../articleComponents/InfoBar/InfoBar';
import styles from './VideoHeader.module.scss';

type VideoHeaderProps = {
  video: string;
  pageColour: ColourType;
  title: TitleType;
  infoBarProps: InfoBarProps;
}

const VideoHeader: ComponentType<VideoHeaderProps> = ({ video, pageColour, title, infoBarProps }) => (
  <>
    <div id={styles.videoContainer}>
      {!video.startsWith('htt') && (<div id={styles.videoOverlay} style={{ backgroundColor: pageColour }}></div>)}
      <video loop muted autoPlay >
        <source src={video ? video.replace('http://', 'https://') : "/defaultVideo.mp4"} type="video/webm"></source>
        <source src={video ? video.replace('http://', 'https://') : "/defaultVideo.mp4"} type="video/ogg"></source>
        <source src={video ? video.replace('http://', 'https://') : "/defaultVideo.mp4"} type="video/mp4"></source>
      </video>
    </div>
    <div className={styles.videoHeader}>
      <div className={styles.bar2}></div>
      <div className={styles.barC} style={{ backgroundColor: pageColour, borderRightColor: "transparent" }}></div>
      <div className={`${styles.barC} ${styles.barGlow}`} style={{ backgroundColor: pageColour, borderRightColor: "transparent" }}></div>
      <div className={styles.bar1}></div>
      <div className={`${styles.bar1} ${styles.sketch}`}></div>

      <h1>
        {title}
      </h1>

      <div className={styles.infoContainer}>
        <InfoBar category={infoBarProps.category} date={infoBarProps.date} genre={infoBarProps.genre} />
      </div>
    </div>
  </>
)

export default VideoHeader