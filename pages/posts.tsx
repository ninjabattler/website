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
import PostsPageHead from "../components/PageMetadata/PostsPageHead";

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
  const [selectedId, setSelectedId] = useState<string>(
    selectedPost ? selectedPost._id : "",
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
  const [selectedComments, setSelectedComments] = useState<any[]>(
    selectedPost ? selectedPost.comments : [],
  );
  const [showPost, setShowPost] = useState<boolean>(
    selectedPost ? true : false,
  );

  const onSlideClick = useCallback((id, title, date) => {
    setPostSelected(true);
    setSelectedTitle(title);
    setSelectedDate(date);
    setSelectedId(id);

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
    setShowPost(false);

    setTimeout(() => {
      setSelectedTitle("");
      setSelectedDate("");
      setSelectedContent([]);
      setPostSelected(false);
    }, 1000);
  }, []);

  return (
    <>
      <PostsPageHead title={selectedTitle} />

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

        <Post
          comments={selectedComments}
          content={selectedContent || []}
          date={selectedDate}
          id={selectedId}
          ip="1"
          hide={!showPost}
          title={selectedTitle}
          userId={1}
          goBack={goBack}
        />
      </main>
    </>
  );
}
