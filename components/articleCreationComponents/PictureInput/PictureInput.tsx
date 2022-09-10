import React, { ComponentType, useState } from 'react';
import { ArticleJson, PictureItem } from '../../../types';
import styles from "./PictureInput.module.scss";

type PictureInputProps = {
  picture: PictureItem,
  index: number,
  articleContent: ArticleJson,
  setArticleContent: Function
}

const PictureInput: ComponentType<PictureInputProps> = ({ picture, index, articleContent, setArticleContent }) => {
  const [pictureContent, setPictureContent] = useState<PictureItem>(picture);

  const updatePicture = (newQuote: PictureItem): void => {

    articleContent[index] = newQuote;
    setArticleContent(articleContent);
    setPictureContent(newQuote);
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
    </div>
  )
}

export default PictureInput