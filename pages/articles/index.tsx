import React from "react";
import styles from "../../styles/ArticlesPage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import Link from "next/link";
import { articlesServerSideProps } from "../../ssr/articles/index";
// import { formatSqlDate } from "../../helpers/dateHelpers";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData } from "../../types";
import ArticlesPageHead from "../../components/PageMetadata/ArticlesPageHead";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = articlesServerSideProps;

export default function ArticlesPage({
  articles,
  setLinkClicked,
}: InferGetServerSidePropsType<typeof articlesServerSideProps> & AppData) {
  return (
    <>
      <ArticlesPageHead />

      <Carousel
        setLinkClicked={setLinkClicked}
        items={articles ? articles.slice(0, 3) : []}
      />

      <main id={styles.articlesPage}>
        <div className={styles.articlesPageContainer}>
          {articles.slice(3).map((item) => {
            const formattedDate: string = item.date;
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
                      <Image
                        src={item.thumbnail.url}
                        width={item.thumbnail.width}
                        height={item.thumbnail.height}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={item.thumbnail.blur}
                        alt={item.thumbnail.alt}
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
