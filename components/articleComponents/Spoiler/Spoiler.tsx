import React, { FC, useCallback, useState } from "react";
import styles from "./Spoiler.module.scss";

type SpoilerProps = {
  text: string;
};


/**
 * A line of text that's hidden until a user clicks on it
 * @author Ninjabattler
 * @param text The text
 */
const Spoiler: FC<SpoilerProps> = ({ text }) => {
  const [revealed, setRevealed] = useState<boolean>(false);

  const reveal = useCallback(() => {
    if (!revealed) {
      setRevealed(true);
    }
  }, [revealed]);

  return (
    <span
      title="Spoiler"
      onClick={reveal}
      className={`${styles.spoiler} ${revealed ? styles.revealed : ""}`}
    >
      {text}
    </span>
  );
};

export default Spoiler;
