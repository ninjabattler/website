import React, { ComponentType } from "react";
import styles from "./ThunderText.module.scss";

type ThunderTextProps = {
  text: string;
};

const ThunderText: ComponentType<ThunderTextProps> = ({ text }) => (
  <span className={styles.thunderText}>{text}</span>
);

export default ThunderText;
