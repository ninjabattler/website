import React, { ReactElement } from 'react';
import styles from './MetalHeadText.module.css';

export interface MetalHeadTextProps {
  text: string;
}

export default function MetalHeadText({ text }: MetalHeadTextProps): ReactElement {
  return (
    <span className={styles.metalHeadText}>
      {text}
    </span>
  )
}