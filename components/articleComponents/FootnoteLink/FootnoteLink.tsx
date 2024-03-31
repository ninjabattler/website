import React, { FC } from "react";
import styles from "./FootnoteLink.module.scss";

type FootnoteLinkProps = {
  note: number;
};

/**
 * A <sup> tag that links to a given footnote number
 * @author Ninjabattler
 * @param note The number of the footnote to link to and display
 */
const FootnoteLink: FC<FootnoteLinkProps> = ({ note }) => (
  <sup className={styles.footnoteLink}>
    <a href={`#f-${note}`}>{`[${note}]`}</a>
  </sup>
);

export default FootnoteLink;
