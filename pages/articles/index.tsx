import React, { useEffect, useState } from "react";
import styles from "../../styles/ArticlesPage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { articlesServerSideProps } from "../../ssr/articles/index";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ArticlesPageHead from "../../components/PageMetadata/ArticlesPageHead";
import ArticlesPageBackground from "../../components/backgrounds/ArticlesPageBackground/ArticlesPageBackground";
import SearchResultsCarousel from "../../components/SearchResultsCarousel/SearchResultsCarousel";
import ArticleSearchBar from "../../components/ArticlesSearchBar/ArticlesSearchBar";

export const getServerSideProps: GetServerSideProps = articlesServerSideProps;

export default function ArticlesPage({
  articles,
  searchResults,
  tags,
  searchQuery,
  tagsQuery,
}: InferGetServerSidePropsType<typeof articlesServerSideProps> & AppData) {
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [carouselArticles, setCarouselArticles] =
    useState<SanityArticlesSearchResult[]>(articles);

  useEffect(() => {
    setTimeout(() => {
      setShowCarousel(true);
      setShowSearchResults(searchResults);
    }, 500);
  }, []);

  return (
    <>
      <ArticlesPageHead searchResults={showSearchResults} />
      <ArticlesPageBackground />
      <ArticleSearchBar
        searchResults={showSearchResults}
        resultsCount={carouselArticles.length}
        tags={tags}
        initialSearchQuery={searchQuery}
        initialTagsQuery={tagsQuery ? tagsQuery.split(",") : []}
        setShowSearchResults={setShowSearchResults}
        setShowCarousel={setShowCarousel}
        setArticles={setCarouselArticles}
      />

      <main id={styles.articlesPage}>
        <SearchResultsCarousel
          articles={carouselArticles ? carouselArticles : []}
          hidden={!showCarousel}
        />
      </main>
    </>
  );
}
