import React, { ComponentType, useEffect } from "react";
import { ColourType, TitleType } from "../../types";
import InfoBar, { InfoBarProps } from "../articleComponents/InfoBar/InfoBar";
import styles from "./VideoHeader.module.scss";
import Typewriter from "typewriter-effect/dist/core";
import { TypewriterClass } from "typewriter-effect";
import gsap from "gsap";

type VideoHeaderProps = {
  video: string;
  pageColour: ColourType;
  title: TitleType;
  infoBarProps: InfoBarProps;
};

const VideoHeader: ComponentType<VideoHeaderProps> = ({
  video,
  pageColour,
  title,
  infoBarProps,
}) => {
  useEffect(() => {
    const typewriter: TypewriterClass = new Typewriter("#title", {
      cursor: "",
      delay: 20,
    });

    typewriter.pauseFor(2200).typeString(title).start();
  }, []);

  return (
    <>
      <div id={styles.videoContainer}>
        {!video.startsWith("htt") && (
          <div
            id={styles.videoOverlay}
            style={{ backgroundColor: pageColour }}
          ></div>
        )}
        <video loop muted autoPlay>
          <source
            src={
              video ? video.replace("http://", "https://") : "/defaultVideo.mp4"
            }
            type="video/webm"
          ></source>
          <source
            src={
              video ? video.replace("http://", "https://") : "/defaultVideo.mp4"
            }
            type="video/ogg"
          ></source>
          <source
            src={
              video ? video.replace("http://", "https://") : "/defaultVideo.mp4"
            }
            type="video/mp4"
          ></source>
        </video>
      </div>

      <div className={styles.videoHeader}>
        <div className={styles.bar2} />
        <div className={`${styles.bar2} ${styles.sketch}`} />

        <div className={styles.barC} />
        <div className={`${styles.barC} ${styles.barGlow}`} />

        <div className={styles.bar1} />
        <div className={`${styles.bar1} ${styles.sketch}`} />

        <h1 id="title">{title}</h1>

        <div className={styles.infoContainer}>
          <InfoBar tags={infoBarProps.tags} date={infoBarProps.date} />
        </div>
      </div>
    </>
  );
};

export default VideoHeader;
