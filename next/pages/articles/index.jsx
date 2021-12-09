import { React, useEffect, useState } from 'react';
import styles from '../../styles/ArticlesPage.module.css'
import JsxParser from 'react-jsx-parser';
import NavBar from '../../components/NavBar';
import Paragraph from '../../components/Paragraph';
import TitleCard from '../../components/TitleCard'
import Carousel from '../../components/Carousel';
import Head from 'next/dist/shared/lib/head';
import prisma from '../../prisma/prisma';
import { selectAllArticles } from '../../prisma/queries/queries';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const getStaticProps = async () => {

  const articlesArray = await selectAllArticles(prisma)

  return {
    props: {
      articles: articlesArray,
    }
  }
}

export default function ArticlesPage(props) {

  return (
    <>
      <NavBar />
      <Head>
        <title>Ninjabattler - Articles</title>
        <meta name='description' content="A mad man's ramblings about games you don't care about" />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content="#FFFF00" />
        <meta property='og:type' content='website' />
        <meta property='og:title' content="Ninjabattler - Articles" />
        <meta property='og:description' content="A mad man's ramblings and sometimes blender renders" />
        <meta property='og:image' content="https://ninjabattler.ca/static/media/Website robot.9ca91034.png" />
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

      <Carousel items={props.articles ? props.articles.slice(0, 3) : []} />

      <main id={styles.articlesPage}>
        <div style={{ width: '100%', position: 'sticky', top: '0', height: '100%' }}>
          <TitleCard title='Previous Articles' pageColour='black' inverse />
        </div>
        <div className={styles.articlesPageContainer}>
          {props.articles.slice(3).map((item) => {
            return (
              <Link key={item.title} href={`/articles/${item.title.toLowerCase().replace(' ', '_')}`} >
                <a className={styles.articleCard}>
                  <article className={styles.articleCardItem}
                    onMouseEnter={(e) => {
                      e.target.parentElement.children["0"].className = 'fade'
                    }}
                    onMouseLeave={(e) => {
                      e.target.parentElement.children["0"].className = 'fadeIn'
                    }}>
                    <div>
                      <img src={item.thumbnail} alt='thumbnail' />
                      <div> </div>
                      <section>
                        <h1 style={{ filter: `drop-shadow(1px 1px 0px ${item.colour})` }}>{item.title}</h1>
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
      <Footer />
    </>)
}