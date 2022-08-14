import React, { ReactElement } from 'react';
import styles from './IceText.module.css';

export interface IceTextProps {
  text: string;
}

export default function IceText({ text }: IceTextProps): ReactElement {
  return (
    <span className={styles.iceText}>
      {text}
    </span>
  )
}