import Head from 'next/head'
import React from 'react';
import Post from '../components/Post/Post';
import styles from '../styles/PostsPage.module.scss'
import { postsServerSideProps } from '../ssr/posts';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AppData } from '../types';
import dynamic from 'next/dynamic';
const PixiBackground = dynamic(() => import('../components/PixiBackground/PixiBackground'), { loading: () => <></> });

export const getServerSideProps: GetServerSideProps = postsServerSideProps;

export default function PostsPage({ ip, posts, userId }: InferGetServerSidePropsType<typeof postsServerSideProps> & AppData) {
  return (
    <>
      <PixiBackground />
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
      </Head>
      <div id={styles.postsPage}>
        {
          posts.map((post) => {
            return (
              <Post
                title={post.title}
                content={post.content}
                date={post.date}
                id={post.id}
                key={post.id}
                ip={ip}
                userId={typeof userId === 'number' ? userId : typeof userId[0] === 'number' ? userId[0] : typeof userId[0].id === 'number' ? userId[0].id : 1}
                comments={post.comments}
              />
            )
          })
        }
      </div>
    </>
  )
}
