import React, { ComponentType } from 'react';
import styles from "./InfoBar.module.scss";
import { formatSqlDate } from '../../../helpers/dateHelpers';

export type InfoBarProps = {
  date: string;
  category: string;
  genre: string;
}

const InfoBar: ComponentType<InfoBarProps> = ({ date, category, genre }) => (
  <div className={styles.infoBar}>
    <div className={styles.infoUnderline} />
    <div className={`${styles.infoUnderline} ${styles.sketch}`} />
    <span>
      <div>{formatSqlDate(date)}</div>
      <div>/</div>
      <div>{category}</div>
      <div>/</div>
      <div>{genre}</div>
    </span>
  </div>
)

export default InfoBar