import React, { ComponentType } from 'react';
import styles from "./MainSettings.module.scss";

const MainSettings: ComponentType<{}> = () => (
  <div id={styles.mainSettings}>
    <div className={styles.inputContainer}>
      <span>Title: </span>
      <input></input>
    </div>
    
    <div className={styles.inputContainer}>
      <span>Category: </span>
      <input></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Genre: </span>
      <input></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Colour: </span>
      <input></input>
    </div>

    <div id={styles.description} className={styles.inputContainer}>
      <span>Description: </span>
      <textarea></textarea>
    </div>

    <div className={styles.inputContainer}>
      <span>Thumbnail: </span>
      <input></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Video Header: </span>
      <input></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Narration: </span>
      <input></input>
    </div>
  </div>
)

export default MainSettings