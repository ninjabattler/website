import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/HomePage.module.css'
import { React, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CodeBlock from '../components/CodeBlock';

const QUOTES = [
  'Welcome Chrome User'
]
const SUB_QUOTES = [
  'I hope'
]

let i = 0

export default function Home(props) {

  const quoteIndex = Math.floor(Math.random() * QUOTES.length)
  const chosenQuote = QUOTES[quoteIndex]
  const chosenSubQuote = SUB_QUOTES[quoteIndex]

  let [displayedQuote, setDisplayedQuote] = useState('|')
  let [displayedSubQuote, setDisplayedSubQuote] = useState('|')


  useEffect(() => {
    const startQuoteAnim = setTimeout(() => {

      const quoteAnim = setInterval(interval, 100)

      function interval() {
        setDisplayedQuote(chosenQuote.slice(0, i) + '|')
        setDisplayedSubQuote(chosenSubQuote.slice(0, i) + '|')
        i++


        if (i >= chosenQuote.length) {
          setDisplayedQuote(chosenQuote)
          setDisplayedSubQuote(chosenSubQuote)
          clearInterval(quoteAnim)
        }
      }

    }, 800)
  }, [])

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Head>
          <title>Ninjabattler</title>
          <meta name='description' content="Website by a lunatic who knows a little node js and not much else" />
          <meta property='og:locale' content='en_CA' />
          <meta name='theme-color' content="#FFFF00" />
          <meta property='og:type' content='website' />
          <meta property='og:title' content="Ninjabattler" />
          <meta property='og:description' content="Website by a lunatic who knows a little node js and not much else" />
          <meta property='og:image' content="https://ninjabattler.ca/static/media/Website robot.9ca91034.png" />
          <link rel="icon" href="/favicon.ico" />
          <meta charset="utf-8" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <script src="https://kit.fontawesome.com/8354918fc8.js" crossOrigin="anonymous"></script>

          {/* <!--FONTS--> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Gloria+Hallelujah&family=Trade+Winds&family=Hanalei+Fill&family=Rock+Salt&display=swap" rel="stylesheet" />
        </Head>
        <main id={styles.homePage}>
          <div id={styles.homePageBackground}></div>

          <div id={styles.homePageContainer}>
            <h1>{displayedQuote}</h1>
            <h4>{displayedSubQuote}</h4>
          </div>

          <p>Welcome to the land of uneducated opinions and a few shades of gray! Browsing this place, you will find incredible opinions on:</p>

          {/* Video game */}
          <div className={styles.homePageInfoDiv}>
            <video autoPlay muted loop>
              <source src='http://files.ninjabattler.ca/video/chaotix.mp4' type="video/mp4"></source>
            </video>
            <p>I've invented the idea of writing words on my opinions on video games! Copyright 2021, do not steal.</p>
          </div>

          {/* Programming */}
          <div className={styles.homePageInfoDiv}>
            <p>I write code! Mayhaps I will write an article on the code I've written every now and then!</p>
            <CodeBlock code={`const Imap = require('imap');\nrequire('dotenv').config();\nconst imap = new Imap({\n  port: 993,\n  host: 'imap.gmail.com',\n  user: process.env.EMAIL,\n  password: process.env.PASSWORD,\n  tls: true\n});\nimap.once('ready', () => {\n  console.log('Imap is ready to hack Nasa');\n  imap.end();\n})\nimap.once('error', (err) => {\n  console.log(err);\n})\nimap.once('end', (err) => {\n  console.log('There is no Nasa');\n})\nimap.connect();`} language='js' />
          </div>

          {/* Stuff */}
          <div className={styles.homePageInfoDiv}>
            <video autoPlay muted loop>
              <source src='http://storage.googleapis.com/personal-webiste/Video/0000-1200.mp4' type="video/mp4"></source>
            </video>
            <p>And whatever else I feel like writing about, any and all criticism is encouraged! The comments exist for a reason!</p>
          </div>

          <img id={styles.homePageRobot} src="/Website robot.png" />
        </main>
      </div>
      <Footer />
    </>
  )
}