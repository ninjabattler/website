import Head from 'next/head'
import { React, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import Post from '../components/Post';
import styles from '../styles/PostsPage.module.css'
import db from '../db/db';
import { selectAllPostsData, selectUserId, insertNewUser } from '../db/queries';

export const getServerSideProps = async () => {
  let ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' }, })
  ip = ip.data.ip;

  const postsArray = await selectAllPostsData(db)
  const userId = await selectUserId(db, ip)

  if (!userId) {
    userId = await insertNewUser(db, ip)
  }
  
  return {
    props: {
      posts: postsArray,
      userId: userId,
      ip: ip
    }
  }
}

export default function PostsPage(props) {
  return (
    <>
      <NavBar />
      <Head>
        <title>Ninjabattler - Posts</title>
        <meta name='description' content="A mad man's ramblings and sometimes blender renders" />
        <meta property='og:locale' content='en_CA' />
        <meta name='theme-color' content="#FFFF00" />
        <meta property='og:type' content='website' />
        <meta property='og:title' content="Ninjabattler - Posts" />
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
      <div id={styles.postsPage}>
        {
          props.posts.map((post) => {
            return (
              <Post
                title={post.title}
                content={post.content}
                date={post.date}
                id={post.id}
                key={post.id}
                ip={props.ip}
                userId={props.userId}
                comments={post.comments}
              />
            )
          })
        }
      </div>
      <Footer />
    </>
  )
}
