import React, { ComponentType } from 'react';
import styles from './ThunderText.module.scss';

type ThunderTextProps = {
  text: string;
}

const ThunderText: ComponentType<ThunderTextProps> = ({ text }) => (
  <span className={styles.thunderText}>
    <span>{text}</span>
    {text}
  </span>
)

export default ThunderText