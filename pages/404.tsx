import Head from 'next/head'
import styles from '../styles/ErrorPage.module.scss'
import React from 'react';

export default function FourOhFour() {

  return (
    <>
      <div id={styles.errorPage}>
        <Head>
          <title>404 - Ninjabattler</title>
          <meta name='description' content="This page doesn't exist, don't look at it, trust me, it's bad for you" />
          <meta property='og:locale' content='en_CA' />
          <meta name='theme-color' content="#161616" />
          <meta property='og:type' content='website' />
          <meta property='og:title' content="Ninjabattler" />
          <meta property='og:description' content="This page doesn't exist, don't look at it, trust me, it's bad for you" />
          <meta property='og:image' content="/Website Robot 2.png" />
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        </Head>
        <h1>404</h1>
        <img src='/errorRobot.png' alt='error icon' />
        <p>Could&apos;ve sworn this page existed...</p>
      </div>
    </>
  )
}
