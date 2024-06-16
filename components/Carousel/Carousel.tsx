import React, { FC } from "react";
import styles from "./Carousel.module.scss";
// @ts-expect-error - CommonJs warning
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error - CommonJs warning
import { EffectCoverflow } from "swiper/modules";
import { SanityArticlesSearchResult } from "../../types";
import ArticleCard from "../ArticleCard/ArticleCard";

type CarouselProps = {
  articles: SanityArticlesSearchResult[];
  hidden: boolean;
};

/**
 * A Swiper Carousel used to display the most recent articles on the articles page
 * @author Ninjabattler
 * @param articles The articles to display
 * @param hidden Whether or not the carousel should be hidden
 */
const Carousel: FC<CarouselProps> = ({ articles, hidden }) => (
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
            <ArticleCard
              title={article.title}
              slug={article.slug}
              date={article.date}
              thumbnail={article.thumbnail}
              comments={article.comments}
              likes={article.likes}
              dislikes={article.dislikes}
              tags={article.tags}
              colors={article.colors}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  </section>
);

export default Carousel;
