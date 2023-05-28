import React, { ComponentType } from 'react';
import { ColourType } from '../../../types';
import styles from "./Dialogue.module.scss";

type DialogueProps = {
  speaker: string;
  text: string;
  imageSrc: string;
  pageColour: ColourType;
}

const Dialogue: ComponentType<DialogueProps> = ({ speaker, text, imageSrc, pageColour }) => (
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