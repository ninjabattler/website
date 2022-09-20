import React, { ComponentType, useState } from 'react';
import { ArticleJson, ParagraphItem, PictureItem } from '../../../types';
import styles from "./PictureInput.module.scss";

type PictureInputProps = {
  picture: PictureItem,
  index: number,
  articleContent: ArticleJson,
  setArticleContent: Function,
  parentIndex?: number,
  parentContent?: ParagraphItem,
}

const PictureInput: ComponentType<PictureInputProps> = ({ picture, index, parentIndex, articleContent, parentContent, setArticleContent }) => {
  const [pictureContent, setPictureContent] = useState<PictureItem>(picture);

  const updatePicture = (newPicture: PictureItem): void => {
    if (typeof parentIndex !== 'number') {
      articleContent[index] = newPicture;
      setArticleContent(articleContent);
      setPictureContent(newPicture);
    } else {
      let contentItem = { ...parentContent };
      contentItem.content[index] = newPicture;

      articleContent[parentIndex] = contentItem;
      setArticleContent(articleContent);
      setPictureContent(newPicture);
    }
  }

  return (
    <div className={styles.pictureInput}>
      <span>Picture: </span>

      <div className={styles.inputContainer}>
        <span>Source: </span>
        <input value={pictureContent.imageSrc} onChange={(e) => { updatePicture({ ...pictureContent, imageSrc: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Colour: </span>
        <input value={pictureContent.pageColour} onChange={(e) => { updatePicture({ ...pictureContent, pageColour: e.target.value }) }}></input>
      </div>

      {typeof parentIndex === 'number' &&
        <>
          <div className={styles.inputContainer}>
            <span>Width: </span>
            <input value={pictureContent.width} onChange={(e) => { updatePicture({ ...pictureContent, width: e.target.value }) }}></input>
          </div>

          <div className={styles.inputContainer}>
            <span>Float: </span>
            <input value={pictureContent.float} onChange={(e) => { updatePicture({ ...pictureContent, float: e.target.value as 'left' | 'right' }) }}></input>
          </div>
        </>
      }
    </div>
  )
}

export default PictureInput