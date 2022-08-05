import { React, useEffect, useState } from 'react';
import styles from '../../styles/ArticlesPage.module.css'
import JsxParser from 'react-jsx-parser';
import Paragraph from '../../components/articleComponents/Paragraph/Paragraph';
import Carousel from '../../components/Carousel/Carousel';
import Head from 'next/dist/shared/lib/head';
import Link from 'next/link';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { articlesServerSideProps } from '../../ssr/articles/index';
import { formatSqlDate } from '../../helpers/dateHelpers';

export const getServerSideProps = articlesServerSideProps;

export default function ArticlesPage(props) {
  const [windowServer, setWindow] = useState({})
  const setLinkClicked = props.setLinkClicked;

  useEffect(() => {
    setWindow(window)
  }, [])

  return (
    <>
      <VideoBackground nonArticlePage overlayColour pageColour="#AAAAAA" />
      <Head>
        <title>Ninjabattler - Articles</title>
        <meta name='description' content="A mad man's ramblings about games you don't care about" />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content="#FFFF00" />
        <meta property='og:type' content='website' />
        <meta property='og:title' content="Ninjabattler - Articles" />
        <meta property='og:description' content="A mad man's ramblings and sometimes blender renders" />
        <meta property='og:image' content="/Website Robot 2.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        {/* <!--FONTS--> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Gloria+Hallelujah&family=Trade+Winds&family=Hanalei+Fill&family=Rock+Salt&display=swap" rel="stylesheet" />
      </Head>

      <Carousel setLinkClicked={setLinkClicked} items={props.articles ? props.articles.slice(0, 3) : []} />

      <main id={styles.articlesPage}>
        <div className={styles.articlesPageContainer}>
          {props.articles.slice(3).map((item) => {
            const formattedDate = formatSqlDate(item.formatteddate);
            const link = `/articles/${item.title.toLowerCase().replace(/ /g, '_')}`;

            return (
              <Link key={item.title} href={link} >
                <a
                  onClick={(e) => { e.preventDefault(); setLinkClicked(link) }}
                  className={styles.articleCard}
                  style={{ "--shadow-colour": item.colour }}
                >
                  <article className={styles.articleCardItem}>
                    <div>
                      <img src={item.thumbnail ? item.thumbnail.replace('http://', 'https://') : null} alt='thumbnail' />
                      <div className={styles.infoBackground}/>

                      <section>
                        <u>{formattedDate} / {item.category} / {item.genre}</u>
                        <h1>{item.title}</h1>
                      </section>
                    </div>

                    <div>
                      <aside>
                        <Paragraph text={item.description} />
                      </aside>
                    </div>
                  </article>
                </a>
              </Link>)
          })}
        </div>
      </main>
    </>)
}