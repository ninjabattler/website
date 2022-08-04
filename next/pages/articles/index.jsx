import { React, useEffect, useState } from 'react';
import styles from '../../styles/ArticlesPage.module.css'
import JsxParser from 'react-jsx-parser';
import Paragraph from '../../components/articleComponents/Paragraph/Paragraph';
import Carousel from '../../components/Carousel';
import Head from 'next/dist/shared/lib/head';
import Link from 'next/link';
import LoadingOverlay from '../../components/LoadingOverlay';
import VideoBackground from '../../components/VideoBackground';
import { articlesServerSideProps } from '../../ssr/articles/index';

export const getServerSideProps = articlesServerSideProps;

export default function ArticlesPage(props) {
  const [linkClicked, setLinkClicked] = useState(false);
  const [windowServer, setWindow] = useState({})
  
  useEffect(() => {
    setWindow(window)
  }, [])

  return (
    <>
      {linkClicked && (<LoadingOverlay />)}
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
            return (
              <Link key={item.title} href={`/articles/${item.title.toLowerCase().replace(/ /g, '_')}`} >
                <a onClick={() => { setLinkClicked(true) }} className={styles.articleCard}>
                  <article className={styles.articleCardItem}
                    onMouseEnter={(e) => {
                      e.target.parentElement.children["0"].className = 'fade'
                    }}
                    onMouseLeave={(e) => {
                      e.target.parentElement.children["0"].className = 'fadeIn'
                    }}>
                    <div>
                      <img src={item.thumbnail ? item.thumbnail.replace('http://', 'https://') : null} alt='thumbnail' />
                      <div> </div>
                      <section>
                        <h1 style={windowServer.innerWidth < 426 ? { filter: `drop-shadow(0.7px 0.7px 0px ${item.colour})` } : { filter: `drop-shadow(1px 1px 0px ${item.colour})` }}>{item.title}</h1>
                      </section>
                    </div>

                    <div>
                      <aside>
                        <JsxParser
                          components={{ Paragraph }}

                          jsx={item.content ? item.content.split(/\/n/g).slice(0, 4).join('') : ''}
                        />
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