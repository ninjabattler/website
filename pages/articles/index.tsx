import React from "react";
import styles from "../../styles/ArticlesPage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import Link from "next/link";
import { articlesServerSideProps } from "../../ssr/articles/index";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData } from "../../types";
import ArticlesPageHead from "../../components/PageMetadata/ArticlesPageHead";
import Image from "next/image";
import ArticlesPageBackground from "../../components/backgrounds/ArticlesPageBackground/ArticlesPageBackground";

export const getServerSideProps: GetServerSideProps = articlesServerSideProps;

export default function ArticlesPage({
  articles,
  setLinkClicked,
}: InferGetServerSidePropsType<typeof articlesServerSideProps> & AppData) {
  return (
    <>
      <ArticlesPageHead />

      <ArticlesPageBackground />

      <main id={styles.articlesPage}>
        <Carousel articles={articles ? articles : []} />
      </main>
    </>
  );
}
