import React, { ComponentType } from 'react';
import styles from './IceText.module.css';

type IceTextProps = {
  text: string;
}

const IceText: ComponentType<IceTextProps> = ({ text }) => (
  <span className={styles.iceText}>
    {text}
  </span>
)

export default IceText