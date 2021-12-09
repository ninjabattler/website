import { React, useEffect, useState } from 'react';
import styles from '../../styles/ReviewPage.module.css';
import JsxParser from 'react-jsx-parser';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Head from 'next/dist/shared/lib/head';
import prisma from '../../prisma/prisma';
import { selectSingleArticle } from '../../prisma/queries/queries';
import VideoHeader from '../../components/VideoHeader';
import InfoBar from '../../components/InfoBar';
import Picture from '../../components/Picture';
import ListItem from '../../components/ListItem';
import Underline from '../../components/Underline';
import Quote from '../../components/Quote';
import Paragraph from '../../components/Paragraph';
import TitleCard from '../../components/TitleCard';

export const getServerSideProps = async (req) => {
  const articleTitle = req.query.title.replace('_', ' ');
  const articleData = await selectSingleArticle(prisma, articleTitle);

  return {
    props: {
      articleData: articleData[0]
    }
  }
}

export default function ArticlePage(props) {

  return (
    <>
      <NavBar />
      <Head>
        <title>Ninjabattler - {props.articleData.title}</title>
        <meta name='description' content={props.articleData.description} />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content={`#${props.articleData.colour}`} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`Ninjabattler - ${props.articleData.title}`} />
        <meta property='og:description' content={props.articleData.description} />
        <meta property='og:image' content={props.articleData.thumbnail} />
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

      <main id={styles.reviewPage}>
        <VideoHeader video={props.articleData.video_header} title={props.articleData.title} pageColour={props.articleData.colour} />
        <InfoBar date={props.articleData.formatteddate} categoryGenre={`${props.articleData.category}/${props.articleData.genre}`} />
        
        <div>
          <article className={styles.articleContainer} style={{ boxShadow: `5px 5px 0px ${props.articleData.colour}` }}>
            {props.articleData.narration && (<iframe src={`${props.articleData.narration}?color=${props.articleData.colour.split('#')[1]}`} style={{ border: 'none', height: '250px', width: '100%' }} ></iframe>)}
            <JsxParser
              components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard }}

              jsx={props.articleData.content}
            />
          </article>
        </div>

      </main>
      <Footer />
    </>)
}