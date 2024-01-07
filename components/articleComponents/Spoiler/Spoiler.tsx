import React, { ComponentType, useState } from "react";
import styles from "./Spoiler.module.scss";

type SpoilerProps = {
  text: string;
};

const Spoiler: ComponentType<SpoilerProps> = ({ text }) => {
  const [revealed, setRevealed] = useState<boolean>(false);
  const reveal = (): void => {
    if (!revealed) {
      setRevealed(true);
    }
  };

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
