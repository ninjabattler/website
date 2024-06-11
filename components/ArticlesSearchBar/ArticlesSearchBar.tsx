import React, { FC, useCallback, useState } from "react";
import styles from "./ArticlesSearchBar.module.scss";
import { SearchSharp } from "@mui/icons-material";
import SearchTag from "./SearchTag/SearchTag";

type ArticlesSearchBarProps = {
  searchResults: boolean;
  resultsCount: number;
  tags: any[];
  initialSearchQuery: string;
  initialTagsQuery: string[];
};

/**
 * A header and search bar for the articles page
 * @author Ninjabattler
 */
const ArticlesSearchBar: FC<ArticlesSearchBarProps> = ({
  searchResults,
  resultsCount,
  tags,
  initialSearchQuery,
  initialTagsQuery,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [tagsQuery, setTagsQuery] = useState<string[]>(initialTagsQuery);

  const removeTag = useCallback(
    (index) => {
      setTagsQuery(tagsQuery.filter((tag, i) => i !== index));
    },
    [tagsQuery],
  );

  return (
    <header className={styles.articlesSearchBar}>
      <div className={styles.spaceContainer}>
        <div className={styles.space} />
        <div className={`${styles.space} ${styles.gradient}`} />
      </div>

      <div className={`${styles.bar} ${styles.dark}`} />
      <div className={styles.glow} />
      <h1 className={`${styles.bar} ${styles.light}`}>
        {searchResults ? `Results: ${resultsCount}` : "Latest Articles"}
      </h1>

      <form
        className={`${styles.bar} ${styles.dark} ${styles.search}`}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <select
          value={""}
          onChange={(e) => {
            setTagsQuery([...tagsQuery, e.target.value]);
          }}
        >
          <option value="" />
          {tags
            .filter((tag) => !tagsQuery.includes(tag.tag))
            .map((tag, i) => {
              return (
                <option key={i} value={tag.tag}>
                  {tag.tag}
                </option>
              );
            })}
        </select>

        <input
          type="search"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <a
          href={`/articles?search=${searchQuery}${tagsQuery ? `&tags=${tagsQuery.join(",")}` : ""}`}
        >
          <SearchSharp />
        </a>
      </form>

      <div
        className={`${styles.bar} ${styles.dark} ${styles.tags} ${tagsQuery.length > 0 ? styles.shown : ""}`}
      >
        {tagsQuery.map((tag, i) => {
          return (
            <SearchTag
              key={i}
              tag={tag}
              removeTag={() => {
                removeTag(i);
              }}
            />
          );
        })}
      </div>
    </header>
  );
};

export default ArticlesSearchBar;
