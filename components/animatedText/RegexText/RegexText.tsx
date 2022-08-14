import React, { ReactElement } from 'react';
import styles from './RegexText.module.css';

export interface RegexTextProps {
  text: string;
}

export default function RegexText({ text }: RegexTextProps): ReactElement {
  return (
    <span className={styles.regexText}>
      {text}
    </span>
  )
}