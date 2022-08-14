import React, { ComponentType } from 'react';
import { ColourType } from '../../types';
import styles from "./VideoBackground.module.css";

type VideoBackgroundProps = {
  video: string;
  pageColour: ColourType;
  overlayColour: boolean;
  nonArticlePage: boolean;
}

const VideoBackground: ComponentType<VideoBackgroundProps> = ({ video, pageColour, overlayColour, nonArticlePage }) => (
    <div id={styles.videoBackground}>
      {overlayColour && (<div style={{ backgroundColor: pageColour }}></div>)}
      <video loop muted autoPlay >
        <source src={video ? video.replace('http://', 'https://') : nonArticlePage ? "/background.mp4" : "/defaultVideo.mp4"} type="video/webm"></source>
        <source src={video ? video.replace('http://', 'https://') : nonArticlePage ? "/background.mp4" : "/defaultVideo.mp4"} type="video/ogg"></source>
        <source src={video ? video.replace('http://', 'https://') : nonArticlePage ? "/background.mp4" : "/defaultVideo.mp4"} type="video/mp4"></source>
      </video>
    </div>
  )

export default VideoBackground