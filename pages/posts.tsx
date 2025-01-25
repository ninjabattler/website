import React, { useCallback, useState } from "react";
import PostCard from "../components/PostCard/PostCard";
import styles from "../styles/PostsPage.module.scss";
import { postsServerSideProps } from "../ssr/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// @ts-expect-error - CommonJs warning
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error - CommonJs warning
import { EffectCards } from "swiper/modules";
import PostsPageBackground from "../components/backgrounds/PostsPageBackground/PostsPageBackground";
import Post from "../components/Post/Post";
import axios from "axios";
import PostsPageHead from "../components/PageMetadata/PostsPageHead";
import { ArrowLeftSharp, ArrowRightSharp } from "@mui/icons-material";
import Link from "next/link";

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

  const onSlideClick = (id: string) => {
    setPostSelected(true);
    setShowPost(false);

    setTimeout(() => {
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

        setTimeout(() => {
          setShowPost(true);
        }, 100);
      });
    }, 1000);
  };

  const goBack = () => {
    setShowPost(false);

    setTimeout(() => {
      setSelectedPostData({});
      setPostSelected(false);
    }, 1000);
  };

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
                  onSlideClick(post._id);
                }}
              >
                {!showPost && (
                  <PostCard
                    title={post.title}
                    date={post.date}
                    _id={post._id}
                    index={i}
                    hidden={postSelected}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    comments={post.comments}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Link
          href={`/posts?p=${selectedPostData.previous ? selectedPostData.previous._id : ""}`}
          shallow
          onClick={() => {
            onSlideClick(
              selectedPostData.previous ? selectedPostData.previous._id : "",
            );
          }}
          title="Previous Post"
          className={`${styles.arrow} ${selectedPostData.previous && showPost ? "" : styles.hidden}`}
        >
          <ArrowLeftSharp />
        </Link>

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
          date={selectedPostData.date}
          goBack={goBack}
        />

        <Link
          href={`/posts?p=${selectedPostData.next ? selectedPostData.next._id : ""}`}
          shallow
          onClick={() => {
            onSlideClick(
              selectedPostData.next ? selectedPostData.next._id : "",
            );
          }}
          title="Next Post"
          className={`${styles.arrow} ${selectedPostData.next && showPost ? "" : styles.hidden} ${styles.right}`}
        >
          <ArrowRightSharp />
        </Link>

        {/* {!showPost && (
          <div className={styles.desciptionContainer}>
            <p className={styles.postsDescription}>
              Renders, opinions, and other stuff
              <br /> that&apos;s too small to fit in an article
            </p>
          </div>
        )} */}
      </main>
    </>
  );
}
