import React from 'react';
import styles from '../styles/About.module.css';
import Head from 'next/head';

export default function About(props) {
  return (
    <>
      <Head>
        <title>Ninjabattler - About</title>
        <meta name='description' content="A mad man's description" />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content="#FFFF00" />
        <meta property='og:type' content='website' />
        <meta property='og:title' content="Ninjabattler - About" />
        <meta property='og:description' content="A mad man's description" />
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
      <div id={styles.about}>
        <div className={styles.left}></div>
        <img src={'/Ninja placeholder.png'} alt='logo' />
        <div className={styles.right}></div>
        <br></br>
        <div id={styles.content}>
          <h1>About everything</h1>
          <p>Im a junior web developer that had nothing better to do with my time so I made this site using some words I copied off of google.
            I plan to use this sight as a way to talk about my passion for both programming and video games. Now while I could just use any
            form of social media out there, I think this is much more fun. This site was built using
          </p>
          <h1>
            <img src="/next.png" />
          </h1>
          <p>
            I&apos;ve put links to my github and linkedin in the navbar of this site if for some reason you would want that. Other than that
            you can read my posts. Criticism would be much appreciated, likes, dislikes, and comments exist for a reason!
          </p>
        </div>
      </div>
    </>
  )
}