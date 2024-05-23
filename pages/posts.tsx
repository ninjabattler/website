import Head from "next/head";
import React, { useCallback, useState } from "react";
import PostCard from "../components/PostCard/PostCard";
import styles from "../styles/PostsPage.module.scss";
import { postsServerSideProps } from "../ssr/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import PostsPageBackground from "../components/backgrounds/PostsPageBackground/PostsPageBackground";
import Post from "../components/Post/Post";

export const getServerSideProps: GetServerSideProps = postsServerSideProps;

export default function PostsPage({
  ip,
  posts,
  userId,
}: InferGetServerSidePropsType<typeof postsServerSideProps> & AppData) {
  const [postSelected, setPostSelected] = useState<boolean>(false);
  const [showPost, setShowPost] = useState<boolean>(false);

  const onSlideClick = useCallback(() => {
    setPostSelected(true);

    setTimeout(() => {
      setShowPost(true);
    }, 1000);
  }, []);

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

        <style>
          {`
            :root {
              --article-colour: #aaaa44;
              --article-colour2: #0000ff;
            }
          `}
        </style>
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
              <SwiperSlide
                key={i}
                className={styles.slide}
                onClick={onSlideClick}
              >
                <PostCard
                  title={post.title}
                  content={post.content}
                  date={post.date}
                  id={post.id}
                  ip={ip}
                  index={i}
                  hidden={postSelected}
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

        {showPost && (
          <Post
            comments={[]}
            content={[
              {
                children: [
                  {
                    _type: "span",
                    marks: [],
                    text: "Looks like I won't have another article out this month, so here, have a snake girl medusa thing instead",
                    content: null,
                  },
                ],
                _type: "block",
                style: "normal",
                _key: "15d4a60f2eee",
                markDefs: [],
              },
              {
                sourceLink: null,
                image: {
                  url: "https://cdn.sanity.io/images/umau1bu6/production/42495d8623fd48d8fe7385ee1bf32367c13f1270-3840x2160.webp",
                  blur: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMECP/EAB0QAAICAgMBAAAAAAAAAAAAAAECAAMRIQQSIrH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAP/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A56oRrGDA+hLciu0qocBQV7a+SHAJ6ZzuV5Vrs4DMT5hDaxvgNEYDbOzEcq1//9k=",
                  width: 3840,
                  height: 2160,
                },
                _type: "picture",
                scale: 100,
                float: "Left",
                source: null,
              },
              {
                _key: "9519767f258e",
                markDefs: [],
                children: [
                  {
                    _type: "span",
                    marks: [],
                    text: "I'll hopefully have another article out soon, as well as some other stuff...",
                    content: null,
                  },
                ],
                _type: "block",
                style: "normal",
              },
            ]}
            date="2023-05-31"
            id={1}
            ip="1"
            title="Snakes in the Clouds"
            userId={1}
          />
        )}
      </main>
    </>
  );
}
