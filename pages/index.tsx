import Head from 'next/head'
import styles from '../styles/HomePage.module.scss'
import React, { useEffect } from 'react';
import CodeBlock from '../components/articleComponents/CodeBlock/CodeBlock';
import VideoBackground from '../components/VideoBackground/VideoBackground';
import { homePageServerSideProps } from '../ssr/index'
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AppData } from '../types';
import { Application, Sprite } from 'pixi.js';
import { BloomFilter } from 'pixi-filters'

export const getServerSideProps: GetServerSideProps = homePageServerSideProps;

export default function Home({ title, thumbnail, setLinkClicked }: InferGetServerSidePropsType<typeof homePageServerSideProps> & AppData) {

  useEffect(() => {
    const app = new Application({
      height: 1080,
      width: 1920
    });

    document.getElementById('section1').appendChild(app.view);

    const spaceBackground = Sprite.from('homespace.png');
    const spaceGlow = new BloomFilter(20);
    spaceBackground.filters = [spaceGlow]
    spaceBackground.x = app.view.width / 2;
    spaceBackground.y = app.view.height / 2;
    spaceBackground.anchor.x = 0.5;
    spaceBackground.anchor.y = 0.5;

    app.stage.addChild(spaceBackground)
  }, [])

  return (
    <>
      {/* <VideoBackground overlayColour pageColour="#00FFFF" /> */}
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
          
          <section id='section1' style={{ width: '100vw', height: '100vh' }}>

          </section>

        </main>
      </div>
    </>
  )
}
