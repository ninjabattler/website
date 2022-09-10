import React, { ComponentType, useState } from 'react';
import { ArticleJson, DialogueItem } from '../../../types';
import styles from "./DialogueInput.module.scss";

type DialogueInputProps = {
  dialogue: DialogueItem,
  index: number,
  articleContent: ArticleJson,
  setArticleContent: Function
}

const DialogueInput: ComponentType<DialogueInputProps> = ({ dialogue, index, articleContent, setArticleContent }) => {
  const [dialogueContent, setDialogueContent] = useState<DialogueItem>(dialogue);

  const updateDialogue = (newDialogue: DialogueItem): void => {

    articleContent[index] = newDialogue;
    setArticleContent(articleContent);
    setDialogueContent(newDialogue);
  }

  return (
    <div className={styles.dialogueInput}>
      <span>Dialogue: </span>

      <div className={styles.inputContainer}>
        <span>Content: </span>
        <input value={dialogueContent.content} onChange={(e) => { updateDialogue({ ...dialogueContent, content: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Speaker: </span>
        <input value={dialogueContent.speaker} onChange={(e) => { updateDialogue({ ...dialogueContent, speaker: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Image: </span>
        <input value={dialogueContent.imageSrc} onChange={(e) => { updateDialogue({ ...dialogueContent, imageSrc: e.target.value }) }}></input>
      </div>

      <div className={styles.inputContainer}>
        <span>Colour: </span>
        <input value={dialogueContent.pageColour} onChange={(e) => { updateDialogue({ ...dialogueContent, pageColour: e.target.value || undefined }) }}></input>
      </div>
    </div>
  )
}

export default DialogueInput