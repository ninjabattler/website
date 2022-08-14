import React, { ComponentType } from 'react';
import styles from './MetalHeadText.module.css';

type MetalHeadTextProps = {
  text: string;
}

const MetalHeadText: ComponentType<MetalHeadTextProps> = ({ text }) => (
  <span className={styles.metalHeadText}>
    {text}
  </span>
)

export default MetalHeadText