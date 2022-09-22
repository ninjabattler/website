import React, { ComponentType, useState } from 'react';
import { AnimTextItem, ArticleJson, ArticleList, ArticleListItem } from '../../../types';
import AnimTextInput from '../AnimTextInput/AnimTextInput';
import styles from "./ListInput.module.scss";

type ListInputProps = {
  list: ArticleList,
  index: number,
  content: ArticleJson,
  setContent: Function
}

const ListInput: ComponentType<ListInputProps> = ({ list, index, content, setContent }) => {
  const [listContent, setListContent] = useState<ArticleList>(list);

  const updateList = (newItem: ArticleListItem, newIndex: number): void => {
    let contentItem = { ...listContent };
    contentItem.items[newIndex] = newItem;

    content[index] = contentItem;
    setContent(content);
    setListContent(contentItem);
  }

  const changeItemIndex = (i: number, direction: 'up' | 'down'): void => {
    const newIndex = direction == 'up' ? i - 1 : i + 1;
    const newList = { ...listContent };

    const currentItem = newList.items[i];
    const itemToSwap = newList.items[newIndex];

    newList.items[i] = itemToSwap;
    newList.items[newIndex] = currentItem;

    content[index] = newList;
    setContent(content);
    setListContent(newList);
  }

  const deleteItem = (i: number): void => {
    const newList = { ...listContent };
    newList.items.splice(i, 1);

    content[index] = newList;
    setContent(content);
    setListContent(newList);
  }

  const newItem = (): void => {
    const newList = { ...listContent };

    newList.items.push({
      content: ""
    })

    content[index] = newList;
    setContent(content);
    setListContent(newList);
  }

  return (
    <div className={styles.listInput}>
      <span>List: </span>

      <button onClick={() => { newItem(); }}>+</button>

      <div className={styles.inputContainer}>
        {
          listContent.items.map((item, i) => {
            return (
              <div key={i} className={styles.listTextInput}>
                <div className={styles.arrowContainer}>
                  <button onClick={() => { deleteItem(i); }}>X</button>
                  <button onClick={() => { i !== 0 && changeItemIndex(i, 'up') }}>↑</button>
                  <button onClick={() => { i !== listContent.items.length - 1 && changeItemIndex(i, 'down') }}>↓	</button>
                </div>

                <div className={styles.inputContainer}>
                  <div className={styles.contentInput}>
                    <span>Content: </span>
                    <input value={item.content} onChange={(e) => { updateList({ ...item, content: e.target.value }, i) }}></input>
                  </div>

                  <div className={styles.contentInput}>
                    <span>Image: </span>
                    <input value={item.imageSrc} onChange={(e) => { updateList({ ...item, imageSrc: e.target.value }, i) }}></input>
                  </div>
                </div>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default ListInput