import React, { ComponentType, useEffect } from "react";
import styles from "./InfoBar.module.scss";
import { formatSqlDate } from "../../../helpers/dateHelpers";
import Typewriter from "typewriter-effect/dist/core";
import { TypewriterClass } from "typewriter-effect";
import Tag from "./Tag/Tag";

export type InfoBarProps = {
  date: string;
  tags: string[];
};

const InfoBar: ComponentType<InfoBarProps> = ({ date, tags }) => {
  useEffect(() => {
    const typewriter: TypewriterClass = new Typewriter("#info", {
      cursor: "",
      delay: 20,
    });

    typewriter
      .pauseFor(1800)
      .typeString(
        `
        <div>${formatSqlDate(date)}</div>
      `,
      )
      .start();
  }, []);

  return (
    <div className={styles.infoBar}>
      <div className={styles.infoUnderline} />
      <div className={`${styles.infoUnderline} ${styles.sketch}`} />
      <span className={styles.info}>
        <p id="info"></p>
        {tags.map((tag, i) => {
          return <Tag key={i} tag={tag} />;
        })}
      </span>
    </div>
  );
};

export default InfoBar;
