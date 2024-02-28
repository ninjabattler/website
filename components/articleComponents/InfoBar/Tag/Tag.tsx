import React, { FC } from "react";
import styles from "./Tag.module.scss";

export type TagProps = {
  tag: string;
};

/**
 * A tag for the article, displayed on the InfoBar component
 * @author Ninjabattler
 * @param tag The tag
 */
const Tag: FC<TagProps> = ({ tag }) => {
  return <span className={styles.tag}>{tag}</span>;
};

export default Tag;
