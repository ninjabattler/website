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

export const getServerSideProps: GetServerSideProps = articlesServerSideProps;

export default function ArticlesPage({
  articles,
  searchResults,
  setLinkClicked,
}: InferGetServerSidePropsType<typeof articlesServerSideProps> & AppData) {
  const [showSearchResults, setShowSearchResults] =
    useState<boolean>(searchResults);

  return (
    <>
      <ArticlesPageHead searchResults={showSearchResults} />

      <ArticlesPageBackground />

      <main id={styles.articlesPage}>
        <Carousel
          articles={articles ? articles : []}
          hidden={showSearchResults}
        />
        {showSearchResults && (
          <SearchResultsCarousel articles={articles ? articles : []} />
        )}
      </main>
    </>
  );
}
