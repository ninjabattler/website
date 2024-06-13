import React, { useState } from "react";
import styles from "../../styles/ArticlesPage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import Link from "next/link";
import { articlesServerSideProps } from "../../ssr/articles/index";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData } from "../../types";
import ArticlesPageHead from "../../components/PageMetadata/ArticlesPageHead";
import Image from "next/image";
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
  const [showCarousel, setShowCarousel] = useState<boolean>(!searchResults);
  const [showSearchResults, setShowSearchResults] =
    useState<boolean>(searchResults);
  const [carouselArticles, setCarouselArticles] = useState<any[]>(articles);

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
        <Carousel
          articles={carouselArticles ? carouselArticles : []}
          hidden={!showCarousel}
        />
        {showSearchResults && (
          <SearchResultsCarousel
            articles={carouselArticles ? carouselArticles : []}
          />
        )}
      </main>
    </>
  );
}
