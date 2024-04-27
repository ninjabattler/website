import React, { FC, useEffect } from "react";
import { TitleType } from "../../types";
import InfoBar, { InfoBarProps } from "../articleComponents/InfoBar/InfoBar";
import styles from "./VideoHeader.module.scss";
import Typewriter from "typewriter-effect/dist/core";

type VideoHeaderProps = {
  video: string | null;
  title: TitleType;
  infoBarProps: InfoBarProps;
};

/**
 * The title of an article, displayed on a title bar with a fixed video behind it
 * @author Ninjabattler
 * @param vido The video
 * @param title The title
 * @param infoBarProps Props, including a date and tags for the ino bar component
 */
const VideoHeader: FC<VideoHeaderProps> = ({ video, title, infoBarProps }) => {
  useEffect(() => {
    const typewriter = new Typewriter("#title", {
      delay: 10,
      cursor: "",
      skipAddStyles: true,
    });

    typewriter.pauseFor(1500).typeString(title).start();
  }, []);

  return (
    <>
      {/* Video */}
      <div id={styles.videoContainer}>
        {!video.startsWith("htt") && <div id={styles.videoOverlay} />}

        <video loop muted autoPlay>
          <source src={video || "/defaultVideo.mp4"} type="video/webm" />
          <source src={video || "/defaultVideo.mp4"} type="video/ogg" />
          <source src={video || "/defaultVideo.mp4"} type="video/mp4" />
        </video>
      </div>

      {/* Title */}
      <header className={styles.videoHeader}>
        <div className={styles.spaceContainer}>
          <div className={styles.space} />
          <div className={`${styles.space} ${styles.gradient}`} />
        </div>

        <div className={`${styles.bar} ${styles.dark}`} />
        <div className={styles.glow} />
        <div className={`${styles.bar} ${styles.light}`} />

        <h1 id="title"></h1>

        <div className={styles.infoContainer}>
          <InfoBar tags={infoBarProps.tags} date={infoBarProps.date} />
        </div>
      </header>
    </>
  );
};

export default VideoHeader;
