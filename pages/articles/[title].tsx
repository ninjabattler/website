import React, { useState } from "react";
import styles from "../../styles/ReviewPage.module.scss";
import Head from "next/dist/shared/lib/head";
import VideoHeader from "../../components/VideoHeader/VideoHeader";
import { articlePageServerSideProps } from "../../ssr/articles/title";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData, ArticleData } from "../../types";
import ArticleContent from "../../components/articleComponents/ArticleContent/ArticleContent";
import ArticleCommentPanel from "../../components/feedbackAndShare/ArticleCommentPanel/ArticleCommentPanel";

export const getServerSideProps: GetServerSideProps =
  articlePageServerSideProps;

export default function ArticlePage({
  articleData,
  disliked,
  liked,
  randomQuoteIndex,
  url,
  userId,
}: InferGetServerSidePropsType<typeof articlePageServerSideProps> & AppData) {
  const [article, setArticle] = useState<ArticleData>(articleData);

  return (
    <>
      <Head>
        <title>{article.title} - Ninjabattler</title>
        <meta name="description" content={article.description} />
        <meta property="og:locale" content="en_CA" />
        <meta name="theme-color" content={`${article.colors.primary.hex}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta
          itemProp="name"
          content={`Ninjabattler - ${article.title}`}
        ></meta>
        <meta itemProp="description" content={article.description}></meta>
        <meta itemProp="image" content={article.thumbnail}></meta>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={url}></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Ninjabattler - ${article.title}`} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.thumbnail} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta
          name="twitter:title"
          content={`Ninjabattler - ${article.title}`}
        ></meta>
        <meta name="twitter:description" content={article.description}></meta>
        <meta name="twitter:image" content={article.thumbnail}></meta>
        {/* <!-- Meta Tags Generated via http://heymeta.com -->*/}
        <style>
          {`
            :root {
              --article-colour: ${article.colors.primary.hex};
              --article-colour2: ${
                article.colors.secondary
                  ? article.colors.secondary.hex
                  : article.colors.primary.hex
              };
              --article-colour-space: ${
                article.colors.space
                  ? article.colors.space.hex
                  : article.colors.primary.hex
              };
              --article-colour-stars: ${
                article.colors.stars
                  ? article.colors.stars.hex
                  : article.colors.primary.hex
              };
            }
          `}
        </style>
      </Head>

      <VideoHeader
        video={article.videoHeader || ""}
        title={article.title}
        infoBarProps={{
          date: article.date,
          tags: article.tags.map((tagObj) => {
            return tagObj.tag;
          }),
        }}
      />

      <main id={styles.reviewPage}>
        <div className={styles.mainContent}>
          {/* Blend */}
          <div className={styles.containerBlend}>
            <div className={styles.background}>
              <div className={styles.sketchBackground} />
            </div>
          </div>

          {/* Main Content */}
          <article className={styles.articleContainer}>
            <div className={styles.sketchBackground} />

            {article.narration && (
              <iframe
                id={styles.adAurisIframe}
                src={`${article.narration}?color=${
                  article.colors.primary.hex.split("#")[1]
                }`}
                style={{ border: "none", height: "100px", width: "80%" }}
              ></iframe>
            )}

            <ArticleContent content={article.content} />

            {/* {article.footnotes[0] &&
              <>
                <h1 id={styles.footnotesHeader}>References</h1>
                <ol id={styles.footnotes}>
                  {article.footnotes?.map((footnote, i) => {
                    return (
                      <li key='i'>
                        <a
                          href={footnote.link}
                          target="_blank"
                          rel="noreferrer"
                          id={`f-${i + 1}`}
                        >{
                            footnote.title}
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </>
            } */}
          </article>

          <ArticleCommentPanel
            articleData={articleData}
            disliked={disliked}
            liked={liked}
            randomQuoteIndex={randomQuoteIndex}
            url={url}
            userId={userId}
          />
        </div>
      </main>
    </>
  );
}
