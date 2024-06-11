import React, { FC } from "react";
import styles from "./SearchTag.module.scss";

export type SearchTagProps = {
  tag: string;
  removeTag: () => void;
};

/**
 * A tag chosen for the search query on the articles page's search bar
 * @author Ninjabattler
 * @param tag The tag
 * @param removeTag A funtion passed down from the search bar for removing the tag frm the query
 */
const SearchTag: FC<SearchTagProps> = ({ tag, removeTag }) => {
  return (
    <div className={styles.searchTag}>
      <span>{tag}</span>
      <button onClick={removeTag}>X</button>
    </div>
  );
};

export default SearchTag;
