import React, { ComponentType } from 'react';
import styles from "./Quote.module.css";

type QuoteProps = {
  quote: string;
  source: string;
}

const Quote: ComponentType<QuoteProps> = ({ quote, source }) => (
  <div className={styles.quote}>
    <div>
      <h2>&quot;</h2>
      <p><i>{quote}</i></p>
      <h2>&quot;</h2>
    </div>
    <h3>{source}</h3>
  </div>
)

export default Quote