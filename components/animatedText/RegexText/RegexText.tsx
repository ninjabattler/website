import React, { ComponentType } from 'react';
import styles from './RegexText.module.css';

type RegexTextProps = {
  text: string;
}

const RegexText: ComponentType<RegexTextProps> = ({ text }) => (
  <span className={styles.regexText}>
    {text}
  </span>
)

export default RegexText