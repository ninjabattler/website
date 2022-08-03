import Head from 'next/head'
import styles from '../styles/HomePage.module.css'
import { React, useState, useEffect } from 'react';
import CodeBlock from '../components/CodeBlock';
import VideoBackground from '../components/VideoBackground';
// require('dotenv').config();

const QUOTES = [
  'Welcome Chrome User'
]
const SUB_QUOTES = [
  'to the land of uneducated opinions and a few shades of gray!'
]

let i = 0

export default function Home(props) {
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
            <div className={styles.gradient2} />

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

        </main>
      </div>
    </>
  )
}
