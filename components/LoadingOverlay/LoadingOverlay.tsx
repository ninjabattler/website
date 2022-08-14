import React, { ComponentType } from 'react';
import styles from "./LoadingOverlay.module.css";
import quotes from '../../constants/loadingOverlayQuotes.json';

type LoadingOverlayProps = {
  shrink: boolean
}

const LoadingOverlay: ComponentType<LoadingOverlayProps> = ({ shrink }) => (
  <div id={styles.loadingOverlay} className={shrink && styles.shrink}>
    <img src='/Ninja placeholder.png' />
    <p>&quot;{quotes[Math.floor(Math.random() * quotes.length)]}&quot;</p>
  </div>
)

export default LoadingOverlay