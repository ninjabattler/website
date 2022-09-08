import axios from 'axios';
import React, { ComponentType, useState } from 'react';
import { ArticleData } from '../../../types';
import styles from "./MainSettings.module.scss";

const save = async (
  title: string,
  category: string,
  genre: string,
  colour: string,
  description: string,
  thumbnail: string,
  videoHeader: string,
  narration: string,
  jsonLocation: string
): Promise<any> => {
  const data = {
    title,
    category,
    genre,
    colour,
    description,
    formatteddate: '00, 00, 0000',
    thumbnail,
    videoHeader,
    narration,
    comments: [],
    content: []
  }

  await axios.post('/api/articles/update', { data, jsonLocation });

  return data;
}

type MainSettingsProps = {
  articleData: ArticleData;
  jsonLocation: string | undefined;
  updateArticleData: Function;
}

const MainSettings: ComponentType<MainSettingsProps> = ({ articleData, jsonLocation, updateArticleData }) => {
  const [title, setTitle] = useState<string>(articleData.title);
  const [category, setCategory] = useState<string>(articleData.category);
  const [genre, setGenre] = useState<string>(articleData.genre);
  const [colour, setColour] = useState<string>(articleData.colour);
  const [description, setDescription] = useState<string>(articleData.description);
  const [thumbnail, setThumbnail] = useState<string>(articleData.thumbnail);
  const [videoHeader, setVideoHeader] = useState<string>(articleData.video_header);
  const [narration, setNarration] = useState<string>(articleData.narration);

  return (<div id={styles.mainSettings}>
    <button id={styles.saveButton} onClick={async() => {
      const data = await save( title, category, genre, colour, description, thumbnail, videoHeader, narration, jsonLocation);

      updateArticleData(data);
    }}>Save</button>

    <div className={styles.inputContainer}>
      <span>Title: </span>
      <input value={title} onChange={(e) => { setTitle(e.target.value) }}></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Category: </span>
      <input value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Genre: </span>
      <input value={genre} onChange={(e) => { setGenre(e.target.value) }}></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Colour: </span>
      <input value={colour} onChange={(e) => { setColour(e.target.value) }}></input>
    </div>

    <div id={styles.description} className={styles.inputContainer}>
      <span>Description: </span>
      <textarea value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
    </div>

    <div className={styles.inputContainer}>
      <span>Thumbnail: </span>
      <input value={thumbnail} onChange={(e) => { setThumbnail(e.target.value) }}></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Video Header: </span>
      <input value={videoHeader} onChange={(e) => { setVideoHeader(e.target.value) }}></input>
    </div>

    <div className={styles.inputContainer}>
      <span>Narration: </span>
      <input value={narration} onChange={(e) => { setNarration(e.target.value) }}></input>
    </div>
  </div>)
}

export default MainSettings