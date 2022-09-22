import Head from 'next/head'
import styles from '../styles/HomePage.module.scss'
import React, { useEffect } from 'react';
import CodeBlock from '../components/articleComponents/CodeBlock/CodeBlock';
import VideoBackground from '../components/VideoBackground/VideoBackground';
import { homePageServerSideProps } from '../ssr/index'
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AppData } from '../types';
import PixiBackground from '../components/PixiBackground/PixiBackground';

export const getServerSideProps: GetServerSideProps = homePageServerSideProps;

export default function Home({ title, thumbnail, setLinkClicked }: InferGetServerSidePropsType<typeof homePageServerSideProps> & AppData) {

  

  return (
    <>
      <PixiBackground />
      <div className={styles.container}>
        <Head>
          <title>Ninjabattler</title>
          <meta name='description' content="Website by a lunatic who knows a little node js and not much else" />
          <meta property='og:locale' content='en_CA' />
          <meta name='theme-color' content="#FFFF00" />
          <meta property='og:type' content='website' />
          <meta property='og:title' content="Ninjabattler" />
          <meta property='og:description' content="Website by a lunatic who knows a little node js and not much else" />
          <meta property='og:image' content="/Website Robot 2.png" />
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <meta name="google-site-verification" content="Cq6r13JSr-HUsKYp5H2wxCqR7tIK4SQGxMxodWHx1i4" />
        </Head>
        <main id={styles.homePage}>
          <img id={styles.homePageRobot} src="/websiterobot.webp" />
          <img id={styles.homePageRobotFade} src="/websiterobot.webp" />

          {/* Introduction */}
          <section id={styles.part1}>
            <div id={styles.scrollToOne} />

            <div className={styles.gradient1} />
            <div className={styles.gradient2}>
              <Link href={`/articles/${title.toLowerCase().replace(/ /g, '_')}`}>
                <img
                  onClick={(e) => { e.preventDefault(); setLinkClicked(`/articles/${title.toLowerCase().replace(/ /g, '_')}`) }}
                  src={thumbnail}
                />
              </Link>
              <h2>Newest Article: <br />{title}</h2>
            </div>

            <h1>Status: 200, successfully connected</h1>
            <h4>to the land of uneducated opinions and a few shades of gray!</h4>
            <p>
              Here in this small corner of the internet, you&apos;ll find lots of words, words written by me, if you can believe it. There&apos;s even pictures and videos, and some blender stuff. But what topics do these words speak of?
            </p>
          </section>

          <div className={styles.divider} />

          {/* Video Games */}
          <section id={styles.part2}>
            <img src="/videogames.webp" />
            <div className={styles.gradient1} />
            <h2>Video Games</h2>
            <h4>Never said I was original</h4>

            <div className={styles.imageCollection}>
              <img src="https://files.ninjabattler.ca/image/Deamon.png" />
              <img src="https://files.ninjabattler.ca/image/calscourgefight.png" />
              <img src="https://files.ninjabattler.ca/image/cnightsgil.png" />
            </div>

            <div className={styles.gradient2}>
              <p>
                Video games, I play them, do you play them? Trick question. I also write opinionated words about them. If that interests you, check the articles page to see what I&apos;ve got and find out if any of it interests you. If you have any opinionated comments of your own, feel free to post them, comments exists for a reason after all.
              </p>
            </div>
          </section>

          <div className={styles.divider} />

          {/* Coding */}
          <section id={styles.part3}>
            <img src="/coding.webp" />
            <div className={styles.gradient1} />
            <h2>Coding</h2>
            <h4>Words that do stuff</h4>
            <div className={styles.gradient2}>
              <span>content.js</span>

              <CodeBlock
                code={'const betterConsoleLog = (message) => {\n\tconsole.log(`Better ${message}`);\n};\n\nconst messageYouWillRead = `\nI write code, and coded this website.\n\nI mostly work with web development, JS, TS, React, NextJs etc, but I do have an interest in other languages as well.\n\nI also like to write words about code to, you can read that here, or just visit my Github and check that out.`;\n\nbetterConsoleLog(messageYouWillRead);\n\n\n\n\n'}
                language={'js'}
                highlight={"6-9, 10"}
              />

              <span>filler.html</span>

              <CodeBlock
                code={'<body>\n\t<h1>Filler Text</h1>\n\t<h2>Because why not</h2>\n\t<p>gotta do something with this empty space. So here you go, have some html.</p>\n</body>'}
                language={'html'}
              />
            </div>
          </section>

          <div className={styles.divider} />

          <section id={styles.part4}>
            <h2>And Whatever Else</h2>
            <p>Movies, MTG, the giant eye in the sky bringing the end of the world, if it interests me, you may see it here at some point. Except the end of the world, I don&apos;t write fast enough to cover that.</p>
          </section>
        </main>
      </div>
    </>
  )
}