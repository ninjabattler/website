import React, { ComponentType } from 'react';
import styles from './FireText.module.css';

type FireTextProps = {
  text: string;
}

const FireText: ComponentType<FireTextProps> = ({ text }) => (
  <span className={styles.fireText}>
    {text}
  </span>
)

export default FireText