import React, { ComponentType } from 'react';
import styles from "./Quote.module.scss";

type QuoteProps = {
  quote: string;
  source: string;
  mergeAbove?: boolean;
}

const Quote: ComponentType<QuoteProps> = ({ quote, source, mergeAbove }) => (
  <div className={`${styles.quote} ${mergeAbove ? styles.mergeAbove : ''}`}>
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

    <div className={`${styles.source} ${styles.glow}`} >
      <span>{source}</span>
      <span className={styles.quotationMark} />
    </div>

    <div className={styles.space} />
    <div className={`${styles.space} ${styles.gradient}`} />
  </div>
)

export default Quote