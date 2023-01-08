import React, { ComponentType, useState } from 'react';
import { ArticleJson, AnimTextItem, ParagraphItem } from '../../../types';
import styles from "./AnimTextInput.module.scss";

type AnimTextInputProps = {
  animText: AnimTextItem,
  parentIndex: number,
  index: number,
  parentContent: ParagraphItem,
  articleContent: ArticleJson,
  setArticleContent: Function
}

const AnimTextInput: ComponentType<AnimTextInputProps> = ({ animText, parentIndex, index, parentContent, articleContent, setArticleContent }) => {
  const [textContent, setTextContent] = useState<AnimTextItem>(animText);

  const updateAnimText = ({ type, content, colour, draedon, yharim, moonlord, dog, scal }: AnimTextItem): void => {
    const newTextContent: AnimTextItem = { ...textContent }
    newTextContent.type = type as AnimTextItem["type"];
    newTextContent.content = content;
    newTextContent.colour = colour;
    newTextContent.draedon = draedon;
    newTextContent.yharim = yharim;
    newTextContent.moonlord = moonlord;
    newTextContent.dog = dog;
    newTextContent.scal = scal;

    let contentItem = { ...parentContent };
    contentItem.content[index] = newTextContent;

    articleContent[parentIndex] = contentItem;
    setArticleContent(articleContent);
    setTextContent(newTextContent);
  }

  return (
    <div className={styles.animTextInput}>
      <select value={textContent.type} onChange={(e) => { updateAnimText({ ...textContent, type: e.target.value as AnimTextItem["type"] }) }}>
        <option value="FireText">FireText</option>
        <option value="IceText">IceText</option>
        <option value="EarthText">EarthText</option>
        <option value="ThunderText">ThunderText</option>
        <option value="MetalHeadText">MetalHeadText</option>
        <option value="TerrariaText">TerrariaText</option>
        <option value="RegexText">RegexText</option>
      </select>
      <div className={styles.inputContainer}>
        <span>Content: </span>
        <input value={textContent.content} onChange={(e) => { updateAnimText({ ...textContent, content: e.target.value }) }}></input>
      </div>

      {textContent.type === 'TerrariaText' &&
        <>
          <div className={styles.inputContainer}>
            <span>Colour: </span>
            <input value={textContent.colour} onChange={(e) => { updateAnimText({ ...textContent, colour: e.target.value }) }}></input>
          </div>

          <div className={styles.inputContainer}>
            <span>Draedon: </span>
            <input type='checkbox' className={styles.checkbox} checked={textContent.draedon} onClick={(e) => { updateAnimText({ ...textContent, draedon: !textContent.draedon }) }}></input>
          </div>

          <div className={styles.inputContainer}>
            <span>Yharim: </span>
            <input type='checkbox' className={styles.checkbox} checked={textContent.yharim} onClick={(e) => { updateAnimText({ ...textContent, yharim: !textContent.yharim }) }}></input>
          </div>

          <div className={styles.inputContainer}>
            <span>Moonlord: </span>
            <input type='checkbox' className={styles.checkbox} checked={textContent.moonlord} onClick={(e) => { updateAnimText({ ...textContent, moonlord: !textContent.moonlord }) }}></input>
          </div>

          <div className={styles.inputContainer}>
            <span>D.O.G.: </span>
            <input type='checkbox' className={styles.checkbox} checked={textContent.dog} onClick={(e) => { updateAnimText({ ...textContent, dog: !textContent.dog }) }}></input>
          </div>

          <div className={styles.inputContainer}>
            <span>SCAL: </span>
            <input type='checkbox' className={styles.checkbox} checked={textContent.scal} onClick={(e) => { updateAnimText({ ...textContent, scal: !textContent.scal }) }}></input>
          </div>
        </>
      }
    </div>
  )
}

export default AnimTextInput