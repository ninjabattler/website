import Head from 'next/head'
import styles from '../styles/HomePage.module.css'
import { React, useState, useEffect } from 'react';
import CodeBlock from '../components/CodeBlock';
import VideoBackground from '../components/VideoBackground';
import { homePageServerSideProps } from '../ssr/index'
import Link from 'next/link';

const QUOTES = [
  'Status: 200, successfully connected'
]
const SUB_QUOTES = [
  'to the land of uneducated opinions and a few shades of gray!'
]

export const getServerSideProps = homePageServerSideProps;

export default function Home({ article_title, article_thumbnail, setLinkClicked }) {
  const [quoteIndex, setQuoteIndex] = useState(Math.floor(Math.random() * QUOTES.length));
  const chosenQuote = QUOTES[quoteIndex]
  const chosenSubQuote = SUB_QUOTES[quoteIndex]

  return (
    <>
      <VideoBackground overlayColour pageColour="#00FFFF" />
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

          {/* <!--FONTS--> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Gloria+Hallelujah&family=Trade+Winds&family=Hanalei+Fill&family=Rock+Salt&display=swap" rel="stylesheet" />
        </Head>
        <main id={styles.homePage}>
          <div id={styles.homePageBackground}></div>

          <img id={styles.homePageRobot} src="/websiterobot.webp" />
          <img id={styles.homePageRobotFade} src="/websiterobot.webp" />

          {/* Introduction */}
          <section id={styles.part1}>
            <div id={styles.scrollToOne} />

            <div className={styles.gradient1} />
            <div className={styles.gradient2}>
              <Link href={`/articles/${article_title.toLowerCase().replace(/ /g, '_')}`}>
                <img 
                  onClick={(e) => { e.preventDefault(); setLinkClicked(`/articles/${article_title.toLowerCase().replace(/ /g, '_')}`) }}
                  src={article_thumbnail}
                />
              </Link>
              <h2>Newest Article: <br/>{article_title}</h2>
            </div>

            <h1>{chosenQuote}</h1>
            <h4>{chosenSubQuote}</h4>
            <p>
              Here in this small corner of the internet, you'll find lots of words, words written by me, if you can believe it. There's even pictures and videos, and some blender stuff. But what topics do these words speak of?
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
                Video games, I play them, do you play them? Trick question. I also write opinionated words about them. If that interests you, check the articles page to see what I've got and find out if any of it interests you. If you have any opinionated comments of your own, feel free to post them, comments exists for a reason after all.
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

        </main>
      </div>
    </>
  )
}
