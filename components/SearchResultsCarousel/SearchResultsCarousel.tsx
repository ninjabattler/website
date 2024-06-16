import React, { FC } from "react";
import styles from "./SearchResultsCarousel.module.scss";
// @ts-expect-error - CommonJs warning
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error - CommonJs warning
import { EffectCreative } from "swiper/modules";
import ArticleCard from "../ArticleCard/ArticleCard";

type SearchResultsCarouselProps = {
  articles: SanityArticlesSearchResult[];
  hidden: boolean;
};

/**
 * A Swiper SearchResultsCarousel used to display the most recent articles on the articles page
 * @author Ninjabattler
 * @param articles The articles to display
 * @param hidden Whether or not the carousel should be hidden
 */
const SearchResultsCarousel: FC<SearchResultsCarouselProps> = ({
  articles,
  hidden,
}) => (
  <section
    className={`${styles.searchResultsCarousel} ${hidden ? styles.hidden : ""}`}
  >
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

export default SearchResultsCarousel;
