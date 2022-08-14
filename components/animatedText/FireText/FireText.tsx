import React, { ReactElement } from 'react';
import styles from './FireText.module.css';

export interface FireTextProps {
  text: string;
}

export default function FireText({ text }: FireTextProps): ReactElement {
  return (
    <span className={styles.fireText}>
      {text}
    </span>
  )
}