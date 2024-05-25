import Head from "next/head";
import React, { useCallback, useState } from "react";
import PostCard from "../components/PostCard/PostCard";
import styles from "../styles/PostsPage.module.scss";
import { postsServerSideProps } from "../ssr/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AppData, PostData } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import PostsPageBackground from "../components/backgrounds/PostsPageBackground/PostsPageBackground";
import Post from "../components/Post/Post";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = postsServerSideProps;

export default function PostsPage({
  ip,
  posts,
  userId,
  selectedPost,
}: InferGetServerSidePropsType<typeof postsServerSideProps> & AppData) {
  const [postSelected, setPostSelected] = useState<boolean>(
    selectedPost ? true : false,
  );
  const [selectedTitle, setSelectedTitle] = useState<string>(
    selectedPost ? selectedPost.title : "",
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    selectedPost ? selectedPost.date : "",
  );
  const [selectedContent, setSelectedContent] = useState<any[] | null>(
    selectedPost ? selectedPost.content : null,
  );
  const [showPost, setShowPost] = useState<boolean>(
    selectedPost ? true : false,
  );

  const onSlideClick = useCallback((id, title, date) => {
    setPostSelected(true);
    setSelectedTitle(title);
    setSelectedDate(date);

    axios({
      method: "get",
      url: `/api/posts/get`,
      params: { id },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.data && res.data.content) {
        setSelectedContent(res.data.content);
      } else {
        setSelectedContent([]);
      }
    });

    setTimeout(() => {
      setShowPost(true);
    }, 1000);
  }, []);

  const goBack = useCallback(() => {
    setPostSelected(false);
    setSelectedTitle("");
    setSelectedDate("");
    setSelectedContent([]);
    setShowPost(false);
  }, []);

  return (
    <>
      <Head>
        <title>{selectedTitle || "Posts"} | Ninjabattler</title>
        <meta
          name="description"
          content="A mad man's ramblings and sometimes blender renders"
        />
        <meta property="og:locale" content="en_CA" />
        <meta name="theme-color" content="#FFFF00" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${selectedTitle || "Posts"} | Ninjabattler`}
        />
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
                onClick={() => {
                  onSlideClick(post._id, post.title, post.date);
                }}
              >
                {!showPost && (
                  <PostCard
                    title={post.title}
                    content={post.content}
                    date={post.date}
                    id={post._id}
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
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        {showPost && selectedContent !== null && (
          <Post
            comments={[]}
            content={selectedContent || []}
            date={selectedDate}
            id=""
            ip="1"
            title={selectedTitle}
            userId={1}
            goBack={goBack}
          />
        )}
      </main>
    </>
  );
}
