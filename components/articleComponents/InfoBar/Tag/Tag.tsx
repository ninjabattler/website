import React, { ComponentType } from "react";
import styles from "./Tag.module.scss";

export type TagProps = {
  tag: string;
};

const Tag: ComponentType<TagProps> = ({ tag }) => {
  return <span className={styles.tag}>{tag}</span>;
};

export default Tag;
