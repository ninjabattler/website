import React, { ComponentType, useState } from 'react';
import { ArticleJson, QuoteItem } from '../../../types';
import styles from "./QuoteInput.module.scss";

type QuoteInputProps = {
  quote: QuoteItem,
  index: number,
  articleContent: ArticleJson,
  setArticleContent: Function
}

const QuoteInput: ComponentType<QuoteInputProps> = ({ quote, index, articleContent, setArticleContent }) => {
  const [quotecontent, setQuotecontent] = useState<QuoteItem>(quote);

  const updateQuote = (newQuote: QuoteItem): void => {

    articleContent[index] = newQuote;
    setArticleContent(articleContent);
    setQuotecontent(newQuote);
  }

  return (
    <div className={styles.quoteInput}>
      <span>Quote: </span>

      <div className={styles.inputContainer}>
        <span>Quote: </span>
        <input value={quotecontent.quote} onChange={(e) => { updateQuote({ ...quotecontent, quote: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Source: </span>
        <input value={quotecontent.source} onChange={(e) => { updateQuote({ ...quotecontent, source: e.target.value }) }}></input>
      </div>
    </div>
  )
}

export default QuoteInput