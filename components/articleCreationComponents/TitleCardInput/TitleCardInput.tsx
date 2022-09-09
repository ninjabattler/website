import React, { ComponentType, useState } from 'react';
import { ArticleJson, TitleCardItem } from '../../../types';
import styles from "./TitleCardInput.module.scss";

type TitleCardInputProps = {
  titleCard: TitleCardItem,
  index: number,
  articleContent: ArticleJson,
  setArticleContent: Function
}

const TitleCardInput: ComponentType<TitleCardInputProps> = ({ titleCard, index, articleContent, setArticleContent }) => {
  const [titleContent, setTitleContent] = useState<TitleCardItem>(titleCard);

  const updateTitleCard = (newTitle: TitleCardItem): void => {

    articleContent[index] = newTitle;
    setArticleContent(articleContent);
    setTitleContent(newTitle);
  }

  return (
    <div className={styles.titleCardInput}>
      <span>Title Card: </span>

      <div className={styles.inputContainer}>
        <span>Title: </span>
        <input value={titleContent.title} onChange={(e) => { updateTitleCard({ ...titleContent, title: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Image: </span>
        <input value={titleContent.imageSrc} onChange={(e) => { updateTitleCard({ ...titleContent, imageSrc: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Colour: </span>
        <input value={titleContent.pageColour} onChange={(e) => { updateTitleCard({ ...titleContent, pageColour: e.target.value || undefined }) }}></input>
      </div>
    </div>
  )
}

export default TitleCardInput