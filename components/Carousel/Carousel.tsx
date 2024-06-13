import React, { FC, useState } from "react";
import styles from "./Carousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { ArticleData } from "../../types";
import ArticleCard from "../ArticleCard/ArticleCard";

type CarouselProps = {
  articles: ArticleData[];
  hidden: boolean;
};

/**
 * A Swiper Carousel used to display the most recent articles on the articles page
 * @author Ninjabattler
 * @param articles The articles to display
 * @param hidden Whether or not the carousel should be hidden
 */
const Carousel: FC<CarouselProps> = ({ articles, hidden }) => {
  return (
    <section className={`${styles.carousel} ${hidden ? styles.hidden : ""}`}>
      <Swiper
        className={styles.swiper}
        effect="coverflow"
        modules={[EffectCoverflow]}
        coverflowEffect={{
          slideShadows: false,
        }}
        slidesPerView={3}
        loop
        mousewheel={true}
      >
        {articles.map((article, i) => {
          return (
            <SwiperSlide key={i} className={styles.slide}>
              <ArticleCard article={article} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Carousel;
