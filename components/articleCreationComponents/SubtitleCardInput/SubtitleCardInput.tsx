import React, { ComponentType, useState } from 'react';
import { ArticleJson, SubtitleCardItem } from '../../../types';
import styles from "./SubtitleCardInput.module.scss";

type SubtitleCardInputProps = {
  subtitle: SubtitleCardItem,
  index: number,
  articleContent: ArticleJson,
  setArticleContent: Function
}

const SubtitleCardInput: ComponentType<SubtitleCardInputProps> = ({ subtitle, index, articleContent, setArticleContent }) => {
  const [subtitleContent, setSubtitleContent] = useState<SubtitleCardItem>(subtitle);

  const updateSubtitle = (newSubtitle: SubtitleCardItem): void => {
    articleContent[index] = newSubtitle;
    setArticleContent(articleContent);
    setSubtitleContent(newSubtitle);
  }

  return (
    <div className={styles.subtitleCardInput}>
      <span>Subtitle Card</span>
      <div className={styles.inputContainer}>
        <span>Title: </span>
        <input value={subtitleContent.title} onChange={(e) => { updateSubtitle({ ...subtitleContent, title: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Image: </span>
        <input value={subtitleContent.imageSrc} onChange={(e) => { updateSubtitle({ ...subtitleContent, imageSrc: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Colour: </span>
        <input value={subtitleContent.pageColour} onChange={(e) => { updateSubtitle({ ...subtitleContent, pageColour: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Lower: </span>
        <input type='checkbox' className={styles.checkbox} checked={subtitleContent.lower} onClick={(e) => { updateSubtitle({ ...subtitleContent, lower: !subtitleContent.lower }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Higher: </span>
        <input type='checkbox' className={styles.checkbox} checked={subtitleContent.higher} onClick={(e) => { updateSubtitle({ ...subtitleContent, higher: !subtitleContent.higher }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Smaller: </span>
        <input type='checkbox' className={styles.checkbox} checked={subtitleContent.smaller} onClick={(e) => { updateSubtitle({ ...subtitleContent, smaller: !subtitleContent.smaller }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Extra Smaller: </span>
        <input type='checkbox' className={styles.checkbox} checked={subtitleContent.extraSmaller} onClick={(e) => { updateSubtitle({ ...subtitleContent, extraSmaller: !subtitleContent.extraSmaller }) }}></input>
      </div>

    </div>
  )
}

export default SubtitleCardInput