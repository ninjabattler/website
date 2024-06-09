import React, { FC, useState } from "react";
import styles from "./Carousel.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { ArticleData, ParagraphItem } from "../../types";

type CarouselProps = {
  articles: ArticleData[];
};

/**
 * A Swiper Carousel used to display the most recent articles on the articles page
 * @author Ninjabattler
 * @param articles The articles to display
 */
const Carousel: FC<CarouselProps> = ({ articles }) => {
  return (
    <section className={styles.carousel}>
      <Swiper
        className={styles.swiper}
        effect="coverflow"
        modules={[EffectCoverflow]}
        coverflowEffect={{
          slideShadows: false,
        }}
        slidesPerView={3}
        loop
        autoplay
        mousewheel={true}
      >
        {articles.map((article, i) => {
          return (
            <SwiperSlide key={i} className={styles.slide}>
              <Link href={`/articles/${article.slug}`}>
                <Image
                  src={article.thumbnail.url}
                  width={article.thumbnail.width}
                  height={article.thumbnail.height}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={article.thumbnail.blur}
                  alt={article.thumbnail.alt}
                />
                <div className={styles.articleInfo}>
                  <h1>{article.title}</h1>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Carousel;
