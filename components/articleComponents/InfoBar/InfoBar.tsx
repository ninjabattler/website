import React, { FC, useEffect, useState } from "react";
import styles from "./InfoBar.module.scss";
import { CalendarMonthSharp } from "@mui/icons-material";
import { formatSanityDate } from "../../../helpers/dateHelpers";
import Tag from "./Tag/Tag";
import Typewriter from "typewriter-effect/dist/core";

export type InfoBarProps = {
  date: string;
  tags: string[];
};

/**
 * A bar displaying the tags and date posted of an article
 * @author Ninjabattler
 * @param date The date the article was posted
 * @param tags A list of tags
 */
const InfoBar: FC<InfoBarProps> = ({ date, tags }) => {
  const [showDateIcon, setShowDateIcon] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowDateIcon(true);
    }, 1500);

    const typewriter = new Typewriter("#date", {
      delay: 10,
      cursor: "",
      skipAddStyles: true,
    });

    typewriter.pauseFor(2000).typeString(formatSanityDate(date)).start();
  }, []);

  return (
    <div className={styles.infoBar}>
      {showDateIcon && <CalendarMonthSharp />}
      <span id="date" className={styles.formattedDate}></span>

      <div className={styles.tags}>
        {tags.map((tag, i) => {
          return <Tag key={i} tag={tag} delay={i} />;
        })}
      </div>
    </div>
  );
};

export default InfoBar;
