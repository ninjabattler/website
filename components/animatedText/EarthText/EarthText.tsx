import React, { ComponentType } from 'react';
import styles from './EarthText.module.css'

type EarthTextProps = {
  text: string;
}

const EarthText: ComponentType<EarthTextProps> = ({ text }) => (
  <span className={styles.earthText}>
    {text}
  </span>
)

export default EarthText