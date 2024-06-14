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
  posts,
  selectedPost,
}: InferGetServerSidePropsType<typeof postsServerSideProps> & AppData) {
  const [postSelected, setPostSelected] = useState<boolean>(
    selectedPost ? true : false,
  );
  const [selectedPostData, setSelectedPostData] = useState<any>(
    selectedPost ? selectedPost : {},
  );
  const [showPost, setShowPost] = useState<boolean>(
    selectedPost ? true : false,
  );

  const onSlideClick = useCallback((id, title, date) => {
    setPostSelected(true);

    axios({
      method: "get",
      url: `/api/posts/get`,
      params: { id },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.data && res.data.content) {
        setSelectedPostData(res.data);
      } else {
        setSelectedPostData({});
      }
    });

    setTimeout(() => {
      setShowPost(true);
    }, 1000);
  }, []);

  const goBack = useCallback(() => {
    setShowPost(false);

    setTimeout(() => {
      setSelectedPostData({});
      setPostSelected(false);
    }, 1000);
  }, []);

  return (
    <>
      <PostsPageHead title={selectedPostData.title} />

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
                    index={i}
                    hidden={postSelected}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    // @ts-ignore
                    comments={post.comments}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Post
          comments={selectedPostData.comments}
          content={selectedPostData.content || []}
          likes={selectedPostData.likes}
          dislikes={selectedPostData.dislikes}
          isCurrentlyLiked={selectedPostData.isLiked}
          isCurrentlyDisliked={selectedPostData.isDisliked}
          id={selectedPostData._id}
          hide={!showPost}
          title={selectedPostData.title}
          userId={1}
          goBack={goBack}
        />
      </main>
    </>
  );
}
