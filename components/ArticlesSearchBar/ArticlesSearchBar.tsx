import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import styles from "./ArticlesSearchBar.module.scss";
import { SearchOffSharp, SearchSharp } from "@mui/icons-material";
import SearchTag from "./SearchTag/SearchTag";
import axios from "axios";
import { useRouter } from "next/router";

type ArticlesSearchBarProps = {
  searchResults: boolean;
  resultsCount: number;
  tags: any[];
  initialSearchQuery: string;
  initialTagsQuery: string[];
  setShowSearchResults: Dispatch<SetStateAction<boolean>>;
  setShowCarousel: Dispatch<SetStateAction<boolean>>;
  setArticles: Dispatch<SetStateAction<SanityArticlesSearchResult[]>>;
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
  setShowSearchResults,
  setShowCarousel,
  setArticles,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [tagsQuery, setTagsQuery] = useState<string[]>(initialTagsQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const removeTag = (index: number) => {
    setTagsQuery(tagsQuery.filter((tag, i) => i !== index));
  };

  const search = (e: FormEvent<HTMLFormElement>) => {
    if (!loading) {
      e.preventDefault();
      setShowCarousel(false);
      setShowSearchResults(false);
      setLoading(true);

      setTimeout(() => {
        axios({
          method: "get",
          url: `/api/articles/get`,
          params: { searchQuery, tagsQuery: tagsQuery.join(",") },
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          const results: SanityArticlesSearchResult[] = res.data;

          setLoading(false);
          setShowSearchResults(true);
          setShowCarousel(true);
          setArticles(results);

          router.push(
            `/articles?search=${searchQuery}&tags=${tagsQuery.join(",")}`,
            `/articles?search=${searchQuery}&tags=${tagsQuery.join(",")}`,
            {
              shallow: true,
            },
          );
        });
      }, 1000);
    }
  };

  return (
    <header className={styles.articlesSearchBar}>
      <div className={styles.spaceContainer}>
        <div className={styles.space} />
        <div className={`${styles.space} ${styles.gradient}`} />
      </div>

      <div
        className={`${styles.bar} ${styles.dark} ${loading ? styles.hidden : ""}`}
      />
      <div className={`${styles.glow} ${loading ? styles.hidden : ""}`} />
      <h1
        className={`${styles.bar} ${styles.light} ${loading ? styles.hidden : ""}`}
      >
        {searchResults ? `Results: ${resultsCount}` : "Latest Articles"}
      </h1>

      <form
        className={`${styles.bar} ${styles.dark} ${styles.search}`}
        onSubmit={search}
      >
        <select
          className={styles.tagsDropDown}
          value={""}
          disabled={loading}
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
          disabled={loading}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? <SearchOffSharp /> : <SearchSharp />}
        </button>
      </form>

      <div
        className={`${styles.bar} ${styles.dark} ${styles.tags} ${tagsQuery.length > 0 ? styles.shown : ""}`}
      >
        {tagsQuery.map((tag, i) => {
          return (
            <SearchTag
              key={i}
              tag={tag}
              disabled={loading}
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
