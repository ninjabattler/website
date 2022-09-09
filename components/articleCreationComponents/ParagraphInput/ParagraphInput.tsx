import React, { ComponentType, useState } from 'react';
import { ArticleJson, ParagraphItem } from '../../../types';
import styles from "./ParagraphInput.module.scss";

type ParagraphInputProps = {
  paragraph: ParagraphItem,
  index: number,
  content: ArticleJson,
  setContent: Function
}

const ParagraphInput: ComponentType<ParagraphInputProps> = ({ paragraph, index, content, setContent }) => {
  const [paragraphContent, setParagraphContent] = useState<ParagraphItem>(paragraph);

  const updateText = (newText: string, newIndex: number): void => {
    let contentItem = { ...paragraphContent };
    contentItem.content[newIndex] = newText;

    content[index] = contentItem;
    setContent(content);
    setParagraphContent(contentItem);
  }

  return (
    <div className={styles.paragraphInput}>
      <span>Paragraph: </span>
      <div className={styles.inputContainer}>
        {
          paragraphContent.content.map((item, i) => {
            if (typeof item === 'string') {
              return (<textarea value={item} onChange={(e) => { updateText(e.target.value, i) }}></textarea>)
            }
          })
        }
      </div>
    </div>
  )
}

export default ParagraphInput