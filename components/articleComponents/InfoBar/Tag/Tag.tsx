import React, { FC, useEffect, useState } from "react";
import styles from "./Tag.module.scss";

export type TagProps = {
  tag: string;
  delay: number;
};

/**
 * A tag for the article, displayed on the InfoBar component
 * @author Ninjabattler
 * @param tag The tag
 * @param delay The delay for the tag to slide in
 */
const Tag: FC<TagProps> = ({ tag, delay }) => {
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(
      () => {
        setShown(true);
      },
      2500 + 150 * delay,
    );
  }, []);

  return (
    <span className={`${styles.tag} ${shown ? styles.shown : ""}`}>{tag}</span>
  );
};

export default Tag;
