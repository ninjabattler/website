import Head from 'next/head'
import { React, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import Post from '../components/Post';
import styles from '../styles/PostsPage.module.css'
import prisma from '../prisma/prisma';
import { selectAllPostsData, selectUserId } from '../prisma/queries/queries';

export const getServerSideProps = async () => {
  let ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' }, })
  ip = ip.data.ip;

  const postsArray = await selectAllPostsData(prisma)
  const userId = await selectUserId(prisma, ip)
  
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
        <meta property='og:title' content="Ninjabattler" />
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
