import React, { FC } from "react";
import styles from "./SearchTag.module.scss";

export type SearchTagProps = {
  tag: string;
  disabled: boolean;
  removeTag: () => void;
};

/**
 * A tag chosen for the search query on the articles page's search bar
 * @author Ninjabattler
 * @param tag The tag
 * @param disabled A boolean to disable the remove button
 * @param removeTag A funtion passed down from the search bar for removing the tag frm the query
 */
const SearchTag: FC<SearchTagProps> = ({ tag, disabled, removeTag }) => {
  return (
    <div className={`${styles.searchTag} ${disabled ? styles.disabled : ""}`}>
      <span>{tag}</span>
      <button disabled={disabled} onClick={removeTag}>
        X
      </button>
    </div>
  );
};

export default SearchTag;
