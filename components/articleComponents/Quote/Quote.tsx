import React, { ComponentType } from 'react';
import styles from "./Quote.module.scss";

type QuoteProps = {
  quote: string;
  source: string;
}

const Quote: ComponentType<QuoteProps> = ({ quote, source }) => (
  <div className={styles.quote}>
    <div className={styles.quoteContainer}>
      <div className={styles.sketch} />
      <h2>&quot;</h2>
      <p><span dir='ltr'>{quote}</span></p>
    </div>
    <div className={`${styles.quoteContainer} ${styles.glow}`} />

    <div className={styles.source}>
      {source}<h2>&quot;</h2>
    </div>

    <div className={`${styles.source} ${styles.glow}`} >
      {source}<h2>&quot;</h2>
    </div>

    <div className={styles.space} />
    <div className={`${styles.space} ${styles.gradient}`} />
  </div>
)

export default Quote