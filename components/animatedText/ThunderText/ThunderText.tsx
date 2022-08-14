import React, { ReactElement } from 'react';
import styles from './ThunderText.module.css';

export interface ThunderTextProps {
  text: string;
}

export default function ThunderText({ text }: ThunderTextProps): ReactElement {
  return (
    <span className={styles.thunderText}>
      {text}
    </span>
  )
}