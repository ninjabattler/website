import React, { ComponentType } from 'react';
import styles from "./LoadingOverlay.module.scss";
import quotes from '../../constants/loadingOverlayQuotes.json';

type LoadingOverlayProps = {
  shrink?: boolean;
  quoteIndex: number;
}

const LoadingOverlay: ComponentType<LoadingOverlayProps> = ({ shrink, quoteIndex }) => (
  <div id={styles.loadingOverlay} className={shrink && styles.shrink}>
    <div id={styles.backgroundFilter}/>
    <img src='/Ninja placeholder.png' />
    <p>&quot; <i>{quotes[quoteIndex].quote}</i> &quot;</p>
    <span>{quotes[quoteIndex].source}</span>
  </div>
)

export default LoadingOverlay