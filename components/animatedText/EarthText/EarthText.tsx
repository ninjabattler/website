import React, { ComponentType } from "react";
import styles from "./EarthText.module.scss";

type EarthTextProps = {
  text: string;
};

const EarthText: ComponentType<EarthTextProps> = ({ text }) => (
  <span className={styles.earthText}>{text}</span>
);

export default EarthText;
