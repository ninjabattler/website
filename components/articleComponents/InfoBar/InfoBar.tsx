import React, { FC } from "react";
import styles from "./InfoBar.module.scss";
import { CalendarMonthSharp } from "@mui/icons-material";
import { formatSanityDate } from "../../../helpers/dateHelpers";
import Tag from "./Tag/Tag";

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
  return (
    <div className={styles.infoBar}>
      <CalendarMonthSharp />
      <span className={styles.formattedDate}>{formatSanityDate(date)}</span>

      <div className={styles.tags}>
        {tags.map((tag, i) => {
          return <Tag key={i} tag={tag} />;
        })}
      </div>
    </div>
  );
};

export default InfoBar;
