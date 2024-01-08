import React, { FC } from "react";
import styles from "./Quote.module.scss";

type QuoteProps = {
  quote: string;
  source: string;
  mergeAbove?: boolean;
};

/**
 * A quotation with a source that merges with the above component if it is a picture or title card
 * @author Ninjabattler
 * @param quote The quote to display
 * @param source The source of the quote
 * @param mergeAbove An optional value that makes the quote merge better with the component above it
 */
const Quote: FC<QuoteProps> = ({ quote, source, mergeAbove }) => (
  <div className={`${styles.quote} ${mergeAbove ? styles.mergeAbove : ""}`}>
    <div className={styles.quoteContainer}>
      <span className={styles.quotationMark} />
      <p>
        <span>{quote}</span>
      </p>
    </div>
    <div className={`${styles.quoteContainer} ${styles.glow}`} />

    <div className={styles.source}>
      <span>{source}</span>
      <span className={styles.quotationMark} />
    </div>

    <div className={`${styles.source} ${styles.glow}`}>
      <span>{source}</span>
      <span className={styles.quotationMark} />
    </div>

    <div className={styles.space} />
    <div className={`${styles.space} ${styles.gradient}`} />
  </div>
);

export default Quote;
