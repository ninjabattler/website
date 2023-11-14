import React, { ComponentType } from 'react';
import styles from "./Dialogue.module.scss";

type DialogueProps = {
  speaker: string;
  text: string;
  imageSrc: string;
}

const Dialogue: ComponentType<DialogueProps> = ({ speaker, text, imageSrc }) => (
  <div className={styles.dialogue}>
    <div className={styles.space} />
    <div className={`${styles.space} ${styles.gradient}`} />

    <img src={imageSrc} alt='speaker'/>
    
    <div className={styles.dialogueText}>
      <p><span>{text}</span></p>
      <h3>
        {speaker}
      </h3>
    </div>
    <div className={styles.sketch}></div>
  </div>
);

export default Dialogue