import React from "react";
import styles from "../../styles/ArticlesPage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import Head from "next/dist/shared/lib/head";
import Link from "next/link";
import { articlesServerSideProps } from "../../ssr/articles/index";
import { formatSqlDate } from "../../helpers/dateHelpers";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { AppData } from "../../types";
import dynamic from "next/dynamic";
const PixiBackground = dynamic(
  () => import("../../components/PixiBackground/PixiBackground"),
  { loading: () => <></> },
);

export const getStaticProps: GetStaticProps = articlesServerSideProps;

export default function ArticlesPage({
  articles,
  setLinkClicked,
}: InferGetStaticPropsType<typeof articlesServerSideProps> & AppData) {
  return (
    <>
      <PixiBackground />
      <Head>
        <title>Ninjabattler - Articles</title>
        <meta
          name="description"
          content="A mad man's ramblings about games you don't care about"
        />
        <meta property="og:locale" content="en_CA" />
        <meta name="theme-color" content="#FFFF00" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ninjabattler - Articles" />
        <meta
          property="og:description"
          content="A mad man's ramblings and sometimes blender renders"
        />
        <meta property="og:image" content="/Website Robot 2.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      </Head>

      <Carousel
        setLinkClicked={setLinkClicked}
        items={articles ? articles.slice(0, 3) : []}
      />

      <main id={styles.articlesPage}>
        <div className={styles.articlesPageContainer}>
          {articles.slice(3).map((item) => {
            const formattedDate: string = formatSqlDate(item.formatteddate);
            const link: string = `/articles/${item.title
              .toLowerCase()
              .replace(/ /g, "_")}`;

            return (
              <Link legacyBehavior key={item.title} href={link}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setLinkClicked(link);
                  }}
                  className={styles.articleCard}
                  // @ts-ignore
                >
                  <article className={styles.articleCardItem}>
                    <div>
                      <img
                        src={
                          item.thumbnail
                            ? item.thumbnail.replace("http://", "https://")
                            : null
                        }
                        alt="thumbnail"
                      />
                      <div className={styles.infoBackground} />

                      <section>
                        <i>
                          {formattedDate} / {item.category} / {item.genre}
                        </i>
                        <h1>{item.title}</h1>
                      </section>
                    </div>

                    <div>
                      <aside>
                        <p>
                          {item.description ||
                            "Opps, looks like I forgot a description..."}
                        </p>
                      </aside>
                    </div>
                  </article>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
