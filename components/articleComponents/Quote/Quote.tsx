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
    
    <h3 className={styles.source}>{source}<h2>&quot;</h2></h3>
  </div>
)

export default Quote