import React, { ComponentType } from 'react';
import styles from "./Dialogue.module.scss";

type DialogueProps = {
  speaker: string;
  text: string;
  imageSrc: string;
}

const Dialogue: ComponentType<DialogueProps> = ({ speaker, text, imageSrc }) => (
  <div className={styles.dialogue}>
    <div className={styles.dialogueText}>
      <h3>
        {speaker}
      </h3>
      <p><span>{text}</span></p>
    </div>
    <div className={styles.sketch}></div>
    <img src={imageSrc} alt='speaker' />
  </div>
);

export default Dialogue