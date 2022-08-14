import React, { ReactElement } from 'react';
import styles from './EarthText.module.css'

export interface EarthTextProps {
  text: string;
}

export default function EarthText({ text }: EarthTextProps): ReactElement {
  return (
    <span className={styles.earthText}>
      {text}
    </span>
  )
}