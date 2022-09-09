import React, { ComponentType, useState } from 'react';
import { AnimTextItem, ArticleJson, ParagraphItem } from '../../../types';
import AnimTextInput from '../AnimTextInput/AnimTextInput';
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

  const changeItemIndex = (i: number, direction: 'up' | 'down'): void => {
    const newIndex = direction == 'up' ? i - 1 : i + 1;
    const newParagraph = { ...paragraphContent };

    const currentItem = newParagraph.content[i];
    const itemToSwap = newParagraph.content[newIndex];

    newParagraph.content[i] = itemToSwap;
    newParagraph.content[newIndex] = currentItem;

    content[index] = newParagraph;
    setContent(content);
    setParagraphContent(newParagraph);
  }

  const deleteItem = (i: number): void => {
    const newParagraph = { ...paragraphContent };
    newParagraph.content.splice(i, 1);

    content[index] = newParagraph;
    setContent(content);
    setParagraphContent(newParagraph);
  }

  const newItem = (item: 'Text' | 'Anim Text'): void => {
    const newParagraph = { ...paragraphContent };

    if (item === "Text") {
      newParagraph.content.push("")
    } else if (item === "Anim Text") {
      newParagraph.content.push({
        type: "FireText",
        content: ""
      })
    }

    content[index] = newParagraph;
    setContent(content);
    setParagraphContent(newParagraph);
  }

  return (
    <div className={styles.paragraphInput}>
      <span>Paragraph: </span>

      <select value="+" onChange={(e) => { newItem(e.target.value as 'Text' | 'Anim Text'); }}>
        <option style={{ display: 'none' }} value="+">+</option>
        <option value="Text">Text</option>
        <option value="Anim Text">Anim Text</option>
      </select>

      <div className={styles.inputContainer}>
        {
          paragraphContent.content.map((item, i) => {
            if (typeof item === 'string') {
              return (
                <div className={styles.paragraphTextInput}>
                  <div className={styles.arrowContainer}>
                    <button onClick={() => { deleteItem(i); }}>X</button>
                    <button onClick={() => { i !== 0 && changeItemIndex(i, 'up') }}>↑</button>
                    <button onClick={() => { i !== paragraphContent.content.length - 1 && changeItemIndex(i, 'down') }}>↓	</button>
                  </div>
                  <textarea value={item} onChange={(e) => { updateText(e.target.value, i) }}></textarea>
                </div>

              )
            } else if (item.type.endsWith('Text')) {
              return (
                <div className={styles.paragraphTextInput}>
                  <div className={styles.arrowContainer}>
                    <button onClick={() => { deleteItem(i); }}>X</button>
                    <button onClick={() => { i !== 0 && changeItemIndex(i, 'up') }}>↑</button>
                    <button onClick={() => { i !== paragraphContent.content.length - 1 && changeItemIndex(i, 'down') }}>↓	</button>
                  </div>
                  <AnimTextInput
                    animText={item as AnimTextItem}
                    index={i}
                    parentIndex={index}
                    articleContent={content}
                    parentContent={paragraphContent}
                    setArticleContent={setContent}
                  />
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default ParagraphInput