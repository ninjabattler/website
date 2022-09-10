import React, { ComponentType, useState } from 'react';
import { ArticleJson, CodeBlockItem } from '../../../types';
import styles from "./CodeBlockInput.module.scss";

type CodeBlockInputProps = {
  codeBlock: CodeBlockItem,
  index: number,
  articleContent: ArticleJson,
  setArticleContent: Function
}

const CodeBlockInput: ComponentType<CodeBlockInputProps> = ({ codeBlock, index, articleContent, setArticleContent }) => {
  const [codeBlockContent, setCodeBlockContent] = useState<CodeBlockItem>(codeBlock);

  const updateCodeBlock = (newCodeBlock: CodeBlockItem): void => {

    articleContent[index] = newCodeBlock;
    setArticleContent(articleContent);
    setCodeBlockContent(newCodeBlock);
  }

  return (
    <div className={styles.codeBlockInput}>
      <span>Code Block: </span>

      <div className={styles.inputContainer}>
        <span>Code: </span>
        <textarea value={codeBlockContent.code} onChange={(e) => { updateCodeBlock({ ...codeBlockContent, code: e.target.value }) }}></textarea>
      </div>

      <div className={styles.inputContainer}>
        <span>Language: </span>
        <input value={codeBlockContent.language} onChange={(e) => { updateCodeBlock({ ...codeBlockContent, language: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Highlight: </span>
        <input value={codeBlockContent.highlight} onChange={(e) => { updateCodeBlock({ ...codeBlockContent, highlight: e.target.value }) }}></input>
      </div>
    </div>
  )
}

export default CodeBlockInput