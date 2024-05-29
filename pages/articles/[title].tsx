import React, { FC } from "react";
import styles from "../../styles/ReviewPage.module.scss";
import VideoHeader from "../../components/VideoHeader/VideoHeader";
import { articlePageServerSideProps } from "../../ssr/articles/title";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData } from "../../types";
import ArticleContent from "../../components/articleComponents/ArticleContent/ArticleContent";
import ArticleCommentPanel from "../../components/feedbackAndShare/ArticleCommentPanel/ArticleCommentPanel";
import ReviewPageHead from "../../components/PageMetadata/ReviewPageHead";

export const getServerSideProps: GetServerSideProps =
  articlePageServerSideProps;

const ArticlePage: FC<
  InferGetServerSidePropsType<typeof articlePageServerSideProps> & AppData
> = ({ articleData, disliked, liked, randomQuoteIndex, url, userId }) => {
  return (
    <>
      <ReviewPageHead
        title={articleData.title}
        description={articleData.description}
        thumbnail={articleData.thumbnail}
        url={url}
        primaryColour={articleData.colors.primary.hex}
        secondaryColour={
          articleData.colors.secondary
            ? articleData.colors.secondary.hex
            : articleData.colors.primary.hex
        }
        spaceColour={
          articleData.colors.space
            ? articleData.colors.space.hex
            : articleData.colors.primary.hex
        }
        starsColour={
          articleData.colors.stars
            ? articleData.colors.stars.hex
            : articleData.colors.primary.hex
        }
      />

      <VideoHeader
        video={articleData.videoHeader || ""}
        title={articleData.title}
        infoBarProps={{
          date: articleData.date,
          tags: articleData.tags.map((tagObj) => {
            return tagObj.tag;
          }),
        }}
        spaceColour={
          articleData.colors.space
            ? articleData.colors.space.hex
            : articleData.colors.primary.hex
        }
        starsColour={
          articleData.colors.stars
            ? articleData.colors.stars.hex
            : articleData.colors.primary.hex
        }
      />

      <main id={styles.reviewPage}>
        <div className={styles.mainContent}>
          <article className={styles.articleContainer}>
            {articleData.narration && (
              <iframe
                id={styles.adAurisIframe}
                src={`${articleData.narration}?color=${
                  articleData.colors.primary.hex.split("#")[1]
                }`}
              ></iframe>
            )}

            <ArticleContent content={articleData.content} />

            {articleData.footnotes && articleData.footnotes[0] && (
              <>
                <h1 id={styles.footnotesHeader}>References</h1>
                <ol id={styles.footnotes}>
                  {articleData.footnotes.map((footnote, i) => {
                    return (
                      <li key={i}>
                        <a
                          href={footnote.source}
                          target="_blank"
                          rel="noreferrer"
                          id={`f-${i + 1}`}
                        >
                          {footnote.title}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </>
            )}
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
};

export default ArticlePage;
