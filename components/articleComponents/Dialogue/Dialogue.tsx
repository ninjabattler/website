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
  <div className={styles.dialogue} style={{ filter: `drop-shadow(0px 0.3vw 0px ${pageColour}) drop-shadow(0px 0vw 0.3vw rgba(0, 0, 0, 0.5))` }}>
    <div className={styles.dialogueText}>
      <h3>
        {speaker}
      </h3>
      <p>{text}</p>
    </div>
    {/* <div className={styles.background1}></div> */}
    <img src={imageSrc} alt='speaker' />
  </div>
);

export default Dialogue