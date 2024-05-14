import Head from "next/head";
import React from "react";
import PostCard from "../components/PostCard/PostCard";
import styles from "../styles/PostsPage.module.scss";
import { postsServerSideProps } from "../ssr/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import PostsPageBackground from "../components/backgrounds/PostsPageBackground/PostsPageBackground";

export const getServerSideProps: GetServerSideProps = postsServerSideProps;

export default function PostsPage({
  ip,
  posts,
  userId,
}: InferGetServerSidePropsType<typeof postsServerSideProps> & AppData) {
  return (
    <>
      <Head>
        <title>Posts | Ninjabattler</title>
        <meta
          name="description"
          content="A mad man's ramblings and sometimes blender renders"
        />
        <meta property="og:locale" content="en_CA" />
        <meta name="theme-color" content="#FFFF00" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ninjabattler - Posts" />
        <meta
          property="og:description"
          content="A mad man's ramblings and sometimes blender renders"
        />
        <meta property="og:image" content="/Website Robot 2.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      </Head>

      <main id={styles.postsPage}>
        <PostsPageBackground />

        <Swiper
          className={styles.swiper}
          direction="vertical"
          effect="cards"
          modules={[EffectCards]}
          cardsEffect={{
            slideShadows: false,
          }}
          mousewheel={true}
        >
          {posts.map((post, i) => {
            return (
              <SwiperSlide key={i} className={styles.slide}>
                <PostCard
                  title={post.title}
                  content={post.content}
                  date={post.date}
                  id={post.id}
                  ip={ip}
                  index={i}
                  userId={
                    typeof userId === "number"
                      ? userId
                      : typeof userId[0] === "number"
                        ? userId[0]
                        : typeof userId[0].id === "number"
                          ? userId[0].id
                          : 1
                  }
                  comments={post.comments}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </main>
    </>
  );
}
