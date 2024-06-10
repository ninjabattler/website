import React, { FC, useState } from "react";
import styles from "./SearchResultsCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { ArticleData } from "../../types";
import ArticleCard from "../ArticleCard/ArticleCard";

type SearchResultsCarouselProps = {
  articles: ArticleData[];
};

/**
 * A Swiper SearchResultsCarousel used to display the most recent articles on the articles page
 * @author Ninjabattler
 * @param articles The articles to display
 */
const SearchResultsCarousel: FC<SearchResultsCarouselProps> = ({
  articles,
}) => {
  return (
    <section className={styles.searchResultsCarousel}>
      <Swiper
        className={styles.swiper}
        effect="creative"
        modules={[EffectCreative]}
        direction="vertical"
        creativeEffect={{
          prev: {
            scale: 0.9,
            translate: [0, -250, -1],
          },
          next: {
            scale: 0.9,
            translate: [0, 250, -1],
          },
        }}
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

export default SearchResultsCarousel;
