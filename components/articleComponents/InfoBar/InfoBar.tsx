import React, { ComponentType, useEffect } from 'react';
import styles from "./InfoBar.module.scss";
import { formatSqlDate } from '../../../helpers/dateHelpers';
import Typewriter from 'typewriter-effect/dist/core';
import { TypewriterClass } from 'typewriter-effect';

export type InfoBarProps = {
  date: string;
  category: string;
  genre: string;
}

const InfoBar: ComponentType<InfoBarProps> = ({ date, category, genre }) => {
  useEffect(() => {
    const typewriter: TypewriterClass = new Typewriter('#info', {
      cursor: '',
      delay: 20
    });

    typewriter
      .pauseFor(1800)
      .typeString(`
        <div>${formatSqlDate(date)}</div>
        <div>/</div>
        <div>${category}</div>
        <div>/</div>
        <div>${genre}</div>
      `)
      .start()
  }, [])

  return (
    <div className={styles.infoBar}>
      <div className={styles.infoUnderline} />
      <div className={`${styles.infoUnderline} ${styles.sketch}`} />
      <span id="info"></span>
    </div>
  )
}

export default InfoBar