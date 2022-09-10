import axios from 'axios';
import React, { ComponentType, useEffect, useState } from 'react';
import { ArticleData, ArticleJson, ParagraphItem, PictureItem, QuoteItem, TitleCardItem } from '../../../types';
import ParagraphInput from '../ParagraphInput/ParagraphInput';
import PictureInput from '../PictureInput/PictureInput';
import QuoteInput from '../QuoteInput/QuoteInput';
import TitleCardInput from '../TitleCardInput/TitleCardInput';
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
  content: ArticleJson,
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
    content
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
  const [content, setContent] = useState<ArticleJson>(articleData.content);
  const [refresh, setRefresh] = useState<boolean>(false);

  const newItem = (item: string): void => {
    const newContent = [...content];

    switch (item) {
      case 'Paragraph':
        newContent.push({
          type: "Paragraph",
          content: [
            ""
          ]
        } as ParagraphItem);
        break;

      case 'Title Card':
        newContent.push({
          type: "TitleCard",
          title: "",
          imageSrc: ""
        } as TitleCardItem);
        break;

      case 'Quote':
        newContent.push({
          type: "Quote",
          quote: "",
          source: ""
        } as QuoteItem);
        break;

      case 'Picture':
        newContent.push({
          type: "Picture",
          imageSrc: ""
        } as PictureItem);
        break;
    }

    setContent(newContent);
  }

  const chooseInputItem = (item: any, i: number): any => {
    switch (item.type) {
      case "Paragraph":
        return (
          <ParagraphInput
            paragraph={item as ParagraphItem}
            index={i}
            content={content}
            setContent={setContent}
          />
        )

      case "TitleCard":
        return (
          <TitleCardInput
            titleCard={item as TitleCardItem}
            index={i}
            articleContent={content}
            setArticleContent={setContent}
          />
        )

      case "Quote":
        return (
          <QuoteInput
            quote={item as QuoteItem}
            index={i}
            articleContent={content}
            setArticleContent={setContent}
          />
        )

      case "Picture":
        return (
          <PictureInput
            picture={item as PictureItem}
            index={i}
            articleContent={content}
            setArticleContent={setContent}
          />
        )
    }
  }

  const moveItem = (i: number, direction: 'up' | 'down'): void => {
    const newIndex = direction == 'up' ? i - 1 : i + 1;
    const newContent = [...content];

    const currentItem = newContent[i];
    const itemToSwap = newContent[newIndex];

    newContent[i] = itemToSwap;
    newContent[newIndex] = currentItem;

    console.log(newContent[0])

    setContent(newContent);
    setRefresh(true);
  }

  const deleteItem = (i: number): void => {
    const newContent = [...content];
    newContent.splice(i, 1);

    setContent(newContent);
  }

  // Paragraphs don't seem to be refreshing properly so this is a bandaid solution
  useEffect(() => {
    if (refresh) {
      setRefresh(false)
    }
  }, [refresh])

  return (<div id={styles.mainSettings}>
    <div id={styles.optionsPanel}>
      <button
        id={styles.saveButton}
        onClick={async () => {
          const data = await save(title, category, genre, colour, description, thumbnail, videoHeader, narration, content, jsonLocation);

          updateArticleData(data);
        }}
      >
        Save
      </button>

      <select value="+" onChange={(e) => { newItem(e.target.value); }}>
        <option style={{ display: 'none' }} value="+">+</option>
        <option value="Paragraph">Paragraph</option>
        <option value="Title Card">Title Card</option>
        <option value="Quote">Quote</option>
        <option value="Picture">Picture</option>
      </select>
    </div>

    <div id={styles.emptySpace}></div>

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

    <span id={styles.contentBreakpoint}>Content:</span>
    {
      !refresh && content.map((item, index) => {
        return (
          <div key={index} id={`item-${index}`} className={styles.contentInputContainer}>
            <div className={styles.arrowContainer}>
              <button onClick={() => { deleteItem(index); }}>X</button>
              <button onClick={() => { index !== 0 && moveItem(index, 'up') }}>↑</button>
              <button onClick={() => { index !== content.length - 1 && moveItem(index, 'down') }}>↓</button>
            </div>
            {chooseInputItem(item, index)}
          </div>
        )
      })
    }
  </div>
  )
}

export default MainSettings