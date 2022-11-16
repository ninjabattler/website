import React, { ComponentType } from 'react';
import styles from "./LoadingOverlay.module.scss";
import quotes from '../../constants/loadingOverlayQuotes.json';

type LoadingOverlayProps = {
  shrink?: boolean;
  quoteIndex: number;
}

const LoadingOverlay: ComponentType<LoadingOverlayProps> = ({ shrink, quoteIndex }) => (
  <div id={styles.loadingOverlay} className={shrink && styles.shrink}>
    <img src='/Ninja placeholder.png' />
    <p>&quot;{quotes[quoteIndex]}&quot;</p>
  </div>
)

export default LoadingOverlay